import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface MusicContextValue {
  isPlaying: boolean
  toggle: () => void
  play: () => void
  pause: () => void
  setSrc: (url: string) => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function MusicProvider({
  children,
  src,
  autoplay = false,
}: {
  children: ReactNode
  src?: string
  autoplay?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src || '')

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioSrcCleanup(audio)
    }
  }, [])

  useEffect(() => {
    if (src) setCurrentSrc(src)
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSrc) return
    audio.src = currentSrc
  }, [currentSrc])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentSrc) return
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [currentSrc])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else void play()
  }, [isPlaying, play, pause])

  const setSrc = useCallback((url: string) => {
    setCurrentSrc(url)
  }, [])

  useEffect(() => {
    if (autoplay && currentSrc) {
      // Browsers block autoplay with sound; attempt on first interaction via UI
      void play()
    }
  }, [autoplay, currentSrc, play])

  const value = useMemo(
    () => ({ isPlaying, toggle, play, pause, setSrc }),
    [isPlaying, toggle, play, pause, setSrc],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

function audioSrcCleanup(audio: HTMLAudioElement) {
  audio.removeAttribute('src')
  audio.load()
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
