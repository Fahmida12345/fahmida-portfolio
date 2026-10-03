import { useState } from 'react'
import { profile } from '../data/profile'
import { TechIcon } from './icons/TechIcon'
import { cn } from '../lib/cn'

const HIGHLIGHTS = [
  'Full-stack MERN applications',
  'E-commerce systems & storefronts',
  'Authentication & admin dashboards',
  'REST APIs & payment integration',
]

/**
 * Renders the profile photo when one is present in /public, and falls back to a
 * branded monogram card if the file is missing so the layout never breaks.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false)
  const { portrait } = profile

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2rem] bg-accent/10 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-card border border-line bg-surface-2 shadow-lift">
        <div className="aspect-[4/5] w-full">
          {portrait?.src && !failed ? (
            <img
              src={portrait.src}
              alt={portrait.alt}
              loading="lazy"
              decoding="async"
              width={460}
              height={460}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent-soft via-surface to-surface-2">
              <div className="flex flex-col items-center gap-4 px-6 text-center">
                <span className="grid size-20 place-items-center rounded-2xl border border-accent/30 bg-canvas/70 font-display text-2xl font-bold text-accent">
                  FY
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-display text-[15px] font-semibold text-ink">{profile.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <TechIcon name="github" className="size-3.5" />
            @Fahmida12345
          </span>
        </div>
      </div>

      <ul className={cn('mt-5 grid gap-2.5 sm:grid-cols-2')}>
        {HIGHLIGHTS.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-muted">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}