import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { neon } from "@neondatabase/serverless"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { AGENT_INFO } from "@/lib/pseo-data"
import { InlineLeadForm } from "@/components/inline-lead-form"
import { Clock, Tag, Phone, ArrowLeft } from "lucide-react"

export const revalidate = 3600
export const dynamicParams = true

const SITE = "https://traveladvisorsgroup.com"

interface BlogPost {
  id: number
  slug: string
  title: string
  meta_description: string | null
  h1: string | null
  content: string
  excerpt: string | null
  hero_image_url: string | null
  hero_image_alt: string | null
  hero_image_credit: string | null
  author: string
  category: string | null
  tags: string[]
  keywords: string[]
  read_time_minutes: number
  word_count: number
  published_at: string
  updated_at: string
  cta_text: string | null
  related_trip_slugs: string[]
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT * FROM dreamvacations.blog_posts
      WHERE slug = ${slug} AND is_published = true
      LIMIT 1
    `
    if (rows.length === 0) return null
    // Increment view count
    sql`UPDATE dreamvacations.blog_posts SET view_count = view_count + 1 WHERE slug = ${slug}`.catch(() => {})
    return rows[0] as BlogPost
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt || "",
      url: `${SITE}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: post.hero_image_url ? [{ url: post.hero_image_url, width: 1200, height: 630, alt: post.hero_image_alt || post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.excerpt || "",
      images: post.hero_image_url ? [post.hero_image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.hero_image_url ? [post.hero_image_url] : [],
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author, url: SITE },
    publisher: {
      "@type": "Organization",
      name: AGENT_INFO.business,
      logo: { "@type": "ImageObject", url: `${SITE}/dv-logo-white.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
    wordCount: post.word_count,
    keywords: post.keywords?.join(", "),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
    ],
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        <article>
          {/* Hero */}
          {post.hero_image_url && (
            <div className="relative w-full h-[300px] md:h-[450px]">
              <Image
                src={post.hero_image_url}
                alt={post.hero_image_alt || post.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {post.hero_image_credit && (
                <p className="absolute bottom-2 right-4 text-xs text-white/60">Photo: {post.hero_image_credit}</p>
              )}
            </div>
          )}

          <div className="container mx-auto px-4 py-10">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-teal-600">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-teal-600">Blog</Link>
                <span>/</span>
                <span className="text-gray-700 truncate">{post.title}</span>
              </nav>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                {post.category && <span className="text-teal-600 font-medium uppercase text-xs tracking-wider">{post.category}</span>}
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.read_time_minutes} min read</span>
                <span>{new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {post.h1 || post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b">
                <Image src="/rj-headshot-2.jpg" alt={post.author} width={48} height={48} className="rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Travel Advisor · {AGENT_INFO.location}</p>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-md
                  mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 md:p-8 text-white text-center mb-10">
                <h2 className="text-2xl font-bold mb-3">Ready to Book Your Trip?</h2>
                <p className="text-blue-100 mb-4">{post.cta_text || `Call ${AGENT_INFO.name} for a free, personalized consultation.`}</p>
                <a href={`tel:${AGENT_INFO.phoneTel}`} className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg">
                  <Phone className="w-5 h-5" />
                  {AGENT_INFO.phone}
                </a>
              </div>

              {/* Lead Capture Form */}
              <div className="mb-10">
                <InlineLeadForm source={`blog/${post.slug}`} heading="Inspired? Let Richard Plan Your Trip" subheading="Tell us what caught your eye — Richard will reach out with personalized options within 24 hours." />
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Related trips */}
              {post.related_trip_slugs?.length > 0 && (
                <div className="border-t pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Trip Ideas</h3>
                  <div className="flex flex-wrap gap-3">
                    {post.related_trip_slugs.map((tripSlug) => (
                      <Link key={tripSlug} href={`/trips/${tripSlug}`} className="text-sm text-teal-600 hover:underline border border-teal-200 px-3 py-1 rounded-lg hover:bg-teal-50">
                        {tripSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <div className="mt-8 pt-8 border-t">
                <Link href="/blog" className="text-teal-600 hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
