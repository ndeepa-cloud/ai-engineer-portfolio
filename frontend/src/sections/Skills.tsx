import Reveal from "../components/Reveal"
import { TechIcon } from "../components/TechIcon"
import { Sparkles, ArrowUpRight } from "lucide-react"
import { skillGroups } from "../data/portfolio"

export default function Skills() {
  // Visual themes matching the user's requested palette:
  // Black, White, Bright Red (featured AI), Dark Gray/Charcoal
  const cardThemes = [
    {
      // 01 Programming: Black
      bg: "bg-[#09090B] border border-white/15 text-white shadow-2xl",
      numColor: "text-[#F03A2D]",
      lineColor: "bg-white/20",
      titleColor: "text-white",
      pillStyle: "bg-white/10 text-white border-white/15 hover:bg-[#F03A2D] hover:border-[#F03A2D] hover:text-white",
      iconColor: "text-[#F03A2D]",
    },
    {
      // 02 Frontend: White with black text and red accents
      bg: "bg-[#FFFFFF] border-2 border-black/10 text-[#080808] shadow-xl",
      numColor: "text-[#F03A2D]",
      lineColor: "bg-black/15",
      titleColor: "text-[#080808]",
      pillStyle: "bg-black/5 text-[#080808] border-black/10 hover:bg-[#F03A2D] hover:border-[#F03A2D] hover:text-white",
      iconColor: "text-[#F03A2D]",
    },
    {
      // 03 Backend: Dark Charcoal
      bg: "bg-[#18181B] border border-white/15 text-white shadow-2xl",
      numColor: "text-[#F03A2D]",
      lineColor: "bg-white/20",
      titleColor: "text-white",
      pillStyle: "bg-white/10 text-white/95 border-white/15 hover:bg-[#F03A2D] hover:border-[#F03A2D] hover:text-white",
      iconColor: "text-[#F03A2D]",
    },
    {
      // 04 AI / GenAI: FEATURED VIVID RED CARD
      bg: "bg-gradient-to-br from-[#F03A2D] via-[#E0291D] to-[#B91C1C] border-2 border-white/30 text-white shadow-[0_20px_60px_rgba(240,58,45,0.35)] relative overflow-hidden",
      numColor: "text-white",
      lineColor: "bg-white/40",
      titleColor: "text-white",
      pillStyle: "bg-black/30 text-white border-white/30 backdrop-blur-md hover:bg-white hover:text-[#080808] hover:border-white",
      iconColor: "text-white",
      featured: true,
    },
    {
      // 05 Databases: Clean Light Gray
      bg: "bg-[#F4F4F6] border-2 border-black/10 text-[#080808] shadow-xl",
      numColor: "text-[#F03A2D]",
      lineColor: "bg-black/15",
      titleColor: "text-[#080808]",
      pillStyle: "bg-white text-[#18181B] border-black/10 hover:bg-[#F03A2D] hover:border-[#F03A2D] hover:text-white",
      iconColor: "text-[#F03A2D]",
    },
    {
      // 06 Developer Tools & Cloud: Deep Dark Card
      bg: "bg-[#111113] border border-white/15 text-white shadow-2xl",
      numColor: "text-[#F03A2D]",
      lineColor: "bg-white/20",
      titleColor: "text-white",
      pillStyle: "bg-white/10 text-white border-white/15 hover:bg-[#F03A2D] hover:border-[#F03A2D] hover:text-white",
      iconColor: "text-[#F03A2D]",
    },
  ]

  return (
    <section
      id="skills"
      className="relative w-full scroll-mt-24 bg-[#080808] px-5 py-28 text-white sm:scroll-mt-28 sm:px-8 lg:py-40"
    >
      <div className="site-container-wide mx-auto">
        {/* Section Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>02</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>Technical Toolkit</span>
          </div>
        </Reveal>

        {/* Section Header */}
        <Reveal variant="heading">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:mb-24 lg:flex-row lg:items-end">
            <h2 className="font-section-heading text-white">
              Tools for ideas <br />
              <span className="text-[#F03A2D]">that ship.</span>
            </h2>
            <p className="max-w-md text-lg font-normal leading-relaxed text-[#B8B8B8]">
              A high-impact technical arsenal across AI engineering, systems programming, and modern full-stack development.
            </p>
          </div>
        </Reveal>

        {/* Multi-toned Creative Responsive Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {skillGroups.map((group, index) => {
            const theme = cardThemes[index] || cardThemes[0]
            const isFeatured = theme.featured

            return (
              <Reveal key={group.name} delay={index * 0.08}>
                <article
                  className={`group relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)] sm:p-10 ${theme.bg}`}
                >
                  {/* Subtle shine / glow for featured AI card */}
                  {isFeatured && (
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/20 blur-2xl"
                      aria-hidden="true"
                    />
                  )}

                  <div>
                    {/* Top Meta Line: Number + Pill + Animated Arrow */}
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-sm font-extrabold ${theme.numColor}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                            <Sparkles size={12} /> Primary Focus
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        size={20}
                        className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                          isFeatured ? "text-white" : "text-[#F03A2D]"
                        }`}
                      />
                    </div>

                    {/* Category Title */}
                    <h3 className={`font-heading mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl ${theme.titleColor}`}>
                      {group.name}
                    </h3>

                    {/* Technology Badges with Icons */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base ${theme.pillStyle}`}
                        >
                          <TechIcon name={skill} className="size-4 shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-8 pt-4">
                    <div className={`h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full ${
                      isFeatured ? "bg-white/60" : "bg-[#F03A2D]"
                    }`} />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
