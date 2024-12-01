import { CONTACT } from '@/app/constants'
import Link from 'next/link'
import React from 'react'

export default function Contact() {
  return (
    <div className="border-t border-stone-900 pb-20">
      <h2 className="my-10 text-center text-4xl">Get in touch</h2>
      <div className="text-center tracking-tighter">
        <p className="my-4">{CONTACT.address}</p>
        <p className="my-4">{CONTACT.phoneNo}</p>
        <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>
      </div>
    </div>
  )
}
