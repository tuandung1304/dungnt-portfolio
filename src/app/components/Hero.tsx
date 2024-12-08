import { HERO_CONTENT } from '@/app/constants'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="pb-4 mb-16 lg:mb-36">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col items-center lg:items-start mt-10">
            <h2 className="pb-2 text-4xl tracking-tighter lg:text-7xl">
              Tuan Dung Nguyen
            </h2>
            <span className="bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-xl tracking-tight text-transparent">
              Fullstack developer
            </span>
            <p className="my-2 py-6 text-xl leading-relaxed tracking-tighter">
              {HERO_CONTENT}
            </p>
            <Link
              href="dungnt-fullstack-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-white rounded-full p-4 text-sm text-stone-800">
              Download resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
