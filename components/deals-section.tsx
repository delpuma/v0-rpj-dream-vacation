import Link from "next/link"
import { neon } from "@neondatabase/serverless"
import { AGENT_INFO } from "@/lib/pseo-data"
import { Phone, Ship, Hotel, Calendar, MapPin, Tag, Star, ArrowRight } from "lucide-react"

interface Deal {
  id: number
  title: string
  slug: string
  deal_type: string
  cruise_line: string | null
  destination: string | null
  ship_name: string | null
  departure_port: string | null
  departure_date: string | null
  nights: number | null
  price_from: string | null
  price_original: string | null
  cabin_type: string | null
  inclusions: string[]
  highlights: string | null
  is_featured: boolean
  booking_url: string | null
}

async function getFeaturedDeals(): Promise<Deal[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT id, title, slug, deal_type, cruise_line, destination, ship_name,
             departure_port, departure_date, nights, price_from, price_original,
             cabin_type, inclusions, highlights, is_featured, booking_url
      FROM dreamvacations.featured_deals
      WHERE is_published = true AND is_featured = true
        AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY created_at DESC
      LIMIT 6
    `
    return rows as Deal[]
  } catch {
    return []
  }
}

function DealIcon({ type }: { type: string }) {
  if (type === "cruise" || type === "river-cruise") return <Ship className="w-5 h-5" />
  if (type === "resort") return <Hotel className="w-5 h-5" />
  return <Star className="w-5 h-5" />
}

export async function DealsSection() {
  const deals = await getFeaturedDeals()
  if (deals.length === 0) return null

  return (
    <section className="w-full py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-teal-400 font-medium text-sm uppercase tracking-wider mb-2">Limited Time Offers</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Current Deals & Specials
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exclusive pricing available through {AGENT_INFO.name}. These deals change frequently — call for the latest availability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all group">
              {/* Header */}
              <div className="p-5 pb-3">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-medium uppercase tracking-wider mb-2">
                  <DealIcon type={deal.deal_type} />
                  <span>{deal.cruise_line || deal.deal_type}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors leading-tight">
                  {deal.title}
                </h3>
              </div>

              {/* Details */}
              <div className="px-5 pb-3 space-y-2 text-sm text-gray-300">
                {deal.ship_name && (
                  <div className="flex items-center gap-2">
                    <Ship className="w-3.5 h-3.5 text-gray-500" />
                    <span>{deal.ship_name}</span>
                  </div>
                )}
                {deal.departure_port && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>From {deal.departure_port}</span>
                  </div>
                )}
                {deal.nights && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{deal.nights} nights{deal.departure_date ? ` · ${new Date(deal.departure_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : ""}</span>
                  </div>
                )}
                {deal.highlights && (
                  <p className="text-gray-400 text-xs mt-1">{deal.highlights}</p>
                )}
              </div>

              {/* Inclusions */}
              {deal.inclusions?.length > 0 && (
                <div className="px-5 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {deal.inclusions.slice(0, 4).map((inc) => (
                      <span key={inc} className="text-xs bg-teal-900/50 text-teal-300 px-2 py-0.5 rounded-full">
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div className="px-5 py-4 bg-gray-800/50 border-t border-gray-700 flex items-center justify-between">
                <div>
                  {deal.price_original && (
                    <span className="text-sm text-gray-500 line-through mr-2">
                      ${Number(deal.price_original).toLocaleString()}
                    </span>
                  )}
                  {deal.price_from && (
                    <span className="text-2xl font-bold text-white">
                      ${Number(deal.price_from).toLocaleString()}
                    </span>
                  )}
                  {deal.cabin_type && (
                    <span className="text-xs text-gray-500 block">{deal.cabin_type} · per person</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${AGENT_INFO.phoneTel}`}
                    className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Book
                  </a>
                  {deal.booking_url && (
                    <a
                      href={deal.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      Details
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 space-y-3">
          <p className="text-gray-400 text-sm">
            Prices shown are starting rates and subject to availability. Call for the latest pricing and cabin options.
          </p>
          <a
            href={`tel:${AGENT_INFO.phoneTel}`}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            Call {AGENT_INFO.phone} for Exclusive Deals
          </a>
        </div>
      </div>
    </section>
  )
}
