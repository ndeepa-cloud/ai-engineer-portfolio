import { ArrowUpRight } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "./SocialIcons"
import { profile } from "../data/portfolio"

const navigation = ["About", "Skills", "Projects", "Experience", "Education", "Contact"]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-5 py-12 text-white sm:px-8">
      <div className="site-container-wide mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Brand / Name */}
        <div>
          <a href="/#home" className="font-heading text-2xl font-bold text-white">
            ND<span className="text-[#F03A2D]">.</span>
          </a>
          <p className="mt-1 text-sm text-[#777777]">
            {profile.name} · AI &amp; Software Engineer
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {navigation.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-sm font-medium text-[#B8B8B8] transition-colors hover:text-[#F03A2D]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Nithin Deepa on GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#B8B8B8] transition-all hover:-translate-y-0.5 hover:border-[#F03A2D] hover:bg-[#F03A2D] hover:text-white"
          >
            <GitHubIcon size={18} />
          </a>

          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nithin Deepa on LinkedIn"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#B8B8B8] transition-all hover:-translate-y-0.5 hover:border-[#F03A2D] hover:bg-[#F03A2D] hover:text-white"
            >
              <LinkedInIcon size={18} />
            </a>
          )}

          <span className="text-xs text-[#555555]">
            © {new Date().getFullYear()} Nithin Deepa
          </span>

          <a
            href="/#home"
            aria-label="Back to top"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#B8B8B8] transition hover:border-[#F03A2D] hover:text-[#F03A2D]"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
