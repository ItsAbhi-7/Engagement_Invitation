import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calc(target: Date): CountdownParts {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, expired: false }
}

export function useCountdown(isoDate: string): CountdownParts {
  const [parts, setParts] = useState(() => calc(new Date(isoDate)))

  useEffect(() => {
    const target = new Date(isoDate)
    setParts(calc(target))
    const id = window.setInterval(() => setParts(calc(target)), 1000)
    return () => window.clearInterval(id)
  }, [isoDate])

  return parts
}
