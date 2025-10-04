import { motion } from 'framer-motion'
import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FiLoader, FiUser } from 'react-icons/fi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import AIThinking from './AIThinking'
import FollowUpChips from './FollowUpChips'
import MarkdownRenderer from './MarkdownRenderer'
import { Message, MessageRole } from './type'

interface Props {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  sendMessage: (input: string) => void
  isLoading: boolean
  streamingMsgId: string | null
  followUpQuestions: string[]
  hasFetchedMessages: boolean
  setHasFetchedMessages: Dispatch<SetStateAction<boolean>>
}

function Messages({
  messages,
  setMessages,
  sendMessage,
  streamingMsgId,
  isLoading,
  followUpQuestions,
  hasFetchedMessages,
  setHasFetchedMessages,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)

  const isUserRole = (role: MessageRole) => role === MessageRole.User

  const handleFollowUpClick = (question: string) => {
    sendMessage(question)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (hasFetchedMessages || isLoadingMessages) return

      setIsLoadingMessages(true)
      try {
        const res = await fetch('/api/messages')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = (await res.json()) as Message[]

        if (data.length > 0) {
          setMessages((prev) => [
            ...prev,
            ...data.map((item) => ({
              ...item,
              createdAt: new Date(item.createdAt),
            })),
          ])
        }
        setHasFetchedMessages(true)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setIsLoadingMessages(false)
      }
    }

    if (!hasFetchedMessages && messages.length === 1) {
      fetchMessages()
    }
  }, [
    hasFetchedMessages,
    isLoadingMessages,
    messages.length,
    setHasFetchedMessages,
    setMessages,
  ])

  useEffect(() => {
    scrollToBottom()
  }, [messages, followUpQuestions])

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {isLoadingMessages ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start">
          <div className="max-w-xs rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
            <div className="flex items-center space-x-2">
              <FiLoader
                size={16}
                className="mt-0.5 flex-shrink-0 animate-spin text-gray-400"
              />
              <span className="text-sm text-gray-500">Loading messages...</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
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
                  {isUserRole(message.role) ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                  ) : (
                    <MarkdownRenderer content={message.text} />
                  )}
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

          {/* Follow-up Questions */}
          {followUpQuestions.length > 0 && (
            <FollowUpChips
              followUpQuestions={followUpQuestions}
              onFollowUpClick={handleFollowUpClick}
            />
          )}
        </>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default memo(Messages)
