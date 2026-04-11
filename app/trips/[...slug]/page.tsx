import { Metadata } from "next"
import { notFound } from "next/navigation"
import { neon } from "@neondatabase/serverless"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PseoPageContent } from "@/components/pseo-page-content"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { FaqSection } from "@/components/faq-section"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { DESTINATIONS, TRIP_TYPES, CRUISE_LINES } from "@/lib/pseo-data"
import {
  generateTitle,
  generateMetaDescription,
  generateH1,
  generateSchemaMarkup,
  generateContentSections,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/pseo-content"

type PageType = "destination" | "trip-type" | "cruise-line" | "destination-trip-type" | "cruise-line-destination"

interface PageData {
  pageType: PageType
  destination?: string
  destinationSlug?: string
  tripType?: string
  tripTypeSlug?: string
  cruiseLine?: string
  cruiseLineSlug?: string
  slug: string
}

function resolvePageData(slugParts: string[]): PageData | null {
  const joined = slugParts.join("/")

  // Pattern: /trips/cruise-lines/{cruise-line}/{destination}
  if (slugParts[0] === "cruise-lines" && slugParts.length === 3) {
    const cl = CRUISE_LINES.find((c) => c.slug === slugParts[1])
    const dest = DESTINATIONS.find((d) => d.slug === slugParts[2])
    if (cl && dest) {
      return {
        pageType: "cruise-line-destination",
        cruiseLine: cl.name,
        cruiseLineSlug: cl.slug,
        destination: dest.name,
        destinationSlug: dest.slug,
        slug: joined,
      }
    }
  }

  // Pattern: /trips/cruise-lines/{cruise-line}
  if (slugParts[0] === "cruise-lines" && slugParts.length === 2) {
    const cl = CRUISE_LINES.find((c) => c.slug === slugParts[1])
    if (cl) {
      return {
        pageType: "cruise-line",
        cruiseLine: cl.name,
        cruiseLineSlug: cl.slug,
        slug: joined,
      }
    }
  }

  // Pattern: /trips/{destination}/{trip-type}
  if (slugParts.length === 2 && slugParts[0] !== "cruise-lines") {
    const dest = DESTINATIONS.find((d) => d.slug === slugParts[0])
    const tt = TRIP_TYPES.find((t) => t.slug === slugParts[1])
    if (dest && tt) {
      return {
        pageType: "destination-trip-type",
        destination: dest.name,
        destinationSlug: dest.slug,
        tripType: tt.name,
        tripTypeSlug: tt.slug,
        slug: joined,
      }
    }
    // Could also be destination only with extra segment
  }

  // Pattern: /trips/{destination} or /trips/{trip-type}
  if (slugParts.length === 1) {
    const dest = DESTINATIONS.find((d) => d.slug === slugParts[0])
    if (dest) {
      return {
        pageType: "destination",
        destination: dest.name,
        destinationSlug: dest.slug,
        slug: joined,
      }
    }
    const tt = TRIP_TYPES.find((t) => t.slug === slugParts[0])
    if (tt) {
      return {
        pageType: "trip-type",
        tripType: tt.name,
        tripTypeSlug: tt.slug,
        slug: joined,
      }
    }
  }

  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const pageData = resolvePageData(slug)
  if (!pageData) return { title: "Not Found" }

  const title = generateTitle(pageData)
  const description = generateMetaDescription(pageData)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/trips/${pageData.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = []

  // Single destination pages (24)
  for (const dest of DESTINATIONS) {
    paths.push({ slug: [dest.slug] })
  }

  // Single trip type pages (12)
  for (const tt of TRIP_TYPES) {
    paths.push({ slug: [tt.slug] })
  }

  // Cruise line pages (14)
  for (const cl of CRUISE_LINES) {
    paths.push({ slug: ["cruise-lines", cl.slug] })
  }

  // ALL destination × trip type combos (24 × 12 = 288)
  // Every combination is a valid search query someone might use
  for (const dest of DESTINATIONS) {
    for (const tt of TRIP_TYPES) {
      paths.push({ slug: [dest.slug, tt.slug] })
    }
  }

  // ALL cruise line × destination combos where it makes sense
  // Ocean cruise lines × ocean destinations
  const oceanCruiseLines = ["royal-caribbean", "norwegian-cruise-line", "carnival-cruise-line", "celebrity-cruises", "disney-cruise-line", "msc-cruises", "princess-cruises", "holland-america-line"]
  const oceanDestinations = ["caribbean", "mediterranean", "alaska", "bahamas", "bermuda", "mexico", "hawaii", "panama-canal", "northern-europe", "greece", "italy", "spain", "france"]

  for (const cl of oceanCruiseLines) {
    for (const dest of oceanDestinations) {
      paths.push({ slug: ["cruise-lines", cl, dest] })
    }
  }

  // Luxury cruise lines × premium destinations
  const luxuryCruiseLines = ["seabourn", "regent-seven-seas", "silversea", "oceania-cruises", "azamara-cruises", "explora-journeys", "ritz-carlton-yacht-collection", "seadream-yacht-club", "windstar-cruises", "atlas-ocean-voyages", "paul-gauguin-cruises", "ponant-yacht-cruises", "seacloud", "viking-ocean", "cunard", "virgin-voyages"]
  const luxuryDestinations = ["caribbean", "mediterranean", "alaska", "northern-europe", "panama-canal", "greece", "italy", "bermuda", "tahiti", "bora-bora", "galapagos", "norway", "iceland", "seychelles", "maldives"]

  for (const cl of luxuryCruiseLines) {
    for (const dest of luxuryDestinations) {
      paths.push({ slug: ["cruise-lines", cl, dest] })
    }
  }

  // River cruise lines × river destinations
  const riverCruiseLines = ["viking-river", "amawaterways", "uniworld", "avalon-waterways", "celebrity-river-cruises", "american-cruise-lines"]
  const riverDestinations = ["danube-river", "rhine-river", "europe-river-cruises", "france"]

  for (const cl of riverCruiseLines) {
    for (const dest of riverDestinations) {
      paths.push({ slug: ["cruise-lines", cl, dest] })
    }
  }

  // Resort brands × resort destinations
  const resortBrands = ["sandals-resorts", "beaches-resorts", "hyatt-inclusive-collection"]
  const resortDestinations = ["caribbean", "jamaica", "bahamas", "st-lucia", "aruba", "turks-and-caicos", "barbados", "cancun", "mexico", "punta-cana"]

  for (const brand of resortBrands) {
    for (const dest of resortDestinations) {
      paths.push({ slug: ["cruise-lines", brand, dest] })
    }
  }

  // Expedition cruise lines × expedition destinations
  const expeditionLines = ["lindblad-expeditions", "hx-expeditions", "viking-expeditions", "ponant-yacht-cruises"]
  const expeditionDests = ["galapagos", "alaska", "iceland", "norway", "northern-europe", "south-africa"]

  for (const cl of expeditionLines) {
    for (const dest of expeditionDests) {
      paths.push({ slug: ["cruise-lines", cl, dest] })
    }
  }

  // Luxury hotels × luxury destinations
  const luxuryHotels = ["ritz-carlton", "four-seasons", "waldorf-astoria", "st-regis", "park-hyatt", "mandarin-oriental", "rosewood", "conrad-hotels"]
  const hotelDests = ["maldives", "bali", "hawaii", "maui", "santorini", "bora-bora", "dubai", "italy", "france", "greece", "seychelles", "cancun", "st-lucia"]

  for (const hotel of luxuryHotels) {
    for (const dest of hotelDests) {
      paths.push({ slug: ["cruise-lines", hotel, dest] })
    }
  }

  // Tour operators × tour destinations
  const tourOps = ["abercrombie-and-kent", "tauck-tours", "national-geographic-tours", "g-adventures", "great-safaris"]
  const tourDests = ["south-africa", "galapagos", "italy", "greece", "costa-rica", "egypt", "japan", "australia", "new-zealand"]

  for (const op of tourOps) {
    for (const dest of tourDests) {
      paths.push({ slug: ["cruise-lines", op, dest] })
    }
  }

  // Deduplicate
  const seen = new Set<string>()
  return paths.filter((p) => {
    const key = p.slug.join("/")
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}


export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const pageData = resolvePageData(slug)
  if (!pageData) notFound()

  const title = generateTitle(pageData)
  const description = generateMetaDescription(pageData)
  const h1 = generateH1(pageData)
  const sections = generateContentSections(pageData)
  const schemaMarkup = generateSchemaMarkup({
    ...pageData,
    title,
    description,
    url: `https://www.traveladvisorsgroup.com/trips/${pageData.slug}`,
  })
  const faqSchema = generateFaqSchema(pageData)
  const breadcrumbSchema = generateBreadcrumbSchema(pageData)

  // Track page view in DB (fire and forget)
  try {
    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      INSERT INTO dreamvacations.pseo_pages (page_type, slug, title, meta_description, h1, location, is_published, view_count)
      VALUES (${pageData.pageType}, ${pageData.slug}, ${title}, ${description}, ${h1}, ${"Winter Garden, FL"}, true, 1)
      ON CONFLICT (slug) DO UPDATE SET view_count = dreamvacations.pseo_pages.view_count + 1, last_updated = NOW()
    `
  } catch {
    // Don't block render on analytics failure
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        <PseoPageContent
          h1={h1}
          destination={pageData.destination}
          tripType={pageData.tripType}
          cruiseLine={pageData.cruiseLine}
          sections={sections}
          pageType={pageData.pageType}
        />
        <FaqSection faqSchema={faqSchema} />
        <LeadCaptureForm
          destination={pageData.destination}
          tripType={pageData.tripType}
          cruiseLine={pageData.cruiseLine}
          sourceSlug={pageData.slug}
        />
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
