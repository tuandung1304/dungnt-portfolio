'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false })

export default function ChatbotMount() {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const mount = () => setShouldMount(true)

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(mount, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }

    const id = window.setTimeout(mount, 1500)
    return () => window.clearTimeout(id)
  }, [])

  return shouldMount ? <Chatbot /> : null
}
