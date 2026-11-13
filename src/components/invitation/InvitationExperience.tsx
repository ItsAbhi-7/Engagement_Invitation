import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GatefoldEnvelope } from '@/components/envelope/GatefoldEnvelope'
import { CurtainReveal } from '@/components/reveal/CurtainReveal'
import { CoupleHero } from '@/components/sections/CoupleHero'
import { WelcomeMessage } from '@/components/sections/WelcomeMessage'
import { PhotoCarousel } from '@/components/sections/PhotoCarousel'
import { Countdown } from '@/components/sections/Countdown'
import { ProgramTimeline } from '@/components/sections/ProgramTimeline'
import { ScratchReveal } from '@/components/sections/ScratchReveal'
import { VenueSection } from '@/components/sections/VenueSection'
import { MusicToggle } from '@/components/ui/MusicToggle'
import { MusicProvider, useMusic } from '@/contexts/MusicContext'
import type { InvitationContent } from '@/types/invitation'

type Phase = 'sealed' | 'opening' | 'curtain' | 'content'

function InvitationInner({ invitation }: { invitation: InvitationContent }) {
  const [phase, setPhase] = useState<Phase>('sealed')
  const { play } = useMusic()

  const handleOpen = useCallback(() => {
    void play()
    setPhase('opening')
    window.setTimeout(() => setPhase('curtain'), 1300)
  }, [play])

  const handleCurtainDone = useCallback(() => {
    setPhase('content')
  }, [])

  return (
    <div className="invite-shell paper-texture">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-start justify-end p-3">
        <div className="pointer-events-auto">
          <MusicToggle />
        </div>
      </div>

      <AnimatePresence>
        {(phase === 'sealed' || phase === 'opening') && (
          <GatefoldEnvelope isOpen={phase === 'opening'} onOpen={handleOpen} />
        )}
      </AnimatePresence>

      <CurtainReveal
        invitation={invitation}
        active={phase === 'curtain'}
        onComplete={handleCurtainDone}
      />

      <AnimatePresence>
        {phase === 'content' && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 overflow-y-auto"
            style={{ maxHeight: '100dvh' }}
          >
            <CoupleHero invitation={invitation} />
            <WelcomeMessage invitation={invitation} />
            <div className="paper-texture pb-4 pt-6">
              <PhotoCarousel photos={invitation.photos} />
            </div>
            <Countdown invitation={invitation} />
            <ProgramTimeline invitation={invitation} />
            <ScratchReveal invitation={invitation} />
            <VenueSection invitation={invitation} />
            <footer className="pb-20 pt-4 text-center font-serif text-xs text-taupe/50">
              {invitation.couple.partner1.name} & {invitation.couple.partner2.name} ·{' '}
              {new Date(invitation.eventDate).getFullYear()}
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export function InvitationExperience({ invitation }: { invitation: InvitationContent }) {
  return (
    <MusicProvider src={invitation.musicUrl} autoplay={false}>
      <InvitationInner invitation={invitation} />
    </MusicProvider>
  )
}
