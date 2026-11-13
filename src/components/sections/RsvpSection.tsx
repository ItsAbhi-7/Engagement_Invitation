import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'
import { buildWhatsAppShareUrl } from '@/lib/share'
import type { InvitationContent } from '@/types/invitation'

export function RsvpSection({ invitation }: { invitation: InvitationContent }) {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(1)
  const [attending, setAttending] = useState(true)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  if (!invitation.rsvp.enabled) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const text = [
      `RSVP — ${invitation.couple.partner1.name} & ${invitation.couple.partner2.name}`,
      `Name: ${name}`,
      `Attendance: ${attending ? 'I will attend' : 'I cannot attend'}`,
      `Guests: ${guests}`,
      message ? `Message: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(buildWhatsAppShareUrl(invitation.rsvp.whatsappNumber, text, ''), '_blank')
    setStatus('done')
  }

  return (
    <section className="paper-texture px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-sm text-center"
      >
        <h2 className="font-script text-3xl text-charcoal">RSVP</h2>
        <p className="mt-2 font-serif text-sm text-taupe">
          Please let us know if you can join us
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3 text-left">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-charcoal/10 bg-white/70 px-4 py-3 font-sans text-sm outline-none focus:border-sage"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`flex-1 rounded-xl border py-2.5 font-sans text-sm transition ${
                attending
                  ? 'border-olive bg-olive text-white'
                  : 'border-charcoal/10 bg-white/70 text-charcoal'
              }`}
            >
              Attending
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`flex-1 rounded-xl border py-2.5 font-sans text-sm transition ${
                !attending
                  ? 'border-olive bg-olive text-white'
                  : 'border-charcoal/10 bg-white/70 text-charcoal'
              }`}
            >
              Decline
            </button>
          </div>
          <label className="block font-sans text-xs text-taupe">
            Number of guests
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-charcoal/10 bg-white/70 px-4 py-3 font-sans text-sm outline-none focus:border-sage"
            />
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message (optional)"
            rows={3}
            className="w-full resize-none rounded-xl border border-charcoal/10 bg-white/70 px-4 py-3 font-sans text-sm outline-none focus:border-sage"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-olive py-3 font-sans text-sm font-medium text-white shadow-md transition hover:bg-olive/90"
          >
            <Send size={15} />
            Send via WhatsApp
          </button>
          {status === 'done' && (
            <p className="text-center font-serif text-sm text-sage">Thank you for your RSVP!</p>
          )}
        </form>

        <a
          href={buildWhatsAppShareUrl(
            invitation.rsvp.whatsappNumber,
            invitation.shareMessage,
            typeof window !== 'undefined' ? window.location.href : '',
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-sans text-xs text-taupe underline-offset-2 hover:underline"
        >
          <MessageCircle size={14} />
          Share invitation on WhatsApp
        </a>
      </motion.div>
    </section>
  )
}
