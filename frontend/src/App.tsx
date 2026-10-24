
import { useEffect } from "react"
import { projects } from "./data/portfolio"
import ProjectDetails from "./pages/ProjectDetails"
import { MotionConfig } from "motion/react"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Experience from "./sections/Experience"
import Education from "./sections/Education"
import Contact from "./sections/Contact"
import Footer from "./components/Footer"
import ChatWidget from "./components/ChatWidget"

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  const project = projects.find(item => path === `/projects/${item.slug}`)
  const home = path === "/"

  useEffect(() => {
    document.title = project ? `${project.name} | Nithin Deepa` : home ? "Nithin Deepa | AI & Software Engineer" : "Page not found | Nithin Deepa"
    // Disable homepage scroll snapping on long project detail pages.
    document.documentElement.classList.toggle("project-page", !home)
    // A direct /#section load can arrive before React has mounted its anchor.
    const frame = requestAnimationFrame(() => {
      if (home && window.location.hash) {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" })
      }
    })
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove("project-page")
    }
  }, [project, home])
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-shell min-h-screen overflow-x-hidden bg-[#080808] text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-black focus:p-4 focus:text-white">Skip to content</a>
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {home ? <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          </> : project ? <ProjectDetails project={project} /> : <div className="mx-auto max-w-7xl px-5 py-40 sm:px-8"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-5 text-slate-300">This project URL does not match a published project.</p><a href="/#projects" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#F03A2D] px-6 font-medium text-white">Back to Projects</a></div>}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </MotionConfig>
  )
}

export default App
