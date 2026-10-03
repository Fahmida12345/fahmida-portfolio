import { useEffect, useState } from 'react'

export function useScrollSpy(ids, offset = 140) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const marker = window.scrollY + offset
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.offsetTop <= marker) current = id
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (scrolledToBottom) current = ids[ids.length - 1]

      setActiveId(current)
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
  }, [ids, offset])

  return activeId
}