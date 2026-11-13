import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ExternalLink, Pencil, Trash2, LogOut } from 'lucide-react'
import { deleteInvitation, listInvitations } from '@/lib/invitations'
import type { InvitationContent } from '@/types/invitation'

export function AdminDashboard() {
  const navigate = useNavigate()
  const [items, setItems] = useState<InvitationContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionStorage.getItem('admin-local')) {
      navigate('/admin')
      return
    }
    void listInvitations().then((list) => {
      setItems(list)
      setLoading(false)
    })
  }, [navigate])

  const logout = () => {
    sessionStorage.removeItem('admin-local')
    navigate('/admin')
  }

  const remove = async (id: string, slug: string) => {
    if (!confirm(`Delete invitation “${slug}”?`)) return
    await deleteInvitation(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="min-h-dvh bg-cream">
      <header className="flex items-center justify-between border-b border-charcoal/10 bg-white px-4 py-4">
        <div>
          <h1 className="font-serif text-xl text-charcoal">Your invitations</h1>
          <p className="font-sans text-[11px] text-taupe">
            Fill details → Save → open the link to see changes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/edit/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-olive px-4 py-2 font-sans text-xs font-medium text-white"
          >
            <Plus size={14} /> New
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-charcoal/10 p-2 text-taupe"
            aria-label="Log out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {loading ? (
          <p className="font-serif text-sm text-taupe">Loading…</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-serif text-base text-charcoal">
                    {item.couple.partner1.name || 'Untitled'} &{' '}
                    {item.couple.partner2.name || 'Couple'}
                  </p>
                  <p className="font-sans text-xs text-taupe">/i/{item.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    to={`/i/${item.slug}`}
                    className="rounded-lg p-2 text-taupe hover:bg-cream"
                    aria-label="Open invitation"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <Link
                    to={`/admin/edit/${item.slug}`}
                    className="rounded-lg p-2 text-taupe hover:bg-cream"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => void remove(item.id, item.slug)}
                    className="rounded-lg p-2 text-taupe hover:bg-cream"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 font-sans text-xs leading-relaxed text-taupe">
          Tip: click <strong>Edit</strong>, change names/dates/venue/photos, hit <strong>Save</strong>,
          then open the invitation link to see the live design update.
        </p>
      </div>
    </div>
  )
}
