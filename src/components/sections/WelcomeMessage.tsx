import { motion } from 'framer-motion'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { HeartDivider } from '@/components/ui/HeartDivider'
import { useLanguage } from '@/contexts/LanguageContext'
import type { InvitationContent } from '@/types/invitation'

export function WelcomeMessage({ invitation }: { invitation: InvitationContent }) {
  const { t, dir } = useLanguage()

  return (
    <section className="relative paper-texture px-6 py-16 text-center">
      <div className="absolute left-0 top-0">
        <FloralCorner side="left" />
      </div>
      <div className="absolute right-0 top-0">
        <FloralCorner side="right" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-sm pt-16"
      >
        <HeartDivider className="mb-8" />
        <p
          dir={dir}
          className="font-serif text-[17px] leading-[1.85] text-taupe sm:text-lg"
        >
          {t(invitation.welcomeMessage)}
        </p>
        <HeartDivider className="mt-8" />
      </motion.div>
    </section>
  )
}
