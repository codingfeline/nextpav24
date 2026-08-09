'use client'

import { useEffect, useState } from 'react'

type ThemeId = 'warm' | 'blue' | 'green' | 'pink' | 'gray'

const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: 'warm', label: 'Warm', swatch: '#e19d0b' },
  { id: 'blue', label: 'Blue', swatch: '#2c6eb5' },
  { id: 'green', label: 'Green', swatch: '#2f8f57' },
  { id: 'pink', label: 'Pink', swatch: '#cf4f8d' },
  { id: 'gray', label: 'Gray', swatch: '#5b6470' },
]

// Fired whenever any ThemeChooser changes the theme, so every instance
// (footer + mobile menu) keeps its active swatch in sync.
const THEME_EVENT = 'themechange'

function readTheme(): ThemeId {
  const current = document.documentElement.dataset.theme
  return THEMES.some(t => t.id === current) ? (current as ThemeId) : 'warm'
}

export default function ThemeChooser() {
  const [theme, setTheme] = useState<ThemeId>('warm')

  useEffect(() => {
    const sync = () => setTheme(readTheme())
    sync() // pick up the theme the inline script applied before paint
    window.addEventListener(THEME_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(THEME_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const choose = (next: ThemeId) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    // Notify every ThemeChooser instance (including this one) to re-sync.
    window.dispatchEvent(new Event(THEME_EVENT))
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Theme</span>
      <div className="flex items-center gap-1">
        {THEMES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => choose(t.id)}
            title={`${t.label} theme`}
            aria-label={`${t.label} theme`}
            aria-pressed={theme === t.id}
            style={{ backgroundColor: t.swatch }}
            className={`!w-6 !h-6 !p-0 !mt-0 rounded-full border-2 transition-transform hover:scale-110 ${
              theme === t.id ? 'border-brown scale-110' : 'border-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
