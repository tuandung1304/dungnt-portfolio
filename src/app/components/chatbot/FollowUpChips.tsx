import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'

interface Props {
  followUpQuestions: string[]
  onFollowUpClick: (question: string) => void
}

export default function FollowUpChips({
  followUpQuestions,
  onFollowUpClick,
}: Props) {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-3 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <FiMessageCircle size={12} />
            <span>Suggested questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {followUpQuestions.map((question, index) => (
              <motion.button
                key={index}
                onClick={() => onFollowUpClick(question)}
                className="group relative overflow-hidden rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:shadow-sm dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>
                <span className="relative z-10">{question}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
