import { Metadata } from "next"
import Link from "next/link"
import { neon } from "@neondatabase/serverless"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InlineLeadForm } from "@/components/inline-lead-form"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { AGENT_INFO } from "@/lib/pseo-data"
import { Phone, Ship, Hotel, Calendar, MapPin, Star, Tag } from "lucide-react"

export const revalidate = 3600
export const metadata: Metadata = {
  title: `Current Cruise & Vacation Deals | ${AGENT_INFO.name} — Travel Agent`,
  description: `Exclusive cruise deals, resort specials & vacation packages from ${AGENT_INFO.name}. Royal Caribbean, Viking, Sandals, Celebrity & more. Call ${AGENT_INFO.phone} for the latest pricing.`,
  alternates: { canonical: "/deals" },
}

interface Deal {
  id: number; title: string; slug: string; deal_type: string; cruise_line: string | null
  destination: string | null; ship_name: string | null; departure_port: string | null
  departure_date: string | null; nights: number | null; price_from: string | null
  price_original: string | null; cabin_type: string | null; inclusions: string[]
  highlights: string | null; is_featured: boolean; booking_url: string | null
}

async function getAllDeals(): Promise<Deal[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    return await sql`
      SELECT * FROM dreamvacations.featured_deals
      WHERE is_published = true AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY is_featured DESC, created_at DESC
    ` as Deal[]
  } catch { return [] }
}

export default async function DealsPage() {
  const deals = await getAllDeals()

  const schema = {
    "@context": "https://schema.org", "@type": "OfferCatalog",
    name: "Current Travel Deals & Specials",
    description: `Exclusive cruise and vacation deals from ${AGENT_INFO.name}`,
    provider: { "@type": "TravelAgency", name: AGENT_INFO.business, telephone: AGENT_INFO.phoneTel },
    itemListElement: deals.map((d) => ({
      "@type": "Offer", name: d.title,
      price: d.price_from, priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-teal-400 font-medium text-sm uppercase tracking-wider mb-3">Limited Time Offers</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Current Deals & Specials</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Exclusive pricing on cruises, resorts & vacation packages — available only through {AGENT_INFO.name}. Prices change frequently.
            </p>
            <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Call {AGENT_INFO.phone} for Latest Pricing
            </a>
          </div>
        </section>

        <nav className="bg-gray-50 border-b py-3" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-teal-600">Home</Link></li><li>/</li>
              <li className="text-gray-900 font-medium">Deals</li>
            </ol>
          </div>
        </nav>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {deals.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center py-12">
                <p className="text-gray-600 text-lg mb-4">New deals are being added — check back soon!</p>
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="text-teal-600 font-medium hover:underline">
                  Or call {AGENT_INFO.phone} for current specials
                </a>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-teal-600 text-xs font-medium uppercase tracking-wider mb-2">
                        {deal.deal_type === "cruise" || deal.deal_type === "river-cruise" ? <Ship className="w-4 h-4" /> : <Hotel className="w-4 h-4" />}
                        <span>{deal.cruise_line}</span>
                        {deal.is_featured && <span className="ml-auto bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">Featured</span>}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3">{deal.title}</h2>

                      <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                        {deal.ship_name && <div className="flex items-center gap-2"><Ship className="w-3.5 h-3.5 text-gray-400" />{deal.ship_name}</div>}
                        {deal.departure_port && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-400" />From {deal.departure_port}</div>}
                        {deal.nights && <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gray-400" />{deal.nights} nights{deal.departure_date ? ` · ${new Date(deal.departure_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}` : ""}</div>}
                      </div>

                      {deal.highlights && <p className="text-gray-500 text-sm mb-3">{deal.highlights}</p>}

                      {deal.inclusions?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {deal.inclusions.map((inc) => (
                            <span key={inc} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{inc}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-5 py-4 bg-gray-50 border-t flex items-center justify-between">
                      <div>
                        {deal.price_original && <span className="text-sm text-gray-400 line-through mr-2">${Number(deal.price_original).toLocaleString()}</span>}
                        {deal.price_from && <span className="text-2xl font-bold text-gray-900">${Number(deal.price_from).toLocaleString()}</span>}
                        {deal.cabin_type && <span className="text-xs text-gray-500 block">{deal.cabin_type} · per person</span>}
                      </div>
                      <a href={`tel:${AGENT_INFO.phoneTel}`} className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Call to Book
                      </a>
                    </div>
                    {deal.booking_url && (
                      <a href={deal.booking_url} target="_blank" rel="noopener noreferrer" className="block text-center text-xs text-teal-600 hover:underline mt-2 px-5 pb-3">
                        View full details on Dream Vacations →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <InlineLeadForm source="deals" heading="Want a Custom Deal?" subheading="Tell Richard what you're looking for and he'll find the best pricing available — often better than what's listed here." />
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
