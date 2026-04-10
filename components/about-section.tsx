import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Shield, Star } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-teal-600 font-medium text-sm uppercase tracking-wider">Meet Your Travel Advisor</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Richard Johnson &<br />Travel Advisors Group
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Based in Winter Garden, FL, Richard Johnson is a CLIA certified travel advisor and Dream Vacations franchise owner who transforms travel dreams into extraordinary realities. From luxury cruises and all-inclusive resorts to honeymoons, destination weddings, and family vacations — every trip is personally crafted with expert knowledge and genuine care.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Richard's service is completely free — cruise lines and resorts pay his commission, not you. You get expert planning, exclusive deals, and a dedicated advocate who monitors pricing, handles logistics, and is available around the clock.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-sm bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-medium">
                <Award className="w-4 h-4" /> CLIA Certified
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
                <Shield className="w-4 h-4" /> Licensed & Bonded
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full font-medium">
                <Star className="w-4 h-4" /> 5-Star Rated
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/about">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full h-auto text-base">
                  Learn More About Richard →
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full h-auto text-base">
                  View Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/rj-headshot-2.jpg"
                alt="Richard Johnson, Dream Vacations travel advisor in Winter Garden FL"
                width={480}
                height={480}
                className="rounded-2xl shadow-2xl object-cover"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 animate-fade-up">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">14+ Cruise Lines</p>
                  <p className="text-xs text-gray-500">Certified Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
