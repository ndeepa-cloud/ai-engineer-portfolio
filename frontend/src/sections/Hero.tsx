import { motion } from "motion/react"
import Portrait from "../components/Portrait"
import { ArrowDownRight, Download, Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "../components/SocialIcons"
import { profile } from "../data/portfolio"

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-wrapper relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#F03A2D] text-white pt-24 lg:pt-28"
    >
      {/* Background graphic grid texture */}
      <div className="hero-texture" aria-hidden="true" />

      {/* Main Hero Grid */}
      <div className="site-container-wide relative z-10 grid flex-1 items-end gap-8 pb-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Left: Typography & Actions */}
        <div className="flex flex-col justify-center py-8 lg:py-16">
          {/* Subtitle / Role kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#080808] sm:text-sm"
          >
            <span className="h-0.5 w-8 bg-[#080808]" />
            <span>AI Engineer · Software Engineer · GenAI</span>
          </motion.div>

          {/* Oversized Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-hero text-white"
          >
            Building intelligent software that <span className="text-[#080808]">solves real-world</span> problems.
          </motion.h1>

          {/* Introduction Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-white/90 sm:text-xl"
          >
            I&apos;m <strong className="font-semibold text-white">{profile.name}</strong>, a Computer Science undergraduate at Murray State University. I engineer AI-powered assistants, document intelligence systems, and scalable full-stack applications.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <a
              href="#projects"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#080808] px-7 text-base font-bold text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-black active:scale-95"
            >
              Explore Projects <ArrowDownRight size={18} />
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-[#080808] bg-transparent px-6 text-base font-bold text-[#080808] transition-all hover:-translate-y-0.5 hover:bg-[#080808] hover:text-white active:scale-95"
            >
              <Mail size={18} /> Contact Me
            </a>

            {profile.resumePath && (
              <a
                href={profile.resumePath}
                download
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/20 active:scale-95"
              >
                <Download size={16} /> Resume
              </a>
            )}

            <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Nithin Deepa on GitHub"
                className="inline-flex size-[52px] items-center justify-center rounded-full border border-black/20 bg-[#080808] text-white shadow-md transition-all hover:-translate-y-1 hover:bg-black hover:text-white"
              >
                <GitHubIcon size={22} />
              </a>

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nithin Deepa on LinkedIn"
                  className="inline-flex size-[52px] items-center justify-center rounded-full border border-black/20 bg-[#080808] text-white shadow-md transition-all hover:-translate-y-1 hover:bg-black hover:text-white"
                >
                  <LinkedInIcon size={22} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Bottom Education / Context Kicker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/15 pt-5 text-xs font-semibold uppercase tracking-wider text-[#080808]/80"
          >
            <span>United States</span>
            <span className="size-1 rounded-full bg-[#080808]/40" />
            <span>{profile.university}</span>
            <span className="size-1 rounded-full bg-[#080808]/40" />
            <span>Expected {profile.graduation}</span>
          </motion.div>
        </div>

        {/* Right: Dominant Illustrated Character Portrait */}
        <div className="relative flex h-[50svh] w-full items-end justify-center lg:h-[82svh]">
          <Portrait />
        </div>
      </div>
    </section>
  )
}
