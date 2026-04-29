import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'

interface Props {
  onSelect: (prompt: string) => void
}

const PROMPTS = [
  'What are your main skills?',
  'Tell me about your projects',
  'How can I contact you?',
  'Do you have any certifications?',
]

export default function QuickPrompts({ onSelect }: Props) {
  return (
    <div className="flex justify-start">
      <div className="w-full max-w-xs">
        <div className="mb-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <FiZap size={12} />
          <span>Try asking</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROMPTS.map((prompt, index) => (
            <motion.button
              key={prompt}
              onClick={() => onSelect(prompt)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              {prompt}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
