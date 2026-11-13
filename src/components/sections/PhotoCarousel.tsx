import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MusicToggle } from '@/components/ui/MusicToggle'

export function PhotoCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0)
  const slides = photos.length ? photos : ['']

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [slides.length])

  return (
    <div className="relative mx-4 overflow-hidden rounded-2xl shadow-lg">
      <div className="relative aspect-[4/3] bg-cream-dark">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index]}
            src={slides[index]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
        <MusicToggle className="absolute bottom-3 right-3 !h-8 !w-8 !rounded-full border-white/30 !bg-black/25 !text-white" />
      </div>
    </div>
  )
}
