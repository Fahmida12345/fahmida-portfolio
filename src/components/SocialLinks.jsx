import { GithubIcon, LinkedinIcon, TechIcon } from './icons/TechIcon'
import { cn } from '../lib/cn'
import { socials } from '../data/profile'

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: ({ className }) => <TechIcon name="mail" className={className} />,
}

/**
 * Renders verified profiles only by default. Pass showPending to also surface
 * channels whose URL is still missing, shown as non-navigating placeholders so
 * no unverified link is ever published.
 */
export function SocialLinks({ className, size = 'md', showLabels = false, showPending = false }) {
  const boxSize = size === 'sm' ? 'size-9' : 'size-10'
  const glyph = size === 'sm' ? 'size-4' : 'size-[18px]'
  const visible = socials.filter((social) => showPending || social.href)

  return (
    <ul className={cn('flex items-center gap-2.5', className)}>
      {visible.map((social) => {
        const Icon = ICONS[social.icon]
        const pending = !social.href

        const body = (
          <>
            <Icon
              className={cn(
                glyph,
                'shrink-0 transition-transform duration-200',
                !pending && 'group-hover:-translate-y-0.5',
              )}
            />
            {showLabels ? (
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.14em] text-muted/80">
                  {social.label}
                </span>
                <span className="block truncate font-mono text-[12px] text-ink">{social.handle}</span>
              </span>
            ) : (
              <span className="sr-only">
                {social.label}
                {pending ? ' — profile link not added yet' : ` — ${social.handle}`}
              </span>
            )}
          </>
        )

        const shared = cn(
          'group inline-flex items-center gap-2.5 rounded-xl border text-muted',
          showLabels ? 'h-11 px-3.5 text-sm' : cn(boxSize, 'justify-center'),
        )

        return (
          <li key={social.id}>
            {pending ? (
              <span
                title={`Add the ${social.label} URL in src/data/profile.js`}
                className={cn(
                  shared,
                  'cursor-not-allowed border-dashed border-line-2 opacity-60',
                  showLabels && 'border-dashed',
                )}
              >
                {body}
              </span>
            ) : (
              <a
                href={social.href}
                target={social.id === 'email' ? undefined : '_blank'}
                rel={social.id === 'email' ? undefined : 'noreferrer noopener'}
                className={cn(
                  shared,
                  'border-line transition-colors duration-200 hover:border-accent/50 hover:text-accent',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                )}
              >
                {body}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}