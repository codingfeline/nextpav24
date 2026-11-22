'use client'

import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

type ViewBox = [number, number, number, number]
type Circle = {
  cx: number
  cy: number
  r: number
  fill: string
  label?: string
  sublabels?: string[] // smaller lines under the label
}

// Circle layout from Home.svg (nextnazs24/public)
const CENTER: Circle = {
  cx: 2339.5,
  cy: 2417.5,
  r: 872.5,
  fill: '#DBEF98',
  label: 'Home',
  sublabels: ['Book a table', 'Opening Hours'],
}
const SMALL_R = 484
const SMALL_OPACITY = 0.75 // lets the background photo show through
const smallStart: Omit<Circle, 'r'>[] = [
  { cx: 2340, cy: 763, fill: '#DB7C7C', label: 'Main Menu' },
  { cx: 3875, cy: 2029, fill: '#6788B3', label: 'Contact Us' },
  { cx: 3391, cy: 3805, fill: '#E2B5F2', label: 'Locate Us' },
  { cx: 1288, cy: 3805, fill: '#9FEDF3', label: 'Drinks' },
  { cx: 804, cy: 1934, fill: '#E8884C', label: 'Set Menus' },
]

// Each small circle's orbit (distance + starting angle around the big one)
const orbits = smallStart.map(({ cx, cy, fill, label }) => {
  const dx = cx - CENTER.cx
  const dy = cy - CENTER.cy
  return { dist: Math.hypot(dx, dy), angle0: Math.atan2(dy, dx), fill, label }
})

// Frame the full sweep of every orbit, so no circle is ever clipped
const REACH = Math.max(...orbits.map((o) => o.dist)) + SMALL_R
const FULL_VIEW: ViewBox = [
  CENTER.cx - REACH,
  CENTER.cy - REACH,
  2 * REACH,
  2 * REACH,
]

// Labels that move onto the circle's left border (along the arc) when zoomed in
const ARC_LABELS = new Set([
  'Home',
  'Main Menu',
  'Set Menus',
  'Drinks',
  'Locate Us',
  'Contact Us',
])

const ZOOM_MS = 700
const ORBIT_PERIOD_MS = 60_000 // one full revolution per minute

// Scale around each circle's own centre: 90% at rest, 100% on hover
const circleHover =
  'origin-center [transform-box:fill-box] scale-90 hover:scale-100 transition-transform duration-300 ease-out cursor-pointer'

// Where a border label aims to sit, measured up from due west (π/4 = north-west)
const ARC_LABEL_ANGLE = Math.PI / 4
// Size of a border label, relative to its circle's radius
const ARC_FONT = 0.08

// Sizes and vertical positions (relative to the circle's centre) of a circle's
// label and its smaller lines, arranged so the whole block is centred
const labelLayout = (i: number, sublabels: string[] = []) => {
  const labelSize = i === 0 ? 300 : 140
  const subSize = labelSize * 0.45
  // Each smaller line's offset below the label's centre
  const below = (line: number) => labelSize * 0.6 + subSize * (0.6 + line * 1.3)
  const top = -labelSize / 2
  const bottom = sublabels.length ? below(sublabels.length - 1) + subSize / 2 : labelSize / 2
  const shift = -(top + bottom) / 2 // move everything up so the block is centred
  return {
    labelSize,
    subSize,
    labelY: shift,
    subY: (line: number) => shift + below(line),
  }
}

// Path for a label that morphs (p: 0 → 1) from a straight line across the
// circle (at height cy + startDy) onto the circle's arc, centred `alpha` above due west and
// reading clockwise (upward). It interpolates the path's midpoint, direction
// and curvature, then traces a constant-curvature curve through that point.
const labelArcPath = (
  cx: number,
  cy: number,
  R: number,
  p: number,
  alpha: number,
  startDy: number,
) => {
  const theta = Math.PI + alpha // final midpoint's angle around the centre
  const mx = cx + R * Math.cos(theta) * p // midpoint: centre → point on the arc
  const my = cy + startDy + (R * Math.sin(theta) - startDy) * p
  const phi = (-Math.PI / 2 + alpha) * p // direction: rightward → along the arc
  const k = p / R // curvature: straight → the arc's
  const half = (R * Math.PI) / 4 // half of a 90° arc's length
  const pts: string[] = []
  for (let j = 0; j <= 32; j++) {
    const t = -half + (2 * half * j) / 32
    const x = k < 1e-9 ? mx + t * Math.cos(phi) : mx + (Math.sin(phi + k * t) - Math.sin(phi)) / k
    const y = k < 1e-9 ? my + t * Math.sin(phi) : my - (Math.cos(phi + k * t) - Math.cos(phi)) / k
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return `M ${pts.join(' L ')}`
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const positionsAt = (rotation: number): Circle[] => [
  CENTER,
  ...orbits.map(({ dist, angle0, fill, label }) => ({
    cx: CENTER.cx + dist * Math.cos(angle0 + rotation),
    cy: CENTER.cy + dist * Math.sin(angle0 + rotation),
    r: SMALL_R,
    fill,
    label,
  })),
]

type ArcState = { index: number; p: number; alpha: number }

type Props = {
  // Content to show inside a circle once zoomed in, keyed by circle label
  panels?: Record<string, ReactNode>
}

export default function NewHome({ panels = {} }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const viewRef = useRef<ViewBox>(FULL_VIEW)
  const zoomFrameRef = useRef<number>(0)
  const [viewBox, setViewBox] = useState<ViewBox>(FULL_VIEW)
  const [selected, setSelected] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [zoomDone, setZoomDone] = useState(false)
  // Which label is (or is moving) on its circle's border, and how far along
  const [arc, setArc] = useState<ArcState | null>(null)
  const arcRef = useRef<ArcState | null>(null)
  const arcFrameRef = useRef<number>(0)

  // Orbit while nothing is selected; pauses (keeping its angle) once clicked
  useEffect(() => {
    if (selected !== null) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      setRotation((a) => (a + (dt / ORBIT_PERIOD_MS) * 2 * Math.PI) % (2 * Math.PI))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [selected])

  const circles = positionsAt(rotation)

  // Smoothly animate the viewBox from wherever it is now to `target`
  const animateTo = useCallback((target: ViewBox, onDone?: () => void) => {
    cancelAnimationFrame(zoomFrameRef.current)
    setZoomDone(false)
    const from = viewRef.current
    const start = performance.now()
    const step = (now: number) => {
      const t = easeInOutCubic(Math.min((now - start) / ZOOM_MS, 1))
      const next = from.map((v, i) => v + (target[i] - v) * t) as ViewBox
      viewRef.current = next
      setViewBox(next)
      if (t < 1) zoomFrameRef.current = requestAnimationFrame(step)
      else onDone?.()
    }
    zoomFrameRef.current = requestAnimationFrame(step)
  }, [])

  // Animate a label between the centre (p = 0) and the border (p = 1),
  // in step with the zoom
  const animateArc = useCallback((index: number, to: 0 | 1, alpha: number) => {
    cancelAnimationFrame(arcFrameRef.current)
    const from = arcRef.current?.index === index ? arcRef.current.p : 0
    const start = performance.now()
    const step = (now: number) => {
      const t = easeInOutCubic(Math.min((now - start) / ZOOM_MS, 1))
      const next = t < 1 || to === 1 ? { index, p: from + (to - from) * t, alpha } : null
      arcRef.current = next
      setArc(next)
      if (t < 1) arcFrameRef.current = requestAnimationFrame(step)
    }
    arcFrameRef.current = requestAnimationFrame(step)
  }, [])

  const zoomOut = useCallback(() => {
    setSelected(null)
    animateTo(FULL_VIEW)
    if (arcRef.current) animateArc(arcRef.current.index, 0, arcRef.current.alpha)
  }, [animateTo, animateArc])

  const zoomIn = (index: number) => {
    const svg = svgRef.current
    if (!svg) return
    const { cx, cy, r } = circles[index]
    // When zoomed the SVG is exactly one viewport tall; match the viewBox to
    // its aspect ratio so the circle's diameter spans the full width.
    const aspect = window.innerHeight / svg.clientWidth
    const w = 2 * r
    const h = w * aspect
    setSelected(index)
    animateTo([cx - r, cy - h / 2, w, h], () => setZoomDone(true))
    // Snap any other label back to the centre, then move this one if needed
    if (arcRef.current && arcRef.current.index !== index) {
      cancelAnimationFrame(arcFrameRef.current)
      arcRef.current = null
      setArc(null)
    }
    const label = circles[index].label
    if (label && ARC_LABELS.has(label)) {
      // Aim for north-west, but on wide screens the top of the circle is cut
      // off, so lower the label until all of it stays on screen
      const R = r * (1 - ARC_FONT * 0.75)
      const fs = r * ARC_FONT
      const halfLen = (label.length * fs * 0.65) / 2 / R // half the text, as an angle
      const visible = Math.asin(Math.min(1, (h / 2 - fs) / R)) // highest on-screen angle
      const alpha = Math.max(0, Math.min(ARC_LABEL_ANGLE, visible - halfLen))
      animateArc(index, 1, alpha)
    }
    svg.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Escape zooms back out
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && zoomOut()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(zoomFrameRef.current)
      cancelAnimationFrame(arcFrameRef.current)
    }
  }, [zoomOut])

  const selectedLabel = selected === null ? undefined : circles[selected].label
  const panel = zoomDone && selectedLabel ? panels[selectedLabel] : null

  return (
    // Break out of the layout's Radix <Container> so the black background
    // spans the full viewport width (70% black, so the background photo shows through; .newHomeBg swaps that photo, see globals.css).
    <div className="newHomeBg relative w-screen ml-[calc(50%-50vw)] bg-[#0C0C0C]/70">
      <svg
        ref={svgRef}
        viewBox={viewBox.join(' ')}
        preserveAspectRatio="xMidYMid meet"
        className={`block w-full mx-auto ${
          selected === null ? 'h-auto max-h-screen' : 'h-screen'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Home"
      >
        {/* Invisible full-area click target: click the background to zoom out */}
        <rect
          x="-10000"
          y="-10000"
          width="30000"
          height="30000"
          fill="transparent"
          onClick={zoomOut}
        />
        {circles.map(({ cx, cy, r, fill }, i) => (
          <circle
            key={fill}
            cx={cx}
            cy={cy}
            r={r}
            fill={fill}
            // Index 0 is the big centre circle: solid, except when zoomed in,
            // where it's see-through like the small ones (fading over the zoom)
            style={{
              fillOpacity: i === 0 && selected !== 0 ? 1 : SMALL_OPACITY,
              transition: `transform 300ms ease-out, fill-opacity ${ZOOM_MS}ms ease-in-out`,
            }}
            className={`${circleHover} ${selected === i ? '!scale-100' : ''}`}
            onClick={() => (selected === i ? zoomOut() : zoomIn(i))}
          />
        ))}
        {/* Circle labels follow their circle as it orbits; they ignore the
            mouse so hover/click reach the circle underneath */}
        {circles.map(({ cx, cy, r, label, sublabels }, i) => {
          if (!label) return null
          const { labelSize, labelY } = labelLayout(i, sublabels)

          // Zoomed in: the label glides onto the left border, along the arc
          if (arc?.index === i) {
            const { p } = arc
            const fontSize = labelSize + (r * ARC_FONT - labelSize) * p // shrink to fit the border
            const R = r * (1 - ARC_FONT * 0.75) // text's centreline, just inside the border
            const pathId = `label-arc-${i}`
            return (
              <g key={label} className="pointer-events-none select-none">
                <path id={pathId} d={labelArcPath(cx, cy, R, p, arc.alpha, labelY)} />
                <text
                  fontSize={fontSize}
                  fontWeight={600}
                  letterSpacing={fontSize * 0.06}
                  dominantBaseline="central"
                  fill="#0C0C0C"
                >
                  <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                    {label}
                  </textPath>
                </text>
              </g>
            )
          }

          return (
            <text
              key={label}
              x={cx}
              y={cy + labelY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={labelSize}
              fontWeight={600}
              letterSpacing={i === 0 ? 20 : 8}
              fill="#0C0C0C"
              className="pointer-events-none select-none"
            >
              {label}
            </text>
          )
        })}
        {/* Smaller lines under a centred label; they fade out as the label
            moves to the border when zoomed in */}
        {circles.flatMap(({ cx, cy, sublabels = [] }, i) => {
          const { subSize: fontSize, subY } = labelLayout(i, sublabels)
          return sublabels.map((sublabel, line) => (
            <text
              key={sublabel}
              x={cx}
              y={cy + subY(line)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight={500}
              letterSpacing={fontSize * 0.08}
              fill="#0C0C0C"
              opacity={arc?.index === i ? 1 - arc.p : 1}
              className="pointer-events-none select-none"
            >
              {sublabel}
            </text>
          ))
        })}
      </svg>

      {/* Once zoomed in, show that circle's content (if any), clipped to the
          circle's shape. The circle spans the full width, so its radius is 50vw. */}
      {panel && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-[fadeIn_400ms_ease-out]"
          style={{ clipPath: 'circle(50vw at 50% 50%)' }}
        >
          <div className="relative w-[min(70vw,64rem)]">
            {/* Scrolling content; top padding leaves room for the close button */}
            <div className="max-h-[min(85vh,85vw)] overflow-y-auto overscroll-contain p-4 pt-14">
              {panel}
            </div>
            {/* Close button lives outside the scrolling area and above it, so
                scrolled content can never cover it or swallow its clicks */}
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Close"
              className="absolute top-2 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#0C0C0C]/80 text-2xl leading-none text-white hover:bg-[#0C0C0C]"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
