"use client"

import { Phone } from "lucide-react"

export function MobilePhoneBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-teal-600 text-white safe-area-pb">
      <a
        href="tel:+14079512398"
        className="flex items-center justify-center gap-2 py-3.5 font-semibold text-base active:bg-teal-700 transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call Richard — (407) 951-2398
      </a>
    </div>
  )
}
