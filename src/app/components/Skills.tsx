'use client'
import { motion } from 'framer-motion'
import { skills } from '@/app/constants/skills'

export default function Skills() {
  return (
    <div className="py-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl tracking-wider mb-12">
        Skills & Expertise
      </motion.h2>
      <div className="max-w-4xl mx-auto px-4">
        {skills.map((category, index) => (
          <motion.div
            key={category.name}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-stone-900/50 rounded-lg p-4 border border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-stone-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-2">
                    <div
                      className="bg-stone-300 h-2 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
