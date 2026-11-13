import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, toggleLocale } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`inline-flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-white/90 px-3 py-1.5 text-xs font-sans font-medium text-charcoal shadow-md backdrop-blur-sm transition hover:bg-white ${className}`}
    >
      <Globe size={13} />
      {locale === 'en' ? 'Arabic' : 'English'}
    </button>
  )
}
