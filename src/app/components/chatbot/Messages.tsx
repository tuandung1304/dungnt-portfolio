import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FiUser } from 'react-icons/fi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import AIThinking from './AIThinking'
import { Message, MessageRole } from './type'

interface Props {
  messages: Message[]
  streamingMsgId: string | null
  isLoading: boolean
}

export default function Messages({
  messages,
  streamingMsgId,
  isLoading,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isUserRole = (role: MessageRole) => role === MessageRole.User
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
            ...(message.id === streamingMsgId && {
              transition: { duration: 0.1 },
            }),
          }}
          className={`flex ${isUserRole(message.role) ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-xs rounded-lg px-3 py-2 ${
              isUserRole(message.role)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
            <div className="flex items-start space-x-2">
              {isUserRole(message.role) ? (
                <FiUser size={16} className="mt-0.5 flex-shrink-0" />
              ) : (
                <HiChatBubbleLeftRight
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                />
              )}
              <p className="whitespace-pre-wrap text-sm">{message.text}</p>
            </div>
            <p className="mt-1 text-xs opacity-60">
              {message.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </motion.div>
      ))}
      <AIThinking isLoading={isLoading} isStreaming={!!streamingMsgId} />

      <div ref={messagesEndRef} />
    </div>
  )
}
