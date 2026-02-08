import { useScrollReveal } from './useScrollReveal'

export default function Reveal({
  children,
  delay = 'delay-400',
}: {
  children: React.ReactNode
  delay?: string
}) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 opacity-0 translate-y-10 ${delay}`}
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
