import { Phone } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

export function PhoneCtaBanner({ text }: { text?: string }) {
  return (
    <section className="py-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <p className="text-lg font-medium">
          {text || `Ready to plan your dream vacation? Call ${AGENT_INFO.name} today.`}
        </p>
        <a
          href={`tel:${AGENT_INFO.phoneTel}`}
          className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-6 py-2.5 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          {AGENT_INFO.phone}
        </a>
      </div>
    </section>
  )
}
