export function HeartDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-charcoal/30 sm:w-20" />
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" className="text-charcoal/70">
        <path d="M7 11.5C7 11.5 1 7.5 1 3.8C1 1.9 2.4 0.5 4.2 0.5C5.4 0.5 6.5 1.2 7 2.1C7.5 1.2 8.6 0.5 9.8 0.5C11.6 0.5 13 1.9 13 3.8C13 7.5 7 11.5 7 11.5Z" />
      </svg>
      <span className="h-px w-16 bg-charcoal/30 sm:w-20" />
    </div>
  )
}
