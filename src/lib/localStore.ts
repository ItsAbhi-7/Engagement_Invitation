import { defaultInvitation } from '@/config/defaultInvitation'
import { asText } from '@/lib/text'
import type { InvitationContent } from '@/types/invitation'

const STORAGE_KEY = 'ic-invitations'

function readAll(): InvitationContent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => normalizeInvitation(item))
  } catch {
    return []
  }
}

function writeAll(items: InvitationContent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

/** Migrate legacy bilingual {en,ar} fields to plain English strings */
export function normalizeInvitation(raw: unknown): InvitationContent {
  const r = (raw || {}) as Record<string, unknown>
  const couple = (r.couple || {}) as Record<string, unknown>
  const p1 = (couple.partner1 || {}) as Record<string, unknown>
  const p2 = (couple.partner2 || {}) as Record<string, unknown>
  const venue = (r.venue || {}) as Record<string, unknown>
  const scratch = (r.scratch || {}) as Record<string, unknown>
  const rsvp = (r.rsvp || {}) as Record<string, unknown>
  const events = Array.isArray(r.events) ? r.events : defaultInvitation.events
  const timeline = Array.isArray(r.timeline) ? r.timeline : defaultInvitation.timeline

  return {
    id: String(r.id || `local-${r.slug || 'invite'}`),
    slug: String(r.slug || defaultInvitation.slug),
    published: r.published !== false,
    theme: (r.theme as InvitationContent['theme']) || 'garden-curtain',
    couple: {
      partner1: {
        name: asText(p1.name),
        parents: asText(p1.parents),
      },
      partner2: {
        name: asText(p2.name),
        parents: asText(p2.parents),
      },
      tagline: asText(couple.tagline, defaultInvitation.couple.tagline),
    },
    welcomeMessage: asText(r.welcomeMessage, defaultInvitation.welcomeMessage),
    eventDate: String(r.eventDate || defaultInvitation.eventDate),
    events: events.map((e: Record<string, unknown>) => ({
      id: String(e.id || 'event'),
      title: asText(e.title),
      datetime: String(e.datetime || ''),
      description: e.description ? asText(e.description) : undefined,
      type: (e.type as 'ceremony' | 'reception' | 'other') || 'other',
    })),
    timeline: timeline.map((e: Record<string, unknown>) => ({
      id: String(e.id || 'item'),
      title: asText(e.title),
      datetime: String(e.datetime || ''),
      description: asText(e.description),
    })),
    venue: {
      name: asText(venue.name, defaultInvitation.venue.name),
      address: asText(venue.address, defaultInvitation.venue.address),
      city: asText(venue.city, defaultInvitation.venue.city),
      lat: Number(venue.lat ?? defaultInvitation.venue.lat),
      lng: Number(venue.lng ?? defaultInvitation.venue.lng),
      mapEmbedUrl: venue.mapEmbedUrl ? String(venue.mapEmbedUrl) : defaultInvitation.venue.mapEmbedUrl,
    },
    photos: Array.isArray(r.photos) ? (r.photos as string[]) : defaultInvitation.photos,
    musicUrl: String(r.musicUrl || defaultInvitation.musicUrl),
    musicAutoplay: Boolean(r.musicAutoplay ?? true),
    scratch: {
      title: asText(scratch.title, defaultInvitation.scratch.title),
      dateLabel: asText(scratch.dateLabel, defaultInvitation.scratch.dateLabel),
      dayLabel: asText(scratch.dayLabel, defaultInvitation.scratch.dayLabel),
      timeLabel: asText(scratch.timeLabel, defaultInvitation.scratch.timeLabel),
      presenceNote: asText(
        scratch.presenceNote,
        defaultInvitation.scratch.presenceNote || 'Your presence means a lot...',
      ),
    },
    countdownTitle: asText(r.countdownTitle, defaultInvitation.countdownTitle),
    rsvp: {
      enabled: rsvp.enabled !== false,
      whatsappNumber: String(rsvp.whatsappNumber || ''),
      email: rsvp.email ? String(rsvp.email) : undefined,
      deadline: rsvp.deadline ? String(rsvp.deadline) : undefined,
    },
    shareMessage: asText(r.shareMessage, defaultInvitation.shareMessage),
    createdAt: r.createdAt ? String(r.createdAt) : undefined,
    updatedAt: r.updatedAt ? String(r.updatedAt) : undefined,
  }
}

export function listLocalInvitations(): InvitationContent[] {
  const stored = readAll()
  if (stored.length === 0) return [structuredClone(defaultInvitation)]

  const hasDefaultSlug = stored.some((i) => i.slug === defaultInvitation.slug)
  if (hasDefaultSlug) return stored
  return [structuredClone(defaultInvitation), ...stored]
}

export function getLocalInvitationBySlug(slug: string): InvitationContent | null {
  const key = slug || defaultInvitation.slug
  if (key === 'demo') return getLocalInvitationBySlug(defaultInvitation.slug)
  const stored = readAll().find((i) => i.slug === key)
  if (stored) return stored
  if (key === defaultInvitation.slug) return structuredClone(defaultInvitation)
  return null
}

export function upsertLocalInvitation(invitation: InvitationContent): InvitationContent {
  const all = readAll()
  const saved: InvitationContent = {
    ...normalizeInvitation(invitation),
    id: invitation.id && invitation.id !== 'new' ? invitation.id : `local-${invitation.slug}`,
    published: true,
    updatedAt: new Date().toISOString(),
    createdAt: invitation.createdAt || new Date().toISOString(),
  }

  const idx = all.findIndex((i) => i.slug === saved.slug || i.id === saved.id)
  if (idx >= 0) all[idx] = saved
  else all.unshift(saved)

  writeAll(all)
  return saved
}

export function deleteLocalInvitation(id: string): boolean {
  const all = readAll()
  const next = all.filter((i) => i.id !== id)
  writeAll(next)
  return next.length !== all.length
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
