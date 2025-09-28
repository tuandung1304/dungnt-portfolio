import { NextRequest, NextResponse } from 'next/server'
import { chatMiddleware } from './app/api/chat/chatMiddleware'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/chat')) {
    return chatMiddleware(request)
  }

  return NextResponse.next()
}
