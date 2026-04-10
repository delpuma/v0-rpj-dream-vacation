import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { DESTINATIONS, TRIP_TYPES, CRUISE_LINES, AGENT_INFO } from "@/lib/pseo-data"
import { MapPin, Ship, Compass, Anchor } from "lucide-react"

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
        "@type": "ListItem",
        position: i + 1,
        name: `${d.name} Vacation Packages`,
        url: `${SITE}/trips/${d.slug}`,
      })),
      ...TRIP_TYPES.map((t, i) => ({
        "@type": "ListItem",
        position: DESTINATIONS.length + i + 1,
        name: `${t.name} Packages`,
        url: `${SITE}/trips/${t.slug}`,
      })),
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Explore Vacation Packages & Trip Ideas
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Browse destinations, cruise lines, and trip types. {AGENT_INFO.name}{" "}
              will craft the perfect vacation for you.
            </p>
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

        {/* Destinations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Destinations
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/trips/${dest.slug}`}
                  className="p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <span className="text-gray-900 group-hover:text-teal-600 font-medium">
                    {dest.name}
                  </span>
                  <span className="block text-sm text-gray-500 mt-1">
                    Vacation Packages →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trip Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Compass className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Trip Types
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TRIP_TYPES.map((tt) => (
                <Link
                  key={tt.slug}
                  href={`/trips/${tt.slug}`}
                  className="p-4 rounded-lg border border-gray-200 bg-white hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <span className="text-gray-900 group-hover:text-teal-600 font-medium">
                    {tt.name}
                  </span>
                  <span className="block text-sm text-gray-500 mt-1">
                    Browse Packages →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cruise Lines */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Anchor className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Cruise Lines
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CRUISE_LINES.map((cl) => (
                <Link
                  key={cl.slug}
                  href={`/trips/cruise-lines/${cl.slug}`}
                  className="p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <span className="text-gray-900 group-hover:text-teal-600 font-medium">
                    {cl.name}
                  </span>
                  <span className="block text-sm text-gray-500 mt-1">
                    View Cruises →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
