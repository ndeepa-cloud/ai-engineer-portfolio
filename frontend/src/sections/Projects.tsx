import { ArrowUpRight } from "lucide-react"
import Reveal from "../components/Reveal"
import { projects } from "../data/portfolio"

export default function Projects() {
  return (
    <section id="projects" className="relative w-full scroll-mt-24 bg-[#080808] px-5 py-28 text-white sm:scroll-mt-28 sm:px-8 lg:py-40">
      <div className="site-container-wide mx-auto">
        {/* Section Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>03</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>Selected Work</span>
          </div>
        </Reveal>

        {/* Section Heading */}
        <Reveal variant="heading">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:mb-24 lg:flex-row lg:items-end">
            <h2 className="font-section-heading text-white">
              Selected <br />
              <span className="text-[#F03A2D]">Projects</span>
            </h2>
            <p className="max-w-md text-lg font-normal leading-relaxed text-[#B8B8B8]">
              Explore the system design, architecture, and engineering behind each applied AI application.
            </p>
          </div>
        </Reveal>

        {/* Cinematic Horizontal Project Rows */}
        <div className="divide-y divide-white/15 border-t border-white/15">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.08, 0.3)}>
              <a
                href={`/projects/${project.slug}`}
                className="project-row-item group block py-10 transition-all duration-300 sm:py-14"
                aria-label={`View ${project.name} project details`}
              >
                <div className="grid items-start gap-6 lg:grid-cols-[80px_1fr_auto] lg:items-center lg:gap-10">
                  {/* Project Number */}
                  <div className="font-mono text-xl font-bold text-[#F03A2D] sm:text-2xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Main Project Info */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white">
                        {project.eyebrow}
                      </span>
                      <span className="rounded-full border border-[#F03A2D]/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#F03A2D]">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#F03A2D] sm:text-4xl lg:text-5xl">
                      {project.name}
                    </h3>

                    <p className="max-w-3xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
                      {project.description}
                    </p>

                    {/* Stack tags */}
                    {project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Animated Arrow Pill */}
                  <div className="flex items-center justify-end">
                    <div className="project-row-arrow-icon flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all group-hover:scale-110 sm:size-16">
                      <ArrowUpRight size={28} />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
