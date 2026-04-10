import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { AGENT_INFO } from "@/lib/pseo-data"
import { InlineLeadForm } from "@/components/inline-lead-form"
import { Phone, Ship, Hotel, Heart, Users, Compass, MapPin, Crown, Sailboat, Gift } from "lucide-react"

const SITE = "https://traveladvisorsgroup.com"

export const metadata: Metadata = {
  title: `Travel Services | ${AGENT_INFO.name} — Cruises, Resorts, Honeymoons & More`,
  description: `Explore travel services from ${AGENT_INFO.name} in ${AGENT_INFO.location}. Cruises, all-inclusive resorts, honeymoons, destination weddings, river cruises, family vacations, luxury travel & group trips. Call ${AGENT_INFO.phone}.`,
  alternates: { canonical: "/services" },
}

const SERVICES = [
  { slug: "cruise", name: "Ocean Cruises", icon: Ship, image: "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Sail the world's oceans with Royal Caribbean, Celebrity, Norwegian, Carnival, Princess, Holland America, MSC & more. Richard knows every ship class, cabin category, and itinerary — and consistently secures onboard credits, upgrades, and perks you won't find online.", highlights: ["Port Canaveral & Tampa departures", "Cabin selection expertise", "Price monitoring after booking", "Shore excursion recommendations", "Group cruise coordination"] },
  { slug: "all-inclusive-resort", name: "All-Inclusive Resorts", icon: Hotel, image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Sandals, Beaches, Secrets, Dreams, Excellence, Hyatt Ziva & more — stress-free vacations where meals, drinks, activities, and entertainment are all included. Richard matches you with the perfect resort based on your priorities.", highlights: ["Sandals & Beaches specialist", "Room category upgrades", "Resort credit perks", "Adults-only & family options", "Wedding & honeymoon packages"] },
  { slug: "honeymoon", name: "Honeymoons & Romance", icon: Heart, image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Your honeymoon is the most important trip you'll ever take. Richard designs once-in-a-lifetime romantic escapes to the Maldives, Bali, St. Lucia, Santorini, Bora Bora & beyond — with surprise touches that make it unforgettable.", highlights: ["Overwater bungalow bookings", "Complimentary honeymoon amenities", "Surprise romantic touches", "Multi-destination honeymoons", "Honeymoon registry setup"] },
  { slug: "destination-wedding", name: "Destination Weddings", icon: Heart, image: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Say 'I do' in paradise. Richard coordinates every detail — venue selection, guest room blocks, group rates, travel arrangements, welcome bags, and rehearsal dinners. He works directly with resort wedding coordinators.", highlights: ["Guest travel coordination", "Room block management", "Sandals WeddingMoon packages", "Vendor & venue liaison", "Rehearsal dinner planning"] },
  { slug: "river-cruise", name: "European River Cruises", icon: Sailboat, image: "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Viking, AmaWaterways, Uniworld — intimate ships, included excursions, and a new charming European town every day. Richard is a river cruise specialist who knows cabin placement, best routes, and optimal timing.", highlights: ["Danube, Rhine, Seine & Douro routes", "Cabin placement expertise", "Pre/post cruise extensions", "Christmas market sailings", "Wine & culinary themed cruises"] },
  { slug: "family-vacation", name: "Family Vacations", icon: Users, image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Balancing everyone's interests — from toddlers to grandparents — is what Richard does best. He knows which cruise lines have the best kids clubs, which resorts offer connecting rooms, and which destinations work for every age.", highlights: ["Disney Cruise Line specialist", "Multi-generational trip planning", "Kids-sail-free promotions", "Theme park + cruise combos", "Age-appropriate excursions"] },
  { slug: "luxury-travel", name: "Luxury Travel", icon: Crown, image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Seabourn, Regent Seven Seas, Silversea, Oceania, Four Seasons, Aman — Richard has relationships with luxury suppliers that unlock private tours, VIP access, and experiences money can't easily buy.", highlights: ["Ultra-luxury cruise specialist", "Suite upgrades & shipboard credits", "Private tour arrangements", "VIP airport transfers", "Concierge-level planning"] },
  { slug: "adventure-travel", name: "Adventure Travel", icon: Compass, image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "From Costa Rica zip-lining to Alaska glacier hiking to Galápagos wildlife encounters — Richard plans adventure trips that balance thrill with comfort and safety.", highlights: ["Costa Rica eco-adventures", "Alaska wilderness excursions", "Galápagos expeditions", "African safari planning", "Vetted safety operators"] },
  { slug: "group-travel", name: "Group Travel", icon: Users, image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Reunions, milestone birthdays, corporate retreats, friend group trips — Richard manages room blocks, group rates, shared excursions, and private events so you can enjoy the trip instead of playing coordinator.", highlights: ["Groups from 8 to 50+ travelers", "Volume discount negotiation", "Single point of contact", "Custom group excursions", "Private event coordination"] },
  { slug: "holiday-cruise", name: "Holiday & Seasonal Cruises", icon: Gift, image: "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop", description: "Christmas, New Year's, Thanksgiving at sea — holiday cruises sell out fast. Richard books 12-18 months ahead to secure the best cabins and pricing for festive sailings.", highlights: ["Christmas market river cruises", "New Year's Eve at sea", "Thanksgiving family cruises", "Spring break sailings", "Early booking advantages"] },
]

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service",
    provider: { "@type": "TravelAgency", name: AGENT_INFO.business, telephone: AGENT_INFO.phoneTel },
    serviceType: "Travel Planning",
    areaServed: { "@type": "State", name: "Florida" },
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: "Travel Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.description },
      })),
    },
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-blue-900 to-teal-700 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Travel Services</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">Expert vacation planning by {AGENT_INFO.name} — free consultations, exclusive deals, and white-glove service for every type of trip.</p>
            <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Call {AGENT_INFO.phone}
            </a>
          </div>
        </section>

        <nav className="bg-gray-50 border-b py-3" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-teal-600">Home</Link></li><li>/</li>
              <li className="text-gray-900 font-medium">Services</li>
            </ol>
          </div>
        </nav>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {SERVICES.map((service, i) => (
                <div key={service.slug} id={service.slug} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="w-full md:w-3/5">
                    <div className="flex items-center gap-3 mb-3">
                      <service.icon className="w-8 h-8 text-teal-600" />
                      <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/trips/${service.slug}`} className="text-sm bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-lg transition-colors font-medium">
                        Browse {service.name} →
                      </Link>
                      <a href={`tel:${AGENT_INFO.phoneTel}`} className="text-sm border border-teal-600 text-teal-700 hover:bg-teal-50 px-5 py-2 rounded-lg transition-colors font-medium flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Call {AGENT_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <InlineLeadForm source="services" heading="Tell Us About Your Dream Trip" subheading="Which service interests you? Richard will reach out with personalized options within 24 hours." />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Planning?</h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">Call {AGENT_INFO.name} for a free, no-obligation consultation. There's never a fee for Richard's expert planning services.</p>
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
