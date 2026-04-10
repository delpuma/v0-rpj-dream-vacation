import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Culinary Adventures – Luxury Food Travel Trends 2025",
  description:
    "Food is becoming a primary travel motivator. Discover the top culinary travel trends—from Michelin‑starred experiences to wine festivals—and learn how to plan a delicious trip.",
  alternates: {
    canonical: "/blog/culinary-adventures-2025",
  },
  openGraph: {
    title: "Culinary Adventures – Luxury Food Travel Trends 2025",
    description:
      "Food is becoming a primary travel motivator. Discover the top culinary travel trends—from Michelin‑starred experiences to wine festivals—and learn how to plan a delicious trip.",
    url: "https://traveladvisorsgroup.com/blog/culinary-adventures-2025",
    images: [{ url: "/images/blog/culinary-2025-hero.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Culinary Adventures – Luxury Food Travel Trends 2025",
    description:
      "Food is becoming a primary travel motivator. Discover the top culinary travel trends—from Michelin‑starred experiences to wine festivals—and learn how to plan a delicious trip.",
    images: ["/images/blog/culinary-2025-hero.png"],
  },
  keywords: [
    "luxury culinary travel 2025",
    "food tourism trends",
    "chef‑led tours",
    "wine tasting vacations",
    "culinary destinations",
  ],
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Culinary Adventures – Luxury Food Travel Trends 2025",
    description:
      "Food is becoming a primary travel motivator. Discover the top culinary travel trends—from Michelin‑starred experiences to wine festivals—and learn how to plan a delicious trip.",
    image: ["https://traveladvisorsgroup.com/images/blog/culinary-2025-hero.png"],
    author: { "@type": "Organization", name: "Dream Vacations by Richard Johnson & Travel Advisors Group" },
    publisher: {
      "@type": "Organization",
      name: "Dream Vacations by Richard Johnson & Travel Advisors Group",
      logo: { "@type": "ImageObject", url: "https://traveladvisorsgroup.com/opengraph-image.png" },
    },
  }

  return (
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative w-full h-[260px] md:h-[360px] lg:h-[440px]">
        <Image
          src="/images/blog/culinary-2025-hero.png"
          alt="Luxury culinary travel with chef‑led tasting and wine"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            Savor the World – Culinary Travel Takes Center Stage
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-10 prose prose-blue max-w-4xl">
        <p>
          Virtuoso’s Luxe Report lists culinary experiences as a crucial element of luxury travel. Travelers are looking
          beyond restaurants to fully immersive food adventures, from foraging in forests to cooking alongside
          experienced local chefs.
        </p>

        <h2>Top Culinary Travel Ideas</h2>
        <ul>
          <li>
            <strong>Chef‑led tours:</strong> Participate in market visits and hands‑on classes with local chefs in Italy,
            France or Japan.
          </li>
          <li>
            <strong>Wine &amp; truffle festivals:</strong> Attend seasonal celebrations like Tuscany’s truffle hunts or
            Burgundy’s wine harvest.
          </li>
          <li>
            <strong>Farm‑to‑table retreats:</strong> Stay on organic estates where you can pick ingredients and dine
            alfresco under the stars.
          </li>
        </ul>

        <h2>Pros &amp; Cons</h2>
        <p>
          <strong>Pros:</strong> Heightened sensory experiences and a deeper connection to culture; opportunities to
          learn new skills.
          <br />
          <strong>Cons:</strong> Some experiences require early booking; dietary restrictions may limit participation.
        </p>

        <h2>Next Steps</h2>
        <p>
          Hungry for a culinary adventure? Let Richard at Dream Vacations pair you with chefs, vintners and farmers who
          love to share their craft. Call now to plan a mouth‑watering journey for 2025 or 2026.
        </p>

        <div className="not-prose mt-6 flex flex-wrap gap-3">
          <Link href="#contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Request a Culinary Quote</Button>
          </Link>
          <Link href="tel:+14079512398">
            <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              Call (407) 951‑2398
            </Button>
          </Link>
        </div>
      </main>
    </article>
  )
}
