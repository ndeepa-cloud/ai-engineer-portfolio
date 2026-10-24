import Reveal from "../components/Reveal"
import { BriefcaseBusiness, CheckCircle2, Sparkles, Users } from "lucide-react"
import { experiences } from "../data/portfolio"

export default function Experience() {
  const internship = experiences.find((e) => e.type === "Internship") || experiences[0]
  const leadership = experiences.find((e) => e.type === "Leadership") || experiences[1]

  return (
    <section
      id="experience"
      className="relative w-full scroll-mt-24 bg-[#FFFFFF] px-5 py-28 text-[#080808] sm:scroll-mt-28 sm:px-8 lg:py-40"
    >
      <div className="site-container-wide mx-auto">
        {/* Section Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>04</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>Experience &amp; Leadership</span>
          </div>
        </Reveal>

        {/* Section Heading */}
        <Reveal variant="heading">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:mb-24 lg:flex-row lg:items-end">
            <h2 className="font-section-heading text-[#080808]">
              Engineered solutions. <br />
              <span className="text-[#F03A2D]">Proven impact.</span>
            </h2>
            <p className="max-w-md text-lg font-normal leading-relaxed text-[#555555]">
              Demonstrated engineering experience in applied AI workflows, production RAG pipelines, and campus executive leadership.
            </p>
          </div>
        </Reveal>

        {/* Asymmetrical Featured Layout */}
        <div className="space-y-12">
          {/* 1. Large Featured Internship Card */}
          <Reveal>
            <article className="group relative overflow-hidden rounded-3xl border-2 border-black/15 bg-[#080808] p-8 text-white shadow-2xl transition-all duration-300 hover:border-[#F03A2D] sm:p-12 lg:p-14">
              {/* Subtle background glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#F03A2D]/10 blur-3xl transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Header Meta Pill & Period */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#F03A2D] text-white shadow-lg">
                      <BriefcaseBusiness size={24} />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F03A2D]/40 bg-[#F03A2D]/15 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#F03A2D]">
                      <Sparkles size={13} /> Featured Industry Experience
                    </span>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs font-semibold text-[#B8B8B8]">
                    {internship.period}
                  </span>
                </div>

                {/* Role & Company */}
                <div className="border-b border-white/10 pb-8">
                  <h3 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {internship.role}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-[#F03A2D] sm:text-2xl">
                    {internship.company}
                  </p>
                  <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
                    {internship.summary}
                  </p>
                </div>

                {/* Key Contributions & Responsibilities */}
                <div className="py-8">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F03A2D]">
                    Key Responsibilities &amp; Engineering Contributions
                  </h4>
                  <ul className="mt-6 grid gap-4">
                    {internship.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-base leading-relaxed text-white/90 sm:text-lg">
                        <CheckCircle2 size={20} className="mt-1 shrink-0 text-[#F03A2D]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies & Skills Used */}
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#777777]">
                    Technologies &amp; Architecture:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {internship.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold text-white/90 transition hover:border-[#F03A2D] hover:bg-[#F03A2D]/20 hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* 2. Secondary Leadership Card */}
          <Reveal delay={0.12}>
            <article className="group relative rounded-3xl border border-black/10 bg-[#F9F9F9] p-8 transition-all duration-300 hover:border-black/30 hover:bg-white hover:shadow-xl sm:p-12">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-black/10 text-[#080808]">
                    <Users size={24} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-black/5 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#080808]">
                    Campus Executive Leadership
                  </span>
                </div>
                <span className="rounded-full border border-black/15 bg-black/5 px-4 py-1.5 font-mono text-xs font-semibold text-[#555555]">
                  {leadership.period}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-[#080808] sm:text-3xl">
                  {leadership.role}
                </h3>
                <p className="mt-1 text-lg font-semibold text-[#555555]">
                  {leadership.company}
                </p>
                <p className="mt-3 text-base text-[#666666]">
                  {leadership.summary}
                </p>

                <ul className="mt-6 grid gap-3">
                  {leadership.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base leading-relaxed text-[#333333]">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#F03A2D]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {leadership.technologies.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs font-semibold text-[#555555]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
