/** Watercolor-style corner florals matching the welcome section */
export function FloralCorner({
  side = 'left',
  className = '',
}: {
  side?: 'left' | 'right'
  className?: string
}) {
  const flip = side === 'right' ? 'scale-x-[-1]' : ''

  return (
    <svg
      viewBox="0 0 160 140"
      className={`pointer-events-none w-28 sm:w-36 ${flip} ${className}`}
      aria-hidden
    >
      {/* Leaves */}
      <g fill="#6B7B5E" opacity="0.85">
        <ellipse cx="40" cy="55" rx="18" ry="8" transform="rotate(-40 40 55)" />
        <ellipse cx="55" cy="35" rx="16" ry="7" transform="rotate(-20 55 35)" />
        <ellipse cx="70" cy="50" rx="14" ry="6" transform="rotate(25 70 50)" />
        <ellipse cx="30" cy="80" rx="15" ry="6" transform="rotate(-55 30 80)" />
        <ellipse cx="85" cy="30" rx="12" ry="5" transform="rotate(10 85 30)" />
      </g>
      <g fill="#8A9A7A" opacity="0.7">
        <ellipse cx="48" cy="70" rx="12" ry="5" transform="rotate(-15 48 70)" />
        <ellipse cx="65" cy="22" rx="10" ry="4" transform="rotate(-35 65 22)" />
        <ellipse cx="22" cy="60" rx="11" ry="4.5" transform="rotate(50 22 60)" />
      </g>
      {/* Roses - dusty pink / peach */}
      <g>
        <circle cx="50" cy="45" r="14" fill="#E8C4B0" />
        <circle cx="50" cy="45" r="9" fill="#D4A090" opacity="0.8" />
        <circle cx="50" cy="45" r="4" fill="#C48878" />
        <circle cx="75" cy="38" r="11" fill="#F0D4C4" />
        <circle cx="75" cy="38" r="6" fill="#E8C4B0" />
        <circle cx="75" cy="38" r="2.5" fill="#D4A090" />
        <circle cx="35" cy="68" r="10" fill="#E8C4B0" />
        <circle cx="35" cy="68" r="5.5" fill="#D4A090" opacity="0.85" />
        <circle cx="90" cy="55" r="8" fill="#F5E0D4" />
        <circle cx="90" cy="55" r="4" fill="#E8C4B0" />
      </g>
      {/* Small filler sprigs */}
      <g stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M20 40 Q15 30 18 20" />
        <path d="M95 25 Q100 18 98 10" />
        <circle cx="18" cy="20" r="2" fill="#A08060" stroke="none" />
        <circle cx="98" cy="10" r="2" fill="#A08060" stroke="none" />
        <circle cx="25" cy="28" r="1.5" fill="#A08060" stroke="none" />
      </g>
    </svg>
  )
}
