// providers/CookieConsentProvider.tsx
'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type ConsentState = {
  analytics: boolean
  externalMedia: boolean
}

type CookieConsentContextType = {
  consent: ConsentState
  updateConsent: (updates: Partial<ConsentState>) => void
  hasDecided: boolean
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

const STORAGE_KEY = 'cookie_consent'
const ANON_ID_KEY = 'anon_consent_id'

function getAnonymousId() {
  if (typeof window === 'undefined') return null
  let id = localStorage.getItem(ANON_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(ANON_ID_KEY, id)
  }
  return id
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    externalMedia: false,
  })
  const [hasDecided, setHasDecided] = useState(false)

  // Load from storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setConsent(parsed)
      setHasDecided(true)
    }
  }, [])

  const updateConsent = (updates: Partial<ConsentState>) => {
    setConsent(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setHasDecided(true)

      const anonymousId = getAnonymousId()

      fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymousId,
          analytics: next.analytics,
          externalMedia: next.externalMedia,
        }),
      })

      return next
    })
  }

  return (
    <CookieConsentContext.Provider value={{ consent, updateConsent, hasDecided }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside provider')
  return ctx
}
