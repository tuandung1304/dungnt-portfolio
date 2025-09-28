'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { Message, MessageRole } from './type'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm here to help you learn more about TuanDung's portfolio. What would you like to know?",
      role: MessageRole.Assistant,
      createdAt: new Date(),
    },
  ])

  const isStreaming = Boolean(streamingMsgId)

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full p-4 text-white shadow-lg transition-colors duration-200 ${
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
            className="fixed bottom-28 right-6 z-40 flex h-[550px] w-[400px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            {/* Header */}
            <ChatHeader isStreaming={isStreaming} setIsOpen={setIsOpen} />

            {/* Messages */}
            <Messages
              messages={messages}
              setMessages={setMessages}
              isLoading={isLoading}
              streamingMsgId={streamingMsgId}
            />

            {/* Input */}
            <ChatInput
              isLoading={isLoading}
              isStreaming={isStreaming}
              setMessages={setMessages}
              setIsLoading={setIsLoading}
              setStreamingMsgId={setStreamingMsgId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
