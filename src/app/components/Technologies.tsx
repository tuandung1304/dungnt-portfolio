'use client'
import { technologies } from '@/app/constants/technologies'
import { Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const windowWidth = window.innerWidth
    const containerWidth = containerRef.current?.clientWidth
    if (!containerWidth) return

    const itemWidth = windowWidth > 640 ? 100 : windowWidth > 400 ? 70 : 56
    const gap = windowWidth > 640 ? 28 : 16

    const itemPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap))
    const totalRows = Math.ceil(technologies.length / itemPerRow)

    console.log(totalRows)
  }, [])

  return (
    <div className="lg:pb-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{
          opacity: 0,
          y: -100,
        }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl tracking-wider my-12">
        Technologies
      </motion.h2>
      <div
        ref={containerRef}
        className="max-w-4xl m-auto flex flex-wrap items-center justify-center gap-4 sm:gap-7">
        {technologies.map(({ name, Icon, color, url = '' }) => (
          <Tooltip
            key={name}
            enterDelay={500}
            title={<span className="text-sm">{name}</span>}>
            <Link href={url} target="_blank">
              <div style={{ color }} className="icon-container">
                <Icon className="text-7xl" />
                <div className="absolute w-10 h-10 opacity-35 bg-current rounded-full blur-[18px]" />
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
