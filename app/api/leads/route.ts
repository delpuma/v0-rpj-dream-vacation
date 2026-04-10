import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

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
        ${sourceSlug ? `/trips/${sourceSlug}` : null},
        ${"organic"},
        ${"pseo"},
        ${sourceSlug || null}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    // Return success anyway to not lose the lead on the frontend
    return NextResponse.json({ success: true })
  }
}
