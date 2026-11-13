import { defaultInvitation } from '@/config/defaultInvitation'
import type { InvitationContent } from '@/types/invitation'

const STORAGE_KEY = 'ic-invitations'

function readAll(): InvitationContent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as InvitationContent[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(items: InvitationContent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
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
  if (key === 'demo') {
    return getLocalInvitationBySlug(defaultInvitation.slug)
  }
  const stored = readAll().find((i) => i.slug === key)
  if (stored) return stored
  if (key === defaultInvitation.slug) return structuredClone(defaultInvitation)
  return null
}

export function upsertLocalInvitation(invitation: InvitationContent): InvitationContent {
  const all = readAll()
  const saved: InvitationContent = {
    ...invitation,
    id:
      invitation.id && invitation.id !== 'new'
        ? invitation.id
        : `local-${invitation.slug}`,
    published: true,
    updatedAt: new Date().toISOString(),
    createdAt: invitation.createdAt || new Date().toISOString(),
  }

  const idx = all.findIndex((i) => i.slug === saved.slug || i.id === saved.id)
  if (idx >= 0) all[idx] = saved
  else all.unshift(saved)

  // Keep default demo overwritten when user edits it
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
