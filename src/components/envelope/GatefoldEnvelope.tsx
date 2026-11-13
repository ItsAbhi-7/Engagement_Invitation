import { motion } from 'framer-motion'
import { WaxSeal } from '@/components/decor/WaxSeal'

interface GatefoldEnvelopeProps {
  onOpen: () => void
  isOpen: boolean
}

export function GatefoldEnvelope({ onOpen, isOpen }: GatefoldEnvelopeProps) {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      {/* Center gold seam line */}
      {!isOpen && (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
      )}

      {/* Left panel */}
      <motion.div
        className="emboss-leaves absolute inset-y-0 left-0 w-1/2 origin-left shadow-[4px_0_20px_rgba(0,0,0,0.15)]"
        initial={false}
        animate={isOpen ? { x: '-105%', rotateY: -8 } : { x: 0, rotateY: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
      </motion.div>

      {/* Right panel */}
      <motion.div
        className="emboss-leaves absolute inset-y-0 right-0 w-1/2 origin-right shadow-[-4px_0_20px_rgba(0,0,0,0.15)]"
        initial={false}
        animate={isOpen ? { x: '105%', rotateY: 8 } : { x: 0, rotateY: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
      </motion.div>

      {/* Seal */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        initial={false}
        animate={
          isOpen
            ? { scale: 0, opacity: 0, y: -40 }
            : { scale: 1, opacity: 1, y: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        {!isOpen && <WaxSeal onOpen={onOpen} />}
      </motion.div>
    </div>
  )
}
