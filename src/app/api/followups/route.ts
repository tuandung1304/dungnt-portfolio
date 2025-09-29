import { Message } from '@/generated/prisma'
import redis from '@/lib/redis'
import { generateFollowUps } from '@/services/generateFollowUps'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('session')?.value
    if (!session) {
      return NextResponse.json({ message: 'No session found' }, { status: 400 })
    }

    const lastQuestionAndAnswer = await redis.lrange(
      `conversation:${session}:messages`,
      -2,
      -1,
    )

    if (lastQuestionAndAnswer.length < 2) {
      return NextResponse.json(
        { message: 'No question and answer found' },
        { status: 400 },
      )
    }

    const question = JSON.parse(lastQuestionAndAnswer[0]) as Message
    const answer = JSON.parse(lastQuestionAndAnswer[1]) as Message

    const followUps = await generateFollowUps({ question, answer })

    return NextResponse.json(followUps)
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
