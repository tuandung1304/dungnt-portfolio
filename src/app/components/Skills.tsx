'use client'
import { getLevel, skills } from '@/app/constants/skills'
import { motion } from 'framer-motion'

export default function Skills() {
  return (
    <div className="py-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-4xl tracking-wider">
        Skills & Expertise
      </motion.h2>
      <div className="mx-auto max-w-4xl px-4">
        {skills.map((category, index) => (
          <motion.div
            key={category.name}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold">{category.name}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.items.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-lg border border-stone-800 bg-stone-900/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-stone-400">
                      {getLevel(skill.proficiency)}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-stone-800">
                    <div
                      className="h-2 rounded-full bg-stone-300"
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
