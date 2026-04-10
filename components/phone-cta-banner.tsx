import { Phone } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

export function PhoneCtaBanner({ text, variant = "default" }: { text?: string; variant?: "default" | "dark" | "gold" }) {
  const styles = {
    default: "bg-gradient-to-r from-teal-600 to-blue-600 text-white",
    dark: "bg-gray-900 text-white",
    gold: "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-gray-900",
  }

  return (
    <section className={`py-6 md:py-8 ${styles[variant]}`}>
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <p className="text-base md:text-lg font-medium">
          {text || `Ready to plan your dream vacation? Call ${AGENT_INFO.name} today.`}
        </p>
        <a
          href={`tel:${AGENT_INFO.phoneTel}`}
          className={`shimmer pulse-ring inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
            variant === "gold"
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white text-teal-700 hover:bg-teal-50"
          }`}
        >
          <Phone className="w-4 h-4" />
          {AGENT_INFO.phone}
        </a>
      </div>
    </section>
  )
}
