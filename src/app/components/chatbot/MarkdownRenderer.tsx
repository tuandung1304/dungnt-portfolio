import React, { memo, useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
}

const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|\/|#)/i

function safeHref(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null
  if (!SAFE_URL_PATTERN.test(trimmed)) return null
  return trimmed
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const rendered = useMemo(() => parseMarkdown(content), [content])

  return (
    <div className="markdown-content text-sm wrap-anywhere">{rendered}</div>
  )
}

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentListItems: string[] = []

  const flushList = () => {
    if (currentListItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-1 list-inside list-disc space-y-1">
          {currentListItems.map((item, index) => (
            <li key={index}>
              <span className="relative -left-1">
                {parseInlineMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>,
      )
      currentListItems = []
    }
  }

  lines.forEach((line, index) => {
    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={index} className="text-base font-semibold">
          {parseInlineMarkdown(line.substring(4))}
        </h3>,
      )
      return
    }

    if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={index} className="text-lg font-semibold">
          {parseInlineMarkdown(line.substring(3))}
        </h2>,
      )
      return
    }

    if (line.startsWith('# ')) {
      flushList()
      elements.push(
        <h1 key={index} className="text-xl font-bold">
          {parseInlineMarkdown(line.substring(2))}
        </h1>,
      )
      return
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      currentListItems.push(line.trim().substring(2))
      return
    }

    if (line.trim() === '') {
      flushList()
      elements.push(<div key={`br-${index}`} className="h-2" />)
      return
    }

    flushList()
    elements.push(
      <p key={index} className="my-1 text-sm first:mt-0">
        {parseInlineMarkdown(line)}
      </p>,
    )
  })

  flushList()

  return elements
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let currentIndex = 0

  const matches: Array<{
    start: number
    end: number
    type: 'bold' | 'italic' | 'link' | 'code'
    content: string
    url?: string
  }> = []

  const patterns: Array<{
    regex: RegExp
    type: 'bold' | 'italic' | 'link' | 'code'
  }> = [
    { regex: /\[([^\]]+)\]\(([^)\s]+)\)/g, type: 'link' },
    { regex: /\*\*([^*]+?)\*\*/g, type: 'bold' },
    { regex: /`([^`]+)`/g, type: 'code' },
    { regex: /(?<![*\w])\*([^*\n]+?)\*(?!\w)/g, type: 'italic' },
  ]

  patterns.forEach(({ regex, type }) => {
    const regexCopy = new RegExp(regex.source, regex.flags)
    let match: RegExpExecArray | null
    while ((match = regexCopy.exec(text)) !== null) {
      const start = match.index
      const end = match.index + match[0].length
      const overlaps = matches.some((m) => start < m.end && end > m.start)
      if (overlaps) continue

      matches.push({
        start,
        end,
        type,
        content: match[1],
        url: type === 'link' ? match[2] : undefined,
      })
    }
  })

  matches.sort((a, b) => a.start - b.start)

  matches.forEach((match, index) => {
    if (currentIndex < match.start) {
      elements.push(text.slice(currentIndex, match.start))
    }

    switch (match.type) {
      case 'bold':
        elements.push(
          <strong key={`bold-${index}`} className="font-semibold">
            {match.content}
          </strong>,
        )
        break
      case 'italic':
        elements.push(
          <em key={`italic-${index}`} className="italic">
            {match.content}
          </em>,
        )
        break
      case 'code':
        elements.push(
          <code
            key={`code-${index}`}
            className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-600">
            {match.content}
          </code>,
        )
        break
      case 'link': {
        const href = match.url ? safeHref(match.url) : null
        if (href) {
          elements.push(
            <a
              key={`link-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 no-underline hover:underline dark:text-blue-400">
              {match.content}
            </a>,
          )
        } else {
          elements.push(
            <span key={`link-${index}`}>{match.content}</span>,
          )
        }
        break
      }
    }

    currentIndex = match.end
  })

  if (currentIndex < text.length) {
    elements.push(text.slice(currentIndex))
  }

  return elements.length > 0 ? elements : [text]
}

export default memo(MarkdownRenderer)
