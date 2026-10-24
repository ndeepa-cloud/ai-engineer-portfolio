import { useRef, useState } from "react"
import type { FormEvent } from "react"
import Reveal from "../components/Reveal"
import { Download, LoaderCircle, Send } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "../components/SocialIcons"
import { profile } from "../data/portfolio"
import { sendContactMessage } from "../services/contact"

export default function Contact() {
  const sendingRef = useRef(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; text: string } | null>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendingRef.current) return

    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedFirst) {
      setFeedback({ kind: "error", text: "Please enter your first name." })
      return
    }
    if (!trimmedEmail) {
      setFeedback({ kind: "error", text: "Please enter your email address." })
      return
    }
    if (trimmedMessage.length < 10) {
      setFeedback({ kind: "error", text: "Please enter a message of at least 10 characters." })
      return
    }

    setFeedback(null)
    sendingRef.current = true
    setSubmitting(true)

    try {
      // Map First Name and Last Name cleanly to name for EmailJS template compatibility
      const fullName = `${trimmedFirst} ${trimmedLast}`.trim()
      await sendContactMessage({
        name: fullName,
        email: trimmedEmail,
        message: trimmedMessage,
      })
      setFeedback({
        kind: "success",
        text: "Thanks for reaching out! Your message was sent successfully.",
      })
      setFirstName("")
      setLastName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      setFeedback({
        kind: "error",
        text: error instanceof Error ? error.message : "Unable to send your message. Please connect on LinkedIn.",
      })
    } finally {
      sendingRef.current = false
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative w-full scroll-mt-24 overflow-hidden bg-[#080808] px-5 py-28 text-white sm:scroll-mt-28 sm:px-8 lg:py-40">
      {/* Giant CONTACT Background Typography */}
      <div
        className="font-giant-watermark pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none text-white/[0.07]"
        aria-hidden="true"
      >
        CONTACT
      </div>

      <div className="site-container-wide relative z-10 mx-auto">
        {/* Section Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>06</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>Get in touch</span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left Column: Context & Social Links */}
          <div>
            <Reveal variant="heading">
              <h2 className="font-section-heading mb-8 text-white">
                Have a good <br />
                <span className="text-[#F03A2D]">problem?</span> <br />
                Let&apos;s talk.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-lg text-lg font-normal leading-relaxed text-[#B8B8B8] sm:text-xl">
                I&apos;m interested in AI Engineering and Software Engineering opportunities, thoughtful technical collaborations, and building intelligent systems.
              </p>

              {/* Direct Links */}
              <div className="mt-10 flex flex-wrap gap-3.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nithin Deepa on GitHub"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[#F03A2D] hover:bg-[#F03A2D] hover:text-white"
                >
                  <GitHubIcon size={18} /> <span>GitHub</span>
                </a>

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Nithin Deepa on LinkedIn"
                    className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[#F03A2D] hover:bg-[#F03A2D] hover:text-white"
                  >
                    <LinkedInIcon size={18} /> <span>LinkedIn</span>
                  </a>
                )}

                {profile.resumePath && (
                  <a
                    href={profile.resumePath}
                    download
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#F03A2D] hover:bg-white/10"
                  >
                    <Download size={16} /> Download Resume
                  </a>
                )}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 text-sm text-[#777777]">
                Send a direct note here or connect with me via LinkedIn.
              </div>
            </Reveal>
          </div>

          {/* Right Column: Layered Red Contact Form Panel */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl bg-[#F03A2D] p-8 text-white shadow-2xl sm:p-12 lg:p-14">
              <h3 className="font-heading mb-3 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                Send a Message
              </h3>
              <p className="mb-8 text-sm text-white/85">
                Fill in the details below and I&apos;ll get back to you promptly.
              </p>

              <form noValidate onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-first-name" className="block text-xs font-bold uppercase tracking-wider text-white/80">
                      First Name *
                    </label>
                    <input
                      id="contact-first-name"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      disabled={submitting}
                      className="contact-underline-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-last-name" className="block text-xs font-bold uppercase tracking-wider text-white/80">
                      Last Name
                    </label>
                    <input
                      id="contact-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      disabled={submitting}
                      className="contact-underline-input"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contact-email-addr" className="block text-xs font-bold uppercase tracking-wider text-white/80">
                    Email Address *
                  </label>
                  <input
                    id="contact-email-addr"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    disabled={submitting}
                    className="contact-underline-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message-body" className="block text-xs font-bold uppercase tracking-wider text-white/80">
                    Message *
                  </label>
                  <textarea
                    id="contact-message-body"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    disabled={submitting}
                    className="contact-underline-input resize-y"
                  />
                </div>

                {/* Feedback Message */}
                {feedback && (
                  <div
                    role={feedback.kind === "error" ? "alert" : "status"}
                    className={`rounded-xl p-4 text-sm font-medium ${
                      feedback.kind === "success"
                        ? "bg-white text-[#080808]"
                        : "bg-black/30 text-white border border-white/30"
                    }`}
                  >
                    {feedback.text}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#080808] px-8 text-base font-bold text-white shadow-xl transition-all hover:bg-black hover:shadow-2xl active:scale-[0.99] disabled:opacity-50 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
