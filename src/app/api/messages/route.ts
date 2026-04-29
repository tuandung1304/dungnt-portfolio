import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const conversationId = request.cookies.get('session')?.value
  if (!conversationId) {
    return NextResponse.json([])
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(messages)
}

export async function DELETE(request: NextRequest) {
  const conversationId = request.cookies.get('session')?.value
  if (!conversationId) {
    return NextResponse.json({ ok: true })
  }

  await prisma.message.deleteMany({ where: { conversationId } })
  await redis.del(`conversation:${conversationId}:messages`)

  return NextResponse.json({ ok: true })
}
