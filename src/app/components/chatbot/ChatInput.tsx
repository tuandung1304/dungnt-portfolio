import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'

interface Props {
  isStreaming: boolean
  isLoading: boolean
  sendMessage: (input: string) => void
  autoFocus?: boolean
}

const MAX_LENGTH = 1000
const MAX_ROWS = 5

export default function ChatInput({
  isStreaming,
  isLoading,
  sendMessage,
  autoFocus,
}: Props) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20
    const maxHeight = lineHeight * MAX_ROWS
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
  }, [input])

  useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus()
    }
  }, [autoFocus])

  const handleSendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setInput('')
    sendMessage(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const disabled = isLoading || isStreaming

  return (
    <div className="border-t border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-end space-x-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder={isStreaming ? 'AI is typing...' : 'Type your message...'}
          rows={1}
          maxLength={MAX_LENGTH}
          aria-label="Chat message"
          className="max-h-32 flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 leading-5 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={disabled}
        />
        <motion.button
          onClick={handleSendMessage}
          disabled={!input.trim() || disabled}
          aria-label="Send message"
          className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          whileHover={{ scale: !disabled && input.trim() ? 1.05 : 1 }}
          whileTap={{ scale: !disabled && input.trim() ? 0.95 : 1 }}>
          <FiSend size={20} />
        </motion.button>
      </div>
    </div>
  )
}
