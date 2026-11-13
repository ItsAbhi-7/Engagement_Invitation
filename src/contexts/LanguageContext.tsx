import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale, LocalizedString } from '@/types/invitation'
import { t as translate } from '@/lib/i18n'

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
  t: (value: LocalizedString) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  const t = useCallback((value: LocalizedString) => translate(value, locale), [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      dir: locale === 'ar' ? ('rtl' as const) : ('ltr' as const),
    }),
    [locale, toggleLocale, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
