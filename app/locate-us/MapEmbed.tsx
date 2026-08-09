'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.6333847725305!2d1.4006320157596472!3d51.22582897958988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47deaecf9db0a93f%3A0xfe914440a6b5f45f!2s114+High+St%2C+Deal+CT14!5e0!3m2!1sen!2suk!4v1498062611907'

export default function MapEmbed() {
  const { consent, updateConsent } = useCookieConsent()

  if (!consent.externalMedia) {
    return (
      <div className="w-full rounded-lg min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-cream-100 border border-cream-500 text-center p-6">
        <h2 className="text-2xl text-brown">Map not loaded</h2>
        <p className="text-brown-light max-w-md">
          Google Map is external media. It will load once you accept external media
          cookies.
        </p>
        <button
          type="button"
          onClick={() => updateConsent({ externalMedia: true })}
          className="!w-auto bg-gold text-white border-gold font-semibold px-5 hover:bg-gold-light"
        >
          Load map &amp; accept external media
        </button>
      </div>
    )
  }

  return (
    <iframe
      className="w-full  rounded-lg h-full min-h-screen "
      src={MAP_SRC}
      allowFullScreen
    ></iframe>
  )
}
