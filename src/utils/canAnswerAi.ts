import redis from '@/lib/redis'

const GLOBAL_DAILY_LIMIT = 500
const PER_SESSION_DAILY_LIMIT = 25
const ONE_DAY_SECONDS = 60 * 60 * 24

export async function canAnswerAI(sessionId: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10)
  const globalKey = `ai:answers:${today}`
  const sessionKey = `ai:answers:${today}:${sessionId}`

  const [globalCount, sessionCount] = await Promise.all([
    redis.incr(globalKey),
    redis.incr(sessionKey),
  ])

  await Promise.all([
    globalCount === 1
      ? redis.expire(globalKey, ONE_DAY_SECONDS)
      : Promise.resolve(),
    sessionCount === 1
      ? redis.expire(sessionKey, ONE_DAY_SECONDS)
      : Promise.resolve(),
  ])

  return (
    globalCount <= GLOBAL_DAILY_LIMIT && sessionCount <= PER_SESSION_DAILY_LIMIT
  )
}
