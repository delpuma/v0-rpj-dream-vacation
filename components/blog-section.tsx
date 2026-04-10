import Image from "next/image"
import Link from "next/link"
import { neon } from "@neondatabase/serverless"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface BlogPost {
  slug: string
  title: string
  excerpt: string | null
  hero_image_url: string | null
  hero_image_alt: string | null
  category: string | null
  read_time_minutes: number
}

async function getRecentPosts(): Promise<BlogPost[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT slug, title, excerpt, hero_image_url, hero_image_alt, category, read_time_minutes
      FROM dreamvacations.blog_posts WHERE is_published = true
      ORDER BY published_at DESC LIMIT 3
    `
    return rows as BlogPost[]
  } catch {
    return []
  }
}

export async function BlogSection() {
  const dbPosts = await getRecentPosts()

  return (
    <section id="blog" className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-blue-800">
            From Our Travel Blog
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Expert tips, destination guides & vacation inspiration from Richard Johnson & Travel Advisors Group.
          </p>
        </div>

        {/* Dynamic DB posts */}
        {dbPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {dbPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  {post.hero_image_url && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.hero_image_url}
                        alt={post.hero_image_alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="p-4 pb-1">
                    {post.category && <Badge className="w-fit bg-blue-600 hover:bg-blue-700 text-xs mb-1">{post.category}</Badge>}
                    <CardTitle className="text-base font-bold text-blue-800 group-hover:text-teal-600 transition-colors line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <CardDescription className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</CardDescription>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />{post.read_time_minutes} min read
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* Fallback: static culinary post */
          <Card className="overflow-hidden border-blue-100 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-56 md:h-full">
                <Image src="/images/blog/culinary-2025-hero.png" alt="Chef-led culinary travel experience" fill className="object-cover" />
              </div>
              <div>
                <CardHeader className="p-6 pb-2 text-left">
                  <Badge className="w-fit bg-blue-600 hover:bg-blue-700">Blog</Badge>
                  <CardTitle className="mt-3 text-2xl text-blue-800">Culinary Adventures — Luxury Food Travel Trends 2025</CardTitle>
                  <CardDescription className="text-gray-600">
                    Food is becoming a primary travel motivator. Discover the top culinary travel trends.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-2 text-left">
                  <Link href="/blog/culinary-adventures-2025">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Read the full post</Button>
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        )}

        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              View All Travel Articles →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
