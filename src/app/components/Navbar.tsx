import { CONTACT } from '@/app/constants'
import Link from 'next/link'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex shrink-0 items-center">
        <Link
          href="/"
          aria-label="Home"
          className="text-2xl font-bold tracking-tight text-stone-200">
          ND<span className="text-blue-500">.</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 text-2xl">
        <Link
          href={`mailto:${CONTACT.email}`}
          aria-label="Email">
          <FiMail />
        </Link>
        <Link
          href="https://www.linkedin.com/in/dungnt1304/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn">
          <FaLinkedinIn />
        </Link>
      </div>
    </nav>
  )
}
