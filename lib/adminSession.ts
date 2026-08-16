// Pure, Edge-runtime-safe session helpers (no next/headers import) so this
// module can be shared between middleware.ts (Edge) and Node server code.

export const ADMIN_COOKIE_NAME = 'admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
export const ADMIN_SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000

const getSecret = () => {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('ADMIN_PASSWORD is not set')
  return secret
}

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

const sign = async (value: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return toHex(signature)
}

// Constant-time-ish comparison so failed guesses don't leak timing info.
export const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export const createSessionCookieValue = async () => {
  const payload = String(Date.now() + SESSION_TTL_MS)
  const signature = await sign(payload)
  return `${payload}.${signature}`
}

export const isValidSessionCookieValue = async (value: string | undefined) => {
  if (!value) return false
  const [payload, signature] = value.split('.')
  if (!payload || !signature) return false
  const expected = await sign(payload)
  if (!timingSafeEqual(expected, signature)) return false
  return Number(payload) > Date.now()
}
