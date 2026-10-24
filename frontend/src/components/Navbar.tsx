import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

const links = ["About", "Skills", "Projects", "Experience", "Education", "Contact"]

export default function Navbar() {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["Home", ...links]
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
        if (visibleSection) setActiveSection(visibleSection.target.id)
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#080808]/90 py-3.5 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="site-container-wide mx-auto flex items-center justify-between"
      >
        {/* Logo / Monogram */}
        <a
          href="/#home"
          onClick={() => setMenuOpen(false)}
          className="font-heading text-2xl font-bold tracking-tight text-white"
        >
          ND<span className={scrolled ? "text-[#F03A2D]" : "text-black"}>.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-black/25 px-4 py-1.5 backdrop-blur-md lg:flex">
          {links.map((item) => {
            const isActive = activeSection === item.toLowerCase()
            return (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                aria-current={isActive ? "location" : undefined}
                className={`nav-pill-link ${
                  isActive ? "is-active text-white font-bold" : "text-white/80 hover:text-white"
                }`}
              >
                {item}
              </a>
            )
          })}
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden rounded-full bg-[#080808] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-black sm:inline-flex"
          >
            Let&apos;s Connect <span className="ml-1 text-[#F03A2D]">↗</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-navigation"
        className={`${
          menuOpen ? "grid" : "hidden"
        } max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-white/10 bg-[#080808]/98 px-6 py-6 backdrop-blur-2xl lg:hidden`}
      >
        <div className="flex flex-col space-y-4">
          {links.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              aria-current={activeSection === item.toLowerCase() ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`font-heading text-xl font-bold transition ${
                activeSection === item.toLowerCase() ? "text-[#F03A2D]" : "text-white/80 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#F03A2D] text-base font-bold text-white"
            >
              Let&apos;s Connect ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
