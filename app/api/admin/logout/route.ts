import { ADMIN_COOKIE_NAME } from '@/lib/adminAuth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const store = await cookies()
  store.delete(ADMIN_COOKIE_NAME)
  return NextResponse.json({ ok: true })
}
