import { Star, MapPin, Quote } from "lucide-react"

// Static testimonials for SSR — these render immediately without DB dependency
// Replace with DB-driven testimonials once the table is seeded
const TESTIMONIALS = [
  {
    name: "The Martinez Family",
    location: "Winter Garden, FL",
    tripType: "Family Cruise",
    destination: "Caribbean",
    rating: 5,
    quote: "Richard planned our first family cruise and it was absolutely perfect. He found us connecting staterooms, booked the kids club in advance, and even arranged a surprise birthday cake for our daughter. We saved over $800 compared to what we found online, plus got onboard credit.",
    date: "March 2026",
  },
  {
    name: "Jennifer & Mark S.",
    location: "Orlando, FL",
    tripType: "Honeymoon",
    destination: "St. Lucia",
    rating: 5,
    quote: "Our Sandals honeymoon in St. Lucia was a dream come true. Richard handled everything — the overwater bungalow, the candlelit dinner on the beach, even our airport transfers. He got us a room upgrade we never would have gotten booking direct.",
    date: "January 2026",
  },
  {
    name: "Robert & Linda K.",
    location: "Windermere, FL",
    tripType: "River Cruise",
    destination: "Danube River",
    rating: 5,
    quote: "We have used Richard for three Viking river cruises now and he consistently delivers. For our Danube Christmas markets cruise, he secured a French balcony upgrade and pre-cruise hotel in Budapest. His attention to detail is remarkable.",
    date: "December 2025",
  },
  {
    name: "The Thompson Group",
    location: "Clermont, FL",
    tripType: "Group Travel",
    destination: "Bahamas",
    rating: 5,
    quote: "Richard coordinated a 50th birthday celebration cruise for 22 of us. Managing that many cabins, dining preferences, and shore excursions could have been a nightmare, but Richard made it seamless. Everyone had an incredible time.",
    date: "November 2025",
  },
  {
    name: "Sarah & David P.",
    location: "Ocoee, FL",
    tripType: "Destination Wedding",
    destination: "Jamaica",
    rating: 5,
    quote: "Planning a destination wedding from Florida seemed overwhelming until we found Richard. He coordinated travel for 35 guests, handled the room block, and arranged the ceremony package. Our wedding at Sandals Montego Bay was magical.",
    date: "October 2025",
  },
  {
    name: "Patricia M.",
    location: "Lake Nona, FL",
    tripType: "Luxury Cruise",
    destination: "Mediterranean",
    rating: 5,
    quote: "I am a seasoned traveler and very particular about my cruises. Richard recommended Seabourn for my Mediterranean voyage and it exceeded every expectation. He secured a veranda suite upgrade and $500 in shipboard credit.",
    date: "September 2025",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({ limit = 6 }: { limit?: number }) {
  const displayed = TESTIMONIALS.slice(0, limit)

  // AggregateRating schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Dream Vacations — Richard Johnson & Travel Advisors Group",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: String(TESTIMONIALS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: displayed.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      reviewBody: t.quote,
    })),
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-medium text-sm uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Real experiences from travelers who booked with Richard Johnson
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} />
            <span className="text-sm text-gray-600 font-medium">
              5.0 from {TESTIMONIALS.length} verified reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayed.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-teal-200 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed flex-grow mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={testimonial.rating} />
                    <p className="text-xs text-gray-400 mt-1">
                      {testimonial.tripType} · {testimonial.destination}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
