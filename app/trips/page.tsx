import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { DESTINATIONS, TRIP_TYPES, CRUISE_LINES, AGENT_INFO } from "@/lib/pseo-data"
import { getDestinationImage, getTripTypeImage } from "@/lib/travel-images"
import { InlineLeadForm } from "@/components/inline-lead-form"
import { MapPin, Compass, Anchor, Phone } from "lucide-react"

const SITE = "https://traveladvisorsgroup.com"

export const metadata: Metadata = {
  title: `Vacation Packages & Trip Ideas | ${AGENT_INFO.name} — Travel Agent Winter Garden FL`,
  description: `Browse ${DESTINATIONS.length}+ destinations, ${CRUISE_LINES.length} cruise lines, and ${TRIP_TYPES.length} trip types. ${AGENT_INFO.name}, your travel agent in ${AGENT_INFO.location}, crafts personalized vacations. Call ${AGENT_INFO.phone}.`,
  alternates: { canonical: "/trips" },
}

export default function TripsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Trip Ideas", item: `${SITE}/trips` },
    ],
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vacation Destinations & Trip Ideas",
    description: `Browse vacation packages from ${AGENT_INFO.name}, travel agent in ${AGENT_INFO.location}`,
    numberOfItems: DESTINATIONS.length + TRIP_TYPES.length + CRUISE_LINES.length,
    itemListElement: [
      ...DESTINATIONS.slice(0, 20).map((d, i) => ({
        "@type": "ListItem", position: i + 1,
        name: `${d.name} Vacation Packages`, url: `${SITE}/trips/${d.slug}`,
      })),
      ...TRIP_TYPES.map((t, i) => ({
        "@type": "ListItem", position: DESTINATIONS.length + i + 1,
        name: `${t.name} Packages`, url: `${SITE}/trips/${t.slug}`,
      })),
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Header />
      <main className="flex-1">
        {/* Hero with background image */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-16 md:py-24 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="Tropical beach vacation destination"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Explore Vacation Packages & Trip Ideas
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
              {DESTINATIONS.length}+ destinations, {CRUISE_LINES.length} cruise lines, and {TRIP_TYPES.length} trip types.
              {" "}{AGENT_INFO.name} will craft the perfect vacation for you.
            </p>
            <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Call {AGENT_INFO.phone} for a Free Quote
            </a>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b py-3" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Trip Ideas</li>
            </ol>
          </div>
        </nav>

        {/* Featured Destinations — image cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">Explore the world's most popular vacation destinations — each with personalized planning from {AGENT_INFO.name}.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {DESTINATIONS.map((dest) => {
                const img = getDestinationImage(dest.slug)
                return (
                  <Link key={dest.slug} href={`/trips/${dest.slug}`} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-48">
                    <Image src={img.url} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white font-semibold text-sm md:text-base drop-shadow-md">{dest.name}</span>
                      <span className="block text-white/80 text-xs mt-0.5">Vacation Packages →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trip Types — image cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Compass className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">Trip Types</h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">From cruises and honeymoons to family vacations and adventure travel — find your perfect trip style.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TRIP_TYPES.map((tt) => {
                const img = getTripTypeImage(tt.slug)
                return (
                  <Link key={tt.slug} href={`/trips/${tt.slug}`} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-44">
                    <Image src={img.url} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white font-semibold text-sm md:text-base drop-shadow-md">{tt.name}</span>
                      <span className="block text-white/80 text-xs mt-0.5">Browse Packages →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cruise Lines */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Anchor className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cruise Lines</h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">{AGENT_INFO.name} is a certified specialist for all major cruise lines — ocean, river, and luxury.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CRUISE_LINES.map((cl) => (
                <Link key={cl.slug} href={`/trips/cruise-lines/${cl.slug}`} className="group p-5 rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all bg-white text-center">
                  <span className="text-gray-900 group-hover:text-teal-600 font-semibold text-base block mb-1">{cl.name}</span>
                  <span className="text-sm text-gray-500">View Cruises →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <InlineLeadForm source="trips" heading="Not Sure Where to Start?" subheading="Describe your dream vacation and Richard will create a personalized plan — free, no obligation." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Not Sure Where to Start?</h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">Call {AGENT_INFO.name} and describe your dream vacation — he'll handle the rest. Free consultation, no obligation.</p>
            <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors text-lg">
              <Phone className="w-5 h-5" /> {AGENT_INFO.phone}
            </a>
          </div>
        </section>
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
