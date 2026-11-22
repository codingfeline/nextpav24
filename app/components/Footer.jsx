'use client'

import { usePathname } from 'next/navigation'
import CookieConsentManager from './CookieConsentManager'
import Link from './Link'
import ThemeChooser from './ThemeChooser'

const Footer = () => {
  // The new home shows NewHomeEdges instead of the footer
  if (usePathname() === '/new-home') return null

  return (
    <footer
      className="bg-cream-50 border-t border-cream-300 p-5  flex flex-col items-center gap-3 sm:flex-row
    sm:justify-between"
    >
      <span>&copy;{` ${new Date().getFullYear()}`} Bangkok Pavilion</span>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <ThemeChooser />
        <CookieConsentManager />
        <Link href="/privacy-policy" className="ml-4">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
