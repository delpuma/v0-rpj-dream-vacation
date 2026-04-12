import type { MetadataRoute } from "next"
import { neon } from "@neondatabase/serverless"
import { DESTINATIONS, TRIP_TYPES, CRUISE_LINES, SERVICE_AREAS } from "@/lib/pseo-data"

const BASE_URL = "https://www.traveladvisorsgroup.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const seen = new Set<string>()
  const all: MetadataRoute.Sitemap = []

  function add(
    url: string,
    priority: number,
    freq: "daily" | "weekly" | "monthly" = "weekly",
    lastMod?: Date
  ) {
    if (seen.has(url)) return
    seen.add(url)
    all.push({ url, lastModified: lastMod || now, changeFrequency: freq, priority })
  }

  // ── Core pages ──────────────────────────────────────────────────────────
  add(BASE_URL, 1.0, "daily")
  add(`${BASE_URL}/about`, 0.9, "monthly")
  add(`${BASE_URL}/services`, 0.9, "monthly")
  add(`${BASE_URL}/deals`, 0.9, "daily")
  add(`${BASE_URL}/trips`, 0.9, "weekly")
  add(`${BASE_URL}/blog`, 0.9, "daily")

  // ── Static blog page ────────────────────────────────────────────────────
  add(`${BASE_URL}/blog/culinary-adventures-2025`, 0.7, "monthly")

  // ── Dynamic blog posts from DB ──────────────────────────────────────────
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const posts = await sql`
      SELECT slug, published_at, updated_at
      FROM dreamvacations.blog_posts WHERE is_published = true
    `
    for (const p of posts) {
      const lastMod = p.updated_at ? new Date(p.updated_at as string) : p.published_at ? new Date(p.published_at as string) : now
      add(`${BASE_URL}/blog/${p.slug}`, 0.8, "weekly", lastMod)
    }
  } catch {}

  // ── City pages — static core ────────────────────────────────────────────
  for (const city of SERVICE_AREAS) {
    add(`${BASE_URL}/${city.slug}`, 0.9, "monthly")
  }

  // ── City pages — DB expanded ────────────────────────────────────────────
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const cities = await sql`SELECT slug FROM dreamvacations.city_pages WHERE is_published = true`
    for (const c of cities) add(`${BASE_URL}/${c.slug}`, 0.8, "monthly")
  } catch {}

  // ── Single destination pages ────────────────────────────────────────────
  for (const d of DESTINATIONS) add(`${BASE_URL}/trips/${d.slug}`, 0.8, "monthly")

  // ── Single trip type pages ──────────────────────────────────────────────
  for (const t of TRIP_TYPES) add(`${BASE_URL}/trips/${t.slug}`, 0.8, "monthly")

  // ── All brand/cruise line pages ─────────────────────────────────────────
  for (const c of CRUISE_LINES) add(`${BASE_URL}/trips/cruise-lines/${c.slug}`, 0.8, "monthly")

  // ── ALL destination × trip type combos ──────────────────────────────────
  for (const d of DESTINATIONS) {
    for (const t of TRIP_TYPES) {
      add(`${BASE_URL}/trips/${d.slug}/${t.slug}`, 0.7, "monthly")
    }
  }

  // ── Cruise line × destination combos ────────────────────────────────────
  // These MUST match generateStaticParams in app/trips/[...slug]/page.tsx exactly

  // Ocean cruise lines × ocean destinations
  const oceanCL = ["royal-caribbean", "norwegian-cruise-line", "carnival-cruise-line", "celebrity-cruises", "disney-cruise-line", "msc-cruises", "princess-cruises", "holland-america-line"]
  const oceanDest = ["caribbean", "mediterranean", "alaska", "bahamas", "bermuda", "mexico", "hawaii", "panama-canal", "northern-europe", "greece", "italy", "spain", "france"]
  for (const cl of oceanCL) for (const d of oceanDest) add(`${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7, "monthly")

  // Luxury cruise lines × premium destinations
  const luxCL = ["seabourn", "regent-seven-seas", "silversea", "oceania-cruises", "azamara-cruises", "explora-journeys", "ritz-carlton-yacht-collection", "seadream-yacht-club", "windstar-cruises", "atlas-ocean-voyages", "paul-gauguin-cruises", "ponant-yacht-cruises", "seacloud", "viking-ocean", "cunard", "virgin-voyages"]
  const luxDest = ["caribbean", "mediterranean", "alaska", "northern-europe", "panama-canal", "greece", "italy", "bermuda", "tahiti", "bora-bora", "galapagos", "norway", "iceland", "seychelles", "maldives"]
  for (const cl of luxCL) for (const d of luxDest) add(`${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7, "monthly")

  // River cruise lines × river destinations
  const riverCL = ["viking-river", "amawaterways", "uniworld", "avalon-waterways", "celebrity-river-cruises", "american-cruise-lines"]
  const riverDest = ["danube-river", "rhine-river", "europe-river-cruises", "france"]
  for (const cl of riverCL) for (const d of riverDest) add(`${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7, "monthly")

  // Resort brands × resort destinations
  const resortBrands = ["sandals-resorts", "beaches-resorts", "hyatt-inclusive-collection"]
  const resortDest = ["caribbean", "jamaica", "bahamas", "st-lucia", "aruba", "turks-and-caicos", "barbados", "cancun", "mexico", "punta-cana"]
  for (const b of resortBrands) for (const d of resortDest) add(`${BASE_URL}/trips/cruise-lines/${b}/${d}`, 0.7, "monthly")

  // Expedition cruise lines × expedition destinations
  const expCL = ["lindblad-expeditions", "hx-expeditions", "viking-expeditions", "ponant-yacht-cruises"]
  const expDest = ["galapagos", "alaska", "iceland", "norway", "northern-europe", "south-africa"]
  for (const cl of expCL) for (const d of expDest) add(`${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7, "monthly")

  // Luxury hotels × luxury destinations
  const hotelBrands = ["ritz-carlton", "four-seasons", "waldorf-astoria", "st-regis", "park-hyatt", "mandarin-oriental", "rosewood", "conrad-hotels"]
  const hotelDest = ["maldives", "bali", "hawaii", "maui", "santorini", "bora-bora", "dubai", "italy", "france", "greece", "seychelles", "cancun", "st-lucia"]
  for (const h of hotelBrands) for (const d of hotelDest) add(`${BASE_URL}/trips/cruise-lines/${h}/${d}`, 0.7, "monthly")

  // Tour operators × tour destinations
  const tourOps = ["abercrombie-and-kent", "tauck-tours", "national-geographic-tours", "g-adventures", "great-safaris"]
  const tourDest = ["south-africa", "galapagos", "italy", "greece", "costa-rica", "egypt", "japan", "australia", "new-zealand"]
  for (const op of tourOps) for (const d of tourDest) add(`${BASE_URL}/trips/cruise-lines/${op}/${d}`, 0.7, "monthly")

  return all
}
