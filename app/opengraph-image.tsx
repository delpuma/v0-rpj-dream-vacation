import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt =
  "Richard Johnson — Dream Vacations Travel Agent in Winter Garden FL | (407) 951-2398"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        background: "linear-gradient(135deg, #1e3a5f 0%, #0d7377 50%, #14919b 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: "bold", marginBottom: "12px" }}>
        Dream Vacations
      </div>
      <div style={{ fontSize: 36, marginBottom: "8px", opacity: 0.95 }}>
        by Richard Johnson & Travel Advisors Group
      </div>
      <div style={{ fontSize: 28, opacity: 0.85, marginBottom: "20px" }}>
        Your Expert Travel Agent in Winter Garden, FL
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: "bold",
          background: "rgba(255,255,255,0.15)",
          padding: "12px 32px",
          borderRadius: "12px",
        }}
      >
        Call (407) 951-2398 · traveladvisorsgroup.com
      </div>
    </div>,
    { ...size },
  )
}
