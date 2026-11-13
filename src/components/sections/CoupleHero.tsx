import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { CurtainValance } from '@/components/decor/Curtains'
import { GardenScene } from '@/components/decor/GardenScene'
import { HeartDivider } from '@/components/ui/HeartDivider'
import { useLanguage } from '@/contexts/LanguageContext'
import type { InvitationContent } from '@/types/invitation'

export function CoupleHero({ invitation }: { invitation: InvitationContent }) {
  const { t } = useLanguage()
  const { partner1, partner2, tagline } = invitation.couple

  return (
    <section className="relative flex min-h-[100dvh] flex-col paper-texture overflow-hidden">
      <CurtainValance className="relative z-10 shrink-0" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-4 pt-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Heart size={14} className="mb-2 fill-charcoal text-charcoal" />
          <p className="font-serif text-sm tracking-wide text-taupe sm:text-base">
            {t(tagline)}
          </p>
          <HeartDivider className="my-4" />

          <h1 className="font-script text-5xl text-charcoal sm:text-6xl">{t(partner1.name)}</h1>
          <p className="mt-2 font-serif text-xs italic text-taupe/80 sm:text-sm">
            {t(partner1.parents)}
          </p>
          <p className="mt-0.5 font-serif text-[11px] text-taupe/70 sm:text-xs">
            {t(partner1.titles)}
          </p>

          <span className="my-3 font-script text-3xl text-charcoal/60">&</span>

          <h1 className="font-script text-5xl text-charcoal sm:text-6xl">{t(partner2.name)}</h1>
          <p className="mt-2 font-serif text-xs italic text-taupe/80 sm:text-sm">
            {t(partner2.parents)}
          </p>
          <p className="mt-0.5 font-serif text-[11px] text-taupe/70 sm:text-xs">
            {t(partner2.titles)}
          </p>
        </motion.div>
      </div>

      <div className="relative z-0 mt-auto w-full">
        <GardenScene />
      </div>
    </section>
  )
}
