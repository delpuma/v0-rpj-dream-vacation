"use client"

import { useEffect, useState } from "react"
import { MailIcon } from "lucide-react"

export function EmailLink() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Build email client-side to prevent Cloudflare email obfuscation
    // which causes React hydration mismatch (error #418)
    setEmail(["rpjohnson", "dreamvacations.com"].join("@"))
  }, [])

  if (!email) {
    return (
      <span className="flex items-center gap-2 text-sm text-blue-200">
        <MailIcon className="h-4 w-4 flex-shrink-0" />
        <span>Email Richard</span>
      </span>
    )
  }

  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-2 text-sm text-blue-200 hover:text-white hover:underline"
    >
      <MailIcon className="h-4 w-4 flex-shrink-0" />
      <span>{email}</span>
    </a>
  )
}
