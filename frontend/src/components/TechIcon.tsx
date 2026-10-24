import type { ReactNode } from "react"
import {
  Binary,
  Bot,
  Brain,
  Cpu,
  Database,
  Flame,
  Globe,
  Layers,
  Network,
  Radio,
  Search,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react"

export function TechIcon({ name, className = "size-4 shrink-0" }: { name: string; className?: string }): ReactNode {
  const lower = name.toLowerCase()

  // Languages
  if (lower.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.7 0-3.5 1.6-3.5 1.6l.004 1.7h3.6v.5H4.8s-2.3.2-2.3 3.5c0 3.2 2 3.3 2 3.3h1.2v-1.7s-.1-2 2-2h3.5s1.9.03 1.9-1.9V3.9s.4-1.9-3.2-1.9zm-2 1.1c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6zm2.2 18.9c3.7 0 3.5-1.6 3.5-1.6l-.004-1.7h-3.6v-.5h7.2s2.3-.2 2.3-3.5c0-3.2-2-3.3-2-3.3h-1.2v1.7s.1 2-2 2h-3.5s-1.9-.03-1.9 1.9v3.1s-.4 1.9 3.2 1.9zm2-1.1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" />
      </svg>
    )
  }
  if (lower.includes("javascript")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm13.7 13.9c.7 0 1.2-.3 1.5-.8l1.3.8c-.6 1-1.6 1.5-2.9 1.5-2.2 0-3.6-1.4-3.6-3.6 0-2.3 1.4-3.6 3.5-3.6 2 0 3.1 1.2 3.1 3v.6h-4.9c.1 1.2.9 2.1 2 2.1zm.3-3.7c-.8 0-1.4.5-1.5 1.3h3.2c0-.8-.6-1.3-1.7-1.3zm-6.8 4.7c-.5.4-1.2.6-2 .6-1.7 0-2.6-1-2.6-2.5v-4.4h1.7v4.3c0 .8.4 1.2 1.1 1.2.6 0 1-.3 1.3-.7v-4.8h1.7v6h-1.2v-.7z" />
      </svg>
    )
  }
  if (lower.includes("typescript")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.7 7.2h-3.2V18H8.8v-7.8H5.6V8.7h8.1v1.5zm5.7 3.5c0-1.7-1.4-2.5-3.4-2.8-.9-.1-1.4-.4-1.4-.9 0-.5.5-.9 1.4-.9 1 0 1.9.4 2.6.9l.8-1.3c-.9-.7-2.1-1.1-3.4-1.1-2.1 0-3.3 1.1-3.3 2.6 0 1.6 1.2 2.4 3.2 2.7 1 .2 1.5.5 1.5 1 0 .6-.6 1-1.6 1-1.2 0-2.4-.5-3.2-1.3l-.9 1.3c1.1 1 2.5 1.5 4.1 1.5 2.3 0 3.6-1.2 3.6-2.7z" />
      </svg>
    )
  }
  if (lower.includes("react")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (lower.includes("java")) {
    return <Flame className={className} />
  }
  if (lower.includes("c++") || lower.includes("cpp")) {
    return <Binary className={className} />
  }

  // AI & GenAI
  if (lower.includes("langgraph") || lower.includes("workflow")) {
    return <Workflow className={className} />
  }
  if (lower.includes("langchain") || lower.includes("agent")) {
    return <Network className={className} />
  }
  if (lower.includes("rag") || lower.includes("retrieval")) {
    return <Layers className={className} />
  }
  if (lower.includes("llm") || lower.includes("model")) {
    return <Brain className={className} />
  }
  if (lower.includes("vector") || lower.includes("embedding") || lower.includes("chromadb") || lower.includes("pgvector")) {
    return <Search className={className} />
  }
  if (lower.includes("gemini") || lower.includes("groq") || lower.includes("prompt")) {
    return <Sparkles className={className} />
  }
  if (lower.includes("hugging face")) {
    return <Bot className={className} />
  }

  // Backend & APIs
  if (lower.includes("fastapi")) {
    return <Zap className={className} />
  }
  if (lower.includes("flask")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 7.5V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    )
  }
  if (lower.includes("sse") || lower.includes("server-sent")) {
    return <Radio className={className} />
  }
  if (lower.includes("node")) {
    return <Server className={className} />
  }

  // Databases
  if (lower.includes("postgres") || lower.includes("sql") || lower.includes("supabase")) {
    return <Database className={className} />
  }

  // Developer Tools
  if (lower.includes("docker")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm14.5 7.5c-.4-.3-1.3-.4-2-.2-.2-.5-.5-1-.9-1.4l-.5.4c.4.4.6.8.7 1.3-.7-.2-1.5-.1-2.1.2-.5-1.5-1.8-2.6-3.4-2.8H2v2c0 4.4 3.6 8 8 8 5.5 0 9.8-3.7 10.8-8.9.5.2 1.1.2 1.6-.1.6-.5.7-1.1.7-1.1s-.4.6-1.6.6zM4 11h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z" />
      </svg>
    )
  }
  if (lower.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l2.7 2.7c.6-.2 1.4-.1 1.9.5.6.6.7 1.4.3 2.1l2.6 2.6c.7-.4 1.5-.3 2.1.3.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.7-1.5-.3-2.2l-2.4-2.4v5.3c.2.2.4.4.5.7.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.8-.8-.8-2.1 0-2.9.3-.3.8-.6 1.3-.6V8.7c-.5-.1-1-.4-1.3-.7-.6-.6-.7-1.5-.3-2.2L5.8 3.2 2.4 6.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.6.6-1.5 0-2.1z" />
      </svg>
    )
  }
  if (lower.includes("cloud") || lower.includes("aws") || lower.includes("render") || lower.includes("vercel")) {
    return <Cpu className={className} />
  }
  if (lower.includes("html") || lower.includes("css") || lower.includes("tailwind")) {
    return <Globe className={className} />
  }
  if (lower.includes("code") || lower.includes("terminal")) {
    return <Terminal className={className} />
  }

  return <Wrench className={className} />
}

