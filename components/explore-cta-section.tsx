import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PhoneIcon } from "lucide-react"

export function ExploreCtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
      <div className="container mx-auto px-4 md:px-6 space-y-6 flex flex-col items-center">
        <Image
          src="/rj-headshot-2.jpg"
          alt="Richard Johnson, Dream Vacations travel advisor in Winter Garden FL"
          width={150}
          height={150}
          className="rounded-full border-4 border-white shadow-lg mb-4"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-md">
          Ready to Plan Your Dream Vacation?
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl drop-shadow-sm">
          Richard Johnson and his team are dedicated to crafting personalized, unforgettable journeys. With expert
          knowledge and a passion for exploration, every detail is handled — so you can focus on the excitement.
          Call today or browse trip ideas to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="tel:+14079512398">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              Call (407) 951-2398
            </Button>
          </Link>
          <Link href="/trips">
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300">
              Browse Trip Ideas
            </Button>
          </Link>
        </div>
        <p className="text-sm text-blue-100 mt-2">
          Free consultation · No planning fees · Serving Winter Garden, Orlando & all of Central Florida
        </p>
      </div>
    </section>
  )
}
