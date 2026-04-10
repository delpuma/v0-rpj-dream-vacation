/**
 * Blog Post Generator for Travel Advisors Group
 *
 * Generates SEO-optimized 1500+ word blog posts with Pexels images.
 * Posts focus on luxury travel, cruises, resorts, and high-value trips
 * that drive phone calls to Richard Johnson at (407) 951-2398.
 *
 * Usage:
 *   npx tsx scripts/generate-blog-posts.ts
 *
 * Env vars required:
 *   DATABASE_URL - Neon connection string
 *   OPENAI_API_KEY - OpenAI API key
 *   PEXELS_API_KEY - Pexels API key (free at pexels.com/api)
 */

const AGENT = {
  name: "Richard Johnson",
  phone: "(407) 951-2398",
  phoneTel: "+14079512398",
  location: "Winter Garden, FL",
  business: "Dream Vacations — Richard Johnson & Travel Advisors Group",
  site: "https://traveladvisorsgroup.com",
}

// High-value blog topics that drive leads
const BLOG_TOPICS = [
  {
    slug: "best-caribbean-cruises-2026",
    title: "The 10 Best Caribbean Cruises for 2026 — A Travel Agent's Expert Picks",
    category: "Cruises",
    keywords: ["best Caribbean cruises 2026", "Caribbean cruise deals", "cruise travel agent Florida", "Royal Caribbean Caribbean", "top Caribbean cruise itineraries"],
    tags: ["Caribbean", "cruises", "2026 travel", "Royal Caribbean", "Celebrity Cruises"],
    relatedTrips: ["caribbean/cruise", "cruise-lines/royal-caribbean/caribbean", "cruise-lines/celebrity-cruises/caribbean"],
    imageQuery: "caribbean cruise ship ocean",
    prompt: `Write a 1500+ word blog post about the 10 best Caribbean cruises for 2026. Cover specific itineraries from Royal Caribbean, Celebrity, Norwegian, and Carnival. Include details about new ships, best ports of call, pricing ranges, and insider tips. Mention that Central Florida travelers benefit from easy access to Port Canaveral. Each cruise pick should have a mini-review with pros and what type of traveler it's best for. End with a strong CTA to call Richard Johnson.`,
  },
  {
    slug: "sandals-resort-guide-which-one-is-right-for-you",
    title: "Sandals Resort Guide — Which All-Inclusive Is Right for You?",
    category: "Resorts",
    keywords: ["Sandals resort guide", "best Sandals resort", "Sandals all-inclusive review", "Sandals travel agent", "Sandals Jamaica vs St Lucia"],
    tags: ["Sandals", "all-inclusive", "couples travel", "Jamaica", "St. Lucia", "Bahamas"],
    relatedTrips: ["cruise-lines/sandals-resorts", "all-inclusive-resort", "honeymoon", "jamaica/all-inclusive-resort"],
    imageQuery: "luxury beach resort overwater bungalow",
    prompt: `Write a 1500+ word comprehensive guide comparing all Sandals resort locations. Cover Jamaica (multiple properties), St. Lucia, Bahamas, Barbados, Grenada, and Curaçao. For each, describe the vibe, best room categories, dining highlights, and what type of couple it's best for. Include tips on the best time to visit each, the Luxury Included concept, and why booking through a travel agent gets you better perks than booking direct. Strong CTA to call Richard.`,
  },
  {
    slug: "european-river-cruise-first-timers-guide",
    title: "European River Cruises — The Complete First-Timer's Guide for 2026",
    category: "River Cruises",
    keywords: ["European river cruise guide", "first river cruise tips", "Viking river cruise review", "AmaWaterways vs Uniworld", "Danube river cruise"],
    tags: ["river cruises", "Europe", "Viking", "AmaWaterways", "Uniworld", "Danube"],
    relatedTrips: ["river-cruise", "cruise-lines/viking/danube-river", "cruise-lines/amawaterways/rhine-river", "danube-river/river-cruise"],
    imageQuery: "river cruise ship europe danube",
    prompt: `Write a 1500+ word guide for first-time European river cruisers. Compare Viking, AmaWaterways, and Uniworld — their ship styles, included excursions, dining, and price points. Cover the most popular routes (Danube, Rhine, Seine, Douro). Include practical tips: best time to go, what to pack, how river cruises differ from ocean cruises, and cabin selection advice. Explain why a travel agent is essential for river cruise booking (cabin placement, pre/post extensions, flight coordination). CTA to call Richard.`,
  },
  {
    slug: "alaska-cruise-ultimate-planning-guide",
    title: "Alaska Cruise Planning Guide — Everything You Need to Know Before You Go",
    category: "Cruises",
    keywords: ["Alaska cruise guide", "best Alaska cruise 2026", "Alaska cruise tips", "Alaska cruise from Seattle", "glacier viewing cruise"],
    tags: ["Alaska", "cruises", "nature travel", "Princess Cruises", "Holland America"],
    relatedTrips: ["alaska/cruise", "cruise-lines/princess-cruises/alaska", "cruise-lines/holland-america-line/alaska", "adventure-travel"],
    imageQuery: "alaska glacier cruise ship mountains",
    prompt: `Write a 1500+ word Alaska cruise planning guide. Cover the best cruise lines for Alaska (Princess, Holland America, Celebrity, Norwegian), Inside Passage vs Gulf of Alaska routes, best months to sail, what to pack, must-do shore excursions (Mendenhall Glacier, whale watching, Denali), and balcony vs suite considerations. Include a section on cruisetours that extend into Denali. Mention pricing ranges and why booking early matters. CTA to call Richard for Alaska cruise deals.`,
  },
  {
    slug: "destination-wedding-planning-caribbean",
    title: "How to Plan a Destination Wedding in the Caribbean — A Step-by-Step Guide",
    category: "Weddings",
    keywords: ["destination wedding Caribbean", "destination wedding planner Florida", "Sandals wedding packages", "beach wedding Jamaica", "destination wedding travel agent"],
    tags: ["destination wedding", "Caribbean", "Sandals", "wedding planning", "couples"],
    relatedTrips: ["destination-wedding", "cancun/destination-wedding", "cruise-lines/sandals-resorts", "st-lucia/honeymoon"],
    imageQuery: "beach wedding ceremony tropical sunset",
    prompt: `Write a 1500+ word step-by-step guide to planning a Caribbean destination wedding. Cover: choosing the right island and venue, legal requirements by country, guest travel coordination, timeline (when to start planning), budget breakdown, Sandals WeddingMoon packages, and tips for managing guest RSVPs and room blocks. Include a section on combining the wedding with a honeymoon. Explain why a travel agent is critical for destination weddings (group booking, room blocks, vendor coordination). CTA to call Richard.`,
  },
  {
    slug: "honeymoon-destinations-2026-top-picks",
    title: "Top 10 Honeymoon Destinations for 2026 — Romantic Getaways Worth the Splurge",
    category: "Honeymoons",
    keywords: ["best honeymoon destinations 2026", "honeymoon travel agent", "romantic getaway ideas", "Maldives honeymoon", "Bali honeymoon", "St Lucia honeymoon"],
    tags: ["honeymoon", "romance", "Maldives", "Bali", "St. Lucia", "Hawaii", "Greece"],
    relatedTrips: ["honeymoon", "maldives/honeymoon", "bali/honeymoon", "st-lucia/honeymoon", "hawaii/honeymoon"],
    imageQuery: "romantic couple beach sunset honeymoon",
    prompt: `Write a 1500+ word article on the top 10 honeymoon destinations for 2026. Cover: Maldives, Bali, St. Lucia, Santorini, Maui, Bora Bora, Amalfi Coast, Turks and Caicos, Fiji, and Costa Rica. For each, describe the romantic appeal, best resorts/hotels, ideal trip length, budget range, and best time to visit. Include a section on honeymoon registries and how a travel agent can secure honeymoon perks (room upgrades, spa credits, champagne). CTA to call Richard.`,
  },
  {
    slug: "family-cruise-tips-traveling-with-kids",
    title: "Family Cruise Tips — The Ultimate Guide to Cruising with Kids in 2026",
    category: "Family Travel",
    keywords: ["family cruise tips", "cruising with kids", "best family cruise line", "Disney Cruise review", "Royal Caribbean family"],
    tags: ["family travel", "cruises", "kids", "Disney Cruise Line", "Royal Caribbean"],
    relatedTrips: ["family-vacation", "cruise-lines/disney-cruise-line/caribbean", "cruise-lines/royal-caribbean/bahamas", "caribbean/family-vacation"],
    imageQuery: "family cruise ship vacation kids pool",
    prompt: `Write a 1500+ word guide to family cruising. Compare Disney Cruise Line, Royal Caribbean, Norwegian, and Carnival for families. Cover: kids clubs by age group, family stateroom options, dining with picky eaters, shore excursion tips with children, what to pack, and how to keep teens entertained. Include a section on multi-generational cruising. Explain why a travel agent saves families money (group rates, kids-sail-free promos, connecting cabin strategies). CTA to call Richard.`,
  },
  {
    slug: "luxury-cruise-lines-compared-seabourn-viking-regent",
    title: "Luxury Cruise Lines Compared — Seabourn vs Viking vs Regent Seven Seas",
    category: "Luxury Travel",
    keywords: ["luxury cruise comparison", "Seabourn review", "Viking ocean cruise", "Regent Seven Seas", "best luxury cruise line"],
    tags: ["luxury travel", "Seabourn", "Viking", "cruises", "premium travel"],
    relatedTrips: ["luxury-travel", "cruise-lines/seabourn/mediterranean", "cruise-lines/viking/mediterranean", "mediterranean/luxury-travel"],
    imageQuery: "luxury cruise ship suite ocean view",
    prompt: `Write a 1500+ word comparison of the top luxury cruise lines: Seabourn, Viking Ocean, and Regent Seven Seas. Compare: ship size and ambiance, suite categories, dining quality, included excursions, spa facilities, dress code, and overall value. Include specific itinerary recommendations for each. Discuss who each line is best for. Explain the value of booking luxury through a travel agent (suite upgrades, shipboard credits, pre-cruise hotel packages). CTA to call Richard.`,
  },
  // === BATCH 2: More high-value topics ===
  {
    slug: "mediterranean-cruise-guide-ports-itineraries",
    title: "Mediterranean Cruise Guide — Best Ports, Itineraries & Insider Tips for 2026",
    category: "Cruises",
    keywords: ["Mediterranean cruise guide", "best Mediterranean cruise ports", "Mediterranean cruise 2026", "Greek islands cruise", "Italy cruise"],
    tags: ["Mediterranean", "cruises", "Europe", "Greece", "Italy", "Spain"],
    relatedTrips: ["mediterranean/cruise", "cruise-lines/celebrity-cruises/mediterranean", "cruise-lines/viking/mediterranean", "greece/cruise"],
    imageQuery: "mediterranean cruise ship santorini greece",
    prompt: `Write a 1500+ word Mediterranean cruise guide. Cover Eastern vs Western Med itineraries, the best ports (Santorini, Barcelona, Dubrovnik, Amalfi Coast, Mykonos), best cruise lines for the Med, ideal trip length, best months to sail, and shore excursion tips. Include pricing ranges and why a travel agent helps with Mediterranean cruise planning. CTA to call Richard.`,
  },
  {
    slug: "what-to-pack-for-a-cruise-ultimate-checklist",
    title: "What to Pack for a Cruise — The Ultimate Packing Checklist for 2026",
    category: "Travel Tips",
    keywords: ["cruise packing list", "what to pack for a cruise", "cruise packing tips", "cruise essentials", "first time cruise packing"],
    tags: ["packing tips", "cruises", "travel tips", "first-time cruiser"],
    relatedTrips: ["cruise", "caribbean/cruise", "alaska/cruise"],
    imageQuery: "suitcase packing vacation travel",
    prompt: `Write a 1500+ word ultimate cruise packing guide. Cover: clothing for formal nights, casual days, and shore excursions. Essential items most people forget. What NOT to bring. Packing tips for different cruise types (Caribbean vs Alaska vs Mediterranean). Carry-on bag essentials for embarkation day. Tech and gadget recommendations. Mention that Richard Johnson helps clients with pre-cruise planning including packing advice. CTA to call Richard.`,
  },
  {
    slug: "first-time-cruise-tips-everything-beginners-need-to-know",
    title: "First Time Cruise Tips — Everything Beginners Need to Know in 2026",
    category: "Travel Tips",
    keywords: ["first time cruise tips", "cruise for beginners", "first cruise advice", "what to expect on a cruise", "cruise tips and tricks"],
    tags: ["first-time cruiser", "cruise tips", "beginners", "travel advice"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise"],
    imageQuery: "cruise ship deck ocean view couple",
    prompt: `Write a 1500+ word guide for first-time cruisers. Cover: choosing the right cruise line and ship, cabin selection tips, embarkation day process, onboard dining options, entertainment, shore excursions, tipping etiquette, seasickness prevention, and common mistakes to avoid. Explain why booking through a travel agent like Richard makes the first cruise experience stress-free. CTA to call Richard.`,
  },
  {
    slug: "best-all-inclusive-resorts-caribbean-2026",
    title: "The 15 Best All-Inclusive Resorts in the Caribbean for 2026",
    category: "Resorts",
    keywords: ["best all-inclusive resorts Caribbean", "top Caribbean resorts 2026", "luxury all-inclusive Caribbean", "adults-only Caribbean resorts"],
    tags: ["all-inclusive", "Caribbean", "resorts", "luxury", "couples", "family"],
    relatedTrips: ["all-inclusive-resort", "caribbean/all-inclusive-resort", "jamaica/all-inclusive-resort", "cruise-lines/sandals-resorts"],
    imageQuery: "luxury caribbean resort pool beach",
    prompt: `Write a 1500+ word guide to the 15 best all-inclusive resorts in the Caribbean for 2026. Cover Sandals, Beaches, Secrets, Dreams, Excellence, Hyatt Ziva/Zilara, and boutique options. For each, describe the vibe, what's included, best room categories, and who it's best for (couples, families, groups). Include pricing ranges and booking tips. Explain why a travel agent gets better rates and perks than booking direct. CTA to call Richard.`,
  },
  {
    slug: "port-canaveral-cruise-guide-florida",
    title: "Port Canaveral Cruise Guide — Everything Florida Travelers Need to Know",
    category: "Cruises",
    keywords: ["Port Canaveral cruise guide", "cruises from Port Canaveral", "Port Canaveral parking", "Port Canaveral hotels", "Florida cruise port"],
    tags: ["Port Canaveral", "Florida", "cruises", "cruise port", "Central Florida"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise", "cruise-lines/disney-cruise-line/caribbean"],
    imageQuery: "port canaveral cruise ship florida",
    prompt: `Write a 1500+ word guide to cruising from Port Canaveral, FL. Cover: which cruise lines sail from there (Disney, Royal Caribbean, Carnival, Norwegian, MSC), parking options and costs, nearby hotels for pre-cruise stays, transportation from Orlando/Winter Garden, what to do if you arrive early, and tips for embarkation day. This is especially relevant for Central Florida travelers. Mention Richard Johnson is based nearby in Winter Garden. CTA to call Richard.`,
  },
  {
    slug: "hawaii-vacation-planning-guide-which-island",
    title: "Hawaii Vacation Planning Guide — Which Island Is Right for You?",
    category: "Destinations",
    keywords: ["Hawaii vacation guide", "which Hawaiian island to visit", "Maui vs Big Island", "Hawaii trip planning", "best Hawaii island for couples"],
    tags: ["Hawaii", "vacation planning", "Maui", "Big Island", "Kauai", "Oahu"],
    relatedTrips: ["hawaii/honeymoon", "hawaii/family-vacation", "hawaii/beach-vacation"],
    imageQuery: "hawaii beach sunset palm trees",
    prompt: `Write a 1500+ word Hawaii vacation planning guide comparing all four main islands: Oahu, Maui, Big Island, and Kauai. For each, describe the personality, top attractions, best resorts, ideal trip length, and who it's best for. Include inter-island travel tips, best time to visit, and budget considerations. Explain how a travel agent can coordinate multi-island itineraries. CTA to call Richard.`,
  },
  {
    slug: "travel-insurance-guide-do-you-really-need-it",
    title: "Travel Insurance Guide — Do You Really Need It? A Travel Agent's Honest Answer",
    category: "Travel Tips",
    keywords: ["travel insurance guide", "do I need travel insurance", "cruise travel insurance", "trip cancellation insurance", "travel protection plan"],
    tags: ["travel insurance", "travel tips", "trip protection", "cruise insurance"],
    relatedTrips: ["cruise", "luxury-travel", "honeymoon"],
    imageQuery: "travel planning documents passport",
    prompt: `Write a 1500+ word honest guide to travel insurance. Cover: when you absolutely need it, when you might skip it, types of coverage (trip cancellation, medical, evacuation, baggage), cruise-specific insurance considerations, credit card travel protection limitations, and how to choose the right plan. Be honest about when it's worth it and when it's not. Mention that Richard Johnson provides complimentary travel insurance consultations. CTA to call Richard.`,
  },
  {
    slug: "best-cruises-from-tampa-florida-2026",
    title: "Best Cruises from Tampa, Florida in 2026 — Destinations, Ships & Deals",
    category: "Cruises",
    keywords: ["cruises from Tampa", "Tampa cruise port", "best Tampa cruises 2026", "Tampa cruise deals", "Caribbean cruises from Tampa"],
    tags: ["Tampa", "Florida", "cruises", "Caribbean", "cruise port"],
    relatedTrips: ["cruise", "caribbean/cruise", "cruise-lines/royal-caribbean/caribbean", "cruise-lines/carnival-cruise-line/caribbean"],
    imageQuery: "tampa cruise port ship florida",
    prompt: `Write a 1500+ word guide to cruises departing from Tampa, FL in 2026. Cover which cruise lines sail from Tampa (Royal Caribbean, Carnival, Celebrity, Holland America), popular itineraries (Western Caribbean, Mexico, Cuba), ship details, parking and hotel options, and seasonal pricing. Great for Central Florida travelers. Mention Richard Johnson is based in nearby Winter Garden. CTA to call Richard.`,
  },
  {
    slug: "romantic-getaway-ideas-couples-2026",
    title: "25 Romantic Getaway Ideas for Couples in 2026 — From Weekend Escapes to Dream Trips",
    category: "Romance",
    keywords: ["romantic getaway ideas", "couples vacation ideas", "romantic trips 2026", "couples travel destinations", "anniversary trip ideas"],
    tags: ["romance", "couples", "getaways", "anniversary", "honeymoon"],
    relatedTrips: ["romantic-getaway", "honeymoon", "aruba/romantic-getaway", "greece/romantic-getaway", "st-lucia/honeymoon"],
    imageQuery: "romantic couple sunset beach dinner",
    prompt: `Write a 1500+ word article with 25 romantic getaway ideas for couples. Mix weekend escapes, week-long trips, and bucket-list adventures. Cover beach destinations, European cities, adventure trips, spa retreats, and cruise options. For each, include a brief description, ideal trip length, and budget range. Mention anniversary and celebration trip planning. CTA to call Richard for personalized romantic trip planning.`,
  },
  {
    slug: "group-travel-planning-tips-reunions-celebrations",
    title: "Group Travel Planning — How to Organize Reunions, Celebrations & Corporate Retreats",
    category: "Group Travel",
    keywords: ["group travel planning", "family reunion travel", "group cruise booking", "corporate retreat planning", "group vacation coordinator"],
    tags: ["group travel", "reunions", "corporate retreats", "celebrations", "planning tips"],
    relatedTrips: ["group-travel", "cruise", "all-inclusive-resort"],
    imageQuery: "group friends vacation celebration beach",
    prompt: `Write a 1500+ word guide to planning group travel. Cover: family reunions, milestone birthday celebrations, corporate retreats, and friend group trips. Include tips on choosing destinations, managing budgets across different price points, booking group rates, coordinating activities, and handling logistics. Explain why a travel agent is essential for group travel (room blocks, group discounts, single point of contact). CTA to call Richard.`,
  },
  {
    slug: "costa-rica-adventure-vacation-guide",
    title: "Costa Rica Adventure Vacation Guide — Rainforests, Volcanoes & Wildlife",
    category: "Destinations",
    keywords: ["Costa Rica vacation guide", "Costa Rica adventure travel", "Costa Rica family trip", "Costa Rica eco tourism", "best Costa Rica resorts"],
    tags: ["Costa Rica", "adventure", "eco-tourism", "family travel", "Central America"],
    relatedTrips: ["costa-rica/adventure-travel", "costa-rica/family-vacation", "adventure-travel"],
    imageQuery: "costa rica rainforest waterfall tropical",
    prompt: `Write a 1500+ word Costa Rica adventure vacation guide. Cover: best regions to visit (Arenal, Manuel Antonio, Monteverde, Guanacaste), top activities (zip-lining, white water rafting, wildlife tours, volcano hikes), best resorts and eco-lodges, ideal trip length, best time to visit, and family-friendly options. Include budget ranges and transportation tips. CTA to call Richard for Costa Rica trip planning.`,
  },
  {
    slug: "why-use-travel-agent-instead-of-booking-online",
    title: "Why Use a Travel Agent Instead of Booking Online? 12 Reasons That Will Surprise You",
    category: "Travel Tips",
    keywords: ["why use a travel agent", "travel agent vs booking online", "benefits of travel agent", "are travel agents worth it", "travel agent advantages"],
    tags: ["travel agent", "booking tips", "travel planning", "value", "advice"],
    relatedTrips: ["cruise", "all-inclusive-resort", "honeymoon", "destination-wedding"],
    imageQuery: "travel agent planning vacation consultation",
    prompt: `Write a 1500+ word article on why using a travel agent is better than booking online. Cover 12 specific reasons: price matching, exclusive perks, time savings, expert knowledge, group coordination, crisis support, price monitoring, complex itinerary planning, supplier relationships, travel insurance guidance, accountability, and the fact that it's free. Use real examples. This is a key conversion article — make it compelling. Heavy CTA to call Richard throughout.`,
  },
  {
    slug: "maldives-overwater-bungalow-guide",
    title: "Maldives Overwater Bungalow Guide — The Ultimate Luxury Honeymoon Destination",
    category: "Luxury Travel",
    keywords: ["Maldives overwater bungalow", "Maldives honeymoon", "Maldives luxury resort", "best Maldives resorts", "Maldives vacation cost"],
    tags: ["Maldives", "luxury", "honeymoon", "overwater bungalow", "romance"],
    relatedTrips: ["maldives/honeymoon", "maldives/luxury-travel", "honeymoon", "luxury-travel"],
    imageQuery: "maldives overwater bungalow turquoise ocean",
    prompt: `Write a 1500+ word Maldives luxury guide. Cover: best overwater bungalow resorts (Soneva, St. Regis, Conrad, Waldorf Astoria, One&Only), what to expect, pricing ranges, best time to visit, how to get there, what's included, and honeymoon-specific perks. Include tips on choosing the right atoll and resort. Explain how a travel agent secures upgrades and honeymoon amenities. CTA to call Richard.`,
  },
  {
    slug: "christmas-new-years-cruise-guide-2026",
    title: "Christmas & New Year's Cruise Guide 2026 — Celebrate the Holidays at Sea",
    category: "Cruises",
    keywords: ["Christmas cruise 2026", "New Years cruise", "holiday cruise deals", "Christmas Caribbean cruise", "holiday cruise tips"],
    tags: ["holiday cruise", "Christmas", "New Years", "Caribbean", "river cruise"],
    relatedTrips: ["holiday-cruise", "danube-river/holiday-cruise", "caribbean/cruise"],
    imageQuery: "cruise ship christmas decorations holiday",
    prompt: `Write a 1500+ word guide to Christmas and New Year's cruises for 2026. Cover: best cruise lines for holiday sailings, Caribbean vs European Christmas market river cruises, what holiday celebrations look like onboard, pricing and booking timeline (book early!), family vs couples options, and specific itinerary recommendations. Mention Uniworld and Viking holiday river cruises. CTA to call Richard to book before they sell out.`,
  },
  {
    slug: "italy-vacation-planning-guide-amalfi-tuscany-rome",
    title: "Italy Vacation Planning Guide — Amalfi Coast, Tuscany, Rome & Beyond",
    category: "Destinations",
    keywords: ["Italy vacation guide", "Amalfi Coast trip", "Tuscany travel", "Rome vacation", "Italy travel planning"],
    tags: ["Italy", "Europe", "Amalfi Coast", "Tuscany", "Rome", "luxury travel"],
    relatedTrips: ["italy/cruise", "italy/luxury-travel", "mediterranean/cruise"],
    imageQuery: "amalfi coast italy colorful village ocean",
    prompt: `Write a 1500+ word Italy vacation planning guide. Cover: Rome, Florence, Tuscany, Amalfi Coast, Venice, Cinque Terre, and Sicily. Include ideal itinerary lengths, best time to visit, transportation tips (trains vs rental car), must-eat foods, and luxury hotel recommendations. Cover both land-based and cruise options for experiencing Italy. CTA to call Richard for custom Italy trip planning.`,
  },
  {
    slug: "disney-cruise-line-complete-guide-families",
    title: "Disney Cruise Line — The Complete Guide for Families in 2026",
    category: "Family Travel",
    keywords: ["Disney Cruise Line guide", "Disney cruise review", "Disney cruise with kids", "Disney cruise tips", "best Disney cruise ship"],
    tags: ["Disney Cruise Line", "family travel", "kids", "Bahamas", "Caribbean"],
    relatedTrips: ["cruise-lines/disney-cruise-line/caribbean", "cruise-lines/disney-cruise-line/bahamas", "family-vacation"],
    imageQuery: "disney cruise ship family vacation ocean",
    prompt: `Write a 1500+ word complete guide to Disney Cruise Line. Cover: all ships (Magic, Wonder, Dream, Fantasy, Wish, Treasure), Castaway Cay private island, kids clubs by age, dining rotation system, entertainment, adult-only areas, cabin tips, and how to book character experiences. Include pricing ranges and best time to book. Explain why a travel agent helps with Disney cruise planning (onboard credits, stateroom selection). CTA to call Richard.`,
  },
  {
    slug: "greece-island-hopping-guide-santorini-mykonos",
    title: "Greece Island Hopping Guide — Santorini, Mykonos, Crete & the Best Greek Islands",
    category: "Destinations",
    keywords: ["Greece island hopping", "Santorini travel guide", "Mykonos vacation", "Greek islands trip", "Greece cruise"],
    tags: ["Greece", "island hopping", "Santorini", "Mykonos", "Mediterranean"],
    relatedTrips: ["greece/cruise", "greece/romantic-getaway", "mediterranean/cruise"],
    imageQuery: "santorini greece blue dome sunset",
    prompt: `Write a 1500+ word Greece island hopping guide. Cover: Santorini, Mykonos, Crete, Rhodes, Corfu, and Naxos. For each island, describe the personality, top experiences, best hotels, and ideal stay length. Include ferry vs cruise options, best time to visit, and budget tips. Cover both independent island hopping and Greek island cruises. CTA to call Richard for custom Greece trip planning.`,
  },
]

async function fetchPexelsImage(query: string): Promise<{ url: string; alt: string; credit: string } | null> {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) {
    console.log("  ⚠ No PEXELS_API_KEY — skipping image")
    return null
  }

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=large`,
      { headers: { Authorization: apiKey } }
    )
    const data = await res.json()
    if (data.photos?.length > 0) {
      const photo = data.photos[Math.floor(Math.random() * Math.min(3, data.photos.length))]
      return {
        url: photo.src.landscape || photo.src.large,
        alt: photo.alt || query,
        credit: `${photo.photographer} via Pexels`,
      }
    }
  } catch (e) {
    console.log("  ⚠ Pexels fetch failed:", e)
  }
  return null
}

async function generateContent(topic: typeof BLOG_TOPICS[0]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("OPENAI_API_KEY required")

  const systemPrompt = `You are a professional travel content writer for ${AGENT.business}. Write engaging, SEO-optimized blog posts that:
- Are at least 1500 words
- Use HTML formatting (h2, h3, p, ul/li, strong, em tags — NO h1)
- Include the travel agent's name "${AGENT.name}" and phone number "${AGENT.phone}" naturally 2-3 times in the body
- Mention "${AGENT.location}" and "Central Florida" for local SEO
- Include a mid-article CTA box in HTML: a styled div encouraging readers to call
- Are written in a warm, expert, trustworthy tone
- Avoid generic filler — every paragraph should provide real value
- Include specific details, pricing ranges, and insider tips
- Reference traveladvisorsgroup.com naturally
- End with a compelling call to action to phone Richard
- Do NOT include an h1 tag — the page template handles that
- Do NOT include any markdown — use only HTML tags`

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: topic.prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  const data = await res.json()
  return data.choices?.[0]?.message?.content || ""
}

async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error("DATABASE_URL required")

  // Dynamic import for neon
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(dbUrl)

  console.log(`\n🚀 Blog Post Generator — ${AGENT.business}`)
  console.log(`📝 ${BLOG_TOPICS.length} topics to generate\n`)

  for (const topic of BLOG_TOPICS) {
    // Check if already exists
    const existing = await sql`SELECT id FROM dreamvacations.blog_posts WHERE slug = ${topic.slug}`
    if (existing.length > 0) {
      console.log(`⏭  "${topic.slug}" already exists — skipping`)
      continue
    }

    console.log(`\n📖 Generating: ${topic.title}`)

    // Fetch image
    console.log(`  🖼  Fetching image for "${topic.imageQuery}"...`)
    const image = await fetchPexelsImage(topic.imageQuery)

    // Generate content
    console.log(`  ✍️  Generating 1500+ word article...`)
    const content = await generateContent(topic)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 250)

    console.log(`  📊 ${wordCount} words, ~${readTime} min read`)

    // Build meta description
    const metaDesc = `${topic.title.replace(/ — .*/, "")}. Expert tips from ${AGENT.name}, travel agent in ${AGENT.location}. Call ${AGENT.phone} for a free consultation.`

    // Build excerpt
    const excerptMatch = content.match(/<p>(.*?)<\/p>/)
    const excerpt = excerptMatch
      ? excerptMatch[1].replace(/<[^>]+>/g, "").slice(0, 300)
      : topic.title

    // Schema markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: topic.title,
      description: metaDesc,
      image: image ? [image.url] : [],
      author: { "@type": "Person", name: AGENT.name },
      publisher: { "@type": "Organization", name: AGENT.business },
      datePublished: new Date().toISOString(),
      wordCount,
    }

    // Insert into DB
    await sql`
      INSERT INTO dreamvacations.blog_posts (
        slug, title, meta_description, h1, excerpt, content,
        hero_image_url, hero_image_alt, hero_image_credit,
        author, category, tags, keywords, schema_markup,
        read_time_minutes, word_count, cta_text, related_trip_slugs
      ) VALUES (
        ${topic.slug}, ${topic.title}, ${metaDesc}, ${topic.title},
        ${excerpt}, ${content},
        ${image?.url || null}, ${image?.alt || null}, ${image?.credit || null},
        ${AGENT.name}, ${topic.category},
        ${topic.tags}, ${topic.keywords},
        ${JSON.stringify(schema)},
        ${readTime}, ${wordCount},
        ${"Ready to plan your trip? Call " + AGENT.name + " at " + AGENT.phone + " for a free, personalized consultation. There's never a fee for Richard's expert planning services."},
        ${topic.relatedTrips}
      )
    `

    console.log(`  ✅ Saved to database!`)

    // Rate limit pause
    await new Promise((r) => setTimeout(r, 2000))
  }

  console.log(`\n🎉 Done! Blog posts generated and saved to dreamvacations.blog_posts`)
  console.log(`   View them at: ${AGENT.site}/blog\n`)
}

main().catch(console.error)
