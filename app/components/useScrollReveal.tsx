'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        } else {
          entry.target.classList.add('opacity-0', 'translate-y-10')
          entry.target.classList.remove('opacity-100', 'translate-y-0')
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [])

  return elementRef
}
