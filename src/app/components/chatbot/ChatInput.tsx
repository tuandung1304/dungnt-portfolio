import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'

interface Props {
  isStreaming: boolean
  isLoading: boolean
  sendMessage: (input: string) => void
}

export default function ChatInput({
  isStreaming,
  isLoading,
  sendMessage,
}: Props) {
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    setInput('')
    sendMessage(input)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isLoading || isStreaming}
        />
        <motion.button
          onClick={handleSendMessage}
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
