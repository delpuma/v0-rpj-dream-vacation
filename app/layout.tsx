import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MobilePhoneBar } from "@/components/mobile-phone-bar"
import { AccessibilityLoader } from "@/components/accessibility-loader"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = "https://www.traveladvisorsgroup.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Richard Johnson — Travel Agent Winter Garden FL | Dream Vacations Cruises, Resorts & Honeymoons",
    template: "%s | Richard Johnson — Dream Vacations Travel Agent",
  },
  description:
    "Richard Johnson is your trusted travel agent in Winter Garden, FL. Specializing in cruises, all-inclusive resorts, honeymoons, destination weddings, river cruises & family vacations. Call (407) 951-2398 for a free quote.",
  keywords: [
    "travel agent Winter Garden FL",
    "travel agent Orlando FL",
    "cruise travel agent Florida",
    "Richard Johnson travel agent",
    "Dream Vacations Winter Garden",
    "all-inclusive resort travel agent",
    "honeymoon travel agent Florida",
    "destination wedding planner Florida",
    "river cruise travel agent",
    "Caribbean cruise agent Orlando",
    "family vacation planner Central Florida",
    "luxury travel advisor Winter Garden",
    "Sandals resort agent Florida",
    "Royal Caribbean travel agent",
    "Viking cruise specialist",
    "travel agent near me Winter Garden",
    "travel agent Windermere FL",
    "travel agent Clermont FL",
    "travel agent Ocoee FL",
    "Seabourn travel agent",
    "Regent Seven Seas travel agent",
    "Silversea cruise specialist",
    "Ritz-Carlton Yacht Collection agent",
    "Four Seasons travel advisor",
    "Abercrombie Kent travel agent",
    "luxury cruise travel agent Florida",
    "expedition cruise specialist",
    "safari travel agent Florida",
    "Tauck tours travel agent",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "Richard Johnson — Travel Agent Winter Garden FL | Cruises, Resorts & Honeymoons",
    description:
      "Your trusted travel agent in Winter Garden, FL. Cruises, all-inclusive resorts, honeymoons, destination weddings & family vacations. Call (407) 951-2398.",
    url: SITE_URL,
    siteName: "Dream Vacations — Richard Johnson",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Richard Johnson — Dream Vacations Travel Agent in Winter Garden FL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Richard Johnson — Travel Agent Winter Garden FL | Dream Vacations",
    description:
      "Cruises, all-inclusive resorts, honeymoons & family vacations. Call (407) 951-2398 for a free quote.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <MobilePhoneBar />
          <AccessibilityLoader />
        </ThemeProvider>
      </body>
    </html>
  )
}
