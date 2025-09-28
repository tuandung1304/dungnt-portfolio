import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const conversationId = request.cookies.get('session')?.value
  if (!conversationId) {
    return NextResponse.json([])
  }

  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
  })

  return NextResponse.json(messages)
}
