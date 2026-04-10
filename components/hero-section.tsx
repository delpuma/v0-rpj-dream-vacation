import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="/romantic-beach-walk.png"
        alt="Couple walking on a tropical beach at sunset — Dream Vacations by Richard Johnson, travel agent in Winter Garden FL"
        fill
        sizes="100vw"
        priority
        quality={85}
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 px-4 md:px-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Your Dream Vacation Starts Here
        </h1>
        <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-2xl font-medium drop-shadow-md">
          Richard Johnson & Travel Advisors Group — your expert travel agent in Winter Garden, FL, crafting personalized cruises, all-inclusive resorts, honeymoons & family vacations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="#contact">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base px-6 py-2 md:text-lg md:px-8 md:py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Get a Free Quote
            </Button>
          </Link>
          <Link
            href="tel:+14079512398"
            className="text-white text-base md:text-lg font-medium hover:underline flex items-center gap-2"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>Call Now: (407) 951-2398</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
