"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PhoneIcon } from "lucide-react" // Import PhoneIcon
import Link from "next/link" // Import Link

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredTrip: "",
  })
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("Submitting your inquiry...")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus("Thank you for your inquiry! Richard will be in touch shortly.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          preferredTrip: "",
        })
      } else {
        setStatus(`Failed to send inquiry: ${result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="w-full py-8 md:py-16 lg:py-32 bg-gradient-to-t from-white to-blue-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-blue-800">
            Ready to Plan Your Dream Vacation?
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-700">
            Contact Richard Johnson today for a personalized consultation. Let's make your travel dreams a reality!
          </p>
          <p className="text-lg md:text-xl font-semibold text-blue-700 flex items-center justify-center gap-2">
            <PhoneIcon className="h-6 w-6" />
            <span>Prefer to call? Reach us at: </span>
            <Link href="tel:+14079512398" className="text-blue-600 hover:underline">
              (407) 951-2398
            </Link>
          </p>
        </div>
        <Card className="w-full max-w-lg shadow-xl border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-700">Get a Free Quote</CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below and Richard will contact you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferredTrip">Preferred Destination/Type of Trip</Label>
                <Input
                  id="preferredTrip"
                  placeholder="e.g., Caribbean Cruise, European Tour"
                  value={formData.preferredTrip}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your dream vacation!"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-2 md:text-lg md:py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </CardContent>
          {status && <CardFooter className="text-center text-sm text-blue-600 font-medium">{status}</CardFooter>}
        </Card>
      </div>
    </section>
  )
}
