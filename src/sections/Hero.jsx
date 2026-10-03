import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/SocialLinks'
import { TechIcon } from '../components/icons/TechIcon'

const FLOATING_LABELS = [
  { icon: 'react', label: 'React', className: 'left-[4%] top-[18%]', delay: 0 },
  { icon: 'node', label: 'Node.js', className: 'right-[6%] top-[14%]', delay: 1.4 },
  { icon: 'database', label: 'MongoDB', className: 'left-[10%] bottom-[22%]', delay: 0.7 },
  { icon: 'server', label: 'Express', className: 'right-[10%] bottom-[18%]', delay: 2.1 },
]

const CODE_LINES = [
  { tokens: [{ text: 'const', tone: 'keyword' }, { text: ' ', tone: 'plain' }, { text: 'developer', tone: 'accent' }, { text: ' = {', tone: 'plain' }] },
  { tokens: [{ text: '  name', tone: 'plain' }, { text: ": '", tone: 'plain' }, { text: 'Fahmida Yeasmin', tone: 'string' }, { text: "',", tone: 'plain' }] },
  { tokens: [{ text: '  role', tone: 'plain' }, { text: ": '", tone: 'plain' }, { text: 'MERN Stack Developer', tone: 'string' }, { text: "',", tone: 'plain' }] },
  { tokens: [{ text: '  stack', tone: 'plain' }, { text: ': [', tone: 'plain' }] },
  { tokens: [{ text: "    'MongoDB'", tone: 'string' }, { text: ', ', tone: 'plain' }, { text: "'Express.js'", tone: 'string' }, { text: ',', tone: 'plain' }] },
  { tokens: [{ text: "    'React'", tone: 'string' }, { text: ', ', tone: 'plain' }, { text: "'Node.js'", tone: 'string' }] },
  { tokens: [{ text: '  ],', tone: 'plain' }] },
  { tokens: [{ text: '  build', tone: 'plain' }, { text: ': (', tone: 'plain' }, { text: 'idea', tone: 'accent' }, { text: ') => ', tone: 'plain' }, { text: 'ship', tone: 'keyword' }, { text: '(idea)', tone: 'plain' }, { text: ',', tone: 'plain' }] },
  { tokens: [{ text: '}', tone: 'plain' }] },
]

const TOKEN_CLASS = {
  keyword: 'text-[#c792ea]',
  string: 'text-[#a5e8a0]',
  accent: 'text-accent',
  plain: 'text-muted',
}

function CodeCard() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-card border border-line bg-surface shadow-lift">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-accent/70" aria-hidden="true" />
          <span className="ml-2 truncate font-mono text-[11px] text-muted">
            developer.js — fahmidayeasmin.dev
          </span>
        </div>

        <pre className="overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13px]">
          <code>
            {CODE_LINES.map((line, lineIndex) => (
              <span key={lineIndex} className="flex">
                <span aria-hidden="true" className="mr-4 w-4 shrink-0 select-none text-right text-muted/40">
                  {lineIndex + 1}
                </span>
                <span className="min-w-0">
                  {line.tokens.map((token, tokenIndex) => (
                    <span key={tokenIndex} className={TOKEN_CLASS[token.tone]}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>

        <div className="flex items-center gap-2 border-t border-line px-4 py-3 sm:px-5">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-[11px] text-muted">ready — built with the MERN stack</span>
        </div>
      </div>
    </motion.div>
  )
}

function FloatingLabels() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {FLOATING_LABELS.map((item) => (
        <motion.span
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -9, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.9 },
            scale: { duration: 0.6, delay: 0.9 },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
          }}
          className={`absolute ${item.className} flex items-center gap-2 rounded-xl border border-line bg-canvas/70 px-3 py-2 backdrop-blur-md`}
        >
          <TechIcon name={item.icon} className="size-4 text-accent" />
          <span className="font-mono text-[11px] text-muted">{item.label}</span>
        </motion.span>
      ))}
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28"
      aria-label="Introduction"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop mask-fade-b absolute inset-0" />
        <div className="animate-drift absolute -top-40 left-[8%] size-[34rem] rounded-full bg-accent/12 blur-[120px]" />
        <div
          className="animate-drift absolute -right-32 top-24 size-[26rem] rounded-full bg-accent/8 blur-[110px]"
          style={{ animationDelay: '-8s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />

        <span className="absolute left-[6%] top-[26%] font-mono text-[7rem] font-bold leading-none text-ink/[0.035] select-none">
          {'{ }'}
        </span>
        <span className="absolute right-[5%] bottom-[14%] font-mono text-[5rem] font-bold leading-none text-accent/[0.07] select-none">
          {'</>'}
        </span>
      </div>

      <FloatingLabels />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="flex flex-col items-start gap-7">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur-sm"
          >
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true" className="h-3 w-px bg-line-2" />
            <span className="text-accent">Open to opportunities</span>
          </motion.p>

          <div className="flex flex-col gap-5">
            <motion.h1
              {...rise(0.12)}
              className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="text-gradient">MERN Stack</span>
              <br />
              <span className="text-ink">Developer</span>
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="max-w-xl text-[15.5px] leading-relaxed text-muted sm:text-[17px]"
            >
              I build modern full-stack web applications with MongoDB, Express.js, React and Node.js.
            </motion.p>

            <motion.p {...rise(0.28)} className="max-w-xl text-[14.5px] leading-relaxed text-muted/90">
              {profile.intro}
            </motion.p>
          </div>

          <motion.p {...rise(0.34)} className="flex items-center gap-2 text-[13.5px] text-muted">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            Based in {profile.location}
            <span aria-hidden="true" className="h-3 w-px bg-line-2" />
            <span className="font-mono text-[12.5px]">
              MongoDB · Express.js · React · Node.js
            </span>
          </motion.p>

          <motion.div {...rise(0.42)} className="flex flex-wrap items-center gap-3">
            <Button as="a" href="#projects" size="lg">
              View My Projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
            <Button as="a" href="#contact" variant="secondary" size="lg">
              Let&rsquo;s Connect
            </Button>
            <ResumeButton />
          </motion.div>

          <motion.div {...rise(0.5)} className="flex flex-col gap-3 pt-1">
            <SocialLinks size="sm" />
          </motion.div>
        </div>

        <CodeCard />
      </div>
    </section>
  )
}

function ResumeButton() {
  const [showHint, setShowHint] = useState(false)
  const { resume } = profile

  useEffect(() => {
    if (!showHint) return
    const timer = window.setTimeout(() => setShowHint(false), 6000)
    return () => window.clearTimeout(timer)
  }, [showHint])

  if (resume.available) {
    return (
      <Button as="a" href={resume.file} download variant="ghost" size="lg">
        <Download className="size-4" aria-hidden="true" />
        {resume.label}
      </Button>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowHint((value) => !value)}
        aria-expanded={showHint}
        className="inline-flex h-12 items-center gap-2 rounded-xl border border-dashed border-line-2 px-6 text-[15px] font-medium tracking-tight text-muted/80 transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
      >
        <Download className="size-4" aria-hidden="true" />
        {resume.label}
        <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em]">
          soon
        </span>
      </button>

      <AnimatePresence>
        {showHint ? (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[calc(100%+0.6rem)] z-20 w-64 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[12.5px] leading-relaxed text-muted shadow-lift"
          >
            Resume not uploaded yet. Add the file at{' '}
            <code className="font-mono text-[11.5px] text-accent">public{resume.file}</code> and set{' '}
            <code className="font-mono text-[11.5px] text-accent">available: true</code> in{' '}
            <code className="font-mono text-[11.5px] text-accent">src/data/profile.js</code>.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}