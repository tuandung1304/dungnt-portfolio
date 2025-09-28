import redis from '@/lib/redis'

const DAILY_LIMIT = 150

export async function canAnswerAI(): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10)
  // ai:answers:2025-09-28
  const key = `ai:answers:${today}`

  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, 60 * 60 * 24) // 24h
  }

  return current <= DAILY_LIMIT
}
