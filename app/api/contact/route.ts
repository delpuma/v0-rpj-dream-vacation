import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"
import { EmailTemplate } from "@/components/email-template"
import type * as React from "react"

const resendApiKey = process.env.RESEND_API_KEY

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const { name, email, phone, preferredTrip, message } = formData

    // Save lead to DB (don't let this block the email)
    try {
      const sql = neon(process.env.DATABASE_URL!)
      await sql`
        INSERT INTO dreamvacations.leads (
          name, email, phone, message, trip_interest, source_url, utm_source, utm_medium
        ) VALUES (
          ${name || null}, ${email || null}, ${phone || null},
          ${message || null}, ${preferredTrip || null},
          '/contact', 'website', 'contact-form'
        )
      `
    } catch (dbErr) {
      console.error("Lead DB save error (non-blocking):", dbErr)
    }

    // Send email if Resend is configured
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const { error } = await resend.emails.send({
        from: "Dream Vacations Contact <onboarding@resend.dev>",
        to: ["rpjohnson@dreamvacations.com"],
        subject: `New Inquiry from Dream Vacations Website: ${name}`,
        react: EmailTemplate({ name, email, phone, preferredTrip, message }) as React.ReactElement,
      })

      if (error) {
        console.error("Resend email error:", error)
        // Still return success since lead was saved to DB
      }
    }

    return Response.json({ message: "Inquiry received! Richard will be in touch shortly." }, { status: 200 })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
