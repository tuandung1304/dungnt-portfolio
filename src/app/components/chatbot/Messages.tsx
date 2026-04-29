import { motion } from 'framer-motion'
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FiCheck, FiCopy, FiUser } from 'react-icons/fi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import AIThinking from './AIThinking'
import FollowUpChips from './FollowUpChips'
import MarkdownRenderer from './MarkdownRenderer'
import QuickPrompts from './QuickPrompts'
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
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const isUserRole = (role: MessageRole) => role === MessageRole.User
  const isStreaming = Boolean(streamingMsgId)

  const handleFollowUpClick = (question: string) => {
    sendMessage(question)
  }

  const handleCopy = useCallback(async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.text)
      setCopiedId(message.id)
      window.setTimeout(() => setCopiedId(null), 1500)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [])

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
    messagesEndRef.current?.scrollIntoView({
      behavior: isStreaming ? 'auto' : 'smooth',
    })
  }, [messages, followUpQuestions, isStreaming])

  const showQuickPrompts =
    !isLoading &&
    !isStreaming &&
    hasFetchedMessages &&
    messages.length === 1 &&
    messages[0].id === 'welcome'

  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto p-4"
      role="log"
      aria-live="polite"
      aria-relevant="additions">
      {messages.map((message) => {
        const userMessage = isUserRole(message.role)
        const isCopied = copiedId === message.id
        return (
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
            className={`group flex ${userMessage ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs rounded-lg px-3 py-2 ${
                userMessage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
              <div className="flex items-start space-x-2">
                {userMessage ? (
                  <FiUser size={16} className="mt-0.5 flex-shrink-0" />
                ) : (
                  <HiChatBubbleLeftRight
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                  />
                )}
                {userMessage ? (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                ) : (
                  <MarkdownRenderer content={message.text} />
                )}
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-xs opacity-60">
                  {message.createdAt.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                {!userMessage &&
                  message.id !== 'welcome' &&
                  message.id !== streamingMsgId &&
                  message.text && (
                    <button
                      onClick={() => handleCopy(message)}
                      aria-label={isCopied ? 'Copied' : 'Copy message'}
                      className="rounded p-1 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200 focus:opacity-100 dark:text-gray-400 dark:hover:bg-gray-600">
                      {isCopied ? <FiCheck size={12} /> : <FiCopy size={12} />}
                    </button>
                  )}
              </div>
            </div>
          </motion.div>
        )
      })}

      <AIThinking isLoading={isLoading} isStreaming={isStreaming} />

      {showQuickPrompts && <QuickPrompts onSelect={sendMessage} />}

      {followUpQuestions.length > 0 && (
        <FollowUpChips
          followUpQuestions={followUpQuestions}
          onFollowUpClick={handleFollowUpClick}
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default memo(Messages)
