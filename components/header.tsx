import Link from "next/link"
import Image from "next/image"
import { MenuIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trip Ideas" },
  { href: "/deals", label: "Deals" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/dv-logo-white.png"
            alt="Dream Vacations — Richard Johnson & Travel Advisors Group"
            width={160}
            height={36}
            className="object-contain invert"
            priority
          />
        </Link>
        <nav className="ml-auto hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-teal-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="tel:+14079512398" className="ml-3">
            <Button className="bg-teal-700 hover:bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <PhoneIcon className="h-4 w-4" />
              <span>(407) 951-2398</span>
            </Button>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-auto text-gray-700">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-2 p-4 pt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-teal-600 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="tel:+14079512398" className="mt-4">
                <Button className="w-full bg-teal-700 hover:bg-teal-600 text-white text-base py-3 flex items-center justify-center gap-2 rounded-full h-auto">
                  <PhoneIcon className="h-5 w-5" />
                  <span>Call (407) 951-2398</span>
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
