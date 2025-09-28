import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST!,
  port: parseInt(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD!,
  username: process.env.REDIS_USERNAME!,
})

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('error', (err) => {
  console.error('Redis connection error', err)
})

export default redis
