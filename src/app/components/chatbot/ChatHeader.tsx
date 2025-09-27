import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

interface Props {
  isStreaming: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ChatHeader({ isStreaming, setIsOpen }: Props) {
  return (
    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <div className="flex items-center space-x-2">
        <HiChatBubbleLeftRight size={20} />
        <div className="flex items-center space-x-2">
          <span className="font-semibold">AI Assistant</span>
          <AnimatePresence>
            {isStreaming && (
              <motion.div
                className="flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.div
                  className="h-1 w-1 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="h-1 w-1 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="h-1 w-1 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="rounded p-1 transition-colors hover:bg-blue-700">
        <FiX size={16} />
      </button>
    </div>
  )
}
