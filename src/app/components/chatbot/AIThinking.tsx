import React from 'react'
import { motion } from 'framer-motion'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

interface Props {
  isLoading: boolean
  isStreaming: boolean
}

export default function AIThinking({ isLoading, isStreaming }: Props) {
  return (
    isLoading &&
    !isStreaming && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start">
        <div className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <div className="flex items-center space-x-2">
            <HiChatBubbleLeftRight size={16} className="text-gray-500" />
            <div className="flex space-x-1">
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.4,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  )
}
