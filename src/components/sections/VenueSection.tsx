import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { formatEventDate } from '@/lib/text'
import type { InvitationContent } from '@/types/invitation'

export function VenueSection({ invitation }: { invitation: InvitationContent }) {
  const reception =
    invitation.events.find((e) => e.type === 'reception') || invitation.events[0]
  const { venue } = invitation

  return (
    <section className="paper-texture px-4 pb-12 pt-12 text-center">
      {reception?.description && (
        <p className="mb-6 font-serif text-sm italic text-taupe/70">{reception.description}</p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-serif text-2xl font-medium text-charcoal">
          {reception ? reception.title : 'Event'}
        </h2>
        {reception && (
          <p className="mt-1 font-serif text-sm text-taupe">
            {formatEventDate(reception.datetime)}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
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
