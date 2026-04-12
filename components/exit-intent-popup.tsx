"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Phone, Send } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

export function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 5 && !dismissed && !show) {
        // Check if already shown this session
        if (sessionStorage.getItem("exit-popup-shown")) return
        setShow(true)
        sessionStorage.setItem("exit-popup-shown", "1")
      }
    },
    [dismissed, show]
  )

  useEffect(() => {
    // Only on desktop — mobile uses the sticky phone bar
    if (window.innerWidth < 768) return
    // Don't show if already dismissed or submitted
    if (sessionStorage.getItem("exit-popup-shown")) return

    // Delay listener so it doesn't fire on initial page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 15000) // Wait 15s before arming

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseLeave])

  // Also show after 45 seconds of inactivity on page
  useEffect(() => {
    if (window.innerWidth < 768) return
    if (sessionStorage.getItem("exit-popup-shown")) return

    const timer = setTimeout(() => {
      if (!show && !dismissed) {
        setShow(true)
        sessionStorage.setItem("exit-popup-shown", "1")
      }
    }, 45000)

    return () => clearTimeout(timer)
  }, [show, dismissed])

  function close() {
    setShow(false)
    setDismissed(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourceSlug: "exit-intent-popup" }),
      })
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={close}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={close} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10" aria-label="Close popup">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-teal-700 px-6 py-5 text-white">
          <p className="text-sm font-medium text-teal-300 mb-1">Before you go...</p>
          <h2 className="text-xl font-bold">Get a Free Vacation Quote</h2>
          <p className="text-blue-100 text-sm mt-1">
            No fees, no obligation — {AGENT_INFO.name} will personally plan your dream trip.
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <Send className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-900 mb-1">Thank You!</p>
              <p className="text-gray-600 text-sm mb-4">Richard will reach out within 24 hours.</p>
              <a
                href={`tel:${AGENT_INFO.phoneTel}`}
                className="inline-flex items-center gap-2 text-teal-600 font-medium hover:underline"
              >
                <Phone className="w-4 h-4" /> Or call now: {AGENT_INFO.phone}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                type="text"
                required
                placeholder="Your name *"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address *"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone (optional)"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get My Free Quote →"}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Or call directly:{" "}
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="text-teal-600 font-medium hover:underline">
                  {AGENT_INFO.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
