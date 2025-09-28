import { ResponseChunk } from '@/app/components/chatbot/type'
import { MessageRole } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { generateStreamCommand } from '@/services/generateStreamCommand'
import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const conversationId = request.headers.get('x-session-id')!

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          id: conversationId,
          title: 'New Conversation',
        },
      })
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

    await prisma.message.create({
      data: {
        text: message,
        role: MessageRole.user,
        conversationId,
      },
    })

    // Reverse to get chronological order (oldest first)
    const contextMessages = recentMessages.reverse()

    // Create a readable stream for streaming response
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

        prisma.message
          .create({
            data: {
              text: fullResponse,
              role: MessageRole.assistant,
              conversationId,
            },
          })
          .catch((error) => {
            console.error('Error saving AI message to database:', error)
          })

        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
