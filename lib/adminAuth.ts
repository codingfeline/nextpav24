import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from './adminSession'

export const isAdminAuthed = async () => {
  const store = await cookies()
  return isValidSessionCookieValue(store.get(ADMIN_COOKIE_NAME)?.value)
}

export { ADMIN_COOKIE_NAME, ADMIN_SESSION_TTL_SECONDS, createSessionCookieValue, timingSafeEqual } from './adminSession'
