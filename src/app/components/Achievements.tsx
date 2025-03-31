'use client'
import { achievements } from '@/app/constants/achievements'
import { motion } from 'framer-motion'

export default function Achievements() {
  return (
    <div className="py-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl tracking-wider mb-12">
        Achievements & Certifications
      </motion.h2>
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-900/50 rounded-lg p-6 border border-stone-800 hover:border-stone-600 transition-colors">
              <div className="flex items-start gap-4">
                {achievement.icon && (
                  <div className="text-3xl text-stone-300">
                    {achievement.icon}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-stone-400 mb-2">{achievement.issuer}</p>
                  <p className="text-stone-300">{achievement.description}</p>
                  {achievement.date && (
                    <p className="text-stone-400 mt-2">{achievement.date}</p>
                  )}
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-300 hover:text-stone-100 mt-4 inline-block">
                      View Certificate →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
