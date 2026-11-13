import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

/** Simple gate so guests don’t edit by accident. Change this if you like. */
const ADMIN_PIN = 'admin'

export function AdminLogin() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.trim() !== ADMIN_PIN) {
      setError('Wrong PIN. Default is: admin')
      return
    }
    sessionStorage.setItem('admin-local', '1')
    navigate('/admin/dashboard')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-charcoal/10 bg-white p-6 shadow-lg"
      >
        <h1 className="font-serif text-2xl text-charcoal">Admin</h1>
        <p className="mt-1 font-sans text-xs text-taupe">
          Enter the PIN to edit invitation details. Changes show on the invite page right away.
        </p>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          autoFocus
          className="mt-5 w-full rounded-xl border border-charcoal/10 px-4 py-3 font-sans text-sm outline-none focus:border-sage"
        />

        {error && <p className="mt-3 font-sans text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-olive py-3 font-sans text-sm font-medium text-white"
        >
          Open editor
        </button>

        <Link to="/" className="mt-4 block text-center font-sans text-xs text-taupe underline">
          Back to home
        </Link>
      </form>
    </div>
  )
}
