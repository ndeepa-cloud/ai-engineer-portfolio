import Reveal from "../components/Reveal"
import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react"
import { academicAreas, profile } from "../data/portfolio"

export default function Education() {
  return (
    <section id="education" className="relative w-full scroll-mt-24 bg-[#080808] px-5 py-28 text-white sm:scroll-mt-28 sm:px-8 lg:py-40">
      <div className="site-container-wide mx-auto">
        {/* Section Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>05</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>Academic Background</span>
          </div>
        </Reveal>

        {/* Section Heading */}
        <Reveal variant="heading">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:mb-24 lg:flex-row lg:items-end">
            <h2 className="font-section-heading text-white">
              Learning the fundamentals. <br />
              <span className="text-[#F03A2D]">Engineering the future.</span>
            </h2>
            <p className="max-w-md text-lg font-normal leading-relaxed text-[#B8B8B8]">
              Building an enduring foundation in computer science theory while shipping applied artificial intelligence and software engineering projects.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Academic Layout */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left: University Degree Card */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-[#F03A2D]/10 text-[#F03A2D]">
                    <GraduationCap size={30} />
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/80">
                    Undergraduate
                  </span>
                </div>

                <p className="font-mono text-xs uppercase tracking-widest text-[#F03A2D]">
                  Institution
                </p>
                <h3 className="font-heading mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {profile.university}
                </h3>
                <p className="mt-3 text-xl font-medium text-[#B8B8B8]">
                  {profile.degree}
                </p>
              </div>

              <div className="mt-12 border-t border-white/10 pt-8">
                <p className="font-mono text-xs uppercase tracking-wider text-[#777777]">
                  Expected Graduation
                </p>
                <p className="font-heading mt-2 text-3xl font-bold text-[#F03A2D]">
                  {profile.graduation}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Academic Focus Areas */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <BookOpen size={22} className="text-[#F03A2D]" />
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                    Key Coursework &amp; Focus
                  </h3>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {academicAreas.map((area, index) => (
                    <li
                      key={area}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-base font-medium text-white/90 transition-colors hover:border-[#F03A2D]/40 hover:bg-white/[0.05]"
                    >
                      <span className="font-mono text-xs font-bold text-[#F03A2D]">
                        0{index + 1}
                      </span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#F03A2D] transition-colors hover:text-white"
                >
                  See these concepts in practice <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
