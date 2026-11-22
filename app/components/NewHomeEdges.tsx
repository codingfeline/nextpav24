import { Dialog } from '@radix-ui/themes'
import CookieConsentManager from './CookieConsentManager'
import PrivacyPolicyContent from './PrivacyPolicyContent'

// Replaces the footer on the new home: the brand name fixed to the bottom-left,
// and cookie settings + privacy policy fixed to the bottom-right.
// CookieConsentManager also runs Google Analytics and renders the cookie banner
// and settings window, so it must stay on the page. Those are full-screen and
// fixed, so the pill below styles only its direct children (the links) and
// avoids effects like backdrop-blur that would trap fixed elements inside it.
const pill = 'rounded-full bg-[#0C0C0C]/60 px-4 py-1.5'
const item = 'text-sm tracking-wider text-white/90 hover:text-white'
// Undo the global button styles (globals.css: white box, border, shadow, full
// width, padding) so a button looks like the plain-text items
const plainButton =
  'w-auto m-0 p-0 border-0 rounded-none bg-transparent shadow-none focus:ring-0 cursor-pointer'

export default function NewHomeEdges() {
  return (
    <>
      <div className={`fixed bottom-4 left-4 z-40 ${pill}`}>
        <span className={item}>&copy; {new Date().getFullYear()} Bangkok Pavilion</span>
      </div>
      <div
        className={`fixed bottom-4 right-4 z-40 flex items-center ${pill} [&>a]:!p-0 [&>a]:text-sm [&>a]:tracking-wider [&>a]:text-white/90 [&>a:hover]:text-white [&>span]:hidden [&>a+span]:inline`}
      >
        <CookieConsentManager />
        {/* Separator: only shown when the "Cookie settings" link is (after consent) */}
        <span aria-hidden className="mx-3 text-white/40">
          |
        </span>
        {/* Privacy Policy opens in a dialog rather than leaving the page */}
        <Dialog.Root>
          <Dialog.Trigger>
            <button type="button" className={`${plainButton} ${item}`}>
              Privacy Policy
            </button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="42rem" className="!bg-cream-50">
            <Dialog.Title size="6">Privacy Policy</Dialog.Title>
            <PrivacyPolicyContent />
            <div className="mt-6 flex justify-end">
              <Dialog.Close>
                <button
                  type="button"
                  className="w-auto mt-0 border-0 shadow-none rounded-md bg-[#0C0C0C] px-4 py-2 text-white hover:bg-[#0C0C0C]/80"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  )
}
