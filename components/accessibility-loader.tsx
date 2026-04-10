"use client"

import dynamic from "next/dynamic"

const AccessibilityWidget = dynamic(
  () => import("@/components/accessibility-widget"),
  { ssr: false }
)

export function AccessibilityLoader() {
  return <AccessibilityWidget />
}
