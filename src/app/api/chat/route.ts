import { ResponseChunk } from '@/app/components/chatbot/type'
import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // AI response templates - you can replace this with actual AI service
    const response =
      "Hello! I'm here to help you learn more about TuanDung's portfolio.\nWhat would you like to know?"

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a readable stream for streaming response
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder()
        let index = 0

        const initialData = JSON.stringify({
          id: uuidv4(),
          type: 'start',
          createdAt: new Date(),
        } satisfies ResponseChunk)
        controller.enqueue(encoder.encode(`data: ${initialData}\n\n`))

        const sendChunk = () => {
          if (index < response.length) {
            // Random length between 2-5 characters
            const randomLength = Math.floor(2 + Math.random() * 3)
            const chunk = response.slice(index, index + randomLength)
            const data = JSON.stringify({
              type: 'chunk',
              content: chunk,
            } satisfies ResponseChunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            index += randomLength

            // Random delay between 10-40ms to simulate realistic typing
            setTimeout(sendChunk, 10 + Math.random() * 30)
          } else {
            // Send completion signal
            const data = JSON.stringify({
              type: 'complete',
            } satisfies ResponseChunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            controller.close()
          }
        }

        sendChunk()
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
