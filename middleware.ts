import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from '@/lib/adminSession'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/admin/login') return NextResponse.next()

  const authed = await isValidSessionCookieValue(req.cookies.get(ADMIN_COOKIE_NAME)?.value)
  if (!authed) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
