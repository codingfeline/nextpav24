import type { Metadata } from 'next'
import Link from 'next/link'
import MainPage from '../components/MainPage'
import Reveal from '../components/Reveal'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How bangkokpavilion.co.uk handles your data — what we collect, why, who it is shared with, and your rights under UK and EU GDPR.',
  openGraph: {
    title: 'Privacy',
    description:
      'How bangkokpavilion.co.uk handles your data — what we collect, why, and your rights.',
    type: 'website',
  },
}

const LAST_UPDATED = '17 May 2026'

export default function PrivacyPage() {
  return (
    <MainPage>
      <Reveal delay="delay-300">
        <article className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-cream-50/95 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
          <p className="text-[0.8rem] text-[#888] mb-6">Last updated: {LAST_UPDATED}</p>

          <p className="mb-6 leading-relaxed">
            This page explains what personal data <strong>bangkokpavilion.co.uk</strong>{' '}
            (&ldquo;we&rdquo;, &ldquo;the site&rdquo;) collects when you visit, why we
            collect it, who we share it with, and the rights you have over it under the UK
            GDPR and EU GDPR.
          </p>

          <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              Who we are
            </h2>
            <p className="leading-relaxed">
              bangkokpavilion.co.uk is the website of Bangkok Pavilion, a Thai restaurant
              at 114 High Street, Deal, Kent CT14 6BB, United Kingdom. The data controller
              is Bangkok Pavilion. For privacy questions you can reach us via the{' '}
              <Link href="/contact" className="underline">
                Contact page
              </Link>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              What we collect and why
            </h2>
            <ul className="space-y-3 list-disc pl-6 leading-relaxed">
              <li>
                <strong>Contact form submissions</strong> — your name, email address,
                phone number and message. Used solely to read and reply to your message.
                Lawful basis: your consent (you choose to send it) and our legitimate
                interest in handling correspondence.
              </li>
              <li>
                <strong>Analytics</strong> — we use Google Analytics 4 to measure traffic
                and how the site is used, in aggregate. Cookies are only set if you opt in
                via our cookie banner. Lawful basis: your consent.
              </li>
              <li>
                <strong>Consent records</strong> — when you set your cookie preferences we
                store those choices, the random ID held in your{' '}
                <code>anon_consent_id</code> and the date, on our server. Lawful basis: our
                legal obligation to keep evidence of your consent.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              Cookies we set
            </h2>
            <ul className="space-y-2 list-disc pl-6 leading-relaxed text-[0.92rem]">
              <li>
                <code>cookie_consent</code>, <code>anon_consent_id</code> — your cookie
                preferences and a random ID, stored in <code>localStorage</code>.
                First-party and strictly necessary so we don&rsquo;t ask you again.
              </li>
              <li>
                <strong>Google Analytics cookies</strong> (<code>_ga</code>,{' '}
                <code>_ga_1N4HEH7FZT</code>) — set by Google Analytics 4 to distinguish
                unique visitors and sessions. First-party (set on this domain). Only set
                if you opt in via the cookie banner.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              Who we share it with
            </h2>
            <ul className="space-y-2 list-disc pl-6 leading-relaxed">
              <li>
                <strong>Resend</strong> (US) — delivers contact form messages to our
                inbox. See{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Resend&rsquo;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Google</strong> (Ireland / US) — with your consent, measures
                traffic via Google Analytics 4 and serves the Google Map embedded on our
                Find Us page (loaded only if you allow external media), which receives
                your IP address and device information. See{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google&rsquo;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong>SVTables</strong> — provides the table-booking widget embedded on
                our home page. The widget loads when the home page opens; if you make a
                booking, the details you enter (such as your name, contact details and
                reservation details) are submitted directly to SVTables, and it may set
                its own cookies.
              </li>
              <li>
                <strong>Our hosting provider</strong> — hosts the site and processes
                requests on our behalf, including server logs that may briefly record your
                IP address for security and reliability.
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              Where transfers leave the UK or EEA (e.g. to the US), they rely on the UK-US
              Data Bridge / EU-US Data Privacy Framework or Standard Contractual Clauses.
            </p>
          </section>

          {/* <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              How long we keep it
            </h2>
            <ul className="space-y-2 list-disc pl-6 leading-relaxed">
              <li>
                Contact form messages: kept in our inbox until the matter is resolved,
                then deleted within 12 months.
              </li>
              <li>
                Cookies: the Google Analytics cookies (<code>_ga</code>,{' '}
                <code>_ga_1N4HEH7FZT</code>) are set by Google and last up to about 2
                years; the consent values in <code>localStorage</code> stay until you
                clear them or change your choice.
              </li>
              <li>
                Consent records: the server-side record of your cookie choices is kept
                only as long as it is needed as evidence that you consented, then removed.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              Your rights
            </h2>
            <p className="leading-relaxed mb-2">
              Under UK and EU GDPR you have the right to:
            </p>
            <ul className="space-y-1 list-disc pl-6 leading-relaxed">
              <li>access the personal data we hold about you;</li>
              <li>have it corrected if it&rsquo;s wrong, or erased;</li>
              <li>object to or restrict processing;</li>
              <li>
                withdraw consent at any time (re-open the cookie banner from the footer);
              </li>
              <li>
                lodge a complaint with the{' '}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  UK ICO
                </a>{' '}
                or your local EU data protection authority.
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, get in touch via the{' '}
              <Link href="/contact" className="underline">
                Contact page
              </Link>
              .
            </p>
          </section> */}

          <section>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#444] mb-3">
              Changes to this policy
            </h2>
            <p className="leading-relaxed">
              We&rsquo;ll update the &ldquo;last updated&rdquo; date above when this
              policy changes. Material changes will be highlighted on the home page for at
              least 14 days.
            </p>
          </section>
        </article>
      </Reveal>
    </MainPage>
  )
}
