import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'

export async function getContextMessages(conversationId: string) {
  const cachedMessages = await redis.lrange(
    `conversation:${conversationId}:messages`,
    0,
    5,
  )

  if (cachedMessages.length > 0) {
    return cachedMessages.map((message) => JSON.parse(message))
  }

  const recentMessages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
    select: {
      text: true,
      createdAt: true,
      role: true,
    },
  })

  // Reverse to get chronological order (oldest first)
  const contextMessages = recentMessages.reverse()

  const key = `conversation:${conversationId}:messages`
  if (contextMessages.length > 0) {
    const pipeline = redis.pipeline()
    contextMessages.forEach((message) => {
      pipeline.rpush(key, JSON.stringify(message))
    })
    pipeline.expire(key, 60 * 60 * 6)
    await pipeline.exec()
  }

  return contextMessages
}
