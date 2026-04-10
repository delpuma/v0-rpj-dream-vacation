"use client"

import { useState } from "react"
import { Phone, Send } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

interface InlineLeadFormProps {
  heading?: string
  subheading?: string
  source: string
  compact?: boolean
}

export function InlineLeadForm({ heading, subheading, source, compact = false }: InlineLeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourceSlug: source }),
      })
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <Send className="w-10 h-10 text-teal-600 mx-auto mb-3" />
        <p className="text-lg font-bold text-gray-900 mb-1">Thank You!</p>
        <p className="text-gray-600 text-sm">{AGENT_INFO.name} will reach out within 24 hours.</p>
        <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 text-teal-600 font-medium mt-3 hover:underline text-sm">
          <Phone className="w-4 h-4" /> Or call now: {AGENT_INFO.phone}
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-teal-700 rounded-xl p-6 md:p-8 text-white">
      <h3 className="text-xl font-bold mb-1">{heading || "Get a Free Vacation Quote"}</h3>
      <p className="text-blue-100 text-sm mb-4">{subheading || `${AGENT_INFO.name} will personally respond within 24 hours. No fees, no obligation.`}</p>
      <form onSubmit={handleSubmit} className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2"} gap-3`}>
        <input name="name" type="text" required placeholder="Your name *" className="px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 outline-none" />
        <input name="email" type="email" required placeholder="Email address *" className="px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 outline-none" />
        <input name="phone" type="tel" placeholder="Phone (optional)" className="px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 outline-none" />
        <input name="message" type="text" placeholder="What trip are you dreaming of?" className="px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 outline-none" />
        <button type="submit" disabled={loading} className="sm:col-span-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm">
          {loading ? "Sending..." : "Get My Free Quote →"}
        </button>
      </form>
      <p className="text-blue-200 text-xs mt-3 text-center">
        Or call directly: <a href={`tel:${AGENT_INFO.phoneTel}`} className="text-white font-medium hover:underline">{AGENT_INFO.phone}</a>
      </p>
    </div>
  )
}
