import Link from "next/link"
import Image from "next/image"
import { MenuIcon, PhoneIcon } from "lucide-react" // Import PhoneIcon
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="w-full h-16 flex items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/dv-logo-white.png"
            alt="Dream Vacations by Richard Johnson & Travel Advisors Group Logo"
            width={160}
            height={36}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="ml-auto hidden lg:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/trips" className="text-sm font-medium hover:underline underline-offset-4">
            Trip Ideas
          </Link>
          <Link href="/#services" className="text-sm font-medium hover:underline underline-offset-4">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="tel:+14079512398" className="ml-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <span>(407) 951-2398</span>
            </Button>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-auto">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/trips" className="text-lg font-medium">
                Trip Ideas
              </Link>
              <Link href="/#services" className="text-lg font-medium">
                Services
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="/#contact" className="text-lg font-medium">
                Contact
              </Link>
              <Link href="/blog" className="text-lg font-medium">
                Blog
              </Link>
              <Link href="tel:+14079512398" className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-2 flex items-center justify-center gap-2">
                  <PhoneIcon className="h-5 w-5" />
                  <span>Call Us: (407) 951-2398</span>
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
