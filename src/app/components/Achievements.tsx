'use client'

import { achievements } from '@/app/constants/achievements'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Achievements() {
  return (
    <div className="py-20">
      <motion.h2
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-4xl tracking-wider">
        Certifications
      </motion.h2>
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border border-stone-800 bg-stone-900/50 p-6 transition-colors hover:border-stone-600">
              <div className="flex items-start gap-4">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  width={128}
                  height={128}
                  className="hidden md:block md:h-20 md:w-20"
                />
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {achievement.title}
                  </h3>
                  <p className="mb-2 text-stone-400">{achievement.issuer}</p>
                  <p className="text-stone-300">{achievement.description}</p>
                  <p className="mt-2 text-stone-400">
                    Issued on {achievement.date}
                  </p>
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-stone-300 hover:text-stone-100">
                    View Certificate →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
