"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneIcon, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[500px] max-h-[900px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background image with subtle zoom */}
      <Image
        src="/romantic-beach-walk.png"
        alt="Couple walking on a tropical beach at sunset — Dream Vacations by Richard Johnson, travel agent in Winter Garden FL"
        fill
        sizes="100vw"
        priority
        quality={75}
        className="absolute inset-0 z-0 object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoNxbhLtJbhIo1Z2Y9NssQB+nFUlAH//2Q=="
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 px-4 md:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-white/90">
            ✨ Your Trusted Travel Advisor in Winter Garden, FL
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] drop-shadow-lg mb-6">
          Luxury Vacations,{" "}
          <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Personally Crafted
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-200 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-8">
          Richard Johnson plans cruises, all-inclusive resorts, honeymoons & destination weddings — with exclusive deals and white-glove service. No fees, ever.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <Link href="#contact">
            <Button className="shimmer bg-teal-500 hover:bg-teal-400 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 h-auto">
              Get a Free Quote
            </Button>
          </Link>
          <Link
            href="tel:+14079512398"
            className="pulse-ring inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-base sm:text-lg font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>(407) 951-2398</span>
          </Link>
        </div>

        {/* Trust line */}
        <p className="animate-fade-up delay-400 text-sm text-white/60">
          CLIA Certified · Dream Vacations Franchise Owner · Serving Central Florida & Nationwide
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  )
}
