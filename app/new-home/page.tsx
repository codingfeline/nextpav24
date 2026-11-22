import type { Metadata } from 'next'
import MapEmbed from '../locate-us/MapEmbed'
import ContactContent from '../components/ContactContent'
import DrinksContent from '../components/DrinksContent'
import HomeContent from '../components/HomeContent'
import MainMenuContent from '../components/MainMenuContent'
import NewHome from '../components/NewHome'
import NewHomeEdges from '../components/NewHomeEdges'
import SetMenusContent from '../components/SetMenusContent'

// Test page for the new home design — kept out of search results until it goes live
export const metadata: Metadata = {
  title: 'New Home (preview)',
  robots: { index: false, follow: false },
}

export default function NewHomePage() {
  // Content shown inside a circle once it's zoomed in, keyed by circle label.
  // Each *Panel class tints the content with lighter shades of the circle's
  // colour (see "New home circles" in globals.css).
  return (
    <>
      <NewHomeEdges />
      <NewHome
        panels={{
          Home: <HomeContent />,
          'Main Menu': (
            <div className="circlePanel mainMenuPanel">
              <MainMenuContent />
            </div>
          ),
          'Set Menus': (
            <div className="circlePanel setMenusPanel">
              <SetMenusContent />
            </div>
          ),
          Drinks: (
            <div className="circlePanel drinksPanel">
              <DrinksContent />
            </div>
          ),
          'Locate Us': (
            <div className="circlePanel locateUsPanel">
              <MapEmbed />
            </div>
          ),
          'Contact Us': (
            <div className="circlePanel contactPanel">
              <ContactContent />
            </div>
          ),
        }}
      />
    </>
  )
}
