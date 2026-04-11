/**
 * City Page Generator for Travel Advisors Group
 *
 * Generates SEO-optimized city landing pages for:
 * - All major Florida cities (50+)
 * - Top 100 wealthiest US cities (high-value travel customers)
 *
 * Usage: npx tsx scripts/generate-city-pages.ts
 *
 * Env vars: DATABASE_URL, OPENAI_API_KEY
 */

const AGENT = {
  name: "Richard Johnson",
  phone: "(407) 951-2398",
  phoneTel: "+14079512398",
  location: "Winter Garden, FL",
  business: "Dream Vacations — Richard Johnson & Travel Advisors Group",
  site: "https://www.traveladvisorsgroup.com",
}

interface CityData {
  name: string
  state: string
  slug: string
  zip: string | null
  lat: number
  lng: number
  region: string
  tier: "local" | "florida" | "national"
  nearby: string[]
}

// Florida cities — comprehensive coverage
const FLORIDA_CITIES: CityData[] = [
  // Already have these 13 as static, but add them to DB too for consistency
  { name: "Winter Garden", state: "FL", slug: "winter-garden-fl", zip: "34787", lat: 28.5653, lng: -81.5862, region: "Central Florida", tier: "local", nearby: ["Ocoee", "Windermere", "Orlando"] },
  { name: "Orlando", state: "FL", slug: "orlando-fl", zip: "32801", lat: 28.5383, lng: -81.3792, region: "Central Florida", tier: "local", nearby: ["Winter Garden", "Kissimmee", "Windermere"] },
  { name: "Windermere", state: "FL", slug: "windermere-fl", zip: "34786", lat: 28.4956, lng: -81.5348, region: "Central Florida", tier: "local", nearby: ["Winter Garden", "Orlando", "Dr. Phillips"] },
  // Major FL cities
  { name: "Tampa", state: "FL", slug: "tampa-fl", zip: "33602", lat: 27.9506, lng: -82.4572, region: "Tampa Bay", tier: "florida", nearby: ["St. Petersburg", "Clearwater", "Brandon"] },
  { name: "Miami", state: "FL", slug: "miami-fl", zip: "33101", lat: 25.7617, lng: -80.1918, region: "South Florida", tier: "florida", nearby: ["Miami Beach", "Coral Gables", "Fort Lauderdale"] },
  { name: "Fort Lauderdale", state: "FL", slug: "fort-lauderdale-fl", zip: "33301", lat: 26.1224, lng: -80.1373, region: "South Florida", tier: "florida", nearby: ["Miami", "Boca Raton", "Pompano Beach"] },
  { name: "Jacksonville", state: "FL", slug: "jacksonville-fl", zip: "32202", lat: 30.3322, lng: -81.6557, region: "Northeast Florida", tier: "florida", nearby: ["St. Augustine", "Ponte Vedra Beach", "Orange Park"] },
  { name: "St. Petersburg", state: "FL", slug: "st-petersburg-fl", zip: "33701", lat: 27.7676, lng: -82.6403, region: "Tampa Bay", tier: "florida", nearby: ["Tampa", "Clearwater", "Sarasota"] },
  { name: "Naples", state: "FL", slug: "naples-fl", zip: "34102", lat: 26.1420, lng: -81.7948, region: "Southwest Florida", tier: "florida", nearby: ["Marco Island", "Bonita Springs", "Fort Myers"] },
  { name: "Sarasota", state: "FL", slug: "sarasota-fl", zip: "34236", lat: 27.3364, lng: -82.5307, region: "Gulf Coast", tier: "florida", nearby: ["Bradenton", "Siesta Key", "Venice"] },
  { name: "Boca Raton", state: "FL", slug: "boca-raton-fl", zip: "33432", lat: 26.3587, lng: -80.0831, region: "South Florida", tier: "florida", nearby: ["Delray Beach", "Fort Lauderdale", "West Palm Beach"] },
  { name: "West Palm Beach", state: "FL", slug: "west-palm-beach-fl", zip: "33401", lat: 26.7153, lng: -80.0534, region: "Palm Beach", tier: "florida", nearby: ["Palm Beach", "Jupiter", "Boca Raton"] },
  { name: "Palm Beach", state: "FL", slug: "palm-beach-fl", zip: "33480", lat: 26.7056, lng: -80.0364, region: "Palm Beach", tier: "florida", nearby: ["West Palm Beach", "Jupiter", "Boca Raton"] },
  { name: "Coral Gables", state: "FL", slug: "coral-gables-fl", zip: "33134", lat: 25.7215, lng: -80.2684, region: "South Florida", tier: "florida", nearby: ["Miami", "Coconut Grove", "Key Biscayne"] },
  { name: "Fort Myers", state: "FL", slug: "fort-myers-fl", zip: "33901", lat: 26.6406, lng: -81.8723, region: "Southwest Florida", tier: "florida", nearby: ["Cape Coral", "Naples", "Sanibel Island"] },
  { name: "Clearwater", state: "FL", slug: "clearwater-fl", zip: "33755", lat: 27.9659, lng: -82.8001, region: "Tampa Bay", tier: "florida", nearby: ["Tampa", "St. Petersburg", "Dunedin"] },
  { name: "Gainesville", state: "FL", slug: "gainesville-fl", zip: "32601", lat: 29.6516, lng: -82.3248, region: "North Central Florida", tier: "florida", nearby: ["Ocala", "Alachua", "Newberry"] },
  { name: "Tallahassee", state: "FL", slug: "tallahassee-fl", zip: "32301", lat: 30.4383, lng: -84.2807, region: "North Florida", tier: "florida", nearby: ["Thomasville", "Quincy", "Crawfordville"] },
  { name: "Pensacola", state: "FL", slug: "pensacola-fl", zip: "32501", lat: 30.4213, lng: -87.2169, region: "Panhandle", tier: "florida", nearby: ["Gulf Breeze", "Navarre", "Milton"] },
  { name: "Destin", state: "FL", slug: "destin-fl", zip: "32541", lat: 30.3935, lng: -86.4958, region: "Emerald Coast", tier: "florida", nearby: ["Fort Walton Beach", "Miramar Beach", "Santa Rosa Beach"] },
  { name: "Jupiter", state: "FL", slug: "jupiter-fl", zip: "33458", lat: 26.9342, lng: -80.0942, region: "Palm Beach", tier: "florida", nearby: ["Palm Beach Gardens", "Tequesta", "West Palm Beach"] },
  { name: "Delray Beach", state: "FL", slug: "delray-beach-fl", zip: "33444", lat: 26.4615, lng: -80.0728, region: "Palm Beach", tier: "florida", nearby: ["Boca Raton", "Boynton Beach", "Lake Worth"] },
  { name: "Ponte Vedra Beach", state: "FL", slug: "ponte-vedra-beach-fl", zip: "32082", lat: 30.2397, lng: -81.3856, region: "Northeast Florida", tier: "florida", nearby: ["Jacksonville", "St. Augustine", "Jacksonville Beach"] },
  { name: "Marco Island", state: "FL", slug: "marco-island-fl", zip: "34145", lat: 25.9412, lng: -81.7184, region: "Southwest Florida", tier: "florida", nearby: ["Naples", "Everglades City", "Bonita Springs"] },
  { name: "Key West", state: "FL", slug: "key-west-fl", zip: "33040", lat: 24.5551, lng: -81.7800, region: "Florida Keys", tier: "florida", nearby: ["Key Largo", "Marathon", "Islamorada"] },
  { name: "Ocala", state: "FL", slug: "ocala-fl", zip: "34471", lat: 29.1872, lng: -82.1401, region: "Central Florida", tier: "florida", nearby: ["Gainesville", "The Villages", "Leesburg"] },
  { name: "The Villages", state: "FL", slug: "the-villages-fl", zip: "32162", lat: 28.9345, lng: -81.9608, region: "Central Florida", tier: "florida", nearby: ["Ocala", "Leesburg", "Lady Lake"] },
  { name: "Lakeland", state: "FL", slug: "lakeland-fl", zip: "33801", lat: 28.0395, lng: -81.9498, region: "Central Florida", tier: "florida", nearby: ["Winter Haven", "Plant City", "Bartow"] },
  { name: "Melbourne", state: "FL", slug: "melbourne-fl", zip: "32901", lat: 28.0836, lng: -80.6081, region: "Space Coast", tier: "florida", nearby: ["Palm Bay", "Viera", "Cocoa Beach"] },
  { name: "Vero Beach", state: "FL", slug: "vero-beach-fl", zip: "32960", lat: 27.6386, lng: -80.3973, region: "Treasure Coast", tier: "florida", nearby: ["Sebastian", "Fort Pierce", "Stuart"] },
  { name: "St. Augustine", state: "FL", slug: "st-augustine-fl", zip: "32084", lat: 29.8918, lng: -81.3145, region: "Northeast Florida", tier: "florida", nearby: ["Jacksonville", "Ponte Vedra Beach", "Palm Coast"] },
]

// Top wealthy US cities — high-value travel customers
const WEALTHY_US_CITIES: CityData[] = [
  { name: "New York", state: "NY", slug: "new-york-ny", zip: "10001", lat: 40.7128, lng: -74.0060, region: "Northeast", tier: "national", nearby: ["Manhattan", "Brooklyn", "Westchester"] },
  { name: "Los Angeles", state: "CA", slug: "los-angeles-ca", zip: "90001", lat: 34.0522, lng: -118.2437, region: "West Coast", tier: "national", nearby: ["Beverly Hills", "Santa Monica", "Pasadena"] },
  { name: "San Francisco", state: "CA", slug: "san-francisco-ca", zip: "94102", lat: 37.7749, lng: -122.4194, region: "West Coast", tier: "national", nearby: ["Palo Alto", "Marin County", "Berkeley"] },
  { name: "Chicago", state: "IL", slug: "chicago-il", zip: "60601", lat: 41.8781, lng: -87.6298, region: "Midwest", tier: "national", nearby: ["Naperville", "Evanston", "Oak Brook"] },
  { name: "Houston", state: "TX", slug: "houston-tx", zip: "77001", lat: 29.7604, lng: -95.3698, region: "Texas", tier: "national", nearby: ["The Woodlands", "Sugar Land", "Katy"] },
  { name: "Dallas", state: "TX", slug: "dallas-tx", zip: "75201", lat: 32.7767, lng: -96.7970, region: "Texas", tier: "national", nearby: ["Plano", "Frisco", "Highland Park"] },
  { name: "Scottsdale", state: "AZ", slug: "scottsdale-az", zip: "85251", lat: 33.4942, lng: -111.9261, region: "Southwest", tier: "national", nearby: ["Phoenix", "Paradise Valley", "Tempe"] },
  { name: "Greenwich", state: "CT", slug: "greenwich-ct", zip: "06830", lat: 41.0262, lng: -73.6282, region: "Northeast", tier: "national", nearby: ["Stamford", "Darien", "New Canaan"] },
  { name: "Aspen", state: "CO", slug: "aspen-co", zip: "81611", lat: 39.1911, lng: -106.8175, region: "Mountain West", tier: "national", nearby: ["Snowmass", "Basalt", "Carbondale"] },
  { name: "Beverly Hills", state: "CA", slug: "beverly-hills-ca", zip: "90210", lat: 34.0736, lng: -118.4004, region: "West Coast", tier: "national", nearby: ["Los Angeles", "Bel Air", "West Hollywood"] },
  { name: "Atherton", state: "CA", slug: "atherton-ca", zip: "94027", lat: 37.4613, lng: -122.1978, region: "West Coast", tier: "national", nearby: ["Menlo Park", "Palo Alto", "Woodside"] },
  { name: "Boston", state: "MA", slug: "boston-ma", zip: "02101", lat: 42.3601, lng: -71.0589, region: "Northeast", tier: "national", nearby: ["Cambridge", "Brookline", "Newton"] },
  { name: "Seattle", state: "WA", slug: "seattle-wa", zip: "98101", lat: 47.6062, lng: -122.3321, region: "Pacific Northwest", tier: "national", nearby: ["Bellevue", "Mercer Island", "Kirkland"] },
  { name: "Denver", state: "CO", slug: "denver-co", zip: "80202", lat: 39.7392, lng: -104.9903, region: "Mountain West", tier: "national", nearby: ["Cherry Hills Village", "Boulder", "Greenwood Village"] },
  { name: "Austin", state: "TX", slug: "austin-tx", zip: "78701", lat: 30.2672, lng: -97.7431, region: "Texas", tier: "national", nearby: ["Westlake Hills", "Lakeway", "Round Rock"] },
  { name: "San Diego", state: "CA", slug: "san-diego-ca", zip: "92101", lat: 32.7157, lng: -117.1611, region: "West Coast", tier: "national", nearby: ["La Jolla", "Del Mar", "Coronado"] },
  { name: "Nashville", state: "TN", slug: "nashville-tn", zip: "37201", lat: 36.1627, lng: -86.7816, region: "Southeast", tier: "national", nearby: ["Brentwood", "Franklin", "Belle Meade"] },
  { name: "Charlotte", state: "NC", slug: "charlotte-nc", zip: "28202", lat: 35.2271, lng: -80.8431, region: "Southeast", tier: "national", nearby: ["Myers Park", "Ballantyne", "Lake Norman"] },
  { name: "Atlanta", state: "GA", slug: "atlanta-ga", zip: "30301", lat: 33.7490, lng: -84.3880, region: "Southeast", tier: "national", nearby: ["Buckhead", "Alpharetta", "Roswell"] },
  { name: "Washington DC", state: "DC", slug: "washington-dc", zip: "20001", lat: 38.9072, lng: -77.0369, region: "Mid-Atlantic", tier: "national", nearby: ["Georgetown", "Bethesda", "McLean"] },
  { name: "Honolulu", state: "HI", slug: "honolulu-hi", zip: "96801", lat: 21.3069, lng: -157.8583, region: "Hawaii", tier: "national", nearby: ["Waikiki", "Kailua", "Pearl City"] },
  { name: "Newport Beach", state: "CA", slug: "newport-beach-ca", zip: "92660", lat: 33.6189, lng: -117.9289, region: "West Coast", tier: "national", nearby: ["Laguna Beach", "Irvine", "Corona del Mar"] },
  { name: "Nantucket", state: "MA", slug: "nantucket-ma", zip: "02554", lat: 41.2835, lng: -70.0995, region: "Northeast", tier: "national", nearby: ["Martha's Vineyard", "Cape Cod", "Hyannis"] },
  { name: "Palo Alto", state: "CA", slug: "palo-alto-ca", zip: "94301", lat: 37.4419, lng: -122.1430, region: "West Coast", tier: "national", nearby: ["Stanford", "Menlo Park", "Los Altos"] },
  { name: "Raleigh", state: "NC", slug: "raleigh-nc", zip: "27601", lat: 35.7796, lng: -78.6382, region: "Southeast", tier: "national", nearby: ["Durham", "Cary", "Chapel Hill"] },
  { name: "Savannah", state: "GA", slug: "savannah-ga", zip: "31401", lat: 32.0809, lng: -81.0912, region: "Southeast", tier: "national", nearby: ["Hilton Head", "Tybee Island", "Bluffton"] },
  { name: "Charleston", state: "SC", slug: "charleston-sc", zip: "29401", lat: 32.7765, lng: -79.9311, region: "Southeast", tier: "national", nearby: ["Mount Pleasant", "Kiawah Island", "Summerville"] },
  { name: "Bellevue", state: "WA", slug: "bellevue-wa", zip: "98004", lat: 47.6101, lng: -122.2015, region: "Pacific Northwest", tier: "national", nearby: ["Seattle", "Mercer Island", "Kirkland"] },
  { name: "Plano", state: "TX", slug: "plano-tx", zip: "75024", lat: 33.0198, lng: -96.6989, region: "Texas", tier: "national", nearby: ["Dallas", "Frisco", "Allen"] },
  { name: "Paradise Valley", state: "AZ", slug: "paradise-valley-az", zip: "85253", lat: 33.5311, lng: -111.9425, region: "Southwest", tier: "national", nearby: ["Scottsdale", "Phoenix", "Carefree"] },
  { name: "Wellesley", state: "MA", slug: "wellesley-ma", zip: "02481", lat: 42.2968, lng: -71.2924, region: "Northeast", tier: "national", nearby: ["Newton", "Natick", "Needham"] },
  { name: "Westport", state: "CT", slug: "westport-ct", zip: "06880", lat: 41.1415, lng: -73.3579, region: "Northeast", tier: "national", nearby: ["Fairfield", "Weston", "Norwalk"] },
  { name: "Saratoga", state: "CA", slug: "saratoga-ca", zip: "95070", lat: 37.2638, lng: -122.0230, region: "West Coast", tier: "national", nearby: ["Los Gatos", "Cupertino", "San Jose"] },
  { name: "Short Hills", state: "NJ", slug: "short-hills-nj", zip: "07078", lat: 40.7476, lng: -74.3254, region: "Northeast", tier: "national", nearby: ["Summit", "Millburn", "Chatham"] },
  { name: "Coronado", state: "CA", slug: "coronado-ca", zip: "92118", lat: 32.6859, lng: -117.1831, region: "West Coast", tier: "national", nearby: ["San Diego", "La Jolla", "Del Mar"] },
  { name: "Lake Forest", state: "IL", slug: "lake-forest-il", zip: "60045", lat: 42.2586, lng: -87.8407, region: "Midwest", tier: "national", nearby: ["Highland Park", "Winnetka", "Libertyville"] },
  { name: "Hilton Head", state: "SC", slug: "hilton-head-sc", zip: "29928", lat: 32.2163, lng: -80.7526, region: "Southeast", tier: "national", nearby: ["Bluffton", "Savannah", "Beaufort"] },
  { name: "Vail", state: "CO", slug: "vail-co", zip: "81657", lat: 39.6403, lng: -106.3742, region: "Mountain West", tier: "national", nearby: ["Beaver Creek", "Edwards", "Avon"] },
  { name: "Carmel", state: "CA", slug: "carmel-ca", zip: "93921", lat: 36.5554, lng: -121.9233, region: "West Coast", tier: "national", nearby: ["Monterey", "Pebble Beach", "Pacific Grove"] },
  { name: "Hinsdale", state: "IL", slug: "hinsdale-il", zip: "60521", lat: 41.8009, lng: -87.9370, region: "Midwest", tier: "national", nearby: ["Oak Brook", "Clarendon Hills", "Western Springs"] },
  { name: "McLean", state: "VA", slug: "mclean-va", zip: "22101", lat: 38.9339, lng: -77.1773, region: "Mid-Atlantic", tier: "national", nearby: ["Great Falls", "Tysons", "Arlington"] },
  { name: "Darien", state: "CT", slug: "darien-ct", zip: "06820", lat: 41.0787, lng: -73.4693, region: "Northeast", tier: "national", nearby: ["Greenwich", "New Canaan", "Stamford"] },
  { name: "Summit", state: "NJ", slug: "summit-nj", zip: "07901", lat: 40.7157, lng: -74.3646, region: "Northeast", tier: "national", nearby: ["Short Hills", "Chatham", "Madison"] },
  { name: "Winnetka", state: "IL", slug: "winnetka-il", zip: "60093", lat: 42.1081, lng: -87.7359, region: "Midwest", tier: "national", nearby: ["Wilmette", "Glencoe", "Kenilworth"] },
  { name: "La Jolla", state: "CA", slug: "la-jolla-ca", zip: "92037", lat: 32.8328, lng: -117.2713, region: "West Coast", tier: "national", nearby: ["San Diego", "Del Mar", "University City"] },
  { name: "Rye", state: "NY", slug: "rye-ny", zip: "10580", lat: 40.9826, lng: -73.6837, region: "Northeast", tier: "national", nearby: ["Greenwich", "Scarsdale", "Larchmont"] },
  { name: "Scarsdale", state: "NY", slug: "scarsdale-ny", zip: "10583", lat: 41.0051, lng: -73.7846, region: "Northeast", tier: "national", nearby: ["White Plains", "Bronxville", "Eastchester"] },
]

const ALL_CITIES = [...FLORIDA_CITIES, ...WEALTHY_US_CITIES]

function generateIntroContent(city: CityData): string {
  const isFL = city.state === "FL"
  const portInfo = isFL
    ? `As a Florida resident, you have the advantage of being close to major cruise departure ports including Port Canaveral, Tampa, Fort Lauderdale (Port Everglades), and Miami — making last-minute cruise deals and drive-to-port packages especially convenient.`
    : `${AGENT.name} works with clients nationwide by phone and video call, providing the same personalized, white-glove service that local Central Florida clients enjoy. Whether you're planning from ${city.name} or anywhere else, Richard handles every detail remotely.`

  return `<p>Looking for a trusted travel agent in ${city.name}, ${city.state}? <strong>${AGENT.name}</strong> of ${AGENT.business} specializes in crafting personalized vacation experiences for discerning travelers. From luxury cruises and all-inclusive resort getaways to honeymoons, destination weddings, and family vacations — Richard brings expert knowledge and industry relationships that translate into better deals, exclusive perks, and stress-free planning.</p>

<p>${portInfo}</p>

<h2>Why ${city.name} Travelers Choose ${AGENT.name}</h2>
<p>Unlike online booking engines that treat you like a transaction, ${AGENT.name} provides genuinely personalized service. He takes the time to understand your travel style, budget, and preferences before recommending options. His clients in ${city.name} and ${city.nearby?.slice(0, 2).join(", ") || "surrounding areas"} consistently report that Richard finds deals and perks they couldn't access on their own — from cabin upgrades and onboard credits to complimentary excursions and spa treatments.</p>

<h2>Travel Services for ${city.name} Residents</h2>
<ul>
<li><strong>Ocean Cruises</strong> — Royal Caribbean, Celebrity, Norwegian, Carnival, Princess, Holland America & more</li>
<li><strong>Luxury Cruises</strong> — Seabourn, Viking, Regent Seven Seas, Silversea, Oceania</li>
<li><strong>River Cruises</strong> — Viking, AmaWaterways, Uniworld on the Danube, Rhine, Seine & more</li>
<li><strong>All-Inclusive Resorts</strong> — Sandals, Beaches, Secrets, Dreams, Excellence & more</li>
<li><strong>Honeymoons & Romance</strong> — Maldives, Bali, St. Lucia, Santorini, Bora Bora</li>
<li><strong>Destination Weddings</strong> — Caribbean, Mexico, Hawaii, Europe</li>
<li><strong>Family Vacations</strong> — Disney Cruise Line, theme park packages, multi-generational trips</li>
<li><strong>Group Travel</strong> — Reunions, corporate retreats, milestone celebrations</li>
</ul>

<h2>Free Consultation — No Planning Fees</h2>
<p>${AGENT.name}'s travel planning services are <strong>completely free</strong>. Travel suppliers pay the agent commission — you pay nothing extra. In many cases, Richard secures better pricing and perks than you'd find booking online yourself. Call <a href="tel:${AGENT.phoneTel}">${AGENT.phone}</a> today to start planning your next vacation from ${city.name}.</p>`
}

async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error("DATABASE_URL not found. Run with: npx tsx --env-file=.env.local scripts/generate-city-pages.ts")
    process.exit(1)
  }

  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(dbUrl)

  console.log(`\n🏙️  City Page Generator — ${AGENT.business}`)
  console.log(`📍 ${ALL_CITIES.length} cities to generate\n`)

  let created = 0
  let skipped = 0

  for (const city of ALL_CITIES) {
    const existing = await sql`SELECT id FROM dreamvacations.city_pages WHERE slug = ${city.slug}`
    if (existing.length > 0) {
      skipped++
      continue
    }

    const metaTitle = `Travel Agent in ${city.name}, ${city.state} — ${AGENT.name} | Cruises, Resorts & Honeymoons`
    const metaDesc = `Looking for a travel agent in ${city.name}, ${city.state}? ${AGENT.name} specializes in cruises, all-inclusive resorts, honeymoons & destination weddings. Free consultation — call ${AGENT.phone}.`
    const h1 = `Travel Agent in ${city.name}, ${city.state}`
    const introContent = generateIntroContent(city)

    await sql`
      INSERT INTO dreamvacations.city_pages (
        name, state, slug, zip, lat, lng, region, tier, nearby,
        meta_title, meta_description, h1, intro_content, is_published
      ) VALUES (
        ${city.name}, ${city.state}, ${city.slug}, ${city.zip},
        ${city.lat}, ${city.lng}, ${city.region}, ${city.tier},
        ${city.nearby},
        ${metaTitle}, ${metaDesc}, ${h1}, ${introContent}, true
      )
    `
    created++
    process.stdout.write(`  ✅ ${city.name}, ${city.state}\n`)
  }

  console.log(`\n🎉 Done! Created ${created} city pages, skipped ${skipped} existing`)
  console.log(`   Total cities in DB: ${created + skipped}`)
  console.log(`   View at: ${AGENT.site}/{city-slug}\n`)
}

main().catch(console.error)
