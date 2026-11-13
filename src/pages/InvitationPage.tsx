import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { InvitationExperience } from '@/components/invitation/InvitationExperience'
import { getInvitationBySlug } from '@/lib/invitations'
import type { InvitationContent } from '@/types/invitation'

export function InvitationPage() {
  const { slug } = useParams<{ slug: string }>()
  const [invitation, setInvitation] = useState<InvitationContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getInvitationBySlug(slug || 'demo')
        if (cancelled) return
        if (!data) setError('Invitation not found')
        else setInvitation(data)
      } catch {
        if (!cancelled) setError('Failed to load invitation')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-sage">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-pulse rounded-full border-2 border-gold" />
          <p className="font-serif text-sm text-cream">Opening invitation…</p>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <p className="font-serif text-lg text-charcoal">{error || 'Not found'}</p>
        <Link to="/" className="font-sans text-sm text-olive underline">
          Go home
        </Link>
      </div>
    )
  }

  return <InvitationExperience invitation={invitation} />
}
