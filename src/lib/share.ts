export function buildWhatsAppShareUrl(phone: string, message: string, url: string): string {
  const text = encodeURIComponent(`${message}\n${url}`)
  const clean = phone.replace(/[^\d]/g, '')
  if (clean) {
    return `https://wa.me/${clean}?text=${text}`
  }
  return `https://wa.me/?text=${text}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
