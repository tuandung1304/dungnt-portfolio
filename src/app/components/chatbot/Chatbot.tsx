'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { Message, MessageRole, ResponseChunk } from './type'

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: "Hi! I'm Tuan Dung's AI assistant. Ask me anything about his skills, projects, work experience, or how to get in touch.",
  role: MessageRole.Assistant,
  createdAt: new Date(),
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isStreaming = Boolean(streamingMsgId)

  const handleShowFollowUps = async () => {
    const response = await fetch('/api/followups')
    if (!response.ok) return
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error)
        }

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
            if (!line.startsWith('data: ')) continue
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

  const handleClearChat = useCallback(async () => {
    if (isLoading || isStreaming) return
    const confirmed = window.confirm(
      'Clear this conversation? This cannot be undone.',
    )
    if (!confirmed) return

    setMessages([{ ...WELCOME_MESSAGE, createdAt: new Date() }])
    setFollowUpQuestions([])
    setHasFetchedMessages(true)

    try {
      await fetch('/api/messages', { method: 'DELETE' })
    } catch (err) {
      console.error('Failed to clear conversation:', err)
    }
  }, [isLoading, isStreaming])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      buttonRef.current?.focus()
    }
  }, [isOpen])

  const canClear =
    messages.length > 1 || (messages.length === 1 && messages[0].id !== 'welcome')

  return (
    <div className="dark">
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat with AI assistant'}
        aria-expanded={isOpen}
        aria-controls="chatbot-dialog"
        className={`fixed right-4 bottom-4 z-50 rounded-full p-4 text-white shadow-lg transition-colors duration-200 sm:right-6 sm:bottom-6 ${
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
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-dialog"
            role="dialog"
            aria-modal="false"
            aria-labelledby="chatbot-title"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-2 bottom-24 left-2 z-40 flex h-[calc(100dvh-120px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6 sm:bottom-28 sm:left-auto sm:h-[550px] sm:w-[400px] dark:border-gray-700 dark:bg-gray-800">
            <ChatHeader
              isStreaming={isStreaming}
              setIsOpen={setIsOpen}
              onClear={handleClearChat}
              canClear={canClear}
            />

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

            <ChatInput
              isLoading={isLoading}
              isStreaming={isStreaming}
              sendMessage={sendMessage}
              autoFocus={isOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
