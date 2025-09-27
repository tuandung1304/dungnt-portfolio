import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import { Message, MessageRole, ResponseChunk } from './type'

interface Props {
  isStreaming: boolean
  isLoading: boolean
  setMessages: Dispatch<SetStateAction<Message[]>>
  setIsLoading: (isLoading: boolean) => void
  setStreamingMsgId: (streamingMessageId: string | null) => void
}

export default function ChatInput({
  isStreaming,
  isLoading,
  setMessages,
  setIsLoading,
  setStreamingMsgId,
}: Props) {
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isStreaming) return

    const userMessage: Message = {
      id: uuidv4(),
      text: input,
      role: MessageRole.User,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let responseMsgId: string | null = null

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6)) as ResponseChunk

              if (data.type === 'start') {
                responseMsgId = data.id
                const streamingMessage: Message = {
                  id: responseMsgId,
                  text: '',
                  role: MessageRole.Assistant,
                  createdAt: new Date(data.createdAt),
                }

                setMessages((prev) => [...prev, streamingMessage])
                setStreamingMsgId(responseMsgId)
                setIsLoading(false)
              } else if (data.type === 'chunk') {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === responseMsgId
                      ? { ...msg, text: msg.text + data.content }
                      : msg,
                  ),
                )
              } else if (data.type === 'complete') {
                setStreamingMsgId(null)
                break
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e)
            }
          }
        }
      }
    } catch {
      const errorMessage: Message = {
        id: uuidv4(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        role: MessageRole.Assistant,
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setStreamingMsgId(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="border-t border-gray-200 p-4 dark:border-gray-700">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isStreaming ? 'AI is typing...' : 'Type your message...'}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isLoading || isStreaming}
        />
        <motion.button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading || isStreaming}
          className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          whileHover={{
            scale: !isLoading && !isStreaming && input.trim() ? 1.05 : 1,
          }}
          whileTap={{
            scale: !isLoading && !isStreaming && input.trim() ? 0.95 : 1,
          }}>
          <FiSend size={20} />
        </motion.button>
      </div>
    </div>
  )
}
