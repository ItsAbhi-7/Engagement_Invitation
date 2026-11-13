import type { Locale, LocalizedString } from '@/types/invitation'

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] || value.en
}

export function formatEventDate(iso: string, locale: Locale): string {
  const date = new Date(iso)
  return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatFullDate(iso: string, locale: Locale): string {
  const date = new Date(iso)
  return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
