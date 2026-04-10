"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqSectionProps {
  faqSchema: {
    mainEntity: {
      name: string
      acceptedAnswer: { text: string }
    }[]
  }
}

export function FaqSection({ faqSchema }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqSchema.mainEntity?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.name}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
