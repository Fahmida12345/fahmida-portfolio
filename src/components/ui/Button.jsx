import { cn } from '../../lib/cn'

const VARIANTS = {
  primary:
    'bg-accent text-accent-ink shadow-[0_10px_30px_-12px_var(--c-glow)] hover:brightness-110',
  secondary:
    'bg-surface text-ink border border-line-2 hover:border-accent/60 hover:bg-surface-2',
  ghost: 'text-ink border border-line hover:border-line-2 hover:bg-surface-2',
  outline: 'border border-line-2 text-ink hover:border-accent/60 hover:text-accent',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
}

const BASE =
  'group/btn relative inline-flex select-none items-center justify-center rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-55'

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className)}
      {...props}
    >
      {children}
    </Component>
  )
}

/** Compact icon-only button used for social and theme controls. */
export function IconButton({ label, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl border border-line text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}