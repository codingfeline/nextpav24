import { CookieConsentProvider } from '@/providers/CookieConsentProvider'
import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Bangkok Pavilion | Thai restaurant in Deal, Kent',
  description: 'Authentic Thai Cuisine in the high street of Deal in Kent',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon-32x32.png" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex   flex-col  bg_home `}
      >
        {/* Apply the saved colour theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=['blue','green','pink','gray'].indexOf(t)>-1?t:'warm'}catch(e){}`,
          }}
        />
        <CookieConsentProvider>
          <Theme
            accentColor="amber"
            grayColor="sand"
            radius="large"
            appearance="light"
            className=" mb-auto flex flex-col "
          >
            <Navbar />
            <main className="grow bg_home  ">
              <Container size="3">{children}</Container>
            </main>
            <Footer />
            <BackToTop />
          </Theme>
        </CookieConsentProvider>
      </body>
    </html>
  )
}
