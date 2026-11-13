/** Pull English text from plain strings or legacy { en, ar } objects in localStorage */
export function asText(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'en' in value) {
    return String((value as { en: unknown }).en ?? fallback)
  }
  return fallback
}

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
