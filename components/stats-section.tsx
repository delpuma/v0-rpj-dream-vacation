"use client"

import { useEffect, useRef, useState } from "react"
import { Phone } from "lucide-react"
import { AGENT_INFO } from "@/lib/pseo-data"

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1500
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return <div ref={ref}>{count}{suffix}</div>
}

export function StatsSection() {
  return (
    <section className="w-full py-14 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center max-w-4xl mx-auto">
          <div className="animate-fade-up">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400">$<AnimatedNumber target={0} /></p>
            <p className="text-sm text-gray-400 mt-2">Planning Fees</p>
            <p className="text-xs text-gray-500">Always Free</p>
          </div>
          <div className="animate-fade-up delay-100">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400"><AnimatedNumber target={24} />hr</p>
            <p className="text-sm text-gray-400 mt-2">Response Time</p>
            <p className="text-xs text-gray-500">Guaranteed</p>
          </div>
          <div className="animate-fade-up delay-200">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400"><AnimatedNumber target={14} suffix="+" /></p>
            <p className="text-sm text-gray-400 mt-2">Cruise Lines</p>
            <p className="text-xs text-gray-500">Certified Specialist</p>
          </div>
          <div className="animate-fade-up delay-300">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold">5★</p>
            <p className="text-sm text-gray-400 mt-2">Client Rating</p>
            <p className="text-xs text-gray-500">Verified Reviews</p>
          </div>
        </div>
        <div className="text-center mt-10">
          <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors text-lg">
            <Phone className="w-5 h-5" />
            Call {AGENT_INFO.phone} — Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
