import Link from "next/link"
import { ShipIcon, HotelIcon, FanIcon as FamilyIcon, HeartIcon, CompassIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: ShipIcon,
    title: "Worldwide Cruises",
    description: "Explore the world's oceans with Royal Caribbean, Celebrity, Carnival, Norwegian & more — tailored to your preferences.",
    href: "/trips/cruise",
  },
  {
    icon: HotelIcon,
    title: "All-Inclusive Resorts",
    description: "Sandals, Beaches & more — hassle-free vacations with everything included, from gourmet dining to water sports.",
    href: "/trips/all-inclusive-resort",
  },
  {
    icon: FamilyIcon,
    title: "Family Vacations",
    description: "Create unforgettable memories with custom-designed itineraries the whole family will love.",
    href: "/trips/family-vacation",
  },
  {
    icon: ShipIcon,
    title: "European River Cruises",
    description: "Viking, Uniworld, AmaWaterways — discover Europe's charm from the comfort of a luxury river ship.",
    href: "/trips/river-cruise",
  },
  {
    icon: HeartIcon,
    title: "Destination Weddings",
    description: "Say \"I do\" in paradise. We handle every detail from venues to guest travel coordination.",
    href: "/trips/destination-wedding",
  },
  {
    icon: HeartIcon,
    title: "Honeymoons & Romance",
    description: "Perfect romantic getaways to the Caribbean, Hawaii, Maldives, Bali & beyond.",
    href: "/trips/honeymoon",
  },
  {
    icon: MapPinIcon,
    title: "Custom Itinerary Trips",
    description: "Fully customized travel plans to any destination, built around your unique desires and budget.",
    href: "/trips/luxury-travel",
  },
  {
    icon: CompassIcon,
    title: "Adventure Travel",
    description: "Thrill-seeking expeditions — from Costa Rica rainforests to Alaska glaciers, designed for the adventurous spirit.",
    href: "/trips/adventure-travel",
  },
  {
    icon: UsersIcon,
    title: "Group Travel Planning",
    description: "Reunions, corporate retreats, milestone celebrations — Richard handles all the details for seamless group experiences.",
    href: "/trips/group-travel",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-8 md:py-16 lg:py-32 bg-blue-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-blue-800">
            Travel Services by Richard Johnson
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-700">
            Whether you dream of a relaxing cruise, an adventurous expedition, or a perfect family getaway — your travel agent in Winter Garden, FL has you covered.
          </p>
          <Link href="/services" className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
            View all services in detail →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="block group">
              <Card className="bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full group-hover:border-blue-300">
                <CardHeader className="flex flex-col items-center text-center p-6">
                  <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl font-semibold text-blue-700 group-hover:text-blue-600">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
