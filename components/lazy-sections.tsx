"use client"

import dynamic from "next/dynamic"

// Lazy load below-fold sections to reduce initial JS bundle
export const LazyFeaturedTrips = dynamic(
  () => import("@/components/featured-trips-section").then((m) => ({ default: m.FeaturedTripsSection })),
  { ssr: true, loading: () => <div className="h-96" /> }
)

export const LazyTestimonials = dynamic(
  () => import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: true, loading: () => <div className="h-64" /> }
)

export const LazyContactForm = dynamic(
  () => import("@/components/contact-form-section").then((m) => ({ default: m.ContactFormSection })),
  { ssr: true, loading: () => <div className="h-96" /> }
)

export const LazyExploreCta = dynamic(
  () => import("@/components/explore-cta-section").then((m) => ({ default: m.ExploreCtaSection })),
  { ssr: true, loading: () => <div className="h-64" /> }
)

export const LazyChatbot = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.Chatbot })),
  { ssr: false }
)

export const LazyScrollToTop = dynamic(
  () => import("@/components/scroll-to-top-button").then((m) => ({ default: m.ScrollToTopButton })),
  { ssr: false }
)

export const LazyExitIntent = dynamic(
  () => import("@/components/exit-intent-popup").then((m) => ({ default: m.ExitIntentPopup })),
  { ssr: false }
)
