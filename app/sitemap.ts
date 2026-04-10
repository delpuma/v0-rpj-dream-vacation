import type { MetadataRoute } from "next"
import { neon } from "@neondatabase/serverless"
import { DESTINATIONS, TRIP_TYPES, CRUISE_LINES, SERVICE_AREAS } from "@/lib/pseo-data"

const BASE_URL = "https://traveladvisorsgroup.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const seen = new Set<string>()

  function add(entries: MetadataRoute.Sitemap, url: string, priority: number, freq: "daily" | "weekly" | "monthly" = "weekly") {
    if (seen.has(url)) return
    seen.add(url)
    entries.push({ url, lastModified: now, changeFrequency: freq, priority })
  }

  const all: MetadataRoute.Sitemap = []

  // Core pages
  add(all, BASE_URL, 1)
  add(all, `${BASE_URL}/about`, 0.9, "monthly")
  add(all, `${BASE_URL}/trips`, 0.9)
  add(all, `${BASE_URL}/blog`, 0.9, "daily")
  add(all, `${BASE_URL}/blog/culinary-adventures-2025`, 0.7, "monthly")

  // Dynamic blog posts from DB
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const posts = await sql`SELECT slug FROM dreamvacations.blog_posts WHERE is_published = true`
    for (const p of posts) add(all, `${BASE_URL}/blog/${p.slug}`, 0.8)
  } catch {}

  // City pages — static core
  for (const city of SERVICE_AREAS) add(all, `${BASE_URL}/${city.slug}`, 0.9)

  // City pages — DB expanded
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const cities = await sql`SELECT slug FROM dreamvacations.city_pages WHERE is_published = true`
    for (const c of cities) add(all, `${BASE_URL}/${c.slug}`, 0.8)
  } catch {}

  // Single destination pages
  for (const d of DESTINATIONS) add(all, `${BASE_URL}/trips/${d.slug}`, 0.8)

  // Single trip type pages
  for (const t of TRIP_TYPES) add(all, `${BASE_URL}/trips/${t.slug}`, 0.8)

  // Cruise line pages
  for (const c of CRUISE_LINES) add(all, `${BASE_URL}/trips/cruise-lines/${c.slug}`, 0.8)

  // ALL destination × trip type combos (24 × 12 = 288)
  for (const d of DESTINATIONS) {
    for (const t of TRIP_TYPES) {
      add(all, `${BASE_URL}/trips/${d.slug}/${t.slug}`, 0.7)
    }
  }

  // Ocean cruise lines × ocean destinations
  const oceanCL = ["royal-caribbean", "norwegian-cruise-line", "carnival-cruise-line", "celebrity-cruises", "disney-cruise-line", "msc-cruises", "princess-cruises", "holland-america-line"]
  const oceanDest = ["caribbean", "mediterranean", "alaska", "bahamas", "bermuda", "mexico", "hawaii", "panama-canal", "northern-europe", "greece", "italy", "spain", "france"]
  for (const cl of oceanCL) for (const d of oceanDest) add(all, `${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7)

  // Luxury cruise lines × premium destinations
  const luxCL = ["seabourn", "viking"]
  const luxDest = ["caribbean", "mediterranean", "alaska", "northern-europe", "panama-canal", "greece", "italy", "bermuda"]
  for (const cl of luxCL) for (const d of luxDest) add(all, `${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7)

  // River cruise lines × river destinations
  const riverCL = ["viking", "amawaterways", "uniworld"]
  const riverDest = ["danube-river", "rhine-river", "europe-river-cruises", "france"]
  for (const cl of riverCL) for (const d of riverDest) add(all, `${BASE_URL}/trips/cruise-lines/${cl}/${d}`, 0.7)

  // Resort brands × resort destinations
  const resortBrands = ["sandals-resorts", "beaches-resorts"]
  const resortDest = ["caribbean", "jamaica", "bahamas", "st-lucia", "aruba", "turks-and-caicos"]
  for (const b of resortBrands) for (const d of resortDest) add(all, `${BASE_URL}/trips/cruise-lines/${b}/${d}`, 0.7)

  return all
}
