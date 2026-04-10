import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { AGENT_INFO } from "@/lib/pseo-data"
import { Phone, MapPin, Award, Shield, Star, CheckCircle, Ship, Heart, Users, Compass } from "lucide-react"

const SITE = "https://traveladvisorsgroup.com"

export const metadata: Metadata = {
  title: `About ${AGENT_INFO.name} — Travel Agent Winter Garden FL | Dream Vacations`,
  description: `Meet ${AGENT_INFO.name}, your trusted travel advisor in ${AGENT_INFO.location}. CLIA certified, Dream Vacations franchise owner. Specializing in cruises, resorts, honeymoons & destination weddings. Call ${AGENT_INFO.phone}.`,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AGENT_INFO.name,
    jobTitle: "Travel Advisor & Franchise Owner",
    url: `${SITE}/about`,
    image: `${SITE}/rj-headshot-2.jpg`,
    telephone: AGENT_INFO.phoneTel,
    worksFor: { "@type": "Organization", name: AGENT_INFO.business, url: SITE },
    address: { "@type": "PostalAddress", addressLocality: "Winter Garden", addressRegion: "FL", addressCountry: "US" },
    knowsAbout: ["Cruise Vacations", "All-Inclusive Resorts", "Honeymoon Planning", "Destination Weddings", "River Cruises", "Family Vacations", "Luxury Travel"],
    memberOf: { "@type": "Organization", name: "CLIA — Cruise Lines International Association" },
    sameAs: [AGENT_INFO.corporateUrl],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About {AGENT_INFO.name}</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">Your trusted travel advisor in {AGENT_INFO.location}</p>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b py-3" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">About</li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Profile Card */}
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-shrink-0">
                  <Image src="/rj-headshot-2.jpg" alt={`${AGENT_INFO.name}, Dream Vacations travel advisor in Winter Garden FL`} width={280} height={280} className="rounded-xl shadow-lg object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{AGENT_INFO.name}</h2>
                  <p className="text-teal-600 font-medium mb-1">Travel Advisor & Franchise Owner</p>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin className="w-4 h-4" /> {AGENT_INFO.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {AGENT_INFO.certifications.map((c) => (
                      <span key={c} className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full flex items-center gap-1"><Award className="w-3 h-3" />{c}</span>
                    ))}
                  </div>
                  <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors font-medium">
                    <Phone className="w-4 h-4" /> Call {AGENT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="prose prose-lg prose-gray max-w-none mb-12">
                <h2>Meet Your Travel Advisor</h2>
                <p>{AGENT_INFO.bio}</p>
                <p>Richard's approach is simple: listen first, then plan. Every vacation he designs starts with a conversation about what matters most to you — your travel style, budget, must-see destinations, and the experiences you want to have. From there, he leverages his deep industry relationships with cruise lines, resort brands, and tour operators to build a custom package that maximizes your experience and value.</p>
                <p>Unlike online booking engines that treat you like a transaction, Richard provides genuine, hands-on service from your first call through your return home. He monitors pricing after booking and rebooks if rates drop. He coordinates every detail — flights, transfers, excursions, dining reservations, special celebrations. And if anything changes during your trip, he's available around the clock to help.</p>

                <h2>Specialties & Expertise</h2>
                <p>Richard has built deep expertise across the most popular vacation categories:</p>
              </div>

              {/* Specialties Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: Ship, title: "Ocean Cruises", desc: "Royal Caribbean, Celebrity, Norwegian, Carnival, Princess, Holland America, MSC, and more. Richard knows every ship class and itinerary." },
                  { icon: Ship, title: "River Cruises", desc: "Viking, AmaWaterways, Uniworld on the Danube, Rhine, Seine, and Douro. Intimate, destination-focused journeys through Europe." },
                  { icon: Star, title: "Luxury Cruises", desc: "Seabourn, Regent Seven Seas, Silversea, Oceania. Ultra-premium experiences with all-suite accommodations." },
                  { icon: Heart, title: "Honeymoons & Romance", desc: "Maldives, Bali, St. Lucia, Santorini, Bora Bora. Richard crafts once-in-a-lifetime romantic getaways." },
                  { icon: Heart, title: "Destination Weddings", desc: "Caribbean, Mexico, Hawaii, Europe. Full coordination from venue selection to guest travel logistics." },
                  { icon: Shield, title: "All-Inclusive Resorts", desc: "Sandals, Beaches, Secrets, Dreams, Excellence. Stress-free vacations where everything is included." },
                  { icon: Users, title: "Family & Group Travel", desc: "Multi-generational trips, reunions, corporate retreats. Richard handles the complexity so everyone has fun." },
                  { icon: Compass, title: "Adventure & Custom Travel", desc: "Costa Rica, Alaska, Africa, Galápagos. Fully customized itineraries for the adventurous spirit." },
                ].map((s) => (
                  <div key={s.title} className="bg-gray-50 rounded-xl p-5 flex gap-4">
                    <s.icon className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-gray-600 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Free */}
              <div className="bg-teal-50 rounded-xl p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Is Richard's Service Free?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">As a Dream Vacations franchise owner, Richard is compensated by travel suppliers — cruise lines, resorts, and tour operators pay a commission when he books on your behalf. You pay the same price (or often less) than booking direct, and you get expert, personalized service at no additional cost.</p>
                <p className="text-gray-700 leading-relaxed">Dream Vacations is a division of World Travel Holdings, the largest vacation retailer in the United States. This gives Richard access to exclusive deals, group rates, and supplier relationships that independent travelers simply can't access on their own.</p>
              </div>

              {/* Service Area */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Area</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Richard is based in Winter Garden, FL and primarily serves travelers throughout Central Florida — including Orlando, Windermere, Ocoee, Clermont, Kissimmee, and surrounding communities. He also works with clients nationwide by phone and video call.</p>
                <div className="flex flex-wrap gap-2">
                  {["Winter Garden", "Orlando", "Windermere", "Ocoee", "Clermont", "Kissimmee", "Lake Nona", "Dr. Phillips", "Celebration", "Winter Park", "Apopka", "Davenport"].map((city) => (
                    <span key={city} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{city}, FL</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 md:p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">Ready to Start Planning?</h2>
                <p className="text-blue-100 mb-4">Call Richard for a free, no-obligation consultation. There's never a fee for his expert planning services.</p>
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg">
                  <Phone className="w-5 h-5" /> {AGENT_INFO.phone}
                </a>
              </div>
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
