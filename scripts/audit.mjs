import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:4173'
const results = []
const record = (name, pass, detail = '') => results.push({ name, pass, detail })

// The GitHub API is called unauthenticated and is expected to rate-limit (403).
// That path is asserted separately, so its noise is not counted as a defect.
const isExpectedApiNoise = (text) =>
  /Failed to load resource/i.test(text) || /api\.github\.com/i.test(text)

const browser = await chromium.launch()

/* ---------- 1. Layout / overflow / a11y across viewports ---------- */
for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1180, height: 800 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small', width: 320, height: 640 },
]) {
  const ctx = await browser.newContext({ viewport: vp })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error' && !isExpectedApiNoise(m.text())) errors.push(m.text())
  })

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    offenders: [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && (r.right > document.documentElement.clientWidth + 1 || r.left < -1)
      })
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 45)}`),
  }))

  record(
    `${vp.name}: no horizontal overflow`,
    overflow.scrollW <= overflow.clientW + 1,
    `${overflow.scrollW} vs ${overflow.clientW} ${overflow.offenders.join(' | ')}`,
  )
  record(`${vp.name}: no runtime errors`, errors.length === 0, errors.slice(0, 3).join(' | '))

  if (vp.name === 'desktop' || vp.name === 'mobile') {
    const a11y = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => Number(h.tagName[1]))
      let skips = 0
      for (let i = 1; i < headings.length; i += 1) if (headings[i] - headings[i - 1] > 1) skips += 1

      const namelessControls = [...document.querySelectorAll('a,button')].filter((el) => {
        const label = (el.getAttribute('aria-label') || el.textContent || '').trim()
        return !label && !el.querySelector('img[alt]:not([alt=""])')
      })
      .map((el) => `${el.tagName.toLowerCase()}:${String(el.className).slice(0, 30)}`)

      const imagesNoAlt = [...document.querySelectorAll('img')].filter(
        (i) => i.getAttribute('alt') === null,
      ).length

      const navTargets = [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && h !== '#')
      const brokenTargets = [...new Set(navTargets)].filter((h) => !document.querySelector(h))

      return {
        h1Count: document.querySelectorAll('h1').length,
        skips,
        namelessControls: namelessControls.slice(0, 6),
        imagesNoAlt,
        brokenTargets,
        main: document.querySelectorAll('main').length,
        nav: document.querySelectorAll('nav').length,
        footer: document.querySelectorAll('footer').length,
        sectionLabels: [...document.querySelectorAll('section')].filter(
          (s) => !s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby'),
        ).length,
      }
    })

    record(`${vp.name}: exactly one h1`, a11y.h1Count === 1, `count=${a11y.h1Count}`)
    record(`${vp.name}: no heading level skips`, a11y.skips === 0, `skips=${a11y.skips}`)
    record(`${vp.name}: all controls named`, a11y.namelessControls.length === 0, a11y.namelessControls.join(' | '))
    record(`${vp.name}: all images have alt`, a11y.imagesNoAlt === 0, `${a11y.imagesNoAlt} missing`)
    record(`${vp.name}: anchor targets exist`, a11y.brokenTargets.length === 0, a11y.brokenTargets.join(' | '))
    record(`${vp.name}: landmarks present`, a11y.main === 1 && a11y.nav >= 1 && a11y.footer === 1, JSON.stringify(a11y))
    record(`${vp.name}: all sections labelled`, a11y.sectionLabels === 0, `${a11y.sectionLabels} unlabelled`)
  }

  await ctx.close()
}

/* ---------- 2. Typography, spacing and colour tokens ---------- */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const runtimeErrors = []
page.on('pageerror', (e) => runtimeErrors.push(e.message))
page.on('console', (m) => {
  if (m.type() === 'error' && !isExpectedApiNoise(m.text())) runtimeErrors.push(m.text())
})
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

const style = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const body = getComputedStyle(document.body)
  return {
    bodyFont: body.fontFamily,
    bodyBg: body.backgroundColor,
    bodyColor: body.color,
    h1Font: getComputedStyle(h1).fontFamily,
    h1Size: getComputedStyle(h1).fontSize,
    h1LineHeight: getComputedStyle(h1).lineHeight,
    scrollPadding: getComputedStyle(document.documentElement).scrollPaddingTop,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    cardRadius: getComputedStyle(document.querySelector('article')).borderRadius,
    cardShadow: getComputedStyle(document.querySelector('article')).boxShadow,
  }
})
record('body font is Inter', style.bodyFont.includes('Inter'), style.bodyFont)
record('headings use display font', style.h1Font.includes('Space Grotesk'), style.h1Font)
record('hero h1 is large on desktop', parseFloat(style.h1Size) >= 56, style.h1Size)
record('h1 line-height is tight', parseFloat(style.h1LineHeight) / parseFloat(style.h1Size) < 1.15, `${style.h1LineHeight}/${style.h1Size}`)
record('scroll-padding offsets sticky nav', parseFloat(style.scrollPadding) >= 80, style.scrollPadding)
record('smooth scrolling enabled', style.scrollBehavior === 'smooth', style.scrollBehavior)
record('cards use soft shadow', style.cardShadow !== 'none', style.cardShadow)
record('card radius is moderate', parseFloat(style.cardRadius) <= 20, style.cardRadius)

/* ---------- 3. Contrast (WCAG AA) on key text ---------- */
async function contrastFor(theme) {
  await page.evaluate((value) => localStorage.setItem('fy-theme', value), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  return page.evaluate(() => {
    // Tailwind v4 emits oklab()/color-mix() values, so colours are resolved by
    // painting them into a canvas rather than parsed out of the string.
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const toRGBA = (value) => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = '#000000'
      ctx.fillStyle = value
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
      return [r, g, b, a / 255]
    }

    const over = (top, bottom) => {
      const a = top[3] + bottom[3] * (1 - top[3])
      if (a === 0) return [0, 0, 0, 0]
      return [
        (top[0] * top[3] + bottom[0] * bottom[3] * (1 - top[3])) / a,
        (top[1] * top[3] + bottom[1] * bottom[3] * (1 - top[3])) / a,
        (top[2] * top[3] + bottom[2] * bottom[3] * (1 - top[3])) / a,
        a,
      ]
    }

    const effectiveBg = (el) => {
      const layers = []
      let base = null
      let node = el
      while (node) {
        const colour = toRGBA(getComputedStyle(node).backgroundColor)
        if (colour[3] > 0) {
          if (colour[3] >= 1) {
            base = colour
            break
          }
          layers.push(colour)
        }
        node = node.parentElement
      }
      if (!base) base = toRGBA(getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)')
      if (base[3] < 1) base = over(base, [255, 255, 255, 1])
      for (let i = layers.length - 1; i >= 0; i -= 1) base = over(layers[i], base)
      return base.slice(0, 3)
    }

    const lum = ([r, g, b]) => {
      const f = (v) => {
        const c = v / 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
      }
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
    }

    const ratio = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
      return (l1 + 0.05) / (l2 + 0.05)
    }

    const measure = (name, el, min) => {
      if (!el) return { name, ratio: 0, min, missing: true }
      const bg = effectiveBg(el)
      const fg = over(toRGBA(getComputedStyle(el).color), [...bg, 1])
      return { name, ratio: Number(ratio(fg.slice(0, 3), bg).toFixed(2)), min, size: getComputedStyle(el).fontSize }
    }

    return [
      measure('hero badge', document.querySelector('#home p'), 4.5),
      measure('hero lead paragraph', document.querySelector('#home h1 + p'), 4.5),
      measure('hero intro paragraph', document.querySelectorAll('#home p')[2], 4.5),
      measure('hero meta line', document.querySelectorAll('#home p')[3], 4.5),
      measure('about body', document.querySelector('#about p.text-\\[15px\\]'), 4.5),
      measure('footer text', document.querySelector('footer p'), 4.5),
      measure('project kicker', document.querySelector('#projects article p'), 4.5),
      measure('primary CTA label', document.querySelector('#home a[href="#projects"]'), 4.5),
    ]
  })
}

for (const theme of ['dark', 'light']) {
  const rows = await contrastFor(theme)
  for (const row of rows) {
    record(
      `${theme}: contrast ${row.name} >= ${row.min}`,
      !row.missing && row.ratio >= row.min,
      row.missing ? 'element not found' : `${row.ratio}:1 @ ${row.size}`,
    )
  }
}

/* ---------- 4. Theme toggle ---------- */
await page.evaluate(() => localStorage.setItem('fy-theme', 'dark'))
await page.reload({ waitUntil: 'networkidle' })
const beforeBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
await page.getByRole('button', { name: /switch to light mode/i }).click()
await page.waitForTimeout(300)
const afterState = await page.evaluate(() => ({
  dark: document.documentElement.classList.contains('dark'),
  bg: getComputedStyle(document.body).backgroundColor,
  stored: localStorage.getItem('fy-theme'),
}))
record('theme toggle switches to light', afterState.dark === false && afterState.bg !== beforeBg, JSON.stringify(afterState))
record('theme choice persisted', afterState.stored === 'light', String(afterState.stored))

/* ---------- 5. Navbar scroll behaviour ---------- */
await page.getByRole('button', { name: /switch to dark mode/i }).click()
await page.waitForTimeout(200)
const navTop = await page.evaluate(() => document.querySelector('header nav').className)
await page.evaluate(() => window.scrollTo(0, 900))
await page.waitForTimeout(700)
const navScrolled = await page.evaluate(() => document.querySelector('header nav').className)
record('navbar gains chrome on scroll', navTop !== navScrolled, `${navTop} -> ${navScrolled}`)

const activeNav = await page.evaluate(() => {
  const link = document.querySelector('nav a[aria-current]')
  return link ? link.textContent.trim() : null
})
record('scroll spy marks an active nav item', Boolean(activeNav), String(activeNav))

/* ---------- 6. Modal ---------- */
await page.evaluate(() => document.querySelector('#projects').scrollIntoView())
await page.waitForTimeout(900)
await page.getByRole('button', { name: /open project details/i }).first().click()
await page.waitForTimeout(600)
const modal = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]')
  return {
    open: Boolean(dialog),
    modal: dialog?.getAttribute('aria-modal'),
    labelled: Boolean(dialog?.getAttribute('aria-labelledby')),
    hasClose: Boolean(dialog?.querySelector('button[aria-label]')),
    text: dialog?.textContent?.slice(0, 60),
    bodyLocked: getComputedStyle(document.body).overflow === 'hidden',
    focusInside: dialog?.contains(document.activeElement),
  }
})
record('modal opens', modal.open, modal.text)
record('modal is aria-modal + labelled', modal.modal === 'true' && modal.labelled, JSON.stringify(modal))
record('modal traps focus', modal.focusInside === true)
record('body scroll locked behind modal', modal.bodyLocked)
record('modal has close control', modal.hasClose)

await page.keyboard.press('Escape')
await page.waitForTimeout(400)
record('Escape closes modal', (await page.locator('[role="dialog"]').count()) === 0)
record('body scroll restored', (await page.evaluate(() => getComputedStyle(document.body).overflow)) !== 'hidden')

/* ---------- 7. Contact form validation ---------- */
await page.evaluate(() => document.querySelector('#contact').scrollIntoView())
await page.waitForTimeout(800)
await page.getByRole('button', { name: /send message/i }).click()
await page.waitForTimeout(300)
const invalid = await page.evaluate(() => ({
  errors: [...document.querySelectorAll('#contact p')].filter((p) => p.textContent.includes('Please ') || p.textContent.includes('Enter a valid')).length,
  invalidFields: document.querySelectorAll('#contact [aria-invalid="true"]').length,
}))
record('empty submit surfaces field errors', invalid.errors >= 3 && invalid.invalidFields >= 3, JSON.stringify(invalid))

await page.fill('#contact input[name="name"]', 'A')
await page.locator('#contact input[name="name"]').blur()
await page.waitForTimeout(200)
record(
  'short name rejected',
  (await page.locator('#contact [aria-invalid="true"]').count()) >= 1,
)

await page.fill('#contact input[name="name"]', 'Recruiter Name')
await page.fill('#contact input[name="email"]', 'not-an-email')
await page.locator('#contact input[name="email"]').blur()
await page.waitForTimeout(200)
const emailErr = await page.locator('#contact').getByText(/valid email/i).count()
record('invalid email format rejected', emailErr >= 1, `${emailErr}`)

await page.fill('#contact input[name="email"]', 'recruiter@company.com')
await page.fill('#contact input[name="subject"]', 'Full-stack role')
await page.fill('#contact textarea[name="message"]', 'Short')
await page.locator('#contact textarea[name="message"]').blur()
await page.waitForTimeout(200)
record(
  'short message rejected',
  (await page.locator('#contact').getByText(/at least 20 characters/i).count()) >= 1,
)

/* ---------- 8. GitHub API degradation ---------- */
const offline = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const offlinePage = await offline.newPage()
await offlinePage.route('**/api.github.com/**', (route) => route.abort())
await offlinePage.goto(BASE, { waitUntil: 'domcontentloaded' })
await offlinePage.waitForTimeout(1500)
await offlinePage.evaluate(() => document.querySelector('#github-heading')?.scrollIntoView())
await offlinePage.waitForTimeout(600)
const degraded = await offlinePage.evaluate(() => {
  const section = document.querySelector('#github-heading')?.closest('section')
  return {
    text: section?.textContent || '',
    links: section?.querySelectorAll('a[href*="github.com"]').length || 0,
  }
})
record(
  'GitHub section degrades gracefully offline',
  degraded.links >= 3 && /could not be loaded|unavailable/i.test(degraded.text),
  `${degraded.links} links`,
)
record('no fabricated stats offline', !/followers\s*0/i.test(degraded.text))

record('no runtime errors across interactions', runtimeErrors.length === 0, runtimeErrors.slice(0, 4).join(' | '))

/* ---------- 9. Responsive intent + tap targets ---------- */
async function layoutAt(width, height) {
  const c = await browser.newContext({ viewport: { width, height } })
  const p = await c.newPage()
  await p.goto(BASE, { waitUntil: 'networkidle' })
  await p.waitForTimeout(500)
  const data = await p.evaluate(() => {
    const box = (selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) }
    }
    const columns = (selector) => {
      const el = document.querySelector(selector)
      return el ? getComputedStyle(el).gridTemplateColumns.split(' ').length : null
    }
    const featured = document.querySelector('#projects article')
    return {
      desktopNavVisible: Boolean(
        [...document.querySelectorAll('header li a')].find((a) => a.textContent.trim() === 'Skills')?.offsetParent,
      ),
      hamburgerVisible: Boolean(
        [...document.querySelectorAll('header button')].find((b) =>
          /navigation menu/i.test(b.getAttribute('aria-label') || ''),
        )?.offsetParent,
      ),
      heroColumns: columns('#home .grid'),
      featuredDirection: featured ? getComputedStyle(featured).flexDirection : null,
      featuredVisualBox: box('#projects article > div'),
      mernColumns: columns('#stack ul.grid'),
      capabilityColumns: columns('#what-i-build-heading') ? columns('[aria-labelledby="what-i-build-heading"] ul.grid') : null,
      aboutColumns: columns('#about .grid'),
      portraitBox: box('#about [class*="aspect-"]'),
      contactColumns: columns('#contact .grid'),
      // Links that sit inside a sentence are exempt from WCAG 2.5.8 target size,
      // so only standalone controls are checked.
      smallTapTargets: [...document.querySelectorAll('header a, header button, #contact button, #contact form > div > a')]
        .filter((el) => el.offsetParent)
        .map((el) => ({ label: el.textContent.trim().slice(0, 18), ...el.getBoundingClientRect().toJSON() }))
        .filter((r) => r.height < 36 || r.width < 36)
        .map((r) => `${r.label}:${Math.round(r.width)}x${Math.round(r.height)}`),
      h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
      sectionCount: document.querySelectorAll('section').length,
    }
  })
  await c.close()
  return data
}

const mobileLayout = await layoutAt(390, 844)
const tabletLayout = await layoutAt(820, 1180)
const desktopLayout = await layoutAt(1440, 900)

record('mobile: hero stacks to one column', mobileLayout.heroColumns === 1, `${mobileLayout.heroColumns} cols`)
record('tablet: hero stacks to one column', tabletLayout.heroColumns === 1, `${tabletLayout.heroColumns} cols`)
record('desktop: hero uses two columns', desktopLayout.heroColumns === 2, `${desktopLayout.heroColumns} cols`)

record('mobile: desktop nav hidden, hamburger shown', !mobileLayout.desktopNavVisible && mobileLayout.hamburgerVisible)
record('desktop: nav shown, hamburger hidden', desktopLayout.desktopNavVisible && !desktopLayout.hamburgerVisible)

record('mobile: flagship card stacks vertically', mobileLayout.featuredDirection === 'column', mobileLayout.featuredDirection)
record('desktop: flagship card goes horizontal', desktopLayout.featuredDirection === 'row', desktopLayout.featuredDirection)

record('mobile: MERN grid is 1 column', mobileLayout.mernColumns === 1, `${mobileLayout.mernColumns}`)
record('tablet: MERN grid is 2 columns', tabletLayout.mernColumns === 2, `${tabletLayout.mernColumns}`)
record('desktop: MERN grid is 4 columns', desktopLayout.mernColumns === 4, `${desktopLayout.mernColumns}`)

record('mobile: about stacks', mobileLayout.aboutColumns === 1, `${mobileLayout.aboutColumns}`)
record('desktop: about is two columns', desktopLayout.aboutColumns === 2, `${desktopLayout.aboutColumns}`)

record('mobile: contact stacks', mobileLayout.contactColumns === 1, `${mobileLayout.contactColumns}`)
record('desktop: contact is two columns', desktopLayout.contactColumns === 2, `${desktopLayout.contactColumns}`)

record(
  'mobile: portrait keeps 4:5 ratio',
  Math.abs(mobileLayout.portraitBox?.w / mobileLayout.portraitBox?.h - 0.8) < 0.08,
  JSON.stringify(mobileLayout.portraitBox),
)
record('mobile: hero type scales down', parseFloat(mobileLayout.h1Size) < parseFloat(desktopLayout.h1Size), `${mobileLayout.h1Size} < ${desktopLayout.h1Size}`)
record('mobile: no sub-36px tap targets', mobileLayout.smallTapTargets.length === 0, mobileLayout.smallTapTargets.join(' | '))
record('all nine sections render', desktopLayout.sectionCount === 9, `${desktopLayout.sectionCount}`)

/* ---------- 9b. Portrait actually loads ---------- */
const portraitCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const portraitPage = await portraitCtx.newPage()
await portraitPage.goto(BASE, { waitUntil: 'networkidle' })
await portraitPage.evaluate(() => document.querySelector('#about').scrollIntoView())
await portraitPage.waitForTimeout(1200)
const portrait = await portraitPage.evaluate(() => {
  const img = document.querySelector('#about img')
  return img
    ? { present: true, loaded: img.complete && img.naturalWidth > 0, alt: img.alt, w: img.naturalWidth }
    : { present: false }
})
record('portrait image loads', portrait.present && portrait.loaded, JSON.stringify(portrait))
record('portrait has descriptive alt', portrait.present && portrait.alt.length > 15, portrait.alt)
await portraitCtx.close()

/* ---------- 9c. No unverified outbound links ---------- */
const linksCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const linksPage = await linksCtx.newPage()
await linksPage.goto(BASE, { waitUntil: 'networkidle' })
const outbound = await linksPage.evaluate(() =>
  [...new Set(
    [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => /^https?:/.test(h)),
  )].sort(),
)
const allowedHosts = ['github.com', 'br-fashion-mart.netlify.app', 'fahmidayeasmin.dev']
const unexpected = outbound.filter((href) => {
  try {
    return !allowedHosts.includes(new URL(href).hostname)
  } catch {
    return true
  }
})
record('no links to unverified profiles/domains', unexpected.length === 0, unexpected.join(' | '))
record('no linkedin.com guess is published', !outbound.some((h) => /linkedin\.com/.test(h)))
await linksCtx.close()

/* ---------- 10. Reduced motion ---------- */
const reduced = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
})
const reducedPage = await reduced.newPage()
await reducedPage.goto(BASE, { waitUntil: 'networkidle' })
await reducedPage.waitForTimeout(700)
const reducedState = await reducedPage.evaluate(() => {
  const seconds = (value) => parseFloat(value) * (value.includes('ms') ? 0.001 : 1)
  const drifting = [...document.querySelectorAll('.animate-drift')].filter(
    (el) => seconds(getComputedStyle(el).animationDuration) > 0.01,
  ).length
  const heroVisible = getComputedStyle(document.querySelector('h1')).opacity
  return { drifting, heroVisible }
})
record('reduced motion disables ambient animation', reducedState.drifting === 0, `${reducedState.drifting} still animating`)
record('reduced motion still shows hero content', Number(reducedState.heroVisible) === 1, `opacity=${reducedState.heroVisible}`)
await reduced.close()

await browser.close()

/* ---------- Report ---------- */
const failed = results.filter((r) => !r.pass)
for (const r of results) {
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  (${r.detail})` : ''}`)
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)