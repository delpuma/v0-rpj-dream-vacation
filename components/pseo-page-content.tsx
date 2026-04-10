"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Star, Shield, Award, Clock, CheckCircle } from "lucide-react"
import { AGENT_INFO, DESTINATIONS, TRIP_TYPES, CRUISE_LINES } from "@/lib/pseo-data"
import { getDestinationImage, getTripTypeImage, DEFAULT_TRAVEL_IMAGE } from "@/lib/travel-images"

interface PseoPageContentProps {
  h1: string
  destination?: string
  tripType?: string
  cruiseLine?: string
  sections: { heading: string; content: string }[]
  pageType: string
}

export function PseoPageContent({
  h1,
  destination,
  tripType,
  cruiseLine,
  sections,
  pageType,
}: PseoPageContentProps) {
  // Get hero image based on page context
  const destSlug = DESTINATIONS.find((d) => d.name === destination)?.slug
  const ttSlug = TRIP_TYPES.find((t) => t.name === tripType)?.slug
  const heroImage = destSlug ? getDestinationImage(destSlug) : ttSlug ? getTripTypeImage(ttSlug) : DEFAULT_TRAVEL_IMAGE

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20 md:py-28 overflow-hidden">
        <Image
          src={heroImage.url.replace("w=600&h=400", "w=1920&h=800")}
          alt={heroImage.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-teal-300 font-medium mb-3 text-sm uppercase tracking-wider">
              {AGENT_INFO.business}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {h1}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Expert travel planning by {AGENT_INFO.name} — your trusted travel
              advisor in {AGENT_INFO.location}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#get-quote"
                className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-colors"
              >
                Get a Free Quote
              </a>
              <a
                href={`tel:${AGENT_INFO.phoneTel}`}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call {AGENT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          {/* Visual Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link href="/trips" className="hover:text-teal-600">Trip Ideas</Link>
            {destination && (
              <>
                <span>/</span>
                <span className="text-gray-700 font-medium">{destination}</span>
              </>
            )}
            {tripType && (
              <>
                <span>/</span>
                <span className="text-gray-700 font-medium">{tripType}</span>
              </>
            )}
            {cruiseLine && !destination && (
              <>
                <span>/</span>
                <span className="text-gray-700 font-medium">{cruiseLine}</span>
              </>
            )}
          </nav>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span>Licensed & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              <span>Certified Travel Advisor</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>{AGENT_INFO.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Agent Card */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                <Image
                  src="/rj-headshot-2.jpg"
                  alt={AGENT_INFO.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {AGENT_INFO.name}
                </h2>
                <p className="text-teal-600 font-medium mb-2">
                  {AGENT_INFO.tagline}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Specializing in {destination || tripType || cruiseLine || "dream vacations"} — 
                  personalized service, exclusive deals, and expert guidance for
                  travelers in Central Florida and beyond.
                </p>
                <div className="flex flex-wrap gap-2">
                  {AGENT_INFO.expertise.slice(0, 4).map((exp) => (
                    <span
                      key={exp}
                      className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Content Sections */}
            {sections.map((section, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Why Choose a Travel Agent */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Use a Travel Agent Instead of Booking Online?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Personalized itineraries tailored to your preferences",
                  "Access to exclusive deals and upgrades not available online",
                  "Expert advice from someone who's been there",
                  "Save time — no more endless research and comparison",
                  "24/7 support before, during, and after your trip",
                  "Price match guarantee on most bookings",
                  "Complimentary travel insurance consultation",
                  "Group booking coordination and discounts",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call-to-Action Banner */}
            <div className="bg-teal-600 rounded-xl p-6 md:p-8 mt-12 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Book? Call {AGENT_INFO.name} Now
              </h2>
              <p className="text-teal-100 mb-4">
                Free consultation. No obligation. Expert advice.
              </p>
              <a
                href={`tel:${AGENT_INFO.phoneTel}`}
                className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                {AGENT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links — Related Pages */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Explore More Vacation Ideas
            </h2>

            {/* If on a destination page, show trip types for that destination */}
            {destination && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{destination} Trip Types</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TRIP_TYPES.filter((t) => t.name !== tripType).slice(0, 8).map((t) => {
                    const destSlug = DESTINATIONS.find((d) => d.name === destination)?.slug
                    return (
                      <Link key={t.slug} href={`/trips/${destSlug}/${t.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                        <span className="font-medium text-gray-900">{destination} {t.name}</span>
                        <span className="block text-xs text-gray-500 mt-1">View Packages →</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* If on a cruise line page, show destinations for that cruise line */}
            {cruiseLine && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{cruiseLine} Destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {DESTINATIONS.filter((d) => d.name !== destination).slice(0, 8).map((d) => {
                    const clSlug = CRUISE_LINES.find((c) => c.name === cruiseLine)?.slug
                    return (
                      <Link key={d.slug} href={`/trips/cruise-lines/${clSlug}/${d.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                        <span className="font-medium text-gray-900">{cruiseLine} {d.name}</span>
                        <span className="block text-xs text-gray-500 mt-1">View Cruises →</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Always show popular destinations and cruise lines */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Destinations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DESTINATIONS.filter((d) => d.name !== destination).slice(0, 8).map((d) => (
                  <Link key={d.slug} href={`/trips/${d.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                    <span className="font-medium text-gray-900">{d.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">Vacations →</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Cruise Lines</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CRUISE_LINES.filter((c) => c.name !== cruiseLine).slice(0, 8).map((c) => (
                  <Link key={c.slug} href={`/trips/cruise-lines/${c.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                    <span className="font-medium text-gray-900">{c.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">Cruises →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
