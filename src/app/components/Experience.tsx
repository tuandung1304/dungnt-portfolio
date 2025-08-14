'use client'
import { EXPERIENCES } from '@/app/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

export default function Experience() {
  return (
    <div className="mt-20 pb-4">
      <motion.h2
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-12 text-center text-4xl tracking-wider">
        Experience
      </motion.h2>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4">
              <p className="mb-2 text-sm text-stone-400">{experience.year}</p>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4">
              <h3 className="font-semibold">
                {experience.role} -{' '}
                <span className="text-sm text-stone-500">
                  {experience.company}
                </span>
              </h3>
              <Link
                href={experience.production}
                target="_blank"
                className="text-stone-500 hover:underline">
                {experience.production}
              </Link>
              <p className="text-stone-400">{experience.description}</p>
              <div className="flex flex-wrap">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-4 rounded bg-stone-900 px-2 py-1 text-sm font-medium text-stone-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
