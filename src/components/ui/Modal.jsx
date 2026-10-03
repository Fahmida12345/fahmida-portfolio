import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { cn } from '../../lib/cn'
import { IconButton } from './Button'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, subtitle, children, labelClose = 'Close dialog' }) {
  const panelRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const titleId = useId()
  const reduceMotion = useReducedMotion()

  useLockBodyScroll(open)

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes?.length) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return

    restoreFocusRef.current = document.activeElement
    const timer = window.setTimeout(() => {
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      ;(nodes?.[0] ?? panelRef.current)?.focus()
    }, 40)

    return () => {
      window.clearTimeout(timer)
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus()
    }
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative flex max-h-[92dvh] w-full flex-col overflow-hidden border border-line bg-canvas shadow-lift',
              'rounded-t-2xl sm:max-w-3xl sm:rounded-2xl',
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-lg sm:text-xl">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <IconButton label={labelClose} onClick={onClose} className="shrink-0">
                <X className="size-4" />
              </IconButton>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}