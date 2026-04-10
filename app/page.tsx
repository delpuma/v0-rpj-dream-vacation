import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ExploreCtaSection } from "@/components/explore-cta-section"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { FeaturedTripsSection } from "@/components/featured-trips-section"
import { BlogSection } from "@/components/blog-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PhoneCtaBanner } from "@/components/phone-cta-banner"

const SITE = "https://traveladvisorsgroup.com"

export default function Home() {
  // TravelAgency schema — the primary business entity
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE}/#organization`,
    name: "Dream Vacations — Richard Johnson & Travel Advisors Group",
    alternateName: ["Travel Advisors Group", "Dream Vacations Richard Johnson", "Richard Johnson Travel Agent"],
    url: SITE,
    telephone: "+14079512398",
    email: "rpjohnson@dreamvacations.com",
    description:
      "Richard Johnson is your trusted travel agent in Winter Garden, FL. Specializing in cruises, all-inclusive resorts, honeymoons, destination weddings, river cruises & family vacations. Call (407) 951-2398 for a free quote.",
    image: `${SITE}/opengraph-image.png`,
    logo: `${SITE}/dv-logo-white.png`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winter Garden",
      addressRegion: "FL",
      postalCode: "34787",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5653,
      longitude: -81.5862,
    },
    areaServed: [
      { "@type": "City", name: "Winter Garden", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Orlando", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Windermere", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Ocoee", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Clermont", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "State", name: "Florida" },
    ],
    hasMap: "https://www.google.com/maps/place/Winter+Garden,+FL",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      "https://rpjohnson.dreamvacations.com",
      "https://travelagents.dreamvacations.com/agents/agent/166212",
    ],
    memberOf: {
      "@type": "Organization",
      name: "CLIA — Cruise Lines International Association",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Dream Vacations",
      url: "https://www.dreamvacations.com",
    },
    knowsAbout: [
      "Cruise Vacations", "All-Inclusive Resorts", "Honeymoon Planning",
      "Destination Weddings", "River Cruises", "Family Vacations",
      "Luxury Travel", "Caribbean Cruises", "Mediterranean Cruises",
      "Alaska Cruises", "Sandals Resorts", "Royal Caribbean",
      "Viking Cruises", "Seabourn Cruises", "Uniworld River Cruises",
      "AmaWaterways", "Group Travel", "Adventure Travel",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cruise Vacation Planning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "All-Inclusive Resort Booking" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Honeymoon & Romance Travel" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Destination Wedding Coordination" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "European River Cruise Planning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Vacation Planning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Group Travel Coordination" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Travel Experiences" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adventure Travel Planning" } },
      ],
    },
  }

  // WebSite schema — helps Google show sitelinks
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Travel Advisors Group — Richard Johnson Dream Vacations",
    description: "Your trusted travel agent in Winter Garden, FL. Cruises, resorts, honeymoons & more.",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-US",
  }

  // Person schema — establishes Richard as a known entity for AI/knowledge panels
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Richard Johnson",
    jobTitle: "Travel Advisor & Franchise Owner",
    worksFor: { "@id": `${SITE}/#organization` },
    url: SITE,
    image: `${SITE}/rj-headshot-2.jpg`,
    telephone: "+14079512398",
    email: "rpjohnson@dreamvacations.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winter Garden",
      addressRegion: "FL",
      addressCountry: "US",
    },
    knowsAbout: [
      "Travel Planning", "Cruise Vacations", "All-Inclusive Resorts",
      "Destination Weddings", "Honeymoon Planning", "River Cruises",
    ],
    sameAs: [
      "https://rpjohnson.dreamvacations.com",
    ],
  }

  // Homepage FAQ schema
  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Richard Johnson charge a fee for travel planning?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Richard Johnson's travel planning services are completely free. As a Dream Vacations franchise owner, Richard is compensated by travel suppliers — not by you. You get expert, personalized service at no additional cost.",
        },
      },
      {
        "@type": "Question",
        name: "What areas does Richard Johnson serve as a travel agent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Richard serves travelers in Winter Garden, Orlando, Windermere, Ocoee, Clermont, and all of Central Florida. He also works with clients nationwide by phone and video call.",
        },
      },
      {
        "@type": "Question",
        name: "What types of vacations does Richard Johnson specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Richard specializes in cruises (ocean and river), all-inclusive resorts like Sandals, honeymoons, destination weddings, family vacations, luxury travel, group trips, and adventure travel. He works with top cruise lines including Royal Caribbean, Viking, Seabourn, Uniworld, and AmaWaterways.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Richard Johnson to plan a vacation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Call (407) 951-2398 for immediate assistance, or fill out the contact form on this website. Richard personally responds to all inquiries within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "Is it cheaper to book through a travel agent or online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Travel agents like Richard often secure the same or better pricing than booking direct, plus exclusive perks like onboard credits, cabin upgrades, and complimentary amenities. There's no extra cost — cruise lines and resorts pay the agent commission, not you.",
        },
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PhoneCtaBanner text="Free vacation planning — no fees, no obligation. Call Richard today." />
        <BlogSection />
        <ServicesSection />
        <PhoneCtaBanner text="Cruises, resorts, honeymoons & more — let Richard handle the details." />
        <FeaturedTripsSection />
        <TestimonialsSection />
        <ContactFormSection />
        <ExploreCtaSection />
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
