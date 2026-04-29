import { ResponseChunk } from '@/app/components/chatbot/type'
import { MessageRole } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { generateStreamCommand } from '@/services/generateStreamCommand'
import { getContextMessages } from '@/services/getContextMessages'
import { saveMessage } from '@/services/saveMessage'
import { canAnswerAI } from '@/utils/canAnswerAi'
import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const MAX_MESSAGE_LENGTH = 1000

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: NextRequest) {
  try {
    const conversationId = request.headers.get('x-session-id')
    if (!conversationId) {
      return jsonError('Session not initialized', 400)
    }

    const body = await request.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return jsonError('Message is required', 400)
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonError(
        `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)`,
        400,
      )
    }

    const canAnswer = await canAnswerAI(conversationId)
    if (!canAnswer) {
      return jsonError(
        'Daily message limit reached. Please try again tomorrow.',
        429,
      )
    }

    let conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { id: conversationId, title: 'New Conversation' },
      })
    }

    const contextMessages = await getContextMessages(conversationId)
    await saveMessage({
      text: message,
      role: MessageRole.user,
      conversationId,
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        let fullResponse = ''
        const bedrockStream = await generateStreamCommand(
          message,
          contextMessages,
        )

        const initialData = JSON.stringify({
          id: uuidv4(),
          type: 'start',
          createdAt: new Date(),
        } satisfies ResponseChunk)
        controller.enqueue(encoder.encode(`data: ${initialData}\n\n`))

        for await (const event of bedrockStream!) {
          if (event.output?.text) {
            fullResponse += event.output.text
            const chunk = JSON.stringify({
              type: 'chunk',
              content: event.output.text,
            } satisfies ResponseChunk)
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`))
          }
        }

        const completeData = JSON.stringify({
          type: 'complete',
        } satisfies ResponseChunk)
        controller.enqueue(encoder.encode(`data: ${completeData}\n\n`))

        await saveMessage({
          text: fullResponse,
          role: MessageRole.assistant,
          conversationId,
        })

        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return jsonError('Internal server error', 500)
  }
}
