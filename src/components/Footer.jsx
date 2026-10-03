import { ArrowUp } from 'lucide-react'
import { navigation, profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-soft">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-accent-soft font-display text-[13px] font-bold text-accent">
                FY
              </span>
              <div className="leading-tight">
                <p className="font-display text-[15px] font-semibold text-ink">{profile.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {profile.role}
                </p>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-muted">
              Building thoughtful web experiences with modern technologies.
            </p>
            <SocialLinks size="sm" className="mt-1" />
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[14px] text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Get in touch
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="max-w-[16rem] break-words text-[14px] text-ink transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {profile.email}
            </a>
            <p className="font-mono text-[12px] text-muted">{profile.location}</p>
            <a
              href="#home"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-[13px] font-medium text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowUp className="size-3.5" />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-muted">
            &copy; {CURRENT_YEAR} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[12px] text-muted/70">
            Built with React, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}