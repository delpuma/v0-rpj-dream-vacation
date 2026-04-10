import Link from "next/link"
import Image from "next/image"
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-start">
              <Image
                src="/dv-logo-white.png"
                alt="Dream Vacations — Richard Johnson & Travel Advisors Group"
                width={140}
                height={36}
                className="h-auto w-auto mb-2"
              />
            </Link>
            <p className="text-sm text-blue-200">
              Richard Johnson — your trusted travel agent in Winter Garden, FL. Cruises, resorts, honeymoons & more.
            </p>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <MapPinIcon className="h-4 w-4 flex-shrink-0" />
              <span>Winter Garden, FL 34787</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation" className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/" className="text-sm text-blue-200 hover:text-white hover:underline">Home</Link></li>
              <li><Link href="/trips" className="text-sm text-blue-200 hover:text-white hover:underline">Trip Ideas</Link></li>
              <li><Link href="/services" className="text-sm text-blue-200 hover:text-white hover:underline">Services</Link></li>
              <li><Link href="/about" className="text-sm text-blue-200 hover:text-white hover:underline">About Richard</Link></li>
              <li><Link href="/#contact" className="text-sm text-blue-200 hover:text-white hover:underline">Get a Free Quote</Link></li>
              <li><Link href="/blog" className="text-sm text-blue-200 hover:text-white hover:underline">Travel Blog</Link></li>
            </ul>
          </nav>

          {/* Popular Trips — internal links for SEO */}
          <nav aria-label="Popular trips" className="space-y-4">
            <h3 className="text-lg font-bold">Popular Trips</h3>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/trips/caribbean" className="text-sm text-blue-200 hover:text-white hover:underline">Caribbean Vacations</Link></li>
              <li><Link href="/trips/cruise" className="text-sm text-blue-200 hover:text-white hover:underline">Cruise Packages</Link></li>
              <li><Link href="/trips/all-inclusive-resort" className="text-sm text-blue-200 hover:text-white hover:underline">All-Inclusive Resorts</Link></li>
              <li><Link href="/trips/honeymoon" className="text-sm text-blue-200 hover:text-white hover:underline">Honeymoon Packages</Link></li>
              <li><Link href="/trips/river-cruise" className="text-sm text-blue-200 hover:text-white hover:underline">River Cruises</Link></li>
              <li><Link href="/trips/destination-wedding" className="text-sm text-blue-200 hover:text-white hover:underline">Destination Weddings</Link></li>
              <li><Link href="/trips/family-vacation" className="text-sm text-blue-200 hover:text-white hover:underline">Family Vacations</Link></li>
              <li><Link href="/trips/cruise-lines/royal-caribbean" className="text-sm text-blue-200 hover:text-white hover:underline">Royal Caribbean</Link></li>
              <li><Link href="/trips/cruise-lines/sandals-resorts" className="text-sm text-blue-200 hover:text-white hover:underline">Sandals Resorts</Link></li>
              <li><Link href="/trips/cruise-lines/viking" className="text-sm text-blue-200 hover:text-white hover:underline">Viking Cruises</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Richard</h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link href="tel:+14079512398" className="flex items-center gap-2 text-sm text-blue-200 hover:text-white hover:underline">
                  <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                  <span>(407) 951-2398</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:rpjohnson@dreamvacations.com" className="flex items-center gap-2 text-sm text-blue-200 hover:text-white hover:underline">
                  <MailIcon className="h-4 w-4 flex-shrink-0" />
                  <span>rpjohnson@dreamvacations.com</span>
                </Link>
              </li>
            </ul>
            <p className="text-xs text-blue-300 mt-4">
              Free consultations · No planning fees · Available Mon–Sat
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-xs text-blue-300 space-y-1">
          <p>&copy; {new Date().getFullYear()} Dream Vacations — Richard Johnson & Travel Advisors Group. All rights reserved.</p>
          <p>Dream Vacations, a division of World Travel Holdings. CruiseOne franchises are independently owned and operated.</p>
          <p>Seller of Travel: FL ST-35829</p>
        </div>

        {/* Service area links for local SEO */}
        <div className="mt-6 pt-6 border-t border-blue-700">
          <p className="text-xs text-blue-400 mb-2 text-center">Serving travelers in:</p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-blue-300">
            <Link href="/winter-garden-fl" className="hover:text-white hover:underline">Winter Garden FL</Link>
            <span>·</span>
            <Link href="/orlando-fl" className="hover:text-white hover:underline">Orlando FL</Link>
            <span>·</span>
            <Link href="/windermere-fl" className="hover:text-white hover:underline">Windermere FL</Link>
            <span>·</span>
            <Link href="/tampa-fl" className="hover:text-white hover:underline">Tampa FL</Link>
            <span>·</span>
            <Link href="/miami-fl" className="hover:text-white hover:underline">Miami FL</Link>
            <span>·</span>
            <Link href="/naples-fl" className="hover:text-white hover:underline">Naples FL</Link>
            <span>·</span>
            <Link href="/sarasota-fl" className="hover:text-white hover:underline">Sarasota FL</Link>
            <span>·</span>
            <Link href="/boca-raton-fl" className="hover:text-white hover:underline">Boca Raton FL</Link>
            <span>·</span>
            <Link href="/jacksonville-fl" className="hover:text-white hover:underline">Jacksonville FL</Link>
            <span>·</span>
            <Link href="/new-york-ny" className="hover:text-white hover:underline">New York</Link>
            <span>·</span>
            <Link href="/los-angeles-ca" className="hover:text-white hover:underline">Los Angeles</Link>
            <span>·</span>
            <Link href="/chicago-il" className="hover:text-white hover:underline">Chicago</Link>
            <span>·</span>
            <Link href="/houston-tx" className="hover:text-white hover:underline">Houston</Link>
            <span>·</span>
            <Link href="/atlanta-ga" className="hover:text-white hover:underline">Atlanta</Link>
            <span>·</span>
            <Link href="/boston-ma" className="hover:text-white hover:underline">Boston</Link>
            <span>·</span>
            <Link href="/dallas-tx" className="hover:text-white hover:underline">Dallas</Link>
            <span>·</span>
            <Link href="/seattle-wa" className="hover:text-white hover:underline">Seattle</Link>
            <span>·</span>
            <Link href="/denver-co" className="hover:text-white hover:underline">Denver</Link>
            <span>·</span>
            <Link href="/nashville-tn" className="hover:text-white hover:underline">Nashville</Link>
            <span>·</span>
            <Link href="/charlotte-nc" className="hover:text-white hover:underline">Charlotte</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
