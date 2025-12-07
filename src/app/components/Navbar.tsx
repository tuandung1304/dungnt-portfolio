import Link from 'next/link'
import { CgVercel } from 'react-icons/cg'
import { FaLinkedinIn } from 'react-icons/fa'
import { FaSquareUpwork } from 'react-icons/fa6'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex shrink-0 items-center">
        <Link href="/" aria-label="Home">
          <CgVercel className="text-7xl" />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 text-2xl">
        <Link
          href="https://www.linkedin.com/in/dungnt1304/"
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedinIn />
        </Link>
        <Link
          href="https://www.upwork.com/freelancers/~01fbeb8d18ec6533c2"
          target="_blank"
          rel="noopener noreferrer">
          <FaSquareUpwork />
        </Link>
      </div>
    </nav>
  )
}
