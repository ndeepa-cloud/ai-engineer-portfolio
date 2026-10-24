const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || (import.meta.env.DEV ? "" : undefined)

export type ChatMessage = { role: "user" | "assistant"; content: string }

async function request<T>(path: string, body: unknown): Promise<T> {
  if (apiBaseUrl === undefined) throw new Error("The portfolio API is not configured yet. Set VITE_API_BASE_URL to the deployed backend URL.")
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 60_000)
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const result = await response.json().catch(() => null) as ({ detail?: unknown } & T) | null
    if (!response.ok) {
      if (typeof result?.detail === "string") throw new Error(result.detail)
      if (response.status === 502) {
        throw new Error(import.meta.env.DEV
          ? "Unable to reach the backend API (502). Ensure your FastAPI server is running on port 8000."
          : "The AI assistant is temporarily unavailable. Please try again shortly."
        )
      }
      throw new Error(`Request failed (${response.status}). Please try again.`)
    }
    if (!result) throw new Error("The portfolio service returned an invalid response. Please try again.")
    return result
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw new Error("The request took too long. Please try again.", { cause: error })
    if (error instanceof TypeError) throw new Error("Unable to reach the portfolio service. Check your connection and try again.", { cause: error })
    throw error
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export async function askPortfolio(question: string, history: ChatMessage[]) {
  return request<{ answer: string }>("/api/chat", { question, history })
}

