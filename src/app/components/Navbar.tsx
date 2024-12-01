import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaLinkedinIn } from 'react-icons/fa'
import logo from '../assets/raviKumarLogo.webp'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex shrink-0 items-center">
        <Link href="/" aria-label="Home">
          <Image
            src={logo}
            className="mx-2"
            width={50}
            height={33}
            alt="logo"
          />
        </Link>
      </div>
      <div className="mx-8 flex items-center justify-center gap-4 text-2xl">
        <Link
          href={'https://www.linkedin.com/in/dungnt1304/'}
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedinIn />
        </Link>
        <Link
          href={'https://www.facebook.com/tuandung.ptit/'}
          target="_blank"
          rel="noopener noreferrer">
          <FaFacebook />
        </Link>
      </div>
    </nav>
  )
}
