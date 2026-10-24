import emailjs, { EmailJSResponseStatus } from "@emailjs/browser"

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

export type ContactMessage = { name: string; email: string; message: string }

function deliveryError(code: string, message: string, ownerHint: string, cause?: unknown, status?: number) {
  // Log only a fixed diagnostic code and HTTP status, never provider text or keys.
  if (import.meta.env.DEV) console.warn("Contact delivery:", { code, status })
  return new Error(import.meta.env.DEV ? `${message} ${ownerHint}` : message, { cause })
}

export async function sendContactMessage(payload: ContactMessage): Promise<void> {
  const configuration = {
    VITE_EMAILJS_SERVICE_ID: serviceId,
    VITE_EMAILJS_TEMPLATE_ID: templateId,
    VITE_EMAILJS_PUBLIC_KEY: publicKey,
  }
  const missing = Object.entries(configuration)
    .filter(([, value]) => !value || /^(your[_-]|replace[_-]|<)/i.test(value))
    .map(([name]) => name)
  if (missing.length) {
    throw deliveryError("MISSING_CONFIGURATION", "Message delivery is currently unavailable. Please connect with me on LinkedIn.",
      `Set ${missing.join(", ")} in frontend/.env.local and restart Vite.`)
  }

  try {
    await emailjs.send(serviceId!, templateId!, {
      from_name: payload.name.trim(),
      from_email: payload.email.trim(),
      message: payload.message.trim(),
    }, { publicKey })
  } catch (error) {
    if (error instanceof EmailJSResponseStatus) {
      const status = error.status
      const text = error.text.toLowerCase()
      if (status === 429) {
        throw deliveryError("RATE_LIMIT", "Too many messages were sent. Please wait a moment and try again.",
          "Check the EmailJS request limit and monthly quota.", error, status)
      }
      if (status === 412 && /insufficient.*scope|authentication scopes/.test(text)) {
        throw deliveryError("GMAIL_SCOPES", "The email account needs permission to send messages. Please connect with me on LinkedIn for now.",
          "Reconnect Gmail in EmailJS → Email Services, grant the requested sending permission, and run the service test.", error, status)
      }
      if (status === 412 || /invalid grant|reconnect.*gmail/.test(text)) {
        throw deliveryError("EMAIL_SERVICE_AUTH", "The email service needs to be reconnected. Please connect with me on LinkedIn for now.",
          "Open EmailJS → Email Services, reconnect the account, and run the service test.", error, status)
      }
      if (/public key|user_id|user id|api key/.test(text)) {
        throw deliveryError("PUBLIC_KEY", "Message delivery is currently unavailable. Please connect with me on LinkedIn.",
          "Check VITE_EMAILJS_PUBLIC_KEY against EmailJS → Account → API Keys → Public Key.", error, status)
      }
      if (/template/.test(text)) {
        throw deliveryError("TEMPLATE_CONFIGURATION", "Message delivery is currently unavailable. Please connect with me on LinkedIn.",
          "Check the Template ID, template recipient, and from_name/from_email/message variables in EmailJS.", error, status)
      }
      if (/service/.test(text) && status === 400) {
        throw deliveryError("SERVICE_CONFIGURATION", "Message delivery is currently unavailable. Please connect with me on LinkedIn.",
          "Check VITE_EMAILJS_SERVICE_ID against the connected service in EmailJS → Email Services.", error, status)
      }
      if (status === 401 || status === 403 || /origin|allowlist|whitelist|forbidden/.test(text)) {
        throw deliveryError("ACCESS_DENIED", "This site is not currently permitted to send messages. Please connect with me on LinkedIn.",
          "Check EmailJS origin restrictions, account settings, and whether the template requires CAPTCHA or private-key authorization.", error, status)
      }
      throw deliveryError("PROVIDER_ERROR", "Your message could not be sent. Please try again or connect with me on LinkedIn.",
        `EmailJS returned HTTP ${status}. Check EmailJS Email History and test the service and template in the dashboard.`, error, status)
    }
    if (error instanceof TypeError) {
      throw deliveryError("NETWORK_ERROR", "Unable to reach the email service. Check your connection and try again.",
        "Check browser network errors, content blockers, and EmailJS availability.", error)
    }
    throw deliveryError("SEND_ERROR", "Your message could not be sent. Please try again or connect with me on LinkedIn.",
      "Check the EmailJS service and template configuration.", error)
  }
}
