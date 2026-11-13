/** Cream theater curtains with tassels and floral base */
export function Curtains({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Left curtain */}
      <svg
        viewBox="0 0 160 700"
        className="absolute left-0 top-0 h-full w-[42%]"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="curtainL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8DCC8" />
            <stop offset="30%" stopColor="#F5EDE0" />
            <stop offset="55%" stopColor="#E0D4C0" />
            <stop offset="80%" stopColor="#F0E6D4" />
            <stop offset="100%" stopColor="#D8CCB8" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L130 0 Q145 80 135 160 Q120 280 140 400 Q150 520 125 620 Q110 680 100 700 L0 700 Z"
          fill="url(#curtainL)"
        />
        {/* Pleat lines */}
        <g stroke="#C8B8A0" strokeWidth="1.5" opacity="0.35" fill="none">
          <path d="M25 0 Q30 200 20 400 Q15 550 25 700" />
          <path d="M50 0 Q55 180 45 380 Q40 540 50 700" />
          <path d="M75 0 Q80 200 70 400 Q65 560 75 700" />
          <path d="M100 0 Q105 160 95 360 Q90 520 100 680" />
        </g>
        {/* Tie-back rope */}
        <path d="M100 280 Q130 300 140 340" stroke="#C4A35A" strokeWidth="3" fill="none" />
        <circle cx="140" cy="345" r="6" fill="#C4A35A" />
        <circle cx="140" cy="358" r="4" fill="#D4B86A" />
        <circle cx="140" cy="368" r="3" fill="#C4A35A" />
      </svg>

      {/* Right curtain */}
      <svg
        viewBox="0 0 160 700"
        className="absolute right-0 top-0 h-full w-[42%]"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="curtainR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#E8DCC8" />
            <stop offset="30%" stopColor="#F5EDE0" />
            <stop offset="55%" stopColor="#E0D4C0" />
            <stop offset="80%" stopColor="#F0E6D4" />
            <stop offset="100%" stopColor="#D8CCB8" />
          </linearGradient>
        </defs>
        <path
          d="M160 0 L30 0 Q15 80 25 160 Q40 280 20 400 Q10 520 35 620 Q50 680 60 700 L160 700 Z"
          fill="url(#curtainR)"
        />
        <g stroke="#C8B8A0" strokeWidth="1.5" opacity="0.35" fill="none">
          <path d="M135 0 Q130 200 140 400 Q145 550 135 700" />
          <path d="M110 0 Q105 180 115 380 Q120 540 110 700" />
          <path d="M85 0 Q80 200 90 400 Q95 560 85 700" />
          <path d="M60 0 Q55 160 65 360 Q70 520 60 680" />
        </g>
        <path d="M60 280 Q30 300 20 340" stroke="#C4A35A" strokeWidth="3" fill="none" />
        <circle cx="20" cy="345" r="6" fill="#C4A35A" />
        <circle cx="20" cy="358" r="4" fill="#D4B86A" />
        <circle cx="20" cy="368" r="3" fill="#C4A35A" />
      </svg>

      {/* Top swag / valance */}
      <svg
        viewBox="0 0 400 80"
        className="absolute left-0 top-0 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 0 L400 0 L400 25 Q350 55 300 30 Q250 55 200 28 Q150 55 100 30 Q50 55 0 25 Z"
          fill="#EDE4D4"
        />
        <path
          d="M0 20 Q50 50 100 25 Q150 50 200 24 Q250 50 300 25 Q350 50 400 20"
          fill="none"
          stroke="#C4A35A"
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* Pearl beads */}
        {[50, 100, 150, 200, 250, 300, 350].map((x) => (
          <circle key={x} cx={x} cy={x % 100 === 0 ? 38 : 32} r="3" fill="#F5E6C8" stroke="#C4A35A" strokeWidth="0.6" />
        ))}
      </svg>

      {/* Bottom floral clusters */}
      <div className="absolute bottom-4 left-1 w-28 sm:w-36">
        <FloralCluster />
      </div>
      <div className="absolute bottom-4 right-1 w-28 scale-x-[-1] sm:w-36">
        <FloralCluster />
      </div>
    </div>
  )
}

function FloralCluster() {
  return (
    <svg viewBox="0 0 120 100" className="w-full" aria-hidden>
      <g fill="#5A6A4E">
        <ellipse cx="30" cy="50" rx="16" ry="7" transform="rotate(-40 30 50)" />
        <ellipse cx="50" cy="35" rx="14" ry="6" transform="rotate(-15 50 35)" />
        <ellipse cx="55" cy="60" rx="18" ry="8" transform="rotate(20 55 60)" />
        <ellipse cx="20" cy="70" rx="12" ry="5" transform="rotate(-60 20 70)" />
      </g>
      <circle cx="45" cy="50" r="16" fill="#E8C4B0" />
      <circle cx="45" cy="50" r="9" fill="#D4A090" />
      <circle cx="45" cy="50" r="4" fill="#C48878" />
      <circle cx="70" cy="42" r="12" fill="#F0D4C4" />
      <circle cx="70" cy="42" r="6" fill="#E8C4B0" />
      <circle cx="28" cy="65" r="10" fill="#E8C4B0" />
      <circle cx="28" cy="65" r="5" fill="#D4A090" />
      <circle cx="80" cy="65" r="9" fill="#F5E0D4" />
      <circle cx="80" cy="65" r="4" fill="#E8C4B0" />
    </svg>
  )
}

export function CurtainValance({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 70"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E6D4" />
          <stop offset="100%" stopColor="#E0D4C0" />
        </linearGradient>
      </defs>
      <path
        d="M0 0 L400 0 L400 20
           Q360 55 320 28 Q280 55 240 26 Q200 55 160 26 Q120 55 80 28 Q40 55 0 20 Z"
        fill="url(#valGrad)"
      />
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={28 + (i % 2) * 8}
          r="2.5"
          fill="#F5E6C8"
          stroke="#C4A35A"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  )
}
