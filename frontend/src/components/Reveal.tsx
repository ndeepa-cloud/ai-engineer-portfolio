import { useLayoutEffect, useRef } from "react"
import type { ReactNode } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

type RevealProps = {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "header" | "section" | "figure"
  eager?: boolean
  delay?: number
  variant?: "standard" | "heading" | "portrait"
}

/** Content is visible by default; only an active animation hides/moves it. */
export default function Reveal({ children, className, as = "div", eager = false, delay = 0, variant = "standard" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08, initial: eager || variant === "portrait" })
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || !inView || reduceMotion) return
    const portrait = variant === "portrait"
    const animation = animate(element, {
      opacity: [portrait ? 0.15 : 0, 1],
      y: [portrait ? "102%" : variant === "heading" ? "40px" : "24px", portrait ? "0%" : "0px"],
    }, {
      duration: portrait ? 2.3 : variant === "heading" ? 0.95 : 0.75,
      delay,
      ease: portrait ? [0.4, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
    })
    return () => {
      animation.cancel()
      // Cancellation (including a preference change) restores readable content.
      element.style.opacity = ""
      element.style.transform = ""
    }
  }, [inView, reduceMotion, delay, variant])

  const Tag = as
  return <Tag ref={(element) => { ref.current = element }} className={className} data-reveal={variant}>{children}</Tag>
}
