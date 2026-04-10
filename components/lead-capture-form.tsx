"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

interface LeadCaptureFormProps {
  destination?: string
  tripType?: string
  cruiseLine?: string
  sourceSlug: string
}

export function LeadCaptureForm({
  destination,
  tripType,
  cruiseLine,
  sourceSlug,
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          destination,
          tripType,
          cruiseLine,
          sourceSlug,
        }),
      })
      setSubmitted(true)
    } catch {
      // Still show success to not lose the lead
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="get-quote" className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Get Your Free {destination || tripType || cruiseLine || "Vacation"} Quote
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Ready to start planning? Fill out the form and {AGENT_INFO.name}{" "}
              will personally reach out within 24 hours with customized options
              for your dream trip.
            </p>

            <div className="space-y-4">
              <a
                href={`tel:${AGENT_INFO.phoneTel}`}
                className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{AGENT_INFO.phone}</span>
              </a>
              <a
                href={`${AGENT_INFO.corporateUrl}/vacation/contact/get-in-touch`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Send a Message</span>
              </a>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span>{AGENT_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl p-6 md:p-8 text-gray-900">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  {AGENT_INFO.name} will reach out to you within 24 hours to
                  discuss your {destination || tripType || "vacation"} plans.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold mb-2">
                  Request a Free Quote
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-dates" className="block text-sm font-medium text-gray-700 mb-1">
                      Travel Dates
                    </label>
                    <input
                      id="lead-dates"
                      name="travel_dates"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., June 2026"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-party" className="block text-sm font-medium text-gray-700 mb-1">
                      Party Size
                    </label>
                    <input
                      id="lead-party"
                      name="party_size"
                      type="number"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about your dream trip
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="What are you looking for in your perfect vacation?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Get My Free Quote"}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  No obligation. {AGENT_INFO.name} will personally respond
                  within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
