import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { formatEventDate } from '@/lib/text'
import type { InvitationContent } from '@/types/invitation'

export function ProgramTimeline({ invitation }: { invitation: InvitationContent }) {
  return (
    <section className="paper-texture px-6 py-10">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Clock size={16} className="text-taupe" />
        <h2 className="font-script text-2xl text-charcoal sm:text-3xl">Program Timeline</h2>
      </div>

      <div className="relative mx-auto max-w-sm">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-charcoal/15" />
        <ul className="space-y-4">
          {invitation.timeline.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative flex gap-4 pl-1"
            >
              <div className="relative z-10 mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-charcoal" />
              <div className="flex-1 rounded-xl border border-charcoal/10 bg-white/50 px-4 py-3 shadow-sm">
                <h3 className="font-sans text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-0.5 font-serif text-xs text-taupe/70">
                  {formatEventDate(item.datetime)}
                </p>
                <p className="mt-1.5 font-serif text-sm text-taupe">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
