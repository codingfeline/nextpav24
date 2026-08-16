import { ContactSchema } from '@/app/validationSchemas'
import WelcomeTemplate from '@/emails/WelcomeTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// In-memory per-IP rate limit. Resets if the server process restarts, which
// is an acceptable trade-off for a low-traffic contact form with no Redis/KV available.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, { count: number; resetAt: number }>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const entry = requestLog.get(ip)
  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 })
  }

  const body = await req.json()

  // Honeypot: real visitors never see or fill this field. Pretend success so
  // bots that do fill it don't learn their submission was rejected.
  if (typeof body?.website === 'string' && body.website.length > 0) {
    return NextResponse.json({})
  }

  const result = ContactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
  }

  const { name, email, message, phone } = result.data
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  await resend.emails.send({
    from: 'info@bangkokpavilion.co.uk',
    to: email,
    cc: 'info@bangkokpavilion.co.uk',
    replyTo: [email, 'info@bangkokpavilion.co.uk'],
    bcc: 'admin@bangkokpavilion.co.uk',
    subject: 'Web enquiry',
    react: <WelcomeTemplate name={name} message={safeMessage} phone={phone} />,
  })

  return NextResponse.json({})
}
