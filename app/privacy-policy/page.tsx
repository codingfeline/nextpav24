import type { Metadata } from 'next'
import MainPage from '../components/MainPage'
import PrivacyPolicyContent from '../components/PrivacyPolicyContent'
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

export default function PrivacyPage() {
  return (
    <MainPage>
      <Reveal delay="delay-300">
        <article className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-cream-50/95 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
          <PrivacyPolicyContent />
        </article>
      </Reveal>
    </MainPage>
  )
}
