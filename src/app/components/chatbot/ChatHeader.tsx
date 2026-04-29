import { AnimatePresence, motion } from 'framer-motion'
import { FiTrash2, FiX } from 'react-icons/fi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

interface Props {
  isStreaming: boolean
  setIsOpen: (isOpen: boolean) => void
  onClear: () => void
  canClear: boolean
}

export default function ChatHeader({
  isStreaming,
  setIsOpen,
  onClear,
  canClear,
}: Props) {
  return (
    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <div className="flex items-center space-x-2">
        <HiChatBubbleLeftRight size={20} />
        <div className="flex items-center space-x-2">
          <h2 id="chatbot-title" className="font-semibold">
            AI Assistant
          </h2>
          <AnimatePresence>
            {isStreaming && (
              <motion.div
                className="flex space-x-1"
                aria-label="AI is typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                {[0, 0.2, 0.4].map((delay) => (
                  <motion.div
                    key={delay}
                    className="h-1 w-1 rounded-full bg-white"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={onClear}
          disabled={!canClear || isStreaming}
          aria-label="Clear conversation"
          title="Clear conversation"
          className="rounded p-1.5 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
          <FiTrash2 size={16} />
        </button>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          className="rounded p-1.5 transition-colors hover:bg-blue-700">
          <FiX size={16} />
        </button>
      </div>
    </div>
  )
}
