import { Link } from 'react-router-dom'
import { defaultInvitation } from '@/config/defaultInvitation'

export function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-sage to-sage-dark px-6 text-center">
      <div className="max-w-md">
        <p className="font-serif text-sm tracking-[0.2em] text-gold-light">ENGAGEMENT INVITATIONS</p>
        <h1 className="mt-3 font-script text-5xl text-cream">Open with love</h1>
        <p className="mt-4 font-serif text-cream/80">
          Fill your details in Admin — the invitation updates instantly.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to={`/i/${defaultInvitation.slug}`}
            className="rounded-full bg-cream px-8 py-3 font-sans text-sm font-medium text-sage shadow-lg transition hover:bg-white"
          >
            View invitation
          </Link>
          <Link
            to="/admin"
            className="rounded-full border border-cream/40 px-8 py-3 font-sans text-sm font-medium text-cream transition hover:bg-white/10"
          >
            Admin — edit details
          </Link>
        </div>
      </div>
    </div>
  )
}
