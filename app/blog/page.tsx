import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { neon } from "@neondatabase/serverless"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { AGENT_INFO } from "@/lib/pseo-data"
import { InlineLeadForm } from "@/components/inline-lead-form"
import { Clock, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: `Travel Blog — Tips, Guides & Inspiration | ${AGENT_INFO.name}`,
  description: `Expert travel tips, destination guides, cruise reviews & vacation inspiration from ${AGENT_INFO.name}, your travel agent in ${AGENT_INFO.location}. Call ${AGENT_INFO.phone}.`,
  alternates: { canonical: "/blog" },
}

export const revalidate = 3600 // revalidate every hour

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  hero_image_url: string | null
  hero_image_alt: string | null
  category: string | null
  published_at: string
  read_time_minutes: number
  tags: string[]
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT slug, title, excerpt, hero_image_url, hero_image_alt, category, published_at, read_time_minutes, tags
      FROM dreamvacations.blog_posts
      WHERE is_published = true
      ORDER BY published_at DESC
      LIMIT 50
    `
    return rows as BlogPost[]
  } catch {
    return []
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts()

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Travel Blog</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Expert travel tips, destination guides, cruise reviews & vacation inspiration from {AGENT_INFO.name}.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-gray-600 text-lg mb-4">New travel content coming soon!</p>
                <p className="text-gray-500">In the meantime, check out our <Link href="/blog/culinary-adventures-2025" className="text-teal-600 hover:underline">Culinary Adventures guide</Link> or <Link href="/trips" className="text-teal-600 hover:underline">browse trip ideas</Link>.</p>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      {post.hero_image_url && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.hero_image_url}
                            alt={post.hero_image_alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-grow">
                        {post.category && (
                          <span className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-2">{post.category}</span>
                        )}
                        <h2 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time_minutes} min read</span>
                          {post.tags?.length > 0 && (
                            <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.tags[0]}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <InlineLeadForm source="blog" heading="Ready to Turn Inspiration Into a Trip?" subheading="Tell Richard what you're dreaming about — he'll create a personalized plan within 24 hours." />
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
