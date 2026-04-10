import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { neon } from "@neondatabase/serverless"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { FaqSection } from "@/components/faq-section"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { SERVICE_AREAS, AGENT_INFO, TRIP_TYPES, CRUISE_LINES } from "@/lib/pseo-data"
import { MapPin, Phone, Star, Shield, Award, CheckCircle, Clock, Ship, Heart, Users } from "lucide-react"

const SITE = "https://traveladvisorsgroup.com"

export const revalidate = 3600
export const dynamicParams = true

interface CityData {
  name: string
  state: string
  slug: string
  zip: string | null
  lat: number
  lng: number
  nearby: readonly string[] | string[]
  intro_content?: string | null
}

// Try static data first, then DB
async function findCity(slug: string): Promise<CityData | null> {
  const staticCity = SERVICE_AREAS.find((c) => c.slug === slug)
  if (staticCity) return staticCity as unknown as CityData

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT name, state, slug, zip, lat, lng, nearby, intro_content FROM dreamvacations.city_pages WHERE slug = ${slug} AND is_published = true LIMIT 1`
    if (rows.length > 0) return rows[0] as CityData
  } catch {}
  return null
}

// Generate static params for core cities; DB cities use ISR
export async function generateStaticParams() {
  const staticParams = SERVICE_AREAS.map((city) => ({ citySlug: city.slug }))

  // Also try to get DB cities at build time
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const dbCities = await sql`SELECT slug FROM dreamvacations.city_pages WHERE is_published = true`
    const dbParams = dbCities.map((c) => ({ citySlug: c.slug as string }))
    const allSlugs = new Set(staticParams.map((p) => p.citySlug))
    for (const p of dbParams) {
      if (!allSlugs.has(p.citySlug)) staticParams.push(p)
    }
  } catch {}

  return staticParams
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>
}): Promise<Metadata> {
  const { citySlug } = await params
  const city = await findCity(citySlug)
  if (!city) return { title: "Not Found" }

  const title = `Travel Agent in ${city.name}, ${city.state} — ${AGENT_INFO.name} | Cruises, Resorts & Honeymoons`
  const description = `Looking for a travel agent in ${city.name}, ${city.state}? ${AGENT_INFO.name} specializes in cruises, all-inclusive resorts, honeymoons, destination weddings & family vacations. Free consultation — call ${AGENT_INFO.phone}.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/${city.slug}`,
      type: "website",
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>
}) {
  const { citySlug } = await params
  const city = await findCity(citySlug)
  if (!city) notFound()

  const fullLocation = `${city.name}, ${city.state}`

  // LocalBusiness schema for this city
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: AGENT_INFO.business,
    url: `${SITE}/${city.slug}`,
    telephone: AGENT_INFO.phoneTel,
    email: "rpjohnson@dreamvacations.com",
    description: `${AGENT_INFO.name} is a trusted travel agent serving ${fullLocation}. Specializing in cruises, all-inclusive resorts, honeymoons, destination weddings, river cruises & family vacations.`,
    image: `${SITE}/rj-headshot-2.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.zip,
      addressCountry: "US",
    },
    ...(city.lat && { geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng } }),
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.state },
    },
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
    ],
    sameAs: [AGENT_INFO.corporateUrl],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Who is the best travel agent in ${fullLocation}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${AGENT_INFO.name} of Dream Vacations is a top-rated travel agent serving ${fullLocation} and surrounding communities. Richard specializes in cruises, all-inclusive resorts, honeymoons, destination weddings, and family vacations. Call ${AGENT_INFO.phone} for a free consultation.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does a travel agent cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${AGENT_INFO.name}'s travel planning services are completely free. Travel suppliers pay the agent commission — you pay nothing extra. In many cases, Richard can secure better pricing and perks than booking online yourself.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${AGENT_INFO.name} offer cruise bookings from ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! Richard books cruises with all major lines including Royal Caribbean, Norwegian, Carnival, Celebrity, Viking, Seabourn, and more. ${city.name} residents benefit from easy access to Port Canaveral and Tampa cruise terminals. Call ${AGENT_INFO.phone} for cruise deals.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I meet with ${AGENT_INFO.name} in person in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. Richard is based in Winter Garden, FL and serves clients throughout ${city.name} and Central Florida. He's available for in-person meetings, phone consultations, and video calls — whatever works best for you.`,
        },
      },
      {
        "@type": "Question",
        name: `What types of vacations can I book through a travel agent in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Richard plans cruises (ocean & river), all-inclusive resort stays at Sandals and Beaches, honeymoons, destination weddings, family vacations, luxury travel, group trips, and adventure travel to destinations worldwide.`,
        },
      },
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: `Travel Agent ${fullLocation}`, item: `${SITE}/${city.slug}` },
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-teal-300 font-medium mb-3 text-sm uppercase tracking-wider">
                {AGENT_INFO.business}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Travel Agent in {fullLocation}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {AGENT_INFO.name} — your trusted local travel advisor for cruises, all-inclusive resorts, honeymoons, destination weddings & family vacations in {city.name} and {city.nearby?.slice(0, 2).join(", ")}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#get-quote" className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-colors">
                  Get a Free Quote
                </a>
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
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
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-teal-600" /><span>Licensed & Bonded</span></div>
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /><span>5-Star Rated</span></div>
              <div className="flex items-center gap-2"><Award className="w-5 h-5 text-teal-600" /><span>CLIA Certified</span></div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-teal-600" /><span>Free Consultation</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-teal-600" /><span>Serving {city.name}</span></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Agent Card */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/rj-headshot-2.jpg" alt={`${AGENT_INFO.name}, travel agent serving ${fullLocation}`} width={128} height={128} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{AGENT_INFO.name}</h2>
                  <p className="text-teal-600 font-medium mb-2">Your Travel Agent in {fullLocation}</p>
                  <p className="text-gray-600 text-sm mb-3">{AGENT_INFO.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {AGENT_INFO.certifications.map((cert) => (
                      <span key={cert} className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full">{cert}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DB-sourced rich content (for expanded cities) */}
              {city.intro_content ? (
                <div
                  className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-teal-600 mb-10"
                  dangerouslySetInnerHTML={{ __html: city.intro_content }}
                />
              ) : (
              <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why {city.name} Residents Choose {AGENT_INFO.name} as Their Travel Agent
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Finding the right travel agent in {fullLocation} can make the difference between a good vacation and an extraordinary one. {AGENT_INFO.name} brings years of expertise, personal travel experience, and industry relationships that translate into better deals, exclusive perks, and stress-free planning for {city.name} families, couples, and groups. Unlike online booking engines, Richard provides hands-on, personalized service from your first call through your return home.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Travel Services Available in {city.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Ship, text: "Ocean & river cruises from Port Canaveral and Tampa" },
                  { icon: Heart, text: "Honeymoon & romantic getaway planning" },
                  { icon: Heart, text: "Destination wedding coordination" },
                  { icon: Users, text: "Family vacation & group travel planning" },
                  { icon: Star, text: "All-inclusive resort bookings (Sandals, Beaches & more)" },
                  { icon: Award, text: "Luxury travel & custom itineraries worldwide" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Convenient for {city.name} Travelers
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {city.state === "FL" ? (
                  `${city.name} residents enjoy easy access to Florida's major cruise departure ports — Port Canaveral is about an hour east, and Tampa's cruise terminal is roughly 90 minutes west. ${AGENT_INFO.name} helps ${city.name} travelers take full advantage of this proximity with last-minute cruise deals, drive-to-port packages, and pre-cruise hotel stays.`
                ) : (
                  `${AGENT_INFO.name} works with clients in ${city.name} and nationwide by phone and video call, providing the same personalized, white-glove service that local Central Florida clients enjoy. Whether you're planning from ${city.name} or anywhere else, Richard handles every detail — from flights and transfers to excursions and dining reservations.`
                )} Whether you're a first-time cruiser or a seasoned traveler, Richard's industry connections ensure you get the best experience at the best price.
              </p>
              </>
              )}

              {/* Why use a travel agent */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Use a Travel Agent in {city.name} Instead of Booking Online?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Free personalized service — no planning fees ever",
                    "Access to exclusive deals not available online",
                    "Price monitoring after booking — Richard rebooks if prices drop",
                    "24/7 support before, during, and after your trip",
                    "Expert advice from someone who's actually been there",
                    "Group booking coordination and volume discounts",
                    "Complimentary travel insurance consultation",
                    "One phone call handles everything — no endless research",
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div className="bg-teal-600 rounded-xl p-6 md:p-8 text-white text-center mb-10">
                <h2 className="text-2xl font-bold mb-3">Call Your {city.name} Travel Agent Now</h2>
                <p className="text-teal-100 mb-4">Free consultation · No obligation · Expert advice</p>
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors text-lg">
                  <Phone className="w-5 h-5" />
                  {AGENT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Trip Ideas — internal links */}
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Trip Ideas for {city.name} Travelers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {TRIP_TYPES.slice(0, 8).map((t) => (
                  <Link key={t.slug} href={`/trips/${t.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                    <span className="font-medium text-gray-900">{t.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">Packages →</span>
                  </Link>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Cruise Lines We Book</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {CRUISE_LINES.slice(0, 8).map((c) => (
                  <Link key={c.slug} href={`/trips/cruise-lines/${c.slug}`} className="p-3 rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all text-sm">
                    <span className="font-medium text-gray-900">{c.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">View Cruises →</span>
                  </Link>
                ))}
              </div>
              {/* Nearby city links */}
              {city.nearby && city.nearby.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Also Serving Nearby Communities</h3>
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_AREAS.filter((sa) => city.nearby?.includes(sa.name) && sa.slug !== city.slug).map((sa) => (
                      <Link key={sa.slug} href={`/${sa.slug}`} className="text-sm text-teal-600 hover:text-teal-800 hover:underline">
                        Travel Agent {sa.name}, {sa.state} →
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqSchema={faqSchema} />

        {/* Lead Capture */}
        <LeadCaptureForm
          destination={city.name}
          sourceSlug={city.slug}
        />
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
