import {
  deleteLocalInvitation,
  fileToDataUrl,
  getLocalInvitationBySlug,
  listLocalInvitations,
  upsertLocalInvitation,
} from '@/lib/localStore'
import type { InvitationContent } from '@/types/invitation'

export async function getInvitationBySlug(slug: string): Promise<InvitationContent | null> {
  return getLocalInvitationBySlug(slug)
}

export async function listInvitations(): Promise<InvitationContent[]> {
  return listLocalInvitations()
}

export async function upsertInvitation(
  invitation: InvitationContent,
): Promise<{ ok: boolean; invitation?: InvitationContent; error?: string }> {
  try {
    const saved = upsertLocalInvitation({
      ...invitation,
      published: true,
    })
    return { ok: true, invitation: saved }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function deleteInvitation(id: string): Promise<{ ok: boolean; error?: string }> {
  if (id === 'local-demo') {
    // Allow replacing demo by deleting its local override only
    deleteLocalInvitation(id)
    return { ok: true }
  }
  deleteLocalInvitation(id)
  return { ok: true }
}

export async function uploadImage(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const url = await fileToDataUrl(file)
    return { url }
  } catch {
    return { error: 'Could not read that image.' }
  }
}
