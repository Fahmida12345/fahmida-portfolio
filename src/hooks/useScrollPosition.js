import { useEffect, useState } from 'react'

export function useScrollPosition(threshold = 24) {
  const [state, setState] = useState({ y: 0, compact: false, progress: 0 })

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setState({
        y,
        compact: y > threshold,
        progress: scrollable > 0 ? Math.min(y / scrollable, 1) : 0,
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return state
}