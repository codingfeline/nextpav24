'use client'

import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import {
  FaCocktail,
  FaConciergeBell,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaUtensils,
} from 'react-icons/fa'

type ViewBox = [number, number, number, number]
type Circle = {
  cx: number
  cy: number
  r: number
  fill: string
  label?: string
  sublabels?: string[] // smaller lines under the label
  icon?: IconType // icon under the label (and any smaller lines)
}

// Circle layout from Home.svg (nextnazs24/public)
const CENTER: Circle = {
  cx: 2339.5,
  cy: 2417.5,
  r: 872.5,
  fill: '#DBEF98',
  label: 'Home',
  sublabels: ['Book a table', 'Opening Hours'],
  icon: FaHome,
}
const SMALL_R = 484
const SMALL_OPACITY = 0.75 // lets the background photo show through
const smallStart: Omit<Circle, 'r'>[] = [
  { cx: 2340, cy: 763, fill: '#DB7C7C', label: 'Main Menu', icon: FaUtensils },
  {
    cx: 3875,
    cy: 2029,
    fill: '#6788B3',
    label: 'Contact Us',
    icon: FaEnvelope,
  },
  {
    cx: 3391,
    cy: 3805,
    fill: '#E2B5F2',
    label: 'Locate Us',
    icon: FaMapMarkerAlt,
  },
  { cx: 1288, cy: 3805, fill: '#9FEDF3', label: 'Drinks', icon: FaCocktail },
  {
    cx: 804,
    cy: 1934,
    fill: '#E8884C',
    label: 'Set Menus',
    icon: FaConciergeBell,
  },
]

// Each small circle's orbit (distance + starting angle around the big one)
const orbits = smallStart.map(({ cx, cy, ...rest }) => {
  const dx = cx - CENTER.cx
  const dy = cy - CENTER.cy
  return { dist: Math.hypot(dx, dy), angle0: Math.atan2(dy, dx), ...rest }
})

// Frame the full sweep of every orbit, so no circle is ever clipped
const REACH = Math.max(...orbits.map(o => o.dist)) + SMALL_R
const FULL_VIEW: ViewBox = [CENTER.cx - REACH, CENTER.cy - REACH, 2 * REACH, 2 * REACH]

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

// Geometry of a label on its circle's border: the text's centreline radius,
// its font size, and half the text's length expressed as an angle
const arcMetrics = (r: number, label: string) => {
  const R = r * (1 - ARC_FONT * 0.75)
  const fs = r * ARC_FONT
  return { R, fs, halfLen: (label.length * fs * 0.65) / 2 / R }
}

// Sizes and vertical positions (relative to the circle's centre) of a circle's
// label, its smaller lines and its icon, arranged so the whole block is centred
const labelLayout = (i: number, sublabels: string[] = [], hasIcon = false) => {
  const labelSize = i === 0 ? 300 : 140
  const subSize = labelSize * 0.45
  const iconSize = labelSize * 1.1
  // Each smaller line's offset below the label's centre
  const below = (line: number) => labelSize * 0.6 + subSize * (0.6 + line * 1.3)
  const top = -labelSize / 2
  const textBottom = sublabels.length
    ? below(sublabels.length - 1) + subSize / 2
    : labelSize / 2
  const iconTop = textBottom + labelSize * 0.2 // small gap above the icon
  const bottom = hasIcon ? iconTop + iconSize : textBottom
  const shift = -(top + bottom) / 2 // move everything up so the block is centred
  return {
    labelSize,
    subSize,
    iconSize,
    labelY: shift,
    subY: (line: number) => shift + below(line),
    iconY: shift + iconTop, // top edge of the icon
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
    const x =
      k < 1e-9 ? mx + t * Math.cos(phi) : mx + (Math.sin(phi + k * t) - Math.sin(phi)) / k
    const y =
      k < 1e-9 ? my + t * Math.sin(phi) : my - (Math.cos(phi + k * t) - Math.cos(phi)) / k
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return `M ${pts.join(' L ')}`
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const positionsAt = (rotation: number): Circle[] => [
  CENTER,
  ...orbits.map(({ dist, angle0, ...rest }) => ({
    cx: CENTER.cx + dist * Math.cos(angle0 + rotation),
    cy: CENTER.cy + dist * Math.sin(angle0 + rotation),
    r: SMALL_R,
    ...rest,
  })),
]

// rv: radius (in SVG units) of the edge the label hugs. Normally the circle's
// own edge; on mobile, where the circle overflows the screen, the screen's edge.
type ArcState = { index: number; p: number; alpha: number; rv: number }

// Phones: a zoomed circle fills the whole screen rather than its width
const MOBILE_QUERY = '(max-width: 767px)'
// How far past the screen's corners the circle reaches on mobile, so its
// border stays well out of view (1 = exactly touching the corners)
const MOBILE_OVERSHOOT = 1.25

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
  // Whether the current zoom fills the whole screen (mobile)
  const [fillScreen, setFillScreen] = useState(false)

  // Orbit while nothing is selected; pauses (keeping its angle) once clicked
  useEffect(() => {
    if (selected !== null) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      setRotation(a => (a + (dt / ORBIT_PERIOD_MS) * 2 * Math.PI) % (2 * Math.PI))
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
  const animateArc = useCallback(
    (index: number, to: 0 | 1, alpha: number, rv: number) => {
      cancelAnimationFrame(arcFrameRef.current)
      const from = arcRef.current?.index === index ? arcRef.current.p : 0
      const start = performance.now()
      const step = (now: number) => {
        const t = easeInOutCubic(Math.min((now - start) / ZOOM_MS, 1))
        const next =
          t < 1 || to === 1 ? { index, p: from + (to - from) * t, alpha, rv } : null
        arcRef.current = next
        setArc(next)
        if (t < 1) arcFrameRef.current = requestAnimationFrame(step)
      }
      arcFrameRef.current = requestAnimationFrame(step)
    },
    [],
  )

  const zoomOut = useCallback(() => {
    setSelected(null)
    animateTo(FULL_VIEW)
    if (arcRef.current) {
      const { index, alpha, rv } = arcRef.current
      animateArc(index, 0, alpha, rv)
    }
  }, [animateTo, animateArc])

  const zoomIn = (index: number) => {
    const svg = svgRef.current
    if (!svg) return
    const { cx, cy, r } = circles[index]
    // When zoomed the SVG is exactly one viewport tall. Desktop: the circle's
    // diameter spans the full width. Mobile: zoom further, until the circle
    // covers the whole screen (its diameter matches the screen's diagonal).
    const W = svg.clientWidth
    const H = window.innerHeight
    const mobile = window.matchMedia(MOBILE_QUERY).matches
    const unitsPerPx = mobile
      ? (2 * r) / (Math.hypot(W, H) * MOBILE_OVERSHOOT)
      : (2 * r) / W
    const w = W * unitsPerPx
    const h = H * unitsPerPx
    // Edge the label hugs: the circle's, or (mobile) the screen's left edge
    const rv = mobile ? w / 2 : r
    setSelected(index)
    setFillScreen(mobile)
    animateTo([cx - w / 2, cy - h / 2, w, h], () => setZoomDone(true))
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
      const { R, fs, halfLen } = arcMetrics(rv, label)
      const visible = Math.asin(Math.min(1, (h / 2 - fs) / R)) // highest on-screen angle
      // On mobile the content is nearly full width, so the label sits due west,
      // in the narrow strip left of the content, rather than up at north-west
      const alpha = mobile ? 0 : Math.max(0, Math.min(ARC_LABEL_ANGLE, visible - halfLen))
      animateArc(index, 1, alpha, rv)
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
          // dvh = the visible height on mobile (100vh includes the area under the
          // browser's address bar), matching window.innerHeight used for the zoom
          selected === null ? 'h-auto max-h-screen' : 'h-dvh'
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
        {circles.map(({ cx, cy, label, sublabels, icon }, i) => {
          if (!label) return null
          const { labelSize, labelY } = labelLayout(i, sublabels, !!icon)

          // Zoomed in: the label glides onto the left border, along the arc
          if (arc?.index === i) {
            const { p, rv } = arc
            const fontSize = labelSize + (rv * ARC_FONT - labelSize) * p // shrink to fit the border
            const R = rv * (1 - ARC_FONT * 0.75) // text's centreline, just inside the edge
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
        {circles.flatMap(({ cx, cy, sublabels = [], icon }, i) => {
          const { subSize: fontSize, subY } = labelLayout(i, sublabels, !!icon)
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
        {/* Icon under a circle's words. When zoomed in it glides onto the
            border with the label, sitting just before the word on the arc and
            turned to follow the curve like the letters. */}
        {circles.map(({ cx, cy, sublabels, icon: Icon, label = '' }, i) => {
          if (!Icon) return null
          const { iconSize, iconY } = labelLayout(i, sublabels, true)
          // At rest: centred under the words
          let x = cx
          let y = cy + iconY + iconSize / 2
          let size = iconSize
          let rotate = 0
          if (arc?.index === i) {
            const { p, alpha, rv } = arc
            const { R, fs, halfLen } = arcMetrics(rv, label)
            const endSize = fs * 1.1
            // Angle (above due west) of the icon's centre: below the word's start
            const a = alpha - halfLen - (fs * 0.5 + endSize / 2) / R
            const endX = cx - R * Math.cos(a)
            const endY = cy - R * Math.sin(a)
            x += (endX - x) * p
            y += (endY - y) * p
            size += (endSize - size) * p
            rotate = (-90 + (a * 180) / Math.PI) * p
          }
          return (
            <g
              key={`${label}-icon`}
              transform={`translate(${x} ${y}) rotate(${rotate})`}
              className="pointer-events-none"
            >
              <Icon x={-size / 2} y={-size / 2} size={size} color="#0C0C0C" aria-hidden />
            </g>
          )
        })}
      </svg>

      {/* Once zoomed in, show that circle's content (if any). Desktop: clipped to
          the circle's shape (it spans the full width, so its radius is 50vw).
          Mobile: the circle covers the whole screen, so no clipping is needed. */}
      {panel && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-[fadeIn_400ms_ease-out]"
          style={{ clipPath: fillScreen ? 'none' : 'circle(50vw at 50% 50%)' }}
        >
          {/* Mobile: nearly full width, leaving a strip on the left for the label */}
          <div
            className={`relative ${
              fillScreen ? 'w-[91vw] ml-[7vw] mr-[2vw]' : 'w-[min(70vw,64rem)]'
            }`}
          >
            {/* Scrolling content; top padding leaves room for the close button */}
            <div
              className={`${
                fillScreen ? 'max-h-[85dvh]' : 'max-h-[min(85vh,85vw)]'
              } overflow-y-auto overscroll-contain ${fillScreen ? 'px-1 pb-2' : 'p-4'} pt-14`}
            >
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
