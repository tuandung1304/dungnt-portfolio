import React, { memo } from 'react'

interface MarkdownRendererProps {
  content: string
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parseMarkdown = (text: string): React.ReactNode[] => {
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
      // Xử lý headers
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

      // Xử lý list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        currentListItems.push(line.trim().substring(2))
        return
      }

      // Xử lý empty line
      if (line.trim() === '') {
        flushList()
        elements.push(<div key={`br-${index}`} className="h-2" />)
        return
      }

      // Xử lý paragraph
      flushList()
      elements.push(
        <p key={index} className="my-1 text-sm first:mt-0">
          {parseInlineMarkdown(line)}
        </p>,
      )
    })

    // Flush remaining items
    flushList()

    return elements
  }

  // Hàm để parse inline markdown (bold, italic, links, code)
  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = []
    let currentIndex = 0

    // Regex patterns for different markdown elements - sắp xếp theo độ ưu tiên
    const patterns = [
      { regex: /\*\*(.*?)\*\*/g, type: 'bold' },
      { regex: /(?:^|[^*])\*([^*]+?)\*(?:[^*]|$)/g, type: 'italic' },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
    ]

    // Tìm tất cả matches
    const matches: Array<{
      start: number
      end: number
      type: string
      content: string
      url?: string
    }> = []

    patterns.forEach(({ regex, type }) => {
      let match: RegExpExecArray | null
      const regexCopy = new RegExp(regex.source, regex.flags)
      while ((match = regexCopy.exec(text)) !== null) {
        // Kiểm tra xem match có bị overlap với match khác không
        const isOverlapping = matches.some(
          (existingMatch) =>
            match!.index < existingMatch.end &&
            match!.index + match![0].length > existingMatch.start,
        )

        if (!isOverlapping) {
          let start = match!.index
          let end = match!.index + match![0].length
          let content = match![1]

          // Điều chỉnh cho italic matches vì regex bao gồm thêm ký tự
          if (type === 'italic') {
            start += 1 // Bỏ qua ký tự đầu
            end -= 1 // Bỏ qua ký tự cuối
            content = match![1] // Content đã đúng
          }

          matches.push({
            start,
            end,
            type,
            content,
            url: type === 'link' ? match![2] : undefined,
          })
        }
      }
    })

    // Sắp xếp matches theo vị trí
    matches.sort((a, b) => a.start - b.start)

    // Render text với các markdown elements
    matches.forEach((match, index) => {
      // Thêm text trước match
      if (currentIndex < match.start) {
        elements.push(text.slice(currentIndex, match.start))
      }

      // Render match
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
        case 'link':
          elements.push(
            <a
              key={`link-${index}`}
              href={match.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 no-underline hover:underline dark:text-blue-400">
              {match.content}
            </a>,
          )
          break
      }

      currentIndex = match.end
    })

    // Thêm text còn lại
    if (currentIndex < text.length) {
      elements.push(text.slice(currentIndex))
    }

    return elements.length > 0 ? elements : [text]
  }

  return (
    <div className="markdown-content text-sm">{parseMarkdown(content)}</div>
  )
}

export default memo(MarkdownRenderer)
