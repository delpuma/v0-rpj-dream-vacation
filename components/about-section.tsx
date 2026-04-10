import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="w-full py-8 md:py-16 lg:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-blue-800">
              About Richard Johnson & Travel Advisors Group
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Welcome to Dream Vacations by Richard Johnson & Travel Advisors Group, your dedicated travel partner based
              right here in Winter Garden, FL. With years of experience and a passion for exploration, Richard specializes in
              transforming travel dreams into seamless realities — from luxury cruises and all-inclusive resorts to honeymoons,
              destination weddings, and family vacations.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              As a CLIA certified travel advisor and Dream Vacations franchise owner, Richard provides personalized,
              white-glove service at no cost to you. He serves travelers throughout Winter Garden, Orlando, Windermere,
              and all of Central Florida — plus clients nationwide by phone and video call.
            </p>
            <Link href="/about">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
                Learn More About Richard →
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/rj-headshot-2.jpg"
              alt="Richard Johnson, Dream Vacations travel advisor in Winter Garden FL"
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
