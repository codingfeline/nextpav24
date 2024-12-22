import WelcomeTemplate from '@/emails/WelcomeTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, message } = body
  await resend.emails.send({
    from: 'info@bangkokpavilion.co.uk',
    to: 'info@bangkokpavilion.co.uk',
    cc: email,
    bcc: 'wisawate1@hotmail.co.uk',
    subject: 'Web enquiry',
    react: <WelcomeTemplate message={message} />,
  })

  return NextResponse.json({})
}
