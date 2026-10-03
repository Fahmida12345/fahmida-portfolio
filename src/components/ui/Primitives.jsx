import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

/**
 * Scroll-triggered reveal. Direction is expressed as a small offset rather
 * than a large travel distance so the page never feels like it is sliding.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
  once = true,
  amount = 0.25,
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleId,
  children,
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
          {eyebrow}
        </span>
      ) : null}

      <h2 id={titleId} className="text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>

      {description ? <p className="text-[15px] leading-relaxed text-muted sm:text-base">{description}</p> : null}

      {children}
    </Reveal>
  )
}

export function Badge({ children, className, tone = 'default' }) {
  const tones = {
    default: 'border-line bg-surface-2 text-muted',
    accent: 'border-accent/25 bg-accent-soft text-accent',
    solid: 'border-transparent bg-accent text-accent-ink',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight',
        tones[tone] ?? tones.default,
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Section wrapper providing consistent vertical rhythm and landmark semantics. */
export function Section({ id, className, children, labelledBy, ...props }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}