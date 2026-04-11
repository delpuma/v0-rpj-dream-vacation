import { AGENT_INFO } from "./pseo-data"

type PageType =
  | "destination"
  | "trip-type"
  | "cruise-line"
  | "destination-trip-type"
  | "cruise-line-destination"

interface ContentParams {
  pageType: PageType
  destination?: string
  tripType?: string
  cruiseLine?: string
  slug: string
}

export function generateTitle(params: ContentParams): string {
  const { destination, tripType, cruiseLine } = params
  const loc = "Winter Garden FL"

  if (cruiseLine && destination) {
    return `${cruiseLine} ${destination} Cruises — Book with Travel Agent in ${loc}`
  }
  if (destination && tripType) {
    return `${destination} ${tripType} — Travel Agent ${loc} | ${AGENT_INFO.name}`
  }
  if (cruiseLine) {
    return `${cruiseLine} Cruise Deals — Travel Agent ${loc} | ${AGENT_INFO.name}`
  }
  if (destination) {
    return `${destination} Vacations — Travel Agent ${loc} | ${AGENT_INFO.name}`
  }
  if (tripType) {
    return `${tripType} — Travel Agent ${loc} | ${AGENT_INFO.name}`
  }
  return `Dream Vacations — Travel Agent ${loc} | ${AGENT_INFO.name}`
}

export function generateMetaDescription(params: ContentParams): string {
  const { destination, tripType, cruiseLine } = params

  if (cruiseLine && destination) {
    return `Book ${cruiseLine} cruises to ${destination} with ${AGENT_INFO.name}, travel agent in ${AGENT_INFO.location}. Personalized itineraries, exclusive deals & white-glove service. Call ${AGENT_INFO.phone} for a free quote.`
  }
  if (destination && tripType) {
    return `${destination} ${tripType.toLowerCase()} packages planned by ${AGENT_INFO.name}, your travel agent in ${AGENT_INFO.location}. Custom itineraries, best prices & expert guidance. Call ${AGENT_INFO.phone} today.`
  }
  if (cruiseLine) {
    return `${cruiseLine} cruise specialist ${AGENT_INFO.name} in ${AGENT_INFO.location}. Exclusive deals, cabin upgrades & personalized planning. Call ${AGENT_INFO.phone} for your free cruise quote.`
  }
  if (destination) {
    return `Plan your ${destination} vacation with ${AGENT_INFO.name}, travel agent in ${AGENT_INFO.location}. Custom itineraries, insider tips & best prices guaranteed. Call ${AGENT_INFO.phone}.`
  }
  if (tripType) {
    return `${tripType} packages from ${AGENT_INFO.name}, travel agent in ${AGENT_INFO.location}. Personalized planning, exclusive deals & expert advice. Call ${AGENT_INFO.phone} for a free consultation.`
  }
  return `${AGENT_INFO.business} — your travel agent in ${AGENT_INFO.location}. Expert vacation planning & exclusive deals. Call ${AGENT_INFO.phone}.`
}

export function generateH1(params: ContentParams): string {
  const { destination, tripType, cruiseLine } = params

  if (cruiseLine && destination) {
    return `${cruiseLine} Cruises to ${destination}`
  }
  if (destination && tripType) {
    return `${destination} ${tripType}`
  }
  if (cruiseLine) {
    return `${cruiseLine} Cruise Packages`
  }
  if (destination) {
    return `${destination} Vacation Packages`
  }
  if (tripType) {
    return `${tripType} Packages`
  }
  return "Dream Vacation Packages"
}

export function generateSchemaMarkup(params: ContentParams & { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: AGENT_INFO.business,
    description: params.description,
    url: params.url,
    telephone: AGENT_INFO.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winter Garden",
      addressRegion: "FL",
      postalCode: "34787",
      addressCountry: "US",
    },
    employee: {
      "@type": "Person",
      name: AGENT_INFO.name,
      jobTitle: "Travel Advisor",
    },
    areaServed: [
      { "@type": "City", name: "Winter Garden" },
      { "@type": "City", name: "Orlando" },
      { "@type": "City", name: "Windermere" },
      { "@type": "City", name: "Clermont" },
      { "@type": "State", name: "Florida" },
    ],
    makesOffer: {
      "@type": "Offer",
      name: params.title,
      description: params.description,
    },
    sameAs: [AGENT_INFO.corporateUrl],
    memberOf: {
      "@type": "Organization",
      name: "CLIA - Cruise Lines International Association",
    },
  }
}

// Unique content per destination — avoids duplication with corporate site
const DESTINATION_CONTENT: Record<string, { intro: string; highlights: string[] }> = {
  Caribbean: {
    intro: "The Caribbean remains the most popular cruise and resort destination for Central Florida travelers. With year-round warm weather, crystal-clear waters, and dozens of island nations to explore, a Caribbean vacation offers something for every type of traveler — from adventure seekers diving coral reefs to couples seeking secluded beach retreats.",
    highlights: ["Private island experiences", "Snorkeling & diving", "Beach resort stays", "Island-hopping itineraries", "Cultural excursions"],
  },
  Mediterranean: {
    intro: "A Mediterranean voyage combines ancient history, world-class cuisine, and stunning coastal scenery into one unforgettable journey. From the Greek Islands to the Italian Riviera, the Med offers a depth of cultural experiences that no other region can match.",
    highlights: ["Greek island hopping", "Italian coastal towns", "Spanish tapas tours", "French Riviera beaches", "Ancient ruins exploration"],
  },
  Alaska: {
    intro: "Alaska cruises offer a once-in-a-lifetime encounter with raw wilderness — towering glaciers calving into the sea, humpback whales breaching, and bald eagles soaring overhead. The Inside Passage route is one of the most scenic waterways on Earth.",
    highlights: ["Glacier viewing", "Wildlife encounters", "Scenic railway excursions", "Gold rush history", "Whale watching"],
  },
  Hawaii: {
    intro: "Hawaii delivers the perfect blend of adventure and relaxation across its diverse islands. Each island has its own personality — from the volcanic landscapes of the Big Island to the lush valleys of Kauai and the world-famous beaches of Maui.",
    highlights: ["Volcano National Park", "Snorkeling at Molokini", "Na Pali Coast tours", "Luau experiences", "Surfing lessons"],
  },
  Bahamas: {
    intro: "The Bahamas offers pristine beaches, crystal-clear waters, and a laid-back island vibe just a short cruise from Florida. From the vibrant culture of Nassau to the secluded beauty of the Out Islands, the Bahamas is perfect for quick getaways and extended vacations alike.",
    highlights: ["Swimming with pigs at Exuma", "Atlantis resort", "Blue hole diving", "Nassau culture", "Private island beaches"],
  },
  Jamaica: {
    intro: "Jamaica pulses with energy — from the reggae rhythms of Kingston to the cascading waterfalls of Ocho Rios and the luxury all-inclusive resorts of Montego Bay. It's the Caribbean's most culturally rich island and a top destination for couples and families.",
    highlights: ["Dunn's River Falls", "Sandals resorts", "Jerk cuisine tours", "Blue Mountains coffee", "Negril Seven Mile Beach"],
  },
  Maldives: {
    intro: "The Maldives is the ultimate luxury honeymoon destination — overwater bungalows perched above turquoise lagoons, private island resorts, and some of the world's best snorkeling and diving. It's pure paradise for couples seeking an unforgettable romantic escape.",
    highlights: ["Overwater bungalows", "Private island resorts", "Coral reef snorkeling", "Underwater restaurants", "Sunset dolphin cruises"],
  },
  Bali: {
    intro: "Bali enchants with its lush rice terraces, ancient temples, world-class surfing, and spiritual retreats. Whether you're seeking adventure, romance, or wellness, Bali offers an exotic escape that feels both luxurious and deeply authentic.",
    highlights: ["Ubud rice terraces", "Temple visits", "Surf lessons", "Spa retreats", "Volcano sunrise treks"],
  },
  Greece: {
    intro: "Greece captivates with its iconic blue-domed churches, ancient ruins, and island-hopping adventures. From the dramatic caldera of Santorini to the party beaches of Mykonos and the history of Athens, Greece is a Mediterranean dream.",
    highlights: ["Santorini sunsets", "Mykonos nightlife", "Athens Acropolis", "Crete cuisine", "Island ferry hopping"],
  },
  Italy: {
    intro: "Italy is a feast for every sense — Renaissance art in Florence, ancient history in Rome, coastal beauty along the Amalfi Coast, and some of the world's finest cuisine everywhere you turn. A trip to Italy is a bucket-list experience that never disappoints.",
    highlights: ["Amalfi Coast drives", "Roman Colosseum", "Venetian gondolas", "Tuscan wine tours", "Cinque Terre hiking"],
  },
  "Costa Rica": {
    intro: "Costa Rica is Central America's eco-adventure paradise — zip-lining through cloud forests, white-water rafting, volcano hikes, and wildlife encounters in one of the most biodiverse countries on Earth. It's perfect for families and adventure seekers.",
    highlights: ["Arenal volcano", "Manuel Antonio beaches", "Zip-line canopy tours", "Wildlife spotting", "Hot springs"],
  },
  "Punta Cana": {
    intro: "Punta Cana is the Dominican Republic's crown jewel — miles of white-sand beaches, world-class all-inclusive resorts, and championship golf courses. It's one of the most affordable luxury beach destinations in the Caribbean.",
    highlights: ["All-inclusive resorts", "Bavaro Beach", "Catamaran excursions", "Golf courses", "Saona Island day trips"],
  },
  "Cabo San Lucas": {
    intro: "Cabo San Lucas sits at the tip of Mexico's Baja Peninsula where the Pacific meets the Sea of Cortez. Known for its dramatic rock formations, sport fishing, nightlife, and luxury resorts, Cabo is a favorite for couples and groups.",
    highlights: ["El Arco landmark", "Sport fishing", "Luxury resorts", "Desert & ocean landscapes", "Whale watching"],
  },
  Santorini: {
    intro: "Santorini is the most photographed island in Greece — dramatic volcanic cliffs, blue-domed churches, and sunsets that stop you in your tracks. It's the ultimate romantic destination and a highlight of any Mediterranean cruise.",
    highlights: ["Oia sunset views", "Caldera boat tours", "Wine tasting", "Black sand beaches", "Ancient Akrotiri ruins"],
  },
  "Bora Bora": {
    intro: "Bora Bora is the epitome of tropical luxury — overwater bungalows, a stunning turquoise lagoon, and Mount Otemanu rising dramatically in the background. It's consistently ranked as one of the world's most beautiful islands.",
    highlights: ["Overwater bungalows", "Lagoon snorkeling", "Shark & ray feeding", "Mount Otemanu views", "Polynesian culture"],
  },
  Dubai: {
    intro: "Dubai is a city of superlatives — the tallest building, the largest mall, man-made islands, and ultra-luxury hotels. It's a fascinating blend of traditional Arabian culture and futuristic ambition, perfect for luxury travelers.",
    highlights: ["Burj Khalifa", "Desert safari", "Gold Souk", "Palm Jumeirah", "Luxury shopping"],
  },
  Iceland: {
    intro: "Iceland is a land of fire and ice — erupting geysers, massive glaciers, the Northern Lights, and the famous Blue Lagoon. It's one of the most unique destinations on Earth and increasingly popular for adventure travelers and cruise passengers.",
    highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Glacier hiking", "Whale watching"],
  },
  Norway: {
    intro: "Norway's dramatic fjords, midnight sun, and Northern Lights make it one of the most spectacular cruise destinations in the world. Viking heritage, charming coastal towns, and pristine wilderness create an unforgettable Scandinavian experience.",
    highlights: ["Fjord cruises", "Northern Lights", "Bergen fish market", "Midnight sun", "Viking museums"],
  },
}

export function generateContentSections(params: ContentParams) {
  const { destination, tripType, cruiseLine } = params
  const sections: { heading: string; content: string }[] = []

  // Unique value proposition — why Richard specifically
  sections.push({
    heading: `Why ${AGENT_INFO.name} for Your ${destination || tripType || cruiseLine || ""} Trip?`,
    content: `${AGENT_INFO.bio} Unlike online booking engines, Richard provides hands-on service from your first call to your return home. He monitors pricing after booking to ensure you always get the best deal, handles all the logistics, and is available around the clock if anything changes during your trip. Based right here in ${AGENT_INFO.location}, he serves travelers across ${AGENT_INFO.serviceArea} and beyond.`,
  })

  // Destination-specific unique content
  if (destination && DESTINATION_CONTENT[destination]) {
    const dc = DESTINATION_CONTENT[destination]
    sections.push({
      heading: `${destination} Travel Guide`,
      content: dc.intro,
    })
    // Add highlights as a separate section
    if (dc.highlights.length > 0) {
      sections.push({
        heading: `Top ${destination} Experiences`,
        content: dc.highlights.map((h) => `• ${h}`).join("\n") + `\n\n${AGENT_INFO.name} can arrange all of these experiences and more as part of your custom ${destination} itinerary. Call ${AGENT_INFO.phone} to start planning.`,
      })
    }
  } else if (destination) {
    sections.push({
      heading: `Discover ${destination}`,
      content: `${destination} is a top destination for travelers seeking memorable experiences. Whether it's your first visit or a return trip, ${AGENT_INFO.name} will design an itinerary that matches your interests, budget, and travel style — with insider recommendations you won't find on any booking website.`,
    })
  }

  // For combo pages (destination + trip type), add a unique bridging section
  if (destination && tripType) {
    sections.push({
      heading: `Why ${destination} Is Perfect for a ${tripType}`,
      content: `Combining ${destination} with a ${tripType.toLowerCase()} creates one of the most sought-after vacation experiences. ${AGENT_INFO.name} has helped dozens of travelers plan this exact combination, and he knows the best timing, the top-rated properties, and the insider tips that make the difference between a good trip and an extraordinary one. Whether you're comparing options or ready to book, Richard's expertise in both ${destination} travel and ${tripType.toLowerCase()} planning means you get the best of both worlds.`,
    })
  }

  // For cruise line + destination combos, add sailing-specific content
  if (cruiseLine && destination) {
    sections.push({
      heading: `${cruiseLine} Sailing Options to ${destination}`,
      content: `${cruiseLine} offers some of the most popular itineraries to ${destination}, with departures throughout the year from multiple ports. ${AGENT_INFO.name} tracks all available sailings and can advise on the best ship, cabin category, and departure date for your specific preferences. As a ${cruiseLine} specialist, Richard often secures onboard credits, cabin upgrades, and exclusive amenities that aren't available when booking directly online.`,
    })
  }

  if (tripType) {
    // Trip-type-specific deep content — makes each page genuinely unique
    const tripTypeContent: Record<string, string> = {
      "Cruise": `A cruise vacation is one of the best values in travel — you unpack once and wake up to a new destination every day, with meals, entertainment, and transportation all included. ${AGENT_INFO.name} helps you navigate the overwhelming number of options: which ship size suits your style, whether an inside cabin or balcony is worth the upgrade, and which itinerary gives you the best port days. Richard also monitors pricing after booking and rebooks if rates drop — something you'd never get booking online.`,
      "All-Inclusive Resort": `All-inclusive resorts eliminate the stress of budgeting on vacation — your meals, drinks, activities, and entertainment are all covered in one upfront price. But not all all-inclusives are created equal. ${AGENT_INFO.name} knows which resorts deliver genuine luxury versus which ones cut corners. He'll match you with the right property based on your priorities: food quality, beach access, room category, adults-only vs family-friendly, and included activities. Richard's clients consistently get room upgrades and resort credits that aren't available through online booking.`,
      "Honeymoon": `Your honeymoon is the most important trip you'll ever take — it sets the tone for your marriage and creates memories you'll cherish forever. ${AGENT_INFO.name} treats every honeymoon with the care it deserves, handling every detail from overwater bungalow selection to surprise champagne deliveries. He knows which resorts offer the best honeymoon packages, which room categories have the most privacy, and which destinations match your vision of romance. Many of Richard's honeymoon clients receive complimentary upgrades, spa credits, and special amenities.`,
      "Destination Wedding": `A destination wedding combines your ceremony, reception, and honeymoon into one unforgettable experience — but the logistics can be complex. ${AGENT_INFO.name} specializes in coordinating every detail: venue selection, guest room blocks, group rates, travel arrangements for attendees, welcome bags, and rehearsal dinners. He works directly with resort wedding coordinators to ensure your vision comes to life. Richard has planned weddings at Sandals, Secrets, Dreams, and independent venues across the Caribbean and Mexico.`,
      "Family Vacation": `Planning a family vacation means balancing everyone's interests — from toddlers to teenagers to grandparents. ${AGENT_INFO.name} excels at finding destinations and accommodations that keep every generation happy. He knows which cruise lines have the best kids clubs, which resorts offer connecting rooms, and which destinations provide the right mix of adventure and relaxation for families. Richard also helps with practical details like car seats, dietary needs, and age-appropriate excursions.`,
      "Luxury Travel": `Luxury travel is about more than thread count and champagne — it's about experiences that money can't easily buy. ${AGENT_INFO.name} has relationships with luxury suppliers that unlock private tours, VIP access, chef's table dinners, and behind-the-scenes experiences. He knows the difference between a luxury brand that delivers and one that's coasting on reputation. Richard's luxury clients consistently report that his planning elevated their trip from excellent to extraordinary.`,
      "Adventure Travel": `Adventure travel requires a different kind of planning — you need a travel advisor who understands logistics, safety, physical requirements, and the difference between a tourist trap and an authentic experience. ${AGENT_INFO.name} plans adventure trips that balance thrill with comfort, from zip-lining through cloud forests to glacier hiking in Alaska. He vets every operator for safety records and ensures you have the right gear, insurance, and backup plans.`,
      "Beach Vacation": `A beach vacation should be the most relaxing trip of the year — but choosing the wrong resort or destination can turn paradise into disappointment. ${AGENT_INFO.name} knows which beaches live up to the photos, which resorts have the best beachfront access, and which destinations offer the clearest water and softest sand. He'll match you with the perfect beach getaway based on your priorities: seclusion vs nightlife, snorkeling vs surfing, budget vs luxury.`,
      "River Cruise": `River cruising is the most intimate and culturally immersive way to explore Europe — small ships, included excursions, and a new charming town every day. ${AGENT_INFO.name} is a river cruise specialist who knows the differences between Viking, AmaWaterways, and Uniworld inside and out. He advises on cabin placement (river side matters!), the best time of year for each route, and which pre/post extensions are worth adding. Richard's river cruise clients consistently get cabin upgrades and onboard credits.`,
      "Group Travel": `Group travel is where a travel agent's value really shines — coordinating multiple families, budgets, dietary needs, and activity preferences is a logistical challenge that online booking simply can't handle. ${AGENT_INFO.name} has organized groups from 8 to 50+ travelers, managing room blocks, group rates, shared excursions, and private events. He serves as the single point of contact so you can enjoy the trip instead of playing coordinator.`,
      "Romantic Getaway": `A romantic getaway is about creating moments that bring you closer together — sunset dinners, couples massages, private excursions, and accommodations that set the mood. ${AGENT_INFO.name} designs romantic escapes that go beyond the standard hotel booking. He knows which resorts have the most secluded suites, which restaurants require reservations months in advance, and which experiences create the kind of memories that last a lifetime.`,
      "Holiday Cruise": `Holiday cruises sell out faster than any other sailing — families and couples love celebrating Christmas, New Year's, and Thanksgiving at sea. ${AGENT_INFO.name} starts booking holiday cruises 12-18 months in advance for his clients to secure the best cabins and pricing. He knows which cruise lines go all-out for holiday decorations, which have the best New Year's Eve parties, and which European river cruises offer the most magical Christmas market experiences.`,
    }

    const specificContent = tripTypeContent[tripType]
    sections.push({
      heading: `How ${AGENT_INFO.name} Plans Your ${tripType}`,
      content: specificContent || `Every ${tripType.toLowerCase()} Richard plans starts with a conversation about what matters most to you. He then leverages his industry relationships and destination expertise to build a custom package that maximizes your experience and value. From selecting the right accommodations to arranging special touches like anniversary dinners or private tours, every detail is handled.`,
    })
  }

  if (cruiseLine) {
    sections.push({
      heading: `Certified ${cruiseLine} Specialist`,
      content: `As a certified ${cruiseLine} specialist, ${AGENT_INFO.name} knows every ship class, cabin category, and itinerary option available. He can advise on the best time to sail, which cabin locations offer the smoothest ride, and which shore excursions are worth booking versus exploring independently. His clients consistently receive upgrades, onboard credits, and perks not available through direct booking.`,
    })
  }

  // Local angle — important for local SEO
  sections.push({
    heading: `Travel Agent Serving ${AGENT_INFO.location} & ${AGENT_INFO.serviceArea}`,
    content: `Richard Johnson serves travelers throughout Central Florida including Winter Garden, Orlando, Windermere, Ocoee, Clermont, and surrounding communities. As a local travel advisor, he understands the unique needs of Florida travelers — from convenient departure ports like Port Canaveral and Tampa to seasonal travel patterns. Whether you prefer to meet in person or plan everything by phone, Richard makes the process seamless.`,
  })

  // Strong CTA
  sections.push({
    heading: "Start Planning Today — It's Free",
    content: `Ready to turn your vacation dreams into reality? Call ${AGENT_INFO.name} at ${AGENT_INFO.phone} for a free, no-obligation consultation. There's never a fee for Richard's planning services — his expertise is complimentary. You can also fill out the quick form below and he'll reach out within 24 hours with personalized options for your trip.`,
  })

  return sections
}

export function generateFaqSchema(params: ContentParams) {
  const { destination, tripType, cruiseLine } = params
  const faqs: { question: string; answer: string }[] = []

  if (destination) {
    faqs.push(
      {
        question: `How much does a ${destination} vacation cost?`,
        answer: `${destination} vacation costs vary based on travel dates, accommodation type, and activities. ${AGENT_INFO.name} works with every budget to find the best value. Call ${AGENT_INFO.phone} for a free personalized quote.`,
      },
      {
        question: `When is the best time to visit ${destination}?`,
        answer: `The ideal time to visit ${destination} depends on your preferences for weather, crowds, and pricing. ${AGENT_INFO.name} can advise on the optimal travel window for your specific needs and help you save by booking during value seasons.`,
      },
      {
        question: `Do I need a travel agent to book a ${destination} trip?`,
        answer: `While you can book online, a travel agent like ${AGENT_INFO.name} provides personalized service, access to exclusive deals not available online, price monitoring after booking, and 24/7 support during your trip — all at no additional cost to you.`,
      }
    )
  }

  if (tripType) {
    faqs.push(
      {
        question: `How far in advance should I book a ${tripType.toLowerCase()}?`,
        answer: `For the best selection and pricing, we recommend booking ${tripType.toLowerCase()} packages 6-12 months in advance. However, ${AGENT_INFO.name} can also find excellent last-minute deals. Call ${AGENT_INFO.phone} to discuss your timeline.`,
      },
      {
        question: `What's included in a ${tripType.toLowerCase()} package?`,
        answer: `${tripType} packages vary by destination and provider. ${AGENT_INFO.name} customizes every package to include exactly what you want — from flights and accommodations to excursions and travel insurance. Every detail is tailored to your preferences.`,
      }
    )
  }

  if (cruiseLine) {
    faqs.push(
      {
        question: `Is it cheaper to book ${cruiseLine} through a travel agent?`,
        answer: `Travel agents like ${AGENT_INFO.name} often secure the same or better pricing than booking direct, plus exclusive perks like onboard credits, cabin upgrades, and complimentary amenities. There's no extra cost for using a travel agent — ${cruiseLine} pays the commission.`,
      },
      {
        question: `What ${cruiseLine} ship is best for my trip?`,
        answer: `Each ${cruiseLine} ship offers a different experience. ${AGENT_INFO.name} knows every ship in the fleet and can match you with the perfect vessel based on your travel style, group size, and destination preferences. Call ${AGENT_INFO.phone} for expert guidance.`,
      }
    )
  }

  // Universal FAQ
  faqs.push(
    {
      question: `Does ${AGENT_INFO.name} charge a fee for travel planning?`,
      answer: `No. ${AGENT_INFO.name}'s travel planning services are completely free. As a Dream Vacations franchise owner, Richard is compensated by travel suppliers — not by you. You get expert, personalized service at no additional cost.`,
    },
    {
      question: `How do I contact ${AGENT_INFO.name}?`,
      answer: `Call ${AGENT_INFO.phone} for immediate assistance, or fill out the contact form on this page. Richard personally responds to all inquiries within 24 hours. He serves travelers in ${AGENT_INFO.location} and throughout Central Florida.`,
    }
  )

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(params: ContentParams) {
  const BASE = "https://www.traveladvisorsgroup.com"
  const items: { name: string; url: string }[] = [
    { name: "Home", url: BASE },
    { name: "Trip Ideas", url: `${BASE}/trips` },
  ]

  if (params.pageType === "cruise-line-destination" && params.cruiseLine && params.destination) {
    items.push(
      { name: params.cruiseLine, url: `${BASE}/trips/cruise-lines/${params.cruiseLineSlug}` },
      { name: params.destination, url: `${BASE}/trips/cruise-lines/${params.cruiseLineSlug}/${params.destinationSlug}` }
    )
  } else if (params.pageType === "cruise-line" && params.cruiseLine) {
    items.push({ name: params.cruiseLine, url: `${BASE}/trips/cruise-lines/${params.cruiseLineSlug}` })
  } else if (params.pageType === "destination-trip-type" && params.destination && params.tripType) {
    items.push(
      { name: params.destination, url: `${BASE}/trips/${params.destinationSlug}` },
      { name: params.tripType, url: `${BASE}/trips/${params.destinationSlug}/${params.tripTypeSlug}` }
    )
  } else if (params.destination) {
    items.push({ name: params.destination, url: `${BASE}/trips/${params.destinationSlug}` })
  } else if (params.tripType) {
    items.push({ name: params.tripType, url: `${BASE}/trips/${params.tripTypeSlug}` })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Extended content params that includes slugs for breadcrumbs
interface ExtendedContentParams extends ContentParams {
  destinationSlug?: string
  tripTypeSlug?: string
  cruiseLineSlug?: string
}

export type { ContentParams, ExtendedContentParams, PageType }
