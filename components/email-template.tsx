import type * as React from "react"

interface EmailTemplateProps {
  name: string
  email: string
  phone?: string
  preferredTrip?: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  preferredTrip,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ background: "linear-gradient(135deg, #0d4f8b, #0d7377)", padding: "20px", borderRadius: "8px 8px 0 0" }}>
      <h1 style={{ color: "white", margin: 0, fontSize: "20px" }}>📬 New Contact Form Submission</h1>
      <p style={{ color: "#bfdbfe", margin: "4px 0 0", fontSize: "14px" }}>from TravelAdvisorsGroup.com</p>
    </div>
    <div style={{ padding: "20px", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", width: "120px", verticalAlign: "top" }}>Name</td>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>{name}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", verticalAlign: "top" }}>Email</td>
            <td style={{ padding: "8px 0" }}>
              <a href={`mailto:${email}`} style={{ color: "#0d7377" }}>{email}</a>
            </td>
          </tr>
          {phone && (
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280", verticalAlign: "top" }}>Phone</td>
              <td style={{ padding: "8px 0" }}>
                <a href={`tel:${phone}`} style={{ color: "#0d7377" }}>{phone}</a>
              </td>
            </tr>
          )}
          {preferredTrip && (
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280", verticalAlign: "top" }}>Trip Interest</td>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#0d7377" }}>{preferredTrip}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", verticalAlign: "top" }}>Source</td>
            <td style={{ padding: "8px 0", fontSize: "12px" }}>Homepage Contact Form</td>
          </tr>
        </tbody>
      </table>
      {message && (
        <div style={{ marginTop: "16px", padding: "12px", background: "#f9fafb", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
          <p style={{ color: "#6b7280", margin: "0 0 4px", fontSize: "12px" }}>Message:</p>
          <p style={{ margin: 0, color: "#111827", lineHeight: "1.6" }}>{message}</p>
        </div>
      )}
      <div style={{ marginTop: "20px", padding: "12px", background: "#ecfdf5", borderRadius: "6px", textAlign: "center" as const }}>
        <p style={{ margin: 0, color: "#065f46", fontWeight: "bold" }}>⚡ Respond within 24 hours for best conversion</p>
      </div>
    </div>
  </div>
)
