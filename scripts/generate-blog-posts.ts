/**
 * Blog Post Generator v2 for Travel Advisors Group
 *
 * Features:
 * - Queries DB for existing slugs — never duplicates
 * - 1500+ word minimum enforced (retries if under)
 * - Internal links to /trips/ pages woven into every article by AI
 * - --fix-links mode: patches existing posts with internal links
 * - --count N: generate only N new posts per run
 * - Trending, seasonal, timely topics that position Richard as THE expert
 *
 * Usage:
 *   pnpm generate:blogs                    # Generate all new topics
 *   pnpm generate:blogs -- --fix-links     # Patch existing posts with internal links
 *   pnpm generate:blogs -- --count 5       # Generate only 5 new posts
 *
 * Env vars (via --env-file=.env.local):
 *   DATABASE_URL    - Neon connection string
 *   OPENAI_API_KEY  - OpenAI API key
 *   PEXELS_API_KEY  - Pexels API key (free at pexels.com/api)
 */

// ─── Agent info ───────────────────────────────────────────────────────────
const AGENT = {
  name: "Richard Johnson",
  phone: "(407) 951-2398",
  phoneTel: "+14079512398",
  location: "Winter Garden, FL",
  business: "Dream Vacations — Richard Johnson & Travel Advisors Group",
  site: "https://www.traveladvisorsgroup.com",
}

// ─── Internal link map ────────────────────────────────────────────────────
// AI is instructed to weave these as <a> tags naturally into the article body
const INTERNAL_LINKS: Record<string, string> = {
  "Caribbean cruise": "/trips/caribbean/cruise",
  "Caribbean vacation": "/trips/caribbean",
  "Mediterranean cruise": "/trips/mediterranean/cruise",
  "Alaska cruise": "/trips/alaska/cruise",
  "Hawaii vacation": "/trips/hawaii",
  "Bahamas cruise": "/trips/bahamas/cruise",
  "Greece vacation": "/trips/greece",
  "Italy vacation": "/trips/italy",
  "Maldives honeymoon": "/trips/maldives/honeymoon",
  "Costa Rica": "/trips/costa-rica",
  "Bali honeymoon": "/trips/bali/honeymoon",
  "St. Lucia honeymoon": "/trips/st-lucia/honeymoon",
  "Santorini": "/trips/santorini",
  "Danube river cruise": "/trips/danube-river/river-cruise",
  "Rhine river cruise": "/trips/rhine-river/river-cruise",
  "Panama Canal cruise": "/trips/panama-canal/cruise",
  "Galapagos": "/trips/galapagos",
  "Tahiti": "/trips/tahiti",
  "Bora Bora": "/trips/bora-bora",
  "all-inclusive resort": "/trips/all-inclusive-resort",
  "honeymoon": "/trips/honeymoon",
  "destination wedding": "/trips/destination-wedding",
  "family vacation": "/trips/family-vacation",
  "luxury travel": "/trips/luxury-travel",
  "adventure travel": "/trips/adventure-travel",
  "river cruise": "/trips/river-cruise",
  "group travel": "/trips/group-travel",
  "romantic getaway": "/trips/romantic-getaway",
  "beach vacation": "/trips/beach-vacation",
  "Royal Caribbean": "/trips/cruise-lines/royal-caribbean",
  "Celebrity Cruises": "/trips/cruise-lines/celebrity-cruises",
  "Norwegian Cruise Line": "/trips/cruise-lines/norwegian-cruise-line",
  "Disney Cruise Line": "/trips/cruise-lines/disney-cruise-line",
  "Carnival Cruise": "/trips/cruise-lines/carnival-cruise-line",
  "Viking": "/trips/cruise-lines/viking",
  "Seabourn": "/trips/cruise-lines/seabourn",
  "Regent Seven Seas": "/trips/cruise-lines/regent-seven-seas",
  "Silversea": "/trips/cruise-lines/silversea",
  "Oceania Cruises": "/trips/cruise-lines/oceania-cruises",
  "AmaWaterways": "/trips/cruise-lines/amawaterways",
  "Uniworld": "/trips/cruise-lines/uniworld",
  "Sandals": "/trips/cruise-lines/sandals-resorts",
  "Windstar": "/trips/cruise-lines/windstar-cruises",
  "Cunard": "/trips/cruise-lines/cunard",
  "Explora Journeys": "/trips/cruise-lines/explora-journeys",
  "Ritz-Carlton Yacht": "/trips/cruise-lines/ritz-carlton-yacht-collection",
  "Lindblad": "/trips/cruise-lines/lindblad-expeditions",
  "Abercrombie & Kent": "/trips/cruise-lines/abercrombie-and-kent",
  "Tauck": "/trips/cruise-lines/tauck-tours",
  "Princess Cruises": "/trips/cruise-lines/princess-cruises",
  "Holland America": "/trips/cruise-lines/holland-america-line",
  "Four Seasons": "/trips/cruise-lines/four-seasons",
  "Waldorf Astoria": "/trips/cruise-lines/waldorf-astoria",
  "Rocky Mountaineer": "/trips/cruise-lines/rocky-mountaineer",
  "Ponant": "/trips/cruise-lines/ponant-yacht-cruises",
  "Azamara": "/trips/cruise-lines/azamara-cruises",
}


// ─── Blog topics (existing 26 + 24 new = 50 total) ───────────────────────
// The script queries DB for existing slugs and only generates missing ones.
interface BlogTopic {
  slug: string
  title: string
  category: string
  keywords: string[]
  tags: string[]
  relatedTrips: string[]
  imageQuery: string
  prompt: string
}

const BLOG_TOPICS: BlogTopic[] = [
  // ── EXISTING 26 topics (kept for reference / --fix-links) ──
  {
    slug: "best-caribbean-cruises-2026",
    title: "The 10 Best Caribbean Cruises for 2026 — A Travel Agent's Expert Picks",
    category: "Cruises",
    keywords: ["best Caribbean cruises 2026", "Caribbean cruise deals", "cruise travel agent Florida"],
    tags: ["Caribbean", "cruises", "2026 travel", "Royal Caribbean", "Celebrity Cruises"],
    relatedTrips: ["caribbean/cruise", "cruise-lines/royal-caribbean/caribbean", "cruise-lines/celebrity-cruises/caribbean"],
    imageQuery: "caribbean cruise ship ocean",
    prompt: "",
  },
  {
    slug: "sandals-resort-guide-which-one-is-right-for-you",
    title: "Sandals Resort Guide — Which All-Inclusive Is Right for You?",
    category: "Resorts",
    keywords: ["Sandals resort guide", "best Sandals resort", "Sandals all-inclusive review"],
    tags: ["Sandals", "all-inclusive", "couples travel", "Jamaica", "St. Lucia"],
    relatedTrips: ["cruise-lines/sandals-resorts", "all-inclusive-resort", "honeymoon", "jamaica/all-inclusive-resort"],
    imageQuery: "luxury beach resort overwater bungalow",
    prompt: "",
  },
  {
    slug: "european-river-cruise-first-timers-guide",
    title: "European River Cruises — The Complete First-Timer's Guide for 2026",
    category: "River Cruises",
    keywords: ["European river cruise guide", "first river cruise tips", "Viking river cruise review"],
    tags: ["river cruises", "Europe", "Viking", "AmaWaterways", "Uniworld"],
    relatedTrips: ["river-cruise", "cruise-lines/viking/danube-river", "cruise-lines/amawaterways/rhine-river", "danube-river/river-cruise"],
    imageQuery: "river cruise ship europe danube",
    prompt: "",
  },
  {
    slug: "alaska-cruise-ultimate-planning-guide",
    title: "Alaska Cruise Planning Guide — Everything You Need to Know Before You Go",
    category: "Cruises",
    keywords: ["Alaska cruise guide", "best Alaska cruise 2026", "Alaska cruise tips"],
    tags: ["Alaska", "cruises", "nature travel", "Princess Cruises", "Holland America"],
    relatedTrips: ["alaska/cruise", "cruise-lines/princess-cruises/alaska", "cruise-lines/holland-america-line/alaska", "adventure-travel"],
    imageQuery: "alaska glacier cruise ship mountains",
    prompt: "",
  },
  {
    slug: "destination-wedding-planning-caribbean",
    title: "How to Plan a Destination Wedding in the Caribbean — A Step-by-Step Guide",
    category: "Weddings",
    keywords: ["destination wedding Caribbean", "destination wedding planner Florida"],
    tags: ["destination wedding", "Caribbean", "Sandals", "wedding planning"],
    relatedTrips: ["destination-wedding", "cancun/destination-wedding", "cruise-lines/sandals-resorts", "st-lucia/honeymoon"],
    imageQuery: "beach wedding ceremony tropical sunset",
    prompt: "",
  },
  {
    slug: "honeymoon-destinations-2026-top-picks",
    title: "Top 10 Honeymoon Destinations for 2026 — Romantic Getaways Worth the Splurge",
    category: "Honeymoons",
    keywords: ["best honeymoon destinations 2026", "honeymoon travel agent"],
    tags: ["honeymoon", "romance", "Maldives", "Bali", "St. Lucia", "Hawaii"],
    relatedTrips: ["honeymoon", "maldives/honeymoon", "bali/honeymoon", "st-lucia/honeymoon", "hawaii/honeymoon"],
    imageQuery: "romantic couple beach sunset honeymoon",
    prompt: "",
  },
  {
    slug: "family-cruise-tips-traveling-with-kids",
    title: "Family Cruise Tips — The Ultimate Guide to Cruising with Kids in 2026",
    category: "Family Travel",
    keywords: ["family cruise tips", "cruising with kids", "best family cruise line"],
    tags: ["family travel", "cruises", "kids", "Disney Cruise Line", "Royal Caribbean"],
    relatedTrips: ["family-vacation", "cruise-lines/disney-cruise-line/caribbean", "cruise-lines/royal-caribbean/bahamas", "caribbean/family-vacation"],
    imageQuery: "family cruise ship vacation kids pool",
    prompt: "",
  },
  {
    slug: "luxury-cruise-lines-compared-seabourn-viking-regent",
    title: "Luxury Cruise Lines Compared — Seabourn vs Viking vs Regent Seven Seas",
    category: "Luxury Travel",
    keywords: ["luxury cruise comparison", "Seabourn review", "Regent Seven Seas"],
    tags: ["luxury travel", "Seabourn", "Viking", "Regent Seven Seas", "cruises"],
    relatedTrips: ["luxury-travel", "cruise-lines/seabourn/mediterranean", "cruise-lines/viking/mediterranean", "mediterranean/luxury-travel"],
    imageQuery: "luxury cruise ship suite ocean view",
    prompt: "",
  },
  {
    slug: "mediterranean-cruise-guide-ports-itineraries",
    title: "Mediterranean Cruise Guide — Best Ports, Itineraries & Insider Tips for 2026",
    category: "Cruises",
    keywords: ["Mediterranean cruise guide", "best Mediterranean cruise ports"],
    tags: ["Mediterranean", "cruises", "Europe", "Greece", "Italy"],
    relatedTrips: ["mediterranean/cruise", "cruise-lines/celebrity-cruises/mediterranean", "cruise-lines/viking/mediterranean", "greece/cruise"],
    imageQuery: "mediterranean cruise ship santorini greece",
    prompt: "",
  },
  {
    slug: "what-to-pack-for-a-cruise-ultimate-checklist",
    title: "What to Pack for a Cruise — The Ultimate Packing Checklist for 2026",
    category: "Travel Tips",
    keywords: ["cruise packing list", "what to pack for a cruise"],
    tags: ["packing tips", "cruises", "travel tips", "first-time cruiser"],
    relatedTrips: ["cruise", "caribbean/cruise", "alaska/cruise"],
    imageQuery: "suitcase packing vacation travel",
    prompt: "",
  },
  {
    slug: "first-time-cruise-tips-everything-beginners-need-to-know",
    title: "First Time Cruise Tips — Everything Beginners Need to Know in 2026",
    category: "Travel Tips",
    keywords: ["first time cruise tips", "cruise for beginners"],
    tags: ["first-time cruiser", "cruise tips", "beginners"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise"],
    imageQuery: "cruise ship deck ocean view couple",
    prompt: "",
  },
  {
    slug: "best-all-inclusive-resorts-caribbean-2026",
    title: "The 15 Best All-Inclusive Resorts in the Caribbean for 2026",
    category: "Resorts",
    keywords: ["best all-inclusive resorts Caribbean", "top Caribbean resorts 2026"],
    tags: ["all-inclusive", "Caribbean", "resorts", "luxury"],
    relatedTrips: ["all-inclusive-resort", "caribbean/all-inclusive-resort", "jamaica/all-inclusive-resort", "cruise-lines/sandals-resorts"],
    imageQuery: "luxury caribbean resort pool beach",
    prompt: "",
  },
  {
    slug: "port-canaveral-cruise-guide-florida",
    title: "Port Canaveral Cruise Guide — Everything Florida Travelers Need to Know",
    category: "Cruises",
    keywords: ["Port Canaveral cruise guide", "cruises from Port Canaveral"],
    tags: ["Port Canaveral", "Florida", "cruises", "Central Florida"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise", "cruise-lines/disney-cruise-line/caribbean"],
    imageQuery: "port canaveral cruise ship florida",
    prompt: "",
  },
  {
    slug: "hawaii-vacation-planning-guide-which-island",
    title: "Hawaii Vacation Planning Guide — Which Island Is Right for You?",
    category: "Destinations",
    keywords: ["Hawaii vacation guide", "which Hawaiian island to visit"],
    tags: ["Hawaii", "vacation planning", "Maui", "Big Island", "Kauai"],
    relatedTrips: ["hawaii/honeymoon", "hawaii/family-vacation", "hawaii/beach-vacation"],
    imageQuery: "hawaii beach sunset palm trees",
    prompt: "",
  },
  {
    slug: "travel-insurance-guide-do-you-really-need-it",
    title: "Travel Insurance Guide — Do You Really Need It? A Travel Agent's Honest Answer",
    category: "Travel Tips",
    keywords: ["travel insurance guide", "do I need travel insurance"],
    tags: ["travel insurance", "travel tips", "trip protection"],
    relatedTrips: ["cruise", "luxury-travel", "honeymoon"],
    imageQuery: "travel planning documents passport",
    prompt: "",
  },
  {
    slug: "best-cruises-from-tampa-florida-2026",
    title: "Best Cruises from Tampa, Florida in 2026 — Destinations, Ships & Deals",
    category: "Cruises",
    keywords: ["cruises from Tampa", "Tampa cruise port"],
    tags: ["Tampa", "Florida", "cruises", "Caribbean"],
    relatedTrips: ["cruise", "caribbean/cruise", "cruise-lines/royal-caribbean/caribbean", "cruise-lines/carnival-cruise-line/caribbean"],
    imageQuery: "tampa cruise port ship florida",
    prompt: "",
  },
  {
    slug: "romantic-getaway-ideas-couples-2026",
    title: "25 Romantic Getaway Ideas for Couples in 2026",
    category: "Romance",
    keywords: ["romantic getaway ideas", "couples vacation ideas"],
    tags: ["romance", "couples", "getaways", "anniversary"],
    relatedTrips: ["romantic-getaway", "honeymoon", "aruba/romantic-getaway", "greece/romantic-getaway", "st-lucia/honeymoon"],
    imageQuery: "romantic couple sunset beach dinner",
    prompt: "",
  },
  {
    slug: "group-travel-planning-tips-reunions-celebrations",
    title: "Group Travel Planning — How to Organize Reunions, Celebrations & Corporate Retreats",
    category: "Group Travel",
    keywords: ["group travel planning", "family reunion travel"],
    tags: ["group travel", "reunions", "corporate retreats"],
    relatedTrips: ["group-travel", "cruise", "all-inclusive-resort"],
    imageQuery: "group friends vacation celebration beach",
    prompt: "",
  },
  {
    slug: "costa-rica-adventure-vacation-guide",
    title: "Costa Rica Adventure Vacation Guide — Rainforests, Volcanoes & Wildlife",
    category: "Destinations",
    keywords: ["Costa Rica vacation guide", "Costa Rica adventure travel"],
    tags: ["Costa Rica", "adventure", "eco-tourism", "family travel"],
    relatedTrips: ["costa-rica/adventure-travel", "costa-rica/family-vacation", "adventure-travel"],
    imageQuery: "costa rica rainforest waterfall tropical",
    prompt: "",
  },
  {
    slug: "why-use-travel-agent-instead-of-booking-online",
    title: "Why Use a Travel Agent Instead of Booking Online? 12 Reasons That Will Surprise You",
    category: "Travel Tips",
    keywords: ["why use a travel agent", "travel agent vs booking online"],
    tags: ["travel agent", "booking tips", "travel planning"],
    relatedTrips: ["cruise", "all-inclusive-resort", "honeymoon", "destination-wedding"],
    imageQuery: "travel agent planning vacation consultation",
    prompt: "",
  },
  {
    slug: "maldives-overwater-bungalow-guide",
    title: "Maldives Overwater Bungalow Guide — The Ultimate Luxury Honeymoon Destination",
    category: "Luxury Travel",
    keywords: ["Maldives overwater bungalow", "Maldives honeymoon"],
    tags: ["Maldives", "luxury", "honeymoon", "overwater bungalow"],
    relatedTrips: ["maldives/honeymoon", "maldives/luxury-travel", "honeymoon", "luxury-travel"],
    imageQuery: "maldives overwater bungalow turquoise ocean",
    prompt: "",
  },
  {
    slug: "christmas-new-years-cruise-guide-2026",
    title: "Christmas & New Year's Cruise Guide 2026 — Celebrate the Holidays at Sea",
    category: "Cruises",
    keywords: ["Christmas cruise 2026", "New Years cruise", "holiday cruise deals"],
    tags: ["holiday cruise", "Christmas", "New Years", "Caribbean"],
    relatedTrips: ["holiday-cruise", "danube-river/holiday-cruise", "caribbean/cruise"],
    imageQuery: "cruise ship christmas decorations holiday",
    prompt: "",
  },
  {
    slug: "italy-vacation-planning-guide-amalfi-tuscany-rome",
    title: "Italy Vacation Planning Guide — Amalfi Coast, Tuscany, Rome & Beyond",
    category: "Destinations",
    keywords: ["Italy vacation guide", "Amalfi Coast trip", "Tuscany travel"],
    tags: ["Italy", "Europe", "Amalfi Coast", "Tuscany", "Rome"],
    relatedTrips: ["italy/cruise", "italy/luxury-travel", "mediterranean/cruise"],
    imageQuery: "amalfi coast italy colorful village ocean",
    prompt: "",
  },
  {
    slug: "disney-cruise-line-complete-guide-families",
    title: "Disney Cruise Line — The Complete Guide for Families in 2026",
    category: "Family Travel",
    keywords: ["Disney Cruise Line guide", "Disney cruise review"],
    tags: ["Disney Cruise Line", "family travel", "kids", "Bahamas"],
    relatedTrips: ["cruise-lines/disney-cruise-line/caribbean", "cruise-lines/disney-cruise-line/bahamas", "family-vacation"],
    imageQuery: "disney cruise ship family vacation ocean",
    prompt: "",
  },
  {
    slug: "greece-island-hopping-guide-santorini-mykonos",
    title: "Greece Island Hopping Guide — Santorini, Mykonos, Crete & the Best Greek Islands",
    category: "Destinations",
    keywords: ["Greece island hopping", "Santorini travel guide"],
    tags: ["Greece", "island hopping", "Santorini", "Mykonos"],
    relatedTrips: ["greece/cruise", "greece/romantic-getaway", "mediterranean/cruise"],
    imageQuery: "santorini greece blue dome sunset",
    prompt: "",
  },

  // ── NEW 25 topics — trending, seasonal, high-conversion ──
  {
    slug: "ritz-carlton-yacht-collection-review-2026",
    title: "Ritz-Carlton Yacht Collection Review — Is It Worth the Splurge in 2026?",
    category: "Luxury Travel",
    keywords: ["Ritz-Carlton Yacht Collection review", "luxury yacht cruise", "Ritz-Carlton cruise 2026"],
    tags: ["Ritz-Carlton", "luxury cruise", "yacht", "Mediterranean", "Caribbean"],
    relatedTrips: ["cruise-lines/ritz-carlton-yacht-collection", "cruise-lines/ritz-carlton-yacht-collection/mediterranean", "luxury-travel"],
    imageQuery: "luxury yacht cruise ocean sunset",
    prompt: `Write a 1500+ word in-depth review of the Ritz-Carlton Yacht Collection. Cover the Evrima and Ilma yachts, suite categories, dining (S.E.A. restaurant), the all-inclusive pricing model, itineraries (Mediterranean, Caribbean, Northern Europe), and how it compares to Seabourn and Regent. Include who this cruise is best for, pricing ranges, and insider booking tips. Position Richard Johnson as a specialist who can secure suite upgrades and added amenities.`,
  },
  {
    slug: "expedition-cruises-guide-antarctica-galapagos-arctic",
    title: "Expedition Cruises — Your Guide to Antarctica, Galapagos & Arctic Adventures",
    category: "Adventure",
    keywords: ["expedition cruise guide", "Antarctica cruise", "Galapagos cruise", "Arctic expedition"],
    tags: ["expedition", "Antarctica", "Galapagos", "Lindblad", "Ponant", "Silversea"],
    relatedTrips: ["adventure-travel", "galapagos", "cruise-lines/lindblad-expeditions", "cruise-lines/ponant-yacht-cruises", "cruise-lines/silversea"],
    imageQuery: "expedition cruise ship antarctica ice",
    prompt: `Write a 1500+ word guide to expedition cruises. Cover Antarctica, Galapagos, Arctic Norway, and Iceland. Compare Lindblad-National Geographic, Ponant, Silversea Expeditions, HX, and Viking Expeditions. Discuss what makes expedition cruises different (Zodiac landings, naturalist guides, small ships), pricing ranges ($8K-$30K+), best time for each destination, physical fitness requirements, and packing tips. Explain why booking through a specialist travel agent is critical for expedition cruises.`,
  },
  {
    slug: "virgin-voyages-review-adults-only-cruise",
    title: "Virgin Voyages Review — The Adults-Only Cruise Shaking Up the Industry",
    category: "Cruises",
    keywords: ["Virgin Voyages review", "adults only cruise", "Virgin Voyages 2026"],
    tags: ["Virgin Voyages", "adults-only", "Caribbean", "Mediterranean", "modern cruise"],
    relatedTrips: ["cruise-lines/virgin-voyages", "caribbean/cruise", "mediterranean/cruise"],
    imageQuery: "modern cruise ship pool party adults",
    prompt: `Write a 1500+ word review of Virgin Voyages. Cover all ships (Scarlet Lady, Valiant Lady, Resilient Lady, Brilliant Lady), the Rockstar Suites, included dining at 20+ restaurants, no-tipping policy, The Beach Club at Bimini, tattoo parlor, and nightlife. Compare to traditional cruise lines. Discuss who Virgin Voyages is best for and who should avoid it. Include pricing and booking tips.`,
  },
  {
    slug: "best-safari-vacations-africa-2026",
    title: "Best Safari Vacations in Africa for 2026 — A Luxury Travel Agent's Guide",
    category: "Adventure",
    keywords: ["Africa safari vacation", "luxury safari 2026", "best safari lodges"],
    tags: ["safari", "Africa", "South Africa", "Kenya", "Tanzania", "luxury"],
    relatedTrips: ["south-africa", "adventure-travel", "luxury-travel", "cruise-lines/abercrombie-and-kent"],
    imageQuery: "african safari luxury lodge wildlife",
    prompt: `Write a 1500+ word guide to luxury safari vacations in Africa. Cover Kenya, Tanzania, South Africa, Botswana, and Rwanda. Discuss the best safari lodges (Singita, andBeyond, Four Seasons Safari Lodge), Great Migration timing, Big Five viewing, combining safari with beach (Zanzibar, Seychelles), and family-friendly options. Compare Abercrombie & Kent, Great Safaris, and National Geographic tours. Include pricing ranges and booking timeline.`,
  },
  {
    slug: "silversea-vs-seabourn-vs-regent-luxury-cruise-showdown",
    title: "Silversea vs Seabourn vs Regent — The Ultimate Luxury Cruise Showdown",
    category: "Luxury Travel",
    keywords: ["Silversea vs Seabourn", "best luxury cruise line 2026", "Regent vs Silversea"],
    tags: ["Silversea", "Seabourn", "Regent Seven Seas", "luxury cruise", "comparison"],
    relatedTrips: ["cruise-lines/silversea", "cruise-lines/seabourn", "cruise-lines/regent-seven-seas", "luxury-travel"],
    imageQuery: "luxury cruise ship penthouse suite balcony",
    prompt: `Write a 1500+ word head-to-head comparison of Silversea, Seabourn, and Regent Seven Seas. Compare: what's included (Regent is truly all-inclusive with flights), ship sizes, suite quality, dining, shore excursions, spa, dress code, itineraries, and overall value per dollar. Include specific ship recommendations and itinerary picks for each. Discuss who each line is best for.`,
  },
  {
    slug: "oceania-cruises-review-foodies-dream",
    title: "Oceania Cruises Review — Why Foodies Call It the Best Cruise Line at Sea",
    category: "Cruises",
    keywords: ["Oceania Cruises review", "best cruise for food", "Oceania vs Viking"],
    tags: ["Oceania Cruises", "food", "culinary", "Mediterranean", "premium cruise"],
    relatedTrips: ["cruise-lines/oceania-cruises", "mediterranean/cruise", "luxury-travel"],
    imageQuery: "gourmet dining cruise ship ocean view",
    prompt: `Write a 1500+ word review of Oceania Cruises. Focus on the culinary program (Jacques Pépin partnership, specialty restaurants, cooking classes), the new Vista-class ships, cabin categories, included excursions, and how Oceania sits in the "upper premium" sweet spot between mainstream and ultra-luxury. Compare to Viking and Celebrity. Include pricing and best itineraries.`,
  },
  {
    slug: "explora-journeys-review-new-luxury-cruise",
    title: "Explora Journeys Review — MSC's New Ultra-Luxury Cruise Line Explained",
    category: "Luxury Travel",
    keywords: ["Explora Journeys review", "new luxury cruise line", "Explora I review"],
    tags: ["Explora Journeys", "luxury cruise", "new ships", "Mediterranean"],
    relatedTrips: ["cruise-lines/explora-journeys", "mediterranean/cruise", "luxury-travel", "caribbean/cruise"],
    imageQuery: "ultra luxury cruise ship modern suite",
    prompt: `Write a 1500+ word review of Explora Journeys, the new ultra-luxury brand from MSC Group. Cover the Explora I and II, ocean residences, dining concepts, the Ocean Wellness spa, included shore excursions, and how it compares to established luxury lines like Silversea and Regent. Discuss the "Ocean State of Mind" philosophy and who this cruise is designed for.`,
  },
  {
    slug: "best-multigenerational-vacation-ideas",
    title: "Best Multigenerational Vacation Ideas — How to Plan a Trip Everyone Will Love",
    category: "Family Travel",
    keywords: ["multigenerational vacation", "family reunion trip", "grandparents travel with grandkids"],
    tags: ["multigenerational", "family travel", "cruises", "resorts", "group travel"],
    relatedTrips: ["family-vacation", "group-travel", "all-inclusive-resort", "cruise", "cruise-lines/disney-cruise-line/caribbean"],
    imageQuery: "multigenerational family vacation beach",
    prompt: `Write a 1500+ word guide to planning multigenerational vacations. Cover the best vacation types (cruises, all-inclusive resorts, villa rentals, guided tours), how to balance different age groups and mobility levels, budgeting across families, and specific destination recommendations. Include Disney Cruise Line, Royal Caribbean, Sandals/Beaches, and villa options in Italy and Hawaii. Explain why a travel agent is essential for coordinating multigenerational trips.`,
  },
  {
    slug: "cunard-queen-mary-2-transatlantic-crossing",
    title: "Cunard Queen Mary 2 Transatlantic Crossing — The Most Iconic Voyage at Sea",
    category: "Cruises",
    keywords: ["Queen Mary 2 transatlantic", "Cunard crossing review", "transatlantic cruise"],
    tags: ["Cunard", "Queen Mary 2", "transatlantic", "luxury", "classic cruise"],
    relatedTrips: ["cruise-lines/cunard", "northern-europe/cruise", "luxury-travel"],
    imageQuery: "queen mary 2 cruise ship ocean transatlantic",
    prompt: `Write a 1500+ word article about the Cunard Queen Mary 2 transatlantic crossing. Cover the history, the 7-night New York to Southampton route, cabin categories (from Britannia to Queens Grill), dining, the Planetarium, Illuminations theater, the Kennels (yes, dogs!), dress code, and what a typical sea day looks like. Compare to flying and explain why the crossing is a bucket-list experience. Include pricing and booking tips.`,
  },
  {
    slug: "best-cruise-suites-haven-yacht-club-retreat",
    title: "Best Cruise Suites — Norwegian Haven vs MSC Yacht Club vs Celebrity Retreat",
    category: "Luxury Travel",
    keywords: ["best cruise suites", "Norwegian Haven review", "MSC Yacht Club", "Celebrity Retreat"],
    tags: ["suites", "Norwegian Haven", "MSC Yacht Club", "Celebrity", "luxury"],
    relatedTrips: ["luxury-suite-cruise", "cruise-lines/norwegian-cruise-line", "cruise-lines/msc-cruises", "cruise-lines/celebrity-cruises"],
    imageQuery: "luxury cruise suite balcony ocean view",
    prompt: `Write a 1500+ word comparison of the best "ship-within-a-ship" suite experiences: Norwegian's Haven, MSC's Yacht Club, and Celebrity's Retreat. Compare: private areas, butler service, exclusive restaurants, pool/sundeck access, suite sizes, and pricing. Include specific ship recommendations for each. Discuss who each is best for and why booking through a travel agent gets you better suite perks.`,
  },
  {
    slug: "rocky-mountaineer-train-journey-guide",
    title: "Rocky Mountaineer Guide — Canada's Most Spectacular Train Journey",
    category: "Adventure",
    keywords: ["Rocky Mountaineer review", "Canadian train journey", "Rocky Mountaineer 2026"],
    tags: ["Rocky Mountaineer", "Canada", "train travel", "adventure", "luxury"],
    relatedTrips: ["cruise-lines/rocky-mountaineer", "adventure-travel", "luxury-travel", "alaska/cruise"],
    imageQuery: "rocky mountaineer train canadian rockies mountains",
    prompt: `Write a 1500+ word guide to the Rocky Mountaineer. Cover all routes (First Passage to the West, Journey Through the Clouds, Rainforest to Gold Rush), GoldLeaf vs SilverLeaf service, what's included, the best time to go, how to combine with an Alaska cruise, and pricing. Include tips on which route to choose and why a travel agent helps with packaging the train + cruise combo.`,
  },
  {
    slug: "best-overwater-bungalows-caribbean-pacific",
    title: "Best Overwater Bungalows — From the Caribbean to the South Pacific",
    category: "Luxury Travel",
    keywords: ["best overwater bungalows", "overwater villa Caribbean", "Bora Bora overwater"],
    tags: ["overwater bungalow", "Maldives", "Bora Bora", "Jamaica", "luxury", "honeymoon"],
    relatedTrips: ["maldives/honeymoon", "bora-bora", "tahiti", "cruise-lines/sandals-resorts", "luxury-travel"],
    imageQuery: "overwater bungalow turquoise lagoon tropical",
    prompt: `Write a 1500+ word guide to the world's best overwater bungalows. Cover Maldives (Soneva, Conrad, St. Regis), Bora Bora (Four Seasons, Conrad), Tahiti, Fiji, Jamaica (Sandals), and newer options in Aruba and Mexico. For each, describe the experience, pricing, best time to visit, and what's included. Discuss honeymoon vs anniversary trips. Explain how a travel agent secures upgrades and honeymoon perks.`,
  },
  {
    slug: "amawaterways-vs-viking-vs-uniworld-river-cruise",
    title: "AmaWaterways vs Viking vs Uniworld — Which River Cruise Line Is Best?",
    category: "River Cruises",
    keywords: ["AmaWaterways vs Viking", "best river cruise line", "Uniworld review"],
    tags: ["AmaWaterways", "Viking", "Uniworld", "river cruise", "Europe"],
    relatedTrips: ["river-cruise", "cruise-lines/amawaterways", "cruise-lines/viking-river", "cruise-lines/uniworld", "danube-river/river-cruise"],
    imageQuery: "river cruise ship europe vineyard castle",
    prompt: `Write a 1500+ word comparison of AmaWaterways, Viking River, and Uniworld. Compare: ship design, cabin sizes, dining quality, included excursions, active options (AmaWaterways bikes and hikes), luxury level (Uniworld's boutique approach), pricing, and best routes for each. Include specific itinerary recommendations and discuss who each line is best for.`,
  },
  {
    slug: "how-to-save-money-on-cruises-insider-secrets",
    title: "How to Save Money on Cruises — 15 Insider Secrets from a Travel Agent",
    category: "Travel Tips",
    keywords: ["save money on cruises", "cruise deals tips", "cheap cruise tricks"],
    tags: ["cruise deals", "money saving", "travel tips", "booking advice"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise", "cruise-lines/carnival-cruise-line"],
    imageQuery: "cruise ship deal savings vacation",
    prompt: `Write a 1500+ word article revealing 15 insider secrets for saving money on cruises. Cover: booking timing (wave season, last-minute vs early bird), repositioning cruises, shoulder season sailing, cabin category hacks, onboard credit strategies, drink package math, shore excursion alternatives, loyalty programs, group rates, and why a travel agent often gets better pricing than booking direct. Use specific dollar examples. Heavy CTA throughout.`,
  },
  {
    slug: "best-honeymoon-cruises-2026",
    title: "Best Honeymoon Cruises for 2026 — Romance on the High Seas",
    category: "Honeymoons",
    keywords: ["honeymoon cruise", "best romantic cruise", "couples cruise 2026"],
    tags: ["honeymoon", "cruise", "romance", "couples", "Caribbean", "Mediterranean"],
    relatedTrips: ["honeymoon", "caribbean/cruise", "mediterranean/cruise", "cruise-lines/seabourn", "cruise-lines/silversea"],
    imageQuery: "romantic cruise couple sunset balcony",
    prompt: `Write a 1500+ word guide to the best honeymoon cruises. Cover luxury options (Seabourn, Silversea, Regent), premium (Celebrity, Viking), mainstream with suite upgrades (Royal Caribbean, Norwegian Haven), and river cruises. For each, describe the romantic appeal, best itineraries, suite recommendations, and honeymoon perks. Include a section on combining a cruise with a beach stay. Discuss how a travel agent secures honeymoon amenities.`,
  },
  {
    slug: "abercrombie-kent-luxury-tours-review",
    title: "Abercrombie & Kent Review — Are Their Luxury Tours Worth the Price?",
    category: "Luxury Travel",
    keywords: ["Abercrombie & Kent review", "A&K luxury tours", "luxury guided tours"],
    tags: ["Abercrombie & Kent", "luxury tours", "safari", "guided travel"],
    relatedTrips: ["cruise-lines/abercrombie-and-kent", "luxury-travel", "south-africa", "adventure-travel"],
    imageQuery: "luxury safari tent africa sunset",
    prompt: `Write a 1500+ word review of Abercrombie & Kent luxury tours. Cover their safari programs, small group journeys, private jet expeditions, family adventures, and tailor-made trips. Discuss what justifies the premium pricing (expert guides, luxury lodges, seamless logistics), compare to Tauck and National Geographic tours, and include specific trip recommendations. Explain how booking through a travel agent can add value even with A&K.`,
  },
  {
    slug: "best-cruise-ports-florida-port-canaveral-tampa-miami",
    title: "Florida Cruise Ports Compared — Port Canaveral vs Tampa vs Miami vs Fort Lauderdale",
    category: "Cruises",
    keywords: ["Florida cruise ports", "Port Canaveral vs Miami", "best cruise port Florida"],
    tags: ["Florida", "Port Canaveral", "Tampa", "Miami", "Fort Lauderdale", "cruise ports"],
    relatedTrips: ["cruise", "caribbean/cruise", "bahamas/cruise"],
    imageQuery: "florida cruise port ship departure",
    prompt: `Write a 1500+ word comparison of Florida's four major cruise ports: Port Canaveral, Tampa, Miami, and Fort Lauderdale. For each, cover which cruise lines sail from there, parking costs, nearby hotels, transportation options, pros and cons, and which port is best for different types of cruisers. Especially relevant for Central Florida travelers — mention Richard is based in Winter Garden near Port Canaveral.`,
  },
  {
    slug: "tauck-tours-review-premium-guided-travel",
    title: "Tauck Tours Review — Premium Guided Travel for Discerning Travelers",
    category: "Luxury Travel",
    keywords: ["Tauck tours review", "Tauck vs Abercrombie Kent", "premium guided tours"],
    tags: ["Tauck", "guided tours", "luxury travel", "Europe", "river cruise"],
    relatedTrips: ["cruise-lines/tauck-tours", "luxury-travel", "italy/luxury-travel", "river-cruise"],
    imageQuery: "luxury guided tour europe castle",
    prompt: `Write a 1500+ word review of Tauck Tours. Cover their land tours, river cruises (partnership with Uniworld ships), small ship cruises, and family adventures. Discuss the all-inclusive pricing model, exclusive access experiences, hotel quality, group sizes, and how Tauck compares to Abercrombie & Kent and National Geographic. Include specific tour recommendations for Europe, Africa, and the Americas.`,
  },
  {
    slug: "four-seasons-private-jet-experience-review",
    title: "Four Seasons Private Jet Experience — The Ultimate Luxury Trip Around the World",
    category: "Luxury Travel",
    keywords: ["Four Seasons private jet", "luxury around the world trip", "ultra luxury travel"],
    tags: ["Four Seasons", "private jet", "ultra luxury", "around the world"],
    relatedTrips: ["cruise-lines/four-seasons", "luxury-travel"],
    imageQuery: "private jet luxury travel first class",
    prompt: `Write a 1500+ word article about the Four Seasons Private Jet Experience. Cover the custom Airbus A321neo, itinerary options (around the world, Africa, Asia), what's included (Four Seasons hotels, all meals, excursions), pricing ($150K+), the onboard experience, and who books these trips. Also cover Four Seasons resort properties in Maldives, Bora Bora, and Hawaii. Position this as the pinnacle of luxury travel that Richard can book.`,
  },
  {
    slug: "best-adults-only-all-inclusive-resorts-2026",
    title: "Best Adults-Only All-Inclusive Resorts for 2026 — Couples & Friends Getaways",
    category: "Resorts",
    keywords: ["adults only all inclusive", "best couples resort 2026", "adults only Caribbean resort"],
    tags: ["adults-only", "all-inclusive", "couples", "Sandals", "Secrets", "Hyatt Zilara"],
    relatedTrips: ["all-inclusive-resort", "cruise-lines/sandals-resorts", "romantic-getaway", "honeymoon"],
    imageQuery: "adults only resort pool infinity ocean",
    prompt: `Write a 1500+ word guide to the best adults-only all-inclusive resorts for 2026. Cover Sandals (multiple properties), Secrets Resorts, Excellence Playa Mujeres, Hyatt Zilara, UNICO 20°87°, and boutique options. For each, describe the vibe, what's included, best room categories, dining, and pricing. Include a section on Sandals' Butler Service and Overwater Bungalows. Discuss how a travel agent gets better rates and room upgrades.`,
  },
  {
    slug: "national-geographic-expeditions-review",
    title: "National Geographic Expeditions Review — Travel Like an Explorer",
    category: "Adventure",
    keywords: ["National Geographic tours review", "Nat Geo expeditions", "educational travel"],
    tags: ["National Geographic", "expeditions", "Lindblad", "adventure", "educational"],
    relatedTrips: ["cruise-lines/national-geographic-tours", "cruise-lines/lindblad-expeditions", "adventure-travel", "galapagos"],
    imageQuery: "national geographic expedition wildlife photography",
    prompt: `Write a 1500+ word review of National Geographic Expeditions. Cover the Lindblad-National Geographic partnership (small ship cruises), land-based tours, photography expeditions, and family adventures. Discuss what makes these trips unique (expert naturalists, National Geographic photographers, Zodiac landings), pricing, best trips for first-timers, and how they compare to G Adventures and Abercrombie & Kent.`,
  },
  {
    slug: "windstar-cruises-review-small-ship-sailing",
    title: "Windstar Cruises Review — Small Ship Sailing for the Adventurous Traveler",
    category: "Cruises",
    keywords: ["Windstar Cruises review", "small ship cruise", "sailing cruise"],
    tags: ["Windstar", "small ship", "sailing", "Mediterranean", "Caribbean"],
    relatedTrips: ["cruise-lines/windstar-cruises", "mediterranean/cruise", "caribbean/cruise", "yacht-cruise"],
    imageQuery: "windstar sailing cruise ship ocean sails",
    prompt: `Write a 1500+ word review of Windstar Cruises. Cover the sailing yachts (Wind Surf, Wind Star, Wind Spirit) and the Star-class motor yachts. Discuss the intimate 148-342 guest experience, the Watersports Platform, open-bridge policy, dining, itineraries (Greek islands, Caribbean, Tahiti), and how Windstar compares to SeaDream and Ponant. Include pricing and who Windstar is best for.`,
  },
  {
    slug: "seadream-yacht-club-review-mega-yacht-cruise",
    title: "SeaDream Yacht Club Review — The Mega-Yacht Cruise Experience",
    category: "Luxury Travel",
    keywords: ["SeaDream review", "yacht club cruise", "small luxury cruise"],
    tags: ["SeaDream", "yacht", "luxury", "Mediterranean", "Caribbean"],
    relatedTrips: ["cruise-lines/seadream-yacht-club", "yacht-cruise", "mediterranean/cruise", "luxury-travel"],
    imageQuery: "luxury mega yacht cruise deck ocean",
    prompt: `Write a 1500+ word review of SeaDream Yacht Club. Cover the twin mega-yachts (SeaDream I and II), the 112-guest intimacy, Balinese Dream Beds on deck, champagne and caviar splash parties, the no-shoes-required vibe, dining, itineraries, and how it compares to Windstar and Ritz-Carlton Yacht Collection. Include pricing and booking tips.`,
  },
  {
    slug: "summer-2026-travel-trends-what-to-book-now",
    title: "Summer 2026 Travel Trends — What to Book Now Before It Sells Out",
    category: "Travel Tips",
    keywords: ["summer 2026 travel trends", "what to book now", "travel trends 2026"],
    tags: ["travel trends", "2026", "summer travel", "booking advice"],
    relatedTrips: ["cruise", "all-inclusive-resort", "family-vacation", "mediterranean/cruise", "alaska/cruise"],
    imageQuery: "summer vacation travel planning beach",
    prompt: `Write a 1500+ word article on summer 2026 travel trends. Cover: the hottest destinations (Japan post-Olympics buzz, Mediterranean, Alaska, Iceland), cruise industry trends (new ships launching, expedition growth), all-inclusive resort evolution, luxury train travel boom, and what's selling out fastest. Include specific booking timelines and why waiting costs more. Position Richard as the expert who tracks these trends daily.`,
  },
]


// ─── Pexels image fetcher ─────────────────────────────────────────────────
async function fetchPexelsImage(query: string): Promise<{ url: string; alt: string; credit: string } | null> {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) { console.log("  ⚠ No PEXELS_API_KEY — skipping image"); return null }
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=large`,
      { headers: { Authorization: apiKey } }
    )
    const data = await res.json()
    if (data.photos?.length > 0) {
      const photo = data.photos[Math.floor(Math.random() * Math.min(3, data.photos.length))]
      return { url: photo.src.landscape || photo.src.large, alt: photo.alt || query, credit: `${photo.photographer} via Pexels` }
    }
  } catch (e) { console.log("  ⚠ Pexels fetch failed:", e) }
  return null
}

// ─── Build the internal links instruction for the AI ──────────────────────
function buildLinkInstruction(topic: BlogTopic): string {
  // Pick relevant links based on topic tags/keywords
  const relevant: string[] = []
  const topicText = `${topic.title} ${topic.tags.join(" ")} ${topic.keywords.join(" ")} ${topic.category}`.toLowerCase()

  for (const [anchor, path] of Object.entries(INTERNAL_LINKS)) {
    if (topicText.includes(anchor.toLowerCase().split(" ")[0])) {
      relevant.push(`- "${anchor}" → <a href="${AGENT.site}${path}">${anchor}</a>`)
    }
  }
  // Always include a few high-value links
  relevant.push(`- "travel agent" or "free consultation" → <a href="${AGENT.site}/#contact">free consultation</a>`)
  relevant.push(`- "trip ideas" or "browse trips" → <a href="${AGENT.site}/trips">browse trip ideas</a>`)
  relevant.push(`- "current deals" → <a href="${AGENT.site}/deals">current deals and specials</a>`)

  // Deduplicate and limit to 15
  const unique = [...new Set(relevant)].slice(0, 15)
  return unique.join("\n")
}

// ─── AI content generator ─────────────────────────────────────────────────
async function generateContent(topic: BlogTopic, attempt = 1): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("OPENAI_API_KEY required")

  const linkInstructions = buildLinkInstruction(topic)

  const systemPrompt = `You are ${AGENT.name}, a CLIA-certified travel advisor and Dream Vacations franchise owner based in ${AGENT.location}. You write as a first-person expert — warm, authoritative, and genuinely helpful. You are writing for ${AGENT.business} at ${AGENT.site}.

WRITING RULES:
- Write AT LEAST 1500 words (aim for 1800-2000). This is critical — short articles will be rejected.
- Use HTML formatting: <h2>, <h3>, <p>, <ul>/<li>, <strong>, <em>, <blockquote>. NO <h1> tag.
- Mention your name "${AGENT.name}" and phone "${AGENT.phone}" naturally 3-4 times throughout.
- Reference "${AGENT.location}" and "Central Florida" for local SEO.
- Write with genuine expertise — specific details, real pricing ranges, insider tips, personal recommendations.
- Every paragraph must provide real value. No filler, no fluff, no generic travel writing.
- Include a mid-article CTA: a styled HTML div with background color encouraging readers to call.

INTERNAL LINKING (CRITICAL FOR SEO):
Weave 5-8 internal links naturally into the article text using <a> tags. These must feel organic, not forced.
Use these exact link mappings where relevant:
${linkInstructions}

Example of natural internal linking:
"If you're considering a <a href="${AGENT.site}/trips/caribbean/cruise">Caribbean cruise</a>, the Eastern Caribbean itinerary offers the best mix of beaches and culture."

STRUCTURE:
- Open with a compelling hook that establishes your expertise
- Use H2 headings for major sections, H3 for subsections
- Include comparison tables or bullet lists where helpful
- Add a mid-article CTA box (styled div)
- Close with a personal recommendation and strong phone CTA
- Do NOT include markdown — HTML only
- Do NOT include an <h1> tag`

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
      max_tokens: 6000,
    }),
  })

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ""
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length

  // Retry once if under 1500 words
  if (wordCount < 1400 && attempt < 2) {
    console.log(`  ⚠ Only ${wordCount} words — retrying with stronger prompt...`)
    const retryTopic = { ...topic, prompt: topic.prompt + "\n\nIMPORTANT: The previous attempt was only " + wordCount + " words. You MUST write at least 1500 words. Expand each section with more detail, examples, and insider tips. Add additional subsections if needed." }
    return generateContent(retryTopic, attempt + 1)
  }

  return content
}


// ─── Inject internal links into existing HTML content ─────────────────────
function injectInternalLinks(html: string, topic: BlogTopic): string {
  let updated = html
  let linksAdded = 0
  const maxLinks = 8

  // Sort by anchor length descending so longer phrases match first
  const sortedLinks = Object.entries(INTERNAL_LINKS).sort((a, b) => b[0].length - a[0].length)

  for (const [anchor, path] of sortedLinks) {
    if (linksAdded >= maxLinks) break

    // Skip if this anchor text is already linked
    if (updated.includes(`>${anchor}</a>`)) continue
    if (updated.includes(`>${anchor}<`)) continue

    // Only match text NOT already inside an <a> tag
    // Match the anchor text in paragraph/list content (not in headings or existing links)
    const escapedAnchor = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(
      `(?<![">])\\b(${escapedAnchor})\\b(?![^<]*<\\/a>)(?![^<]*<\\/h[23])`,
      "i"
    )

    if (regex.test(updated)) {
      updated = updated.replace(regex, `<a href="${AGENT.site}${path}">$1</a>`)
      linksAdded++
    }
  }

  // Always ensure at least one CTA link if none exist
  if (!updated.includes("/trips") && !updated.includes("/#contact")) {
    updated += `\n<p>Ready to start planning? <a href="${AGENT.site}/#contact">Get a free quote</a> from ${AGENT.name} or call <a href="tel:${AGENT.phoneTel}">${AGENT.phone}</a> today.</p>`
    linksAdded++
  }

  return updated
}

// ─── Fix existing posts: inject internal links ────────────────────────────
async function fixExistingLinks(sql: any) {
  console.log("\n🔗 Fixing internal links in existing blog posts...\n")

  const posts = await sql`
    SELECT id, slug, content, word_count FROM dreamvacations.blog_posts
    WHERE is_published = true
    ORDER BY published_at DESC
  `

  let fixed = 0
  for (const post of posts) {
    const topic = BLOG_TOPICS.find((t) => t.slug === post.slug)
    if (!topic) {
      console.log(`  ⏭ "${post.slug}" — no topic definition, skipping`)
      continue
    }

    const originalLinkCount = (post.content.match(/<a\s+href/gi) || []).length
    const updated = injectInternalLinks(post.content, topic)
    const newLinkCount = (updated.match(/<a\s+href/gi) || []).length
    const added = newLinkCount - originalLinkCount

    if (added > 0) {
      await sql`
        UPDATE dreamvacations.blog_posts
        SET content = ${updated}, updated_at = NOW()
        WHERE id = ${post.id}
      `
      console.log(`  ✅ "${post.slug}" — added ${added} internal links (${originalLinkCount} → ${newLinkCount})`)
      fixed++
    } else {
      console.log(`  ⏭ "${post.slug}" — already has sufficient links (${originalLinkCount})`)
    }
  }

  console.log(`\n🔗 Fixed ${fixed} of ${posts.length} posts`)
}

// ─── Main runner ──────────────────────────────────────────────────────────
async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error("DATABASE_URL required")

  const args = process.argv.slice(2)
  const fixLinks = args.includes("--fix-links")
  const countIdx = args.indexOf("--count")
  const maxCount = countIdx >= 0 ? parseInt(args[countIdx + 1]) || 999 : 999

  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(dbUrl)

  console.log(`\n🚀 Blog Post Generator v2 — ${AGENT.business}`)

  // Fix existing posts if requested
  if (fixLinks) {
    await fixExistingLinks(sql)
  }

  // Get existing slugs from DB
  const existing = await sql`SELECT slug FROM dreamvacations.blog_posts`
  const existingSlugs = new Set(existing.map((r: any) => r.slug))
  console.log(`📊 ${existingSlugs.size} existing posts in DB`)

  // Filter to only new topics that have prompts (existing topics have empty prompts)
  const newTopics = BLOG_TOPICS.filter((t) => t.prompt && !existingSlugs.has(t.slug))
  const toGenerate = newTopics.slice(0, maxCount)

  if (toGenerate.length === 0) {
    console.log("✅ All topics already exist in DB — nothing to generate!")
    if (!fixLinks) console.log("   Tip: Run with --fix-links to update existing posts with internal links")
    return
  }

  console.log(`📝 ${toGenerate.length} new posts to generate (of ${newTopics.length} available)\n`)

  let generated = 0
  for (const topic of toGenerate) {
    console.log(`\n📖 [${generated + 1}/${toGenerate.length}] ${topic.title}`)

    // Fetch image
    console.log(`  🖼  Fetching image...`)
    const image = await fetchPexelsImage(topic.imageQuery)

    // Generate content with internal links
    console.log(`  ✍️  Generating 1500+ word article with internal links...`)
    const rawContent = await generateContent(topic)

    // Also run the link injector as a safety net
    const content = injectInternalLinks(rawContent, topic)

    const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length
    const readTime = Math.ceil(wordCount / 250)
    const linkCount = (content.match(/<a\s+href/gi) || []).length

    console.log(`  📊 ${wordCount} words · ~${readTime} min read · ${linkCount} internal links`)

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
      author: { "@type": "Person", name: AGENT.name, url: AGENT.site },
      publisher: {
        "@type": "Organization",
        name: AGENT.business,
        logo: { "@type": "ImageObject", url: `${AGENT.site}/dv-logo-white.png` },
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      wordCount,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${AGENT.site}/blog/${topic.slug}` },
    }

    // Insert into DB (ON CONFLICT skip to handle race conditions)
    await sql`
      INSERT INTO dreamvacations.blog_posts (
        slug, title, meta_description, h1, excerpt, content,
        hero_image_url, hero_image_alt, hero_image_credit,
        author, category, tags, keywords, schema_markup,
        read_time_minutes, word_count, cta_text, related_trip_slugs,
        is_published, published_at
      ) VALUES (
        ${topic.slug}, ${topic.title}, ${metaDesc}, ${topic.title},
        ${excerpt}, ${content},
        ${image?.url || null}, ${image?.alt || null}, ${image?.credit || null},
        ${AGENT.name}, ${topic.category},
        ${topic.tags}, ${topic.keywords},
        ${JSON.stringify(schema)},
        ${readTime}, ${wordCount},
        ${"Ready to plan your trip? Call " + AGENT.name + " at " + AGENT.phone + " for a free, personalized consultation. There's never a fee for Richard's expert planning services."},
        ${topic.relatedTrips},
        ${true}, ${new Date().toISOString()}
      )
      ON CONFLICT (slug) DO NOTHING
    `

    console.log(`  ✅ Saved to database!`)
    generated++

    // Rate limit pause (OpenAI + Pexels)
    await new Promise((r) => setTimeout(r, 3000))
  }

  console.log(`\n🎉 Done! Generated ${generated} new blog posts`)
  console.log(`   Total posts in DB: ${existingSlugs.size + generated}`)
  console.log(`   View them at: ${AGENT.site}/blog\n`)
}

main().catch(console.error)
