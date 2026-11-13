import { motion } from 'framer-motion'
import { HeartDivider } from '@/components/ui/HeartDivider'
import { useCountdown } from '@/hooks/useCountdown'
import { useLanguage } from '@/contexts/LanguageContext'
import type { InvitationContent } from '@/types/invitation'

export function Countdown({ invitation }: { invitation: InvitationContent }) {
  const { t, locale } = useLanguage()
  const parts = useCountdown(invitation.eventDate)

  const labels =
    locale === 'ar'
      ? ['أيام', 'ساعات', 'دقائق', 'ثوان']
      : ['DAYS', 'HOURS', 'MINUTES', 'SECONDS']

  const values = [parts.days, parts.hours, parts.minutes, parts.seconds]

  return (
    <section className="paper-texture px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-script text-3xl text-charcoal sm:text-4xl">
          {t(invitation.countdownTitle)}
        </h2>
        <HeartDivider className="my-5" />

        <div className="mx-auto flex max-w-sm justify-center gap-2 sm:gap-3">
          {values.map((val, i) => (
            <div key={labels[i]} className="flex flex-1 flex-col items-center">
              <div className="flex h-16 w-full items-center justify-center rounded-xl bg-cream-dark/80 shadow-inner sm:h-20">
                <span className="font-serif text-2xl font-semibold tabular-nums text-charcoal sm:text-3xl">
                  {String(val).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 font-sans text-[9px] font-medium tracking-[0.15em] text-taupe/70">
                {labels[i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
