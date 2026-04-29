import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function chatMiddleware(req: NextRequest) {
  let session = req.cookies.get('session')?.value
  const isNewSession = !session
  if (!session) {
    session = uuidv4()
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-session-id', session)

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  })

  if (isNewSession) {
    res.cookies.set('session', session, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return res
}
