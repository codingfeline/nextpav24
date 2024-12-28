import WelcomeTemplate from '@/emails/WelcomeTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message } = body
  await resend.emails.send({
    from: 'info@bangkokpavilion.co.uk',
    to: email,
    cc: 'info@bangkokpavilion.co.uk',
    bcc: 'admin@bangkokpavilion.co.uk',
    subject: 'Web enquiry',
    react: <WelcomeTemplate name={name} message={message} />,
  })

  return NextResponse.json({})
}
