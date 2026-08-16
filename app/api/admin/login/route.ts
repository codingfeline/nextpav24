import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createSessionCookieValue,
  timingSafeEqual,
} from '@/lib/adminAuth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// In-memory per-IP rate limit, same trade-off as the contact form: resets on
// restart, acceptable for a low-traffic single-admin login.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10
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
    return NextResponse.json({ error: 'Too many attempts, please try again later.' }, { status: 429 })
  }

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''
  if (!password || !timingSafeEqual(password, expected)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const store = await cookies()
  store.set(ADMIN_COOKIE_NAME, await createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  })

  return NextResponse.json({ ok: true })
}
