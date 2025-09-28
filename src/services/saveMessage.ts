import { Message } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'

export async function saveMessage(
  message: Pick<Message, 'text' | 'role' | 'conversationId'>,
) {
  const saved = await prisma.message.create({
    data: message,
    select: {
      text: true,
      role: true,
      createdAt: true,
    },
  })

  const key = `conversation:${message.conversationId}:messages`
  await redis
    .multi()
    .rpush(key, JSON.stringify(saved))
    .ltrim(key, -6, -1)
    .expire(key, 60 * 60 * 6)
    .exec()

  return saved
}
