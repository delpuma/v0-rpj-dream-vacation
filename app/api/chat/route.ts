import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// IMPORTANT: Do not use edge runtime with the AI SDK in API routes.
// This route returns JSON instead of a streamed response. [^1]

export async function POST(req: Request) {
  try {
    const { input, history } = (await req.json()) as {
      input: string
      history?: { role: "user" | "assistant"; content: string }[]
    }

    if (!input || typeof input !== "string") {
      return Response.json({ error: "Invalid input" }, { status: 400 })
    }

    const system =
      "You are Richard Johnson from Dream Vacations by Richard Johnson & Travel Advisors Group, a friendly and knowledgeable travel agent based in Winter Garden, FL. Your goal is to help customers plan their dream vacations, provide personalized recommendations, answer travel inquiries, and guide them towards booking. Emphasize your expertise in European Cruises and Destination Wedding Packages. Keep responses concise, helpful, and welcoming. IMPORTANT: After 2-3 exchanges, naturally ask for the visitor's name, email, and phone number so you can send them personalized options. Say something like 'I'd love to put together some options for you — what's the best email and phone to reach you at?' Always mention they can call (407) 951-2398 for immediate help."

    // Build a short conversation context from recent messages.
    const context =
      (history ?? [])
        .slice(-6)
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n") + (history && history.length ? "\n" : "")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system,
      prompt: `${context}User: ${input}\nAssistant:`,
    })

    return Response.json({ reply: text }, { status: 200 })
  } catch (err: unknown) {
    console.error("Chat route error:", err)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
