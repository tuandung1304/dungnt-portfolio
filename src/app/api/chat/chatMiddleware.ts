import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function chatMiddleware(req: NextRequest) {
  const res = NextResponse.next()
  let session = req.cookies.get('session')?.value

  if (!session) {
    session = uuidv4()
    res.cookies.set('session', session, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  res.headers.set('x-session-id', session)

  return res
}
