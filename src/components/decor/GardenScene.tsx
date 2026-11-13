/** Classical garden with fountain — bottom illustration for couple hero */
export function GardenScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className={`w-full ${className}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      {/* Ground */}
      <ellipse cx="200" cy="200" rx="190" ry="28" fill="#C8D4B8" opacity="0.5" />
      <ellipse cx="200" cy="205" rx="160" ry="18" fill="#B8C8A8" opacity="0.4" />

      {/* Left cypress trees */}
      <g fill="#5A6A4E">
        <ellipse cx="55" cy="130" rx="18" ry="55" />
        <ellipse cx="55" cy="95" rx="14" ry="35" />
        <ellipse cx="55" cy="70" rx="10" ry="22" />
        <rect x="52" y="175" width="6" height="20" fill="#6B5B45" />
      </g>
      <g fill="#6B7B5E">
        <ellipse cx="90" cy="145" rx="14" ry="40" />
        <ellipse cx="90" cy="120" rx="10" ry="25" />
        <rect x="87" y="175" width="5" height="18" fill="#6B5B45" />
      </g>

      {/* Right cypress trees */}
      <g fill="#5A6A4E">
        <ellipse cx="345" cy="130" rx="18" ry="55" />
        <ellipse cx="345" cy="95" rx="14" ry="35" />
        <ellipse cx="345" cy="70" rx="10" ry="22" />
        <rect x="342" y="175" width="6" height="20" fill="#6B5B45" />
      </g>
      <g fill="#6B7B5E">
        <ellipse cx="310" cy="145" rx="14" ry="40" />
        <ellipse cx="310" cy="120" rx="10" ry="25" />
        <rect x="307" y="175" width="5" height="18" fill="#6B5B45" />
      </g>

      {/* Stone pedestals */}
      <g fill="#C8B8A0">
        <rect x="110" y="155" width="28" height="35" rx="2" />
        <rect x="105" y="150" width="38" height="8" rx="2" />
        <rect x="262" y="155" width="28" height="35" rx="2" />
        <rect x="257" y="150" width="38" height="8" rx="2" />
      </g>

      {/* Pedestal florals */}
      <g>
        <circle cx="124" cy="140" r="12" fill="#E8C4B0" />
        <circle cx="124" cy="140" r="6" fill="#D4A090" />
        <circle cx="112" cy="148" r="8" fill="#F0D4C4" />
        <circle cx="136" cy="146" r="7" fill="#E8C4B0" />
        <ellipse cx="120" cy="130" rx="8" ry="4" fill="#6B7B5E" transform="rotate(-20 120 130)" />
      </g>
      <g>
        <circle cx="276" cy="140" r="12" fill="#E8C4B0" />
        <circle cx="276" cy="140" r="6" fill="#D4A090" />
        <circle cx="264" cy="148" r="8" fill="#F0D4C4" />
        <circle cx="288" cy="146" r="7" fill="#E8C4B0" />
        <ellipse cx="280" cy="130" rx="8" ry="4" fill="#6B7B5E" transform="rotate(20 280 130)" />
      </g>

      {/* Fountain */}
      <ellipse cx="200" cy="185" rx="48" ry="12" fill="#A89880" />
      <ellipse cx="200" cy="182" rx="42" ry="9" fill="#7BA8A8" />
      <ellipse cx="200" cy="180" rx="38" ry="7" fill="#8BB8B8" opacity="0.7" />
      {/* Fountain tiers */}
      <rect x="192" y="145" width="16" height="35" rx="2" fill="#B8A890" />
      <ellipse cx="200" cy="148" rx="22" ry="6" fill="#C8B8A0" />
      <ellipse cx="200" cy="146" rx="18" ry="4" fill="#7BA8A8" />
      <rect x="196" y="128" width="8" height="18" rx="1" fill="#B8A890" />
      <ellipse cx="200" cy="128" rx="12" ry="4" fill="#C8B8A0" />
      <ellipse cx="200" cy="126" rx="9" ry="3" fill="#8BB8B8" />
      {/* Water spout */}
      <circle cx="200" cy="120" r="3" fill="#A8D0D0" />
      <path d="M200 120 Q195 130 200 140 Q205 130 200 120" fill="#A8D0D0" opacity="0.5" />

      {/* Corner rose bushes */}
      <g>
        <circle cx="30" cy="180" r="16" fill="#E8C4B0" />
        <circle cx="30" cy="180" r="8" fill="#D4A090" />
        <circle cx="50" cy="190" r="12" fill="#F0D4C4" />
        <circle cx="18" cy="195" r="10" fill="#E8C4B0" />
        <ellipse cx="40" cy="170" rx="10" ry="5" fill="#5A6A4E" />
      </g>
      <g>
        <circle cx="370" cy="180" r="16" fill="#E8C4B0" />
        <circle cx="370" cy="180" r="8" fill="#D4A090" />
        <circle cx="350" cy="190" r="12" fill="#F0D4C4" />
        <circle cx="382" cy="195" r="10" fill="#E8C4B0" />
        <ellipse cx="360" cy="170" rx="10" ry="5" fill="#5A6A4E" />
      </g>
    </svg>
  )
}
