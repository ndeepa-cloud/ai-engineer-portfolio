import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Bot, Send, Sparkles, X } from "lucide-react"
import { askPortfolio, type ChatMessage } from "../services/api"

const suggestions = [
  "What AI projects has Nithin built?",
  "What was Nithin's role at Padsnap?",
  "What are Nithin's technical skills?",
  "What is his experience with RAG and LLMs?",
  "When is Nithin graduating?",
  "How can I contact Nithin?",
  "Can I download his resume?",
]
const welcomeSessionKey = "nithin-portfolio-welcome-shown"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const reduceMotion = useReducedMotion()
  const interactedRef = useRef(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(welcomeSessionKey)) return
    } catch {
      return
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(welcomeSessionKey, "true")
      } catch {
        return
      }
      if (!interactedRef.current) setWelcomeVisible(true)
    }, 1800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const container = bottomRef.current?.parentElement
    container?.scrollTo({ top: container.scrollHeight, behavior: "instant" })
  }, [messages, loading, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  async function submitQuestion(question: string) {
    const trimmed = question.trim()
    if (!trimmed || loading) return
    const priorMessages = messages
    const nextMessages: ChatMessage[] = [...priorMessages, { role: "user", content: trimmed }]
    setMessages(nextMessages)
    setInput("")
    setError("")
    setLoading(true)
    try {
      const result = await askPortfolio(trimmed, priorMessages.slice(-8))
      setMessages([...nextMessages, { role: "assistant", content: result.answer }])
    } catch (requestError) {
      setMessages(priorMessages)
      setInput(trimmed)
      setError(requestError instanceof Error ? requestError.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitQuestion(input)
  }

  function dismissWelcome() {
    interactedRef.current = true
    setWelcomeVisible(false)
    try {
      sessionStorage.setItem(welcomeSessionKey, "true")
    } catch {
      /* Session storage blocked */
    }
  }

  function handleOpenChat() {
    dismissWelcome()
    setOpen(true)
  }

  function handlePromptChip(question: string) {
    dismissWelcome()
    setOpen(true)
    void submitQuestion(question)
  }

  function toggleChat() {
    dismissWelcome()
    setOpen((val) => !val)
  }

  return (
    <>
      {/* 1. Notification Greeting Popup */}
      <AnimatePresence>
        {welcomeVisible && !open && (
          <motion.aside
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[96px] right-5 z-[59] w-[min(370px,calc(100vw-36px))] rounded-3xl border border-white/20 bg-[#111111]/98 p-5 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_25px_rgba(240,58,45,0.18)] backdrop-blur-2xl sm:right-6"
          >
            {/* Top red accent bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F03A2D] via-[#F03A2D]/80 to-transparent" />

            {/* Notification Badge & Dismiss Button */}
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F03A2D]/40 bg-[#F03A2D]/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#ff8792]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F03A2D] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#F03A2D]" />
                </span>
                <span>AI Assistant Notification</span>
              </span>

              <button
                type="button"
                onClick={dismissWelcome}
                aria-label="Dismiss notification"
                className="grid size-7 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            {/* Prominent Question Headline */}
            <div className="mt-3.5">
              <h3 className="font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                <span className="mr-1.5 inline-block" role="img" aria-label="Waving hand">👋</span>
                How may I help you know about Nithin?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A3A3A3]">
                I can answer questions about Nithin&apos;s AI engineering projects, technical stack, internship at Padsnap, or education.
              </p>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handlePromptChip("What AI projects has Nithin built?")}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90 transition hover:border-[#F03A2D] hover:bg-[#F03A2D]/20 hover:text-white"
              >
                🚀 AI Projects
              </button>
              <button
                type="button"
                onClick={() => handlePromptChip("What was Nithin's role at Padsnap?")}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90 transition hover:border-[#F03A2D] hover:bg-[#F03A2D]/20 hover:text-white"
              >
                💼 Internship
              </button>
              <button
                type="button"
                onClick={() => handlePromptChip("What are Nithin's technical skills?")}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90 transition hover:border-[#F03A2D] hover:bg-[#F03A2D]/20 hover:text-white"
              >
                🛠️ Skills
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="mt-4 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={handleOpenChat}
                className="group flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#F03A2D] hover:text-white active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#F03A2D] group-hover:text-white" />
                  <span>Ask me anything</span>
                </span>
                <span className="font-mono text-sm transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Decorative speech bubble pointer tail */}
            <div
              className="absolute -bottom-2 right-7 size-4 rotate-45 border-b border-r border-white/20 bg-[#111111]"
              aria-hidden="true"
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Floating Chatbot Launcher Button with Notification Badge */}
      <motion.button
        ref={launcherRef}
        type="button"
        aria-label={open ? "Close Nithin's AI Assistant" : "Open Nithin's AI Assistant"}
        aria-expanded={open}
        onClick={toggleChat}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="fixed bottom-6 right-5 z-[60] grid size-14 place-items-center rounded-full border-2 border-white/25 bg-[#080808] text-white shadow-[0_12px_40px_rgba(0,0,0,0.65)] transition-colors hover:border-[#F03A2D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F03A2D] sm:right-6"
      >
        {open ? (
          <X size={24} />
        ) : (
          <>
            <Bot size={26} strokeWidth={1.8} className="text-white" />

            {/* Notification Badge Counter when unread notification popup is active */}
            {welcomeVisible && !open ? (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F03A2D] opacity-75" />
                <span className="relative inline-flex size-5 items-center justify-center rounded-full border-2 border-[#080808] bg-[#F03A2D] text-[10px] font-black text-white shadow-md">
                  1
                </span>
              </span>
            ) : (
              /* Regular red notification dot */
              <span
                className="absolute right-1.5 top-1.5 size-3 rounded-full border-2 border-[#080808] bg-[#F03A2D]"
                aria-hidden="true"
              />
            )}
          </>
        )}
      </motion.button>

      {/* 3. Open Chat Dialog Modal */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Nithin's AI Assistant"
            aria-modal="false"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-[94px] z-[60] flex h-[min(620px,calc(100dvh-120px))] flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#080808]/98 shadow-[0_25px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:inset-x-auto sm:right-6 sm:w-[420px]"
          >
            {/* Chat Header */}
            <header className="flex items-center gap-3 border-b border-white/10 bg-[#141414] px-5 py-4">
              <span className="grid size-10 place-items-center rounded-xl bg-[#F03A2D]/15 text-[#F03A2D]">
                <Bot size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-sm font-bold text-white">Nithin&apos;s AI Assistant</h2>
                <p className="mt-0.5 text-xs text-[#A3A3A3]">Ask me anything about Nithin&apos;s work</p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => {
                  toggleChat()
                  launcherRef.current?.focus()
                }}
                className="grid size-9 place-items-center rounded-full text-[#A3A3A3] transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </header>

            {/* Messages History */}
            <div className="chat-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
              {messages.length === 0 && (
                <div className="max-w-[96%] space-y-3">
                  <p className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200">
                    👋 How may I help you know about Nithin? Choose a topic or type your own question:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {suggestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void submitQuestion(question)}
                        className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-left text-xs leading-snug text-white transition hover:border-[#F03A2D] hover:bg-[#F03A2D]/15"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[88%] break-words whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-[#F03A2D] font-medium text-white shadow-md"
                        : "rounded-bl-sm border border-white/10 bg-[#161616] text-slate-100"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-[#A3A3A3]" role="status">
                  <span className="typing-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  Thinking about that…
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-[#F03A2D]/40 bg-[#F03A2D]/15 p-3.5 text-xs leading-5 text-[#ff8792]"
                >
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 bg-[#141414] p-3.5">
              <label className="sr-only" htmlFor="portfolio-question">
                Ask Nithin&apos;s AI Assistant
              </label>
              <input
                ref={inputRef}
                id="portfolio-question"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Ask about projects, skills, internship…"
                className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-black/60 px-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#F03A2D]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send question"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#F03A2D] text-white transition hover:bg-[#d02c20] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
