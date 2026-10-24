import Reveal from "../components/Reveal"
import { ArrowUpRight } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="relative w-full scroll-mt-24 bg-[#080808] px-5 py-28 text-white sm:scroll-mt-28 sm:px-8 lg:py-40">
      <div className="site-container-wide mx-auto">
        {/* Section Index / Kicker */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#F03A2D]">
            <span>01</span>
            <span className="h-px w-8 bg-[#F03A2D]" />
            <span>About</span>
          </div>
        </Reveal>

        {/* Section Heading */}
        <Reveal variant="heading">
          <h2 className="font-section-heading mb-16 text-white sm:mb-20">
            Curiosity, with an <br />
            <span className="text-[#F03A2D]">engineering</span> mindset.
          </h2>
        </Reveal>

        {/* Two-column Content Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <div className="space-y-6 text-lg font-normal leading-relaxed text-[#B8B8B8] sm:text-xl sm:leading-loose">
              <p>
                I&apos;m a Computer Science student at <strong className="font-medium text-white">Murray State University</strong>, focused on engineering software that makes complex workflows feel effortless. My work spans full-stack engineering and the fast-evolving frontier of generative AI.
              </p>
              <p>
                I believe in learning through production-grade building: connecting modern language models with LangChain and Groq to responsive interfaces, engineering dependable FastAPI &amp; Flask backends with streaming responses, and designing architectures that scale.
              </p>
              <div className="pt-4">
                <a
                  href="#education"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#F03A2D] transition-colors hover:text-white"
                >
                  Explore academic background <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Callout Box */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <div className="mb-6 inline-block font-mono text-xs uppercase tracking-widest text-[#F03A2D]">
                Core Philosophy
              </div>
              <p className="font-heading text-2xl font-bold leading-snug text-white sm:text-3xl">
                &ldquo;Useful beats flashy. Clear beats clever. Build, learn, improve.&rdquo;
              </p>
              <p className="mt-6 text-base leading-relaxed text-[#B8B8B8]">
                Every project begins with a real problem. Whether automating real estate discoveries or designing semantic retrieval pipelines, the goal is always intuitive, verifiable value for people.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
