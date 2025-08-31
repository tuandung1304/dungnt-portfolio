'use client'

import { education } from '@/app/constants/education'
import { motion } from 'framer-motion'

export default function Education() {
  return (
    <div className="py-20">
      <motion.h2
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Education
      </motion.h2>
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-8 last:mb-0">
              <div className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <span className="text-stone-400">{edu.period}</span>
                </div>
                <p className="mb-2 text-stone-400">{edu.school}</p>
                <p className="text-stone-300">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
