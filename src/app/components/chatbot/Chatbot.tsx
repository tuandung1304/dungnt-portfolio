'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { Message, MessageRole, ResponseChunk } from './type'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm here to help you learn more about my portfolio. Feel free to ask me anything about my work, skills or experience.",
      role: MessageRole.Assistant,
      createdAt: new Date(),
    },
  ])

  const isStreaming = Boolean(streamingMsgId)

  const handleShowFollowUps = async () => {
    const response = await fetch('/api/followups')
    if (!response.ok) {
      throw new Error('Failed to fetch follow-ups')
    }
    const data = await response.json()
    if (data.questions) {
      setFollowUpQuestions(data.questions)
    }
  }

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isLoading || isStreaming) return

      const userMessage: Message = {
        id: uuidv4(),
        text: input,
        role: MessageRole.User,
        createdAt: new Date(),
      }

      setIsLoading(true)
      setMessages((prev) => [...prev, userMessage])
      setFollowUpQuestions([])

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error)
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
                  void handleShowFollowUps()
                  break
                }
              } catch (e) {
                console.error('Error parsing streaming data:', e)
              }
            }
          }
        }
      } catch (e) {
        const errorMessage: Message = {
          id: uuidv4(),
          text:
            (e as Error).message ||
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          role: MessageRole.Assistant,
          createdAt: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
        setStreamingMsgId(null)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, isStreaming],
  )

  return (
    <div data-theme="dark">
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 rounded-full p-4 text-white shadow-lg transition-colors duration-200 sm:bottom-6 sm:right-6 ${
          isStreaming
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          ...(isStreaming && {
            boxShadow: [
              '0 0 0 0 rgba(34, 197, 94, 0.7)',
              '0 0 0 10px rgba(34, 197, 94, 0)',
              '0 0 0 0 rgba(34, 197, 94, 0)',
            ],
          }),
        }}
        transition={{
          delay: 1,
          ...(isStreaming && {
            boxShadow: {
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }),
        }}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <FiX size={30} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <FiMessageCircle size={30} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-2 right-2 z-40 flex h-[calc(100dvh-120px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800 sm:bottom-28 sm:left-auto sm:right-6 sm:h-[550px] sm:w-[400px]">
            {/* Header */}
            <ChatHeader isStreaming={isStreaming} setIsOpen={setIsOpen} />

            {/* Messages */}
            <Messages
              messages={messages}
              setMessages={setMessages}
              isLoading={isLoading}
              streamingMsgId={streamingMsgId}
              followUpQuestions={followUpQuestions}
              sendMessage={sendMessage}
              hasFetchedMessages={hasFetchedMessages}
              setHasFetchedMessages={setHasFetchedMessages}
            />

            {/* Input */}
            <ChatInput
              isLoading={isLoading}
              isStreaming={isStreaming}
              sendMessage={sendMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
