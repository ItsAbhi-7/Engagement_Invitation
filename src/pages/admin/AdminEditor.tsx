import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, Save, Upload } from 'lucide-react'
import { InvitationExperience } from '@/components/invitation/InvitationExperience'
import { defaultInvitation } from '@/config/defaultInvitation'
import {
  getInvitationBySlug,
  listInvitations,
  uploadImage,
  upsertInvitation,
} from '@/lib/invitations'
import type { InvitationContent } from '@/types/invitation'

function emptyInvitation(): InvitationContent {
  return {
    ...structuredClone(defaultInvitation),
    id: 'new',
    slug: `invite-${Date.now().toString(36)}`,
    published: true,
    couple: {
      ...structuredClone(defaultInvitation.couple),
      partner1: { name: '', parents: '' },
      partner2: { name: '', parents: '' },
    },
    photos: [],
  }
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const shared =
    'w-full rounded-xl border border-charcoal/10 px-3 py-2 font-sans text-sm outline-none focus:border-sage'
  return (
    <label className="block space-y-1 font-sans text-xs font-medium text-charcoal">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={shared}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </label>
  )
}

export function AdminEditor() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState<InvitationContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('admin-local')) {
      navigate('/admin')
      return
    }
    setMessage('')
    ;(async () => {
      if (!slug || slug === 'new') {
        setForm(emptyInvitation())
        return
      }
      const existing = await getInvitationBySlug(slug)
      if (existing) {
        setForm(structuredClone(existing))
        return
      }
      const all = await listInvitations()
      const draft = all.find((i) => i.slug === slug)
      setForm(draft ? structuredClone(draft) : emptyInvitation())
    })()
  }, [slug, navigate])

  if (!form) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-cream font-serif text-taupe">
        Loading editor…
      </div>
    )
  }

  const update = (patch: Partial<InvitationContent>) =>
    setForm((prev) => (prev ? { ...prev, ...patch } : prev))

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const res = await uploadImage(file)
    if (res.error) setMessage(res.error)
    else if (res.url) {
      update({ photos: [...form.photos, res.url] })
      setMessage('Photo added. Click Save to apply.')
    }
  }

  const save = async () => {
    setSaving(true)
    setMessage('')
    const res = await upsertInvitation({ ...form, published: true })
    setSaving(false)
    if (!res.ok) {
      setMessage(res.error || 'Save failed')
      return
    }
    const saved = res.invitation || form
    setForm(saved)
    setMessage(`Saved! Open /i/${saved.slug} to see your changes.`)
    if (slug === 'new') navigate(`/admin/edit/${saved.slug}`, { replace: true })
  }

  if (preview) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className="fixed left-3 top-3 z-[60] rounded-full bg-olive px-4 py-2 font-sans text-xs text-white shadow-lg"
        >
          Back to editor
        </button>
        <InvitationExperience invitation={form} />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal/10 bg-white/95 px-4 py-3 backdrop-blur">
        <Link to="/admin/dashboard" className="flex items-center gap-1 font-sans text-xs text-taupe">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="inline-flex items-center gap-1 rounded-full border border-charcoal/10 px-3 py-1.5 font-sans text-xs"
          >
            <Eye size={13} /> Preview
          </button>
          <Link
            to={`/i/${form.slug}`}
            className="inline-flex items-center gap-1 rounded-full border border-charcoal/10 px-3 py-1.5 font-sans text-xs"
          >
            Open invite
          </Link>
          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="inline-flex items-center gap-1 rounded-full bg-olive px-3 py-1.5 font-sans text-xs text-white"
          >
            <Save size={13} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-xl space-y-6 px-4 py-6">
        {message && (
          <p className="rounded-xl bg-white px-3 py-2 font-sans text-xs text-taupe shadow-sm">
            {message}
          </p>
        )}

        <section className="space-y-3 rounded-2xl border border-charcoal/10 bg-white p-4">
          <h2 className="font-serif text-lg">Basics</h2>
          <label className="block font-sans text-xs font-medium text-charcoal">
            URL slug
            <input
              value={form.slug}
              onChange={(e) =>
                update({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })
              }
              className="mt-1 w-full rounded-xl border border-charcoal/10 px-3 py-2 text-sm outline-none focus:border-sage"
            />
          </label>
          <p className="font-sans text-[11px] text-taupe">
            Shareable URL: <code>/i/{form.slug}</code>
          </p>
          <label className="block font-sans text-xs font-medium text-charcoal">
            Event date & time
            <input
              type="datetime-local"
              value={toLocalInput(form.eventDate)}
              onChange={(e) => update({ eventDate: new Date(e.target.value).toISOString() })}
              className="mt-1 w-full rounded-xl border border-charcoal/10 px-3 py-2 text-sm outline-none focus:border-sage"
            />
          </label>
          <Field
            label="Music URL"
            value={form.musicUrl}
            onChange={(musicUrl) => update({ musicUrl })}
          />
        </section>

        <section className="space-y-3 rounded-2xl border border-charcoal/10 bg-white p-4">
          <h2 className="font-serif text-lg">Couple</h2>
          <Field
            label="Tagline"
            value={form.couple.tagline}
            onChange={(tagline) => update({ couple: { ...form.couple, tagline } })}
          />
          <Field
            label="Partner 1 name"
            value={form.couple.partner1.name}
            onChange={(name) =>
              update({ couple: { ...form.couple, partner1: { ...form.couple.partner1, name } } })
            }
          />
          <Field
            label="Partner 1 parents"
            value={form.couple.partner1.parents}
            onChange={(parents) =>
              update({
                couple: { ...form.couple, partner1: { ...form.couple.partner1, parents } },
              })
            }
          />
          <Field
            label="Partner 2 name"
            value={form.couple.partner2.name}
            onChange={(name) =>
              update({ couple: { ...form.couple, partner2: { ...form.couple.partner2, name } } })
            }
          />
          <Field
            label="Partner 2 parents"
            value={form.couple.partner2.parents}
            onChange={(parents) =>
              update({
                couple: { ...form.couple, partner2: { ...form.couple.partner2, parents } },
              })
            }
          />
        </section>

        <section className="space-y-3 rounded-2xl border border-charcoal/10 bg-white p-4">
          <h2 className="font-serif text-lg">Messages & venue</h2>
          <Field
            label="Welcome message"
            value={form.welcomeMessage}
            onChange={(welcomeMessage) => update({ welcomeMessage })}
            multiline
          />
          <Field
            label="Countdown title"
            value={form.countdownTitle}
            onChange={(countdownTitle) => update({ countdownTitle })}
          />
          <Field
            label="Venue name"
            value={form.venue.name}
            onChange={(name) => update({ venue: { ...form.venue, name } })}
          />
          <Field
            label="Venue city"
            value={form.venue.city}
            onChange={(city) => update({ venue: { ...form.venue, city } })}
          />
          <Field
            label="Venue address"
            value={form.venue.address}
            onChange={(address) => update({ venue: { ...form.venue, address } })}
          />
        </section>

        <section className="space-y-3 rounded-2xl border border-charcoal/10 bg-white p-4">
          <h2 className="font-serif text-lg">Scratch reveal</h2>
          <Field
            label="Title"
            value={form.scratch.title}
            onChange={(title) => update({ scratch: { ...form.scratch, title } })}
          />
          <Field
            label="Date label"
            value={form.scratch.dateLabel}
            onChange={(dateLabel) => update({ scratch: { ...form.scratch, dateLabel } })}
          />
          <Field
            label="Day label"
            value={form.scratch.dayLabel}
            onChange={(dayLabel) => update({ scratch: { ...form.scratch, dayLabel } })}
          />
          <Field
            label="Time label"
            value={form.scratch.timeLabel}
            onChange={(timeLabel) => update({ scratch: { ...form.scratch, timeLabel } })}
          />
          <Field
            label="Note under heart"
            value={form.scratch.presenceNote || ''}
            onChange={(presenceNote) => update({ scratch: { ...form.scratch, presenceNote } })}
          />
        </section>

        <section className="space-y-3 rounded-2xl border border-charcoal/10 bg-white p-4">
          <h2 className="font-serif text-lg">Photos</h2>
          <div className="flex flex-wrap gap-2">
            {form.photos.map((url) => (
              <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => update({ photos: form.photos.filter((p) => p !== url) })}
                  className="absolute right-1 top-1 rounded bg-black/50 px-1 text-[10px] text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-charcoal/10 px-4 py-2 font-sans text-xs">
            <Upload size={14} /> Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => void onUpload(e)} />
          </label>
        </section>

      </div>
    </div>
  )
}

function toLocalInput(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
