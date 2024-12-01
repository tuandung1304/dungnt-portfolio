import { technologies } from '@/app/constants/technologies'
import { Tooltip } from '@mui/material'
import Link from 'next/link'

export default function Technologies() {
  return (
    <div className="pb-24">
      <h2 className="text-center text-5xl tracking-widest">What I do</h2>
      <div className="max-w-4xl m-auto flex flex-wrap items-center justify-center gap-8 mt-12">
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
