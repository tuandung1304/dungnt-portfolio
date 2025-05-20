'use client'
import { technologies } from '@/app/constants/technologies'
import { Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="lg:pb-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{
          opacity: 0,
          y: -100,
        }}
        transition={{ duration: 0.5 }}
        className="my-12 text-center text-4xl tracking-wider">
        Technologies
      </motion.h2>
      <div
        ref={containerRef}
        className="m-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-7">
        {technologies.map(({ name, Icon, color, url = '' }) => (
          <Tooltip
            key={name}
            enterDelay={500}
            title={<span className="text-sm">{name}</span>}>
            <Link href={url} target="_blank">
              <div style={{ color }} className="icon-container">
                <Icon className="text-7xl" />
                <div className="absolute h-10 w-10 rounded-full bg-current opacity-35 blur-[18px]" />
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
