import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Curtains } from '@/components/decor/Curtains'
import { GardenScene } from '@/components/decor/GardenScene'
import type { InvitationContent } from '@/types/invitation'

interface CurtainRevealProps {
  invitation: InvitationContent
  active: boolean
  onComplete: () => void
}

export function CurtainReveal({ invitation, active, onComplete }: CurtainRevealProps) {
  const [showNames, setShowNames] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!active) return
    const namesTimer = window.setTimeout(() => setShowNames(true), 600)
    const exitTimer = window.setTimeout(() => setExiting(true), 3200)
    const doneTimer = window.setTimeout(() => onComplete(), 4200)
    return () => {
      window.clearTimeout(namesTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [active, onComplete])

  if (!active && !exiting) return null

  return (
    <AnimatePresence>
      {!exiting && active && (
        <motion.div
          className="absolute inset-0 z-30 flex flex-col bg-[#F5EDE0]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.9 }}
        >
          <Curtains />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
            <AnimatePresence>
              {showNames && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <p className="font-serif text-sm tracking-widest text-taupe/70">
                    {invitation.couple.tagline}
                  </p>
                  <h1 className="mt-4 font-script text-5xl text-charcoal sm:text-6xl">
                    {invitation.couple.partner1.name}
                  </h1>
                  <span className="my-2 block font-script text-2xl text-charcoal/50">&</span>
                  <h1 className="font-script text-5xl text-charcoal sm:text-6xl">
                    {invitation.couple.partner2.name}
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-10 w-full">
            <GardenScene className="opacity-90" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
