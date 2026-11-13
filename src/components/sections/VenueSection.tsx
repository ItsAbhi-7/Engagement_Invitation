import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { InvitationContent } from '@/types/invitation'

export function VenueSection({ invitation }: { invitation: InvitationContent }) {
  const { venue } = invitation

  return (
    <section className="paper-texture px-4 pb-12 pt-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <MapPin className="mx-auto mb-2 text-taupe" size={22} strokeWidth={1.5} />
        <h3 className="font-script text-4xl text-charcoal sm:text-5xl">Venue</h3>
        <p className="mt-3 font-serif text-lg font-semibold text-charcoal">{venue.name}</p>
        <p className="mt-1 font-serif text-sm text-taupe">{venue.city}</p>
        <p className="font-serif text-xs text-taupe/60">{venue.address}</p>
      </motion.div>
    </section>
  )
}
