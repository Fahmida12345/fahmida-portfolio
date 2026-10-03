import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigation, profile } from '../data/profile'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { cn } from '../lib/cn'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ui/ThemeToggle'

const SECTION_IDS = navigation.map((item) => item.id)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { compact, progress } = useScrollPosition(40)
  const activeId = useScrollSpy(SECTION_IDS)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const { body } = document
    const previous = body.style.overflow
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        compact ? 'py-2' : 'py-4',
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className={cn(
            'relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border transition-all duration-300',
            compact
              ? 'border-line bg-canvas/80 px-3 py-2 shadow-card backdrop-blur-xl sm:px-4'
              : 'border-transparent bg-transparent px-1 py-2',
          )}
        >
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="relative grid size-9 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent-soft font-display text-[13px] font-bold text-accent">
              FY
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-lg bg-accent/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate font-display text-[15px] font-semibold tracking-tight text-ink">
                {profile.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {profile.role}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-200',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg border border-line bg-surface-2"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <SocialLinks size="sm" />
              <span aria-hidden="true" className="h-6 w-px bg-line" />
            </div>
            <ThemeToggle className="size-9" />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={cn(
                'inline-grid size-9 place-items-center rounded-lg border border-line text-ink transition-colors duration-200 hover:border-accent/50 hover:text-accent',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden',
              )}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70 transition-opacity duration-300',
              compact ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transform: `scaleX(${progress})` }}
          />
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 w-full max-w-6xl px-4 sm:px-6 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-canvas/95 p-2 shadow-lift backdrop-blur-xl">
              <ul className="flex flex-col">
                {navigation.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduceMotion ? 0 : 0.04 * index + 0.05, duration: 0.25 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-200',
                          isActive
                            ? 'bg-accent-soft text-accent'
                            : 'text-muted hover:bg-surface-2 hover:text-ink',
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-[11px] text-muted/70">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-1 pt-3">
                <SocialLinks size="sm" />
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-ink transition-opacity hover:opacity-90"
                >
                  Let&rsquo;s Connect
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}