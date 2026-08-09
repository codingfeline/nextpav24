'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'
import Script from 'next/script'
import { useState } from 'react'

const GA_ID = 'G-1N4HEH7FZT'

export default function CookieConsentManager() {
  const { consent, updateConsent, hasDecided } = useCookieConsent()
  const [showModal, setShowModal] = useState(false)

  const acceptAll = () => updateConsent({ analytics: true, externalMedia: true })
  const rejectAll = () => updateConsent({ analytics: false, externalMedia: false })

  return (
    <>
      {/* --- Google Analytics --- */}
      {consent.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* --- Initial Banner --- */}
      {!hasDecided && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-1000">
          <p>
            We use cookies for analytics and to embed external content such as Google
            Maps.
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <button onClick={acceptAll} className="bg-green-400 px-4 py-2 cursor-pointer">
              Accept all
            </button>
            <button
              onClick={rejectAll}
              className="bg-red-500 text-white px-4 py-2 cursor-pointer"
            >
              Reject optional
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-200 px-4 py-2 cursor-pointer"
            >
              Settings
            </button>
          </div>
        </div>
      )}

      {/* --- Manage Cookies Button --- */}
      {hasDecided && (
        <a onClick={() => setShowModal(true)} className="links p-2 cursor-pointer">
          Cookie settings
        </a>
      )}

      {/* --- Modal --- */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-1001 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-8 w-[90%] max-w-105 rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl">Cookie Preferences</h2>
            <div className="flex flex-col gap-2 mt-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked disabled /> Necessary (always)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={e => updateConsent({ analytics: e.target.checked })}
                />
                Analytics
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={consent.externalMedia}
                  onChange={e => updateConsent({ externalMedia: e.target.checked })}
                />
                External media (Google Maps)
              </label>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={rejectAll}
                className="bg-orange-400 text-white px-4 py-2 cursor-pointer rounded-sm"
              >
                Revoke all optional cookies
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-lime-600 text-white px-4 py-2 cursor-pointer rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
