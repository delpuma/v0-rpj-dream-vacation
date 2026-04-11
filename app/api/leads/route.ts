import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      message,
      travel_dates,
      party_size,
      destination,
      tripType,
      cruiseLine,
      sourceSlug,
    } = body

    // Save lead to DB
    try {
      const sql = neon(process.env.DATABASE_URL!)
      await sql`
        INSERT INTO dreamvacations.leads (
          name, email, phone, message, travel_dates, party_size,
          destination_interest, trip_interest, source_url,
          utm_source, utm_medium, utm_campaign
        ) VALUES (
          ${name || null},
          ${email || null},
          ${phone || null},
          ${message || null},
          ${travel_dates || null},
          ${party_size ? parseInt(party_size) : null},
          ${destination || cruiseLine || null},
          ${tripType || null},
          ${sourceSlug || null},
          ${"organic"},
          ${"pseo"},
          ${sourceSlug || null}
        )
      `
    } catch (dbErr) {
      console.error("Lead DB save error:", dbErr)
    }

    // Send email notification to Richard
    if (resendApiKey && (name || email)) {
      try {
        const resend = new Resend(resendApiKey)
        const tripInfo = [destination, tripType, cruiseLine].filter(Boolean).join(" · ") || "General inquiry"
        const sourcePage = sourceSlug ? `https://www.traveladvisorsgroup.com/${sourceSlug}` : "Direct"

        await resend.emails.send({
          from: "Travel Advisors Group <onboarding@resend.dev>",
          to: ["rpjohnson@dreamvacations.com"],
          subject: `🔥 New Lead: ${name || "Website Visitor"} — ${tripInfo}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #0d4f8b, #0d7377); padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">🔥 New Lead from TravelAdvisorsGroup.com</h1>
              </div>
              <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0d7377;">${email || "Not provided"}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0d7377;">${phone || "Not provided"}</a></td></tr>
                  ${travel_dates ? `<tr><td style="padding: 8px 0; color: #6b7280;">Travel Dates</td><td style="padding: 8px 0;">${travel_dates}</td></tr>` : ""}
                  ${party_size ? `<tr><td style="padding: 8px 0; color: #6b7280;">Party Size</td><td style="padding: 8px 0;">${party_size}</td></tr>` : ""}
                  <tr><td style="padding: 8px 0; color: #6b7280;">Interest</td><td style="padding: 8px 0; font-weight: bold; color: #0d7377;">${tripInfo}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Source Page</td><td style="padding: 8px 0;"><a href="${sourcePage}" style="color: #0d7377; font-size: 12px;">${sourcePage}</a></td></tr>
                </table>
                ${message ? `<div style="margin-top: 16px; padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;"><p style="color: #6b7280; margin: 0 0 4px; font-size: 12px;">Message:</p><p style="margin: 0; color: #111827;">${message}</p></div>` : ""}
                <div style="margin-top: 20px; padding: 12px; background: #ecfdf5; border-radius: 6px; text-align: center;">
                  <p style="margin: 0; color: #065f46; font-weight: bold;">⚡ Respond within 24 hours for best conversion</p>
                </div>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error("Lead email notification error:", emailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ success: true })
  }
}
