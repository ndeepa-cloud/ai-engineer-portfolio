import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, ExternalLink } from "lucide-react"
import Reveal from "../components/Reveal"
import { projects } from "../data/portfolio"
import type { Project } from "../data/portfolio"

export default function ProjectDetails({ project }: { project: Project }) {
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <article className="site-container-wide mx-auto min-h-screen px-5 pb-24 pt-32 text-white sm:px-8 lg:pt-40">
      <nav aria-label="Project navigation" className="mb-12 flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold text-[#B8B8B8]">
        <a href="/#projects" className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#F03A2D]">
          <ArrowLeft size={18} /> Back to Projects
        </a>
        <a href="/" className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#F03A2D]">
          Return to Homepage <ArrowUpRight size={18} />
        </a>
      </nav>

      <Reveal as="header" variant="heading" className="border-b border-white/15 pb-16">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F03A2D]">{project.eyebrow}</p>
          <span className="rounded-full border border-[#F03A2D]/40 px-3.5 py-1 text-xs font-semibold text-white">{project.status}</span>
        </div>
        <h1 className="font-heading max-w-5xl break-words text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {project.name}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#B8B8B8] sm:text-xl">
          {project.description}
        </p>
        {project.stack.length > 0 && (
          <ul aria-label="Technologies used" className="mt-8 flex flex-wrap gap-2.5">
            {project.stack.map(item => (
              <li key={item} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white">
                {item}
              </li>
            ))}
          </ul>
        )}
        {project.note && <p className="mt-6 text-sm text-[#B8B8B8]">{project.note}</p>}
      </Reveal>

      <div className="space-y-16 pt-16 sm:space-y-24">
        <Reveal as="section" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="font-heading text-2xl font-bold uppercase text-white sm:text-3xl">Project overview</h2>
          <div className="space-y-5 text-lg leading-relaxed text-[#B8B8B8]">
            <p>{project.impact || project.description}</p>
            {project.status === "In Development" && (
              <p className="rounded-xl border border-[#F03A2D]/30 bg-[#F03A2D]/10 p-5 text-base text-white">
                This project is actively in development. Capabilities described represent system goals and explored architectures.
              </p>
            )}
          </div>
        </Reveal>

        {project.details && (
          <>
            <Reveal as="section" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <h2 className="font-heading text-2xl font-bold uppercase text-white sm:text-3xl">Problem &amp; solution</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F03A2D]">The problem</h3>
                  <p className="text-base leading-relaxed text-[#B8B8B8]">{project.details.problem}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F03A2D]">The approach</h3>
                  <p className="text-base leading-relaxed text-[#B8B8B8]">{project.details.solution}</p>
                </div>
              </div>
            </Reveal>

            <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <Reveal variant="heading">
                <h2 className="font-heading text-2xl font-bold uppercase text-white sm:text-3xl">
                  {project.status === "In Development" ? "Architecture direction" : "Technical architecture"}
                </h2>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {project.details.architecture.map((item, index) => (
                  <Reveal as="article" key={item.label} delay={index * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="mb-2 font-heading text-base font-bold text-white">{item.label}</h3>
                    <p className="text-sm leading-relaxed text-[#B8B8B8]">{item.description}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          </>
        )}

        {project.features.length > 0 && (
          <Reveal as="section" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="font-heading text-2xl font-bold uppercase text-white sm:text-3xl">
              {project.status === "In Development" ? "Development focus" : "Engineering highlights"}
            </h2>
            <ul className="divide-y divide-white/15 border-t border-white/15">
              {project.features.map((feature, index) => (
                <li key={feature} className="flex gap-4 py-5">
                  <span className="font-mono text-xs font-bold text-[#F03A2D]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal as="section" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="font-heading text-2xl font-bold uppercase text-white sm:text-3xl">Explore project</h2>
          <div>
            {project.demoUrl || project.githubUrl ? (
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-[#F03A2D] px-7 text-sm font-bold text-white transition hover:bg-[#d02c20]"
                  >
                    <ExternalLink size={17} /> Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center gap-2.5 rounded-full border border-white/30 px-7 text-sm font-bold text-white transition hover:border-[#F03A2D] hover:text-[#F03A2D]"
                  >
                    <Code2 size={17} /> GitHub Repository <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-base leading-relaxed text-[#B8B8B8]">
                Public demo and repository links have not been provided for this project.
              </p>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-24 border-t border-white/20 pt-12">
        <a href={`/projects/${nextProject.slug}`} className="group flex min-h-20 items-center justify-between gap-6">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[#F03A2D]">Next project</p>
            <p className="font-heading text-2xl font-bold text-white transition group-hover:text-[#F03A2D] sm:text-4xl">
              {nextProject.name}
            </p>
          </div>
          <ArrowRight className="size-8 shrink-0 text-[#F03A2D] transition-transform group-hover:translate-x-2" />
        </a>
      </Reveal>
    </article>
  )
}
