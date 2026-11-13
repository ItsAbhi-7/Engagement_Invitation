import { motion } from 'framer-motion'

interface WaxSealProps {
  onOpen: () => void
  label?: string
}

export function WaxSeal({ onOpen, label = 'TAP TO OPEN' }: WaxSealProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative z-20 flex h-[108px] w-[108px] items-center justify-center focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
      aria-label={label}
    >
      {/* Outer ornate frame */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full drop-shadow-lg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8D48B" />
            <stop offset="40%" stopColor="#C4A35A" />
            <stop offset="70%" stopColor="#A88B3D" />
            <stop offset="100%" stopColor="#D4B86A" />
          </linearGradient>
          <radialGradient id="sealFill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDF8EC" />
            <stop offset="100%" stopColor="#F0E4C8" />
          </radialGradient>
        </defs>
        {/* Scalloped outer edge */}
        <path
          d="M60 6
            C68 6 72 12 78 10 C84 8 88 14 94 14
            C100 14 102 20 106 24 C110 28 114 32 114 38
            C114 44 118 48 116 54 C114 60 116 66 114 72
            C112 78 114 84 110 88 C106 92 102 98 96 100
            C90 102 86 108 80 108 C74 108 70 114 64 112
            C58 110 54 114 48 112 C42 110 38 108 32 106
            C26 104 20 100 16 94 C12 88 6 84 6 78
            C6 72 2 68 4 62 C6 56 2 50 4 44
            C6 38 4 32 8 28 C12 24 10 18 14 14
            C18 10 24 8 30 8 C36 8 42 4 48 6
            C54 8 56 6 60 6Z"
          fill="url(#goldGrad)"
        />
        <circle cx="60" cy="60" r="42" fill="url(#sealFill)" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Pearl accents */}
        <circle cx="60" cy="12" r="3" fill="#F5E6C8" stroke="#C4A35A" strokeWidth="0.8" />
        <circle cx="60" cy="108" r="3" fill="#F5E6C8" stroke="#C4A35A" strokeWidth="0.8" />
        <circle cx="12" cy="60" r="2.5" fill="#F5E6C8" stroke="#C4A35A" strokeWidth="0.8" />
        <circle cx="108" cy="60" r="2.5" fill="#F5E6C8" stroke="#C4A35A" strokeWidth="0.8" />
      </svg>

      <div className="relative z-10 flex flex-col items-center px-2 text-center">
        <svg width="28" height="10" viewBox="0 0 28 10" className="mb-1 text-gold-dark" aria-hidden>
          <path
            d="M2 8 Q7 2 14 5 Q21 8 26 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="14" cy="4" r="1.5" fill="currentColor" />
        </svg>
        <span className="font-serif text-[11px] font-semibold tracking-[0.12em] text-gold-dark">
          {label}
        </span>
        <svg width="28" height="10" viewBox="0 0 28 10" className="mt-1 rotate-180 text-gold-dark" aria-hidden>
          <path
            d="M2 8 Q7 2 14 5 Q21 8 26 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="14" cy="4" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </motion.button>
  )
}
