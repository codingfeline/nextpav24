'use client'
import { useScrollReveal } from './useScrollReveal'

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 opacity-0 translate-y-10 `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Usage:
{
  /* <Reveal delay="delay-150">
  <div>Content here</div>
</Reveal> */
}
