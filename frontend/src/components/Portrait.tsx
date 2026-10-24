import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

export type CharacterPose = {
  id: string
  label: string
  src: string
  alt: string
}

const AVAILABLE_POSES: CharacterPose[] = [
  {
    id: "illustrated",
    label: "Illustrated Character",
    src: "/portfolio-character.png",
    alt: "Nithin Deepa - Illustrated AI & Software Engineer",
  },
  {
    id: "photo",
    label: "Photo Cutout",
    src: "/portfolio-cutout.png",
    alt: "Nithin Deepa - Original Portrait Cutout",
  },
]

export default function Portrait() {
  const [activePoseIndex, setActivePoseIndex] = useState(0)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const currentPose = AVAILABLE_POSES[activePoseIndex] || AVAILABLE_POSES[0]

  return (
    <div className="character-viewport relative flex h-full w-full flex-col items-center justify-end">
      {/* Character Image Container with Entrance & Idle Motion */}
      <motion.div
        className="relative z-10 flex w-full items-end justify-center"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "60%" }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : entranceComplete
            ? {
                opacity: 1,
                y: [0, -10, 0],
                transition: {
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                },
              }
            : {
                opacity: 1,
                y: "0%",
                transition: {
                  duration: 2.0,
                  ease: [0.16, 1, 0.3, 1],
                },
              }
        }
        onAnimationComplete={() => {
          if (!entranceComplete && !shouldReduceMotion) {
            setEntranceComplete(true)
          }
        }}
      >
        <img
          key={currentPose.id}
          src={currentPose.src}
          alt={currentPose.alt}
          width={1024}
          height={1024}
          fetchPriority="high"
          className="character-asset select-none"
          onError={(e) => {
            // Fallback to cutout if custom image fails to load
            const img = e.currentTarget
            if (img.src.indexOf("portfolio-cutout.png") === -1) {
              img.src = "/portfolio-cutout.png"
            }
          }}
        />
      </motion.div>

      {/* Subtle Pose / Style Toggle Pill at bottom right of portrait */}
      <div className="pointer-events-auto absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 rounded-full border border-black/10 bg-black/40 px-3 py-1.5 backdrop-blur-md transition hover:bg-black/60 sm:inline-flex">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">View:</span>
        {AVAILABLE_POSES.map((pose, idx) => (
          <button
            key={pose.id}
            type="button"
            onClick={() => setActivePoseIndex(idx)}
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition ${
              activePoseIndex === idx
                ? "bg-white text-black"
                : "text-white/80 hover:text-white"
            }`}
            aria-pressed={activePoseIndex === idx}
          >
            {pose.id === "illustrated" ? "Illustrated" : "Photo"}
          </button>
        ))}
      </div>
    </div>
  )
}
