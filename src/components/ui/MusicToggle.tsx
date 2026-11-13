import { Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '@/contexts/MusicContext'

export function MusicToggle({ className = '' }: { className?: string }) {
  const { isPlaying, toggle } = useMusic()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal/15 bg-cream/80 text-charcoal shadow-sm backdrop-blur-sm transition hover:bg-cream ${className}`}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
