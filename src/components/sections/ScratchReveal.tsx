import { useCallback, useEffect, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import { HeartDivider } from '@/components/ui/HeartDivider'
import type { InvitationContent } from '@/types/invitation'

const HEART_PATH =
  'M100 155 C100 155 20 105 20 55 C20 30 40 15 65 15 C82 15 95 25 100 40 C105 25 118 15 135 15 C160 15 180 30 180 55 C180 105 100 155 100 155Z'

export function ScratchReveal({ invitation }: { invitation: InvitationContent }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const scratching = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const sx = rect.width / 200
    const sy = rect.height / 180
    ctx.save()
    ctx.beginPath()
    ctx.scale(sx, sy)
    ctx.clip(new Path2D(HEART_PATH))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    grad.addColorStop(0, '#E8D4C4')
    grad.addColorStop(0.5, '#D4B8A8')
    grad.addColorStop(1, '#E0C8B8')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, rect.width, rect.height)

    ctx.strokeStyle = 'rgba(180,140,120,0.25)'
    ctx.lineWidth = 1
    for (let i = 0; i < rect.width; i += 12) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + 40, rect.height)
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(100,70,50,0.4)'
    ctx.font = 'italic 14px "Cormorant Garamond", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Scratch here', rect.width / 2, rect.height / 2)
    ctx.restore()
  }, [])

  useEffect(() => {
    drawCover()
    const onResize = () => {
      if (!revealed) drawCover()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [drawCover, revealed])

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const dpr = window.devicePixelRatio || 1

    ctx.save()
    const sx = rect.width / 200
    const sy = rect.height / 180
    ctx.beginPath()
    ctx.scale(sx, sy)
    ctx.clip(new Path2D(HEART_PATH))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 38

    if (last.current) {
      ctx.beginPath()
      ctx.moveTo(last.current.x, last.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.arc(x, y, 19, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
    last.current = { x, y }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    const total = imageData.data.length / 4
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 64) cleared++
    }
    if (cleared / total > 0.35) {
      setRevealed(true)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    scratching.current = true
    last.current = null
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    scratchAt(e.clientX, e.clientY)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!scratching.current) return
    scratchAt(e.clientX, e.clientY)
  }

  const onPointerUp = () => {
    scratching.current = false
    last.current = null
  }

  const addToCalendar = () => {
    const start = new Date(invitation.eventDate)
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    const title = `${invitation.couple.partner1.name} & ${invitation.couple.partner2.name}`
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${title}`,
      `LOCATION:${invitation.venue.name}, ${invitation.venue.city}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invitation.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="paper-texture px-6 py-14 text-center">
      <h2 className="font-script text-3xl text-charcoal sm:text-4xl">
        {invitation.scratch.title}
      </h2>
      <HeartDivider className="my-5" />

      <div ref={containerRef} className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
        <svg viewBox="0 0 200 180" className="absolute inset-0 h-full w-full">
          <defs>
            <clipPath id="scratchHeartClip">
              <path d={HEART_PATH} />
            </clipPath>
          </defs>
          <path d={HEART_PATH} fill="#f9f5eb" stroke="#C4A090" strokeWidth="2.5" />
          <g clipPath="url(#scratchHeartClip)">
            <foreignObject x="0" y="0" width="200" height="180">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#3e372f',
                    margin: 0,
                  }}
                >
                  {invitation.scratch.dateLabel}
                </p>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12,
                    color: '#4a4238',
                    margin: '4px 0 0',
                  }}
                >
                  {invitation.scratch.dayLabel}
                </p>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12,
                    color: '#4a4238',
                    margin: 0,
                  }}
                >
                  {invitation.scratch.timeLabel}
                </p>
              </div>
            </foreignObject>
          </g>
        </svg>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 touch-none cursor-crosshair"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
        )}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={addToCalendar}
          className="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-2.5 font-sans text-sm font-medium text-white shadow-md transition hover:bg-olive/90"
        >
          <Calendar size={15} />
          Save the Date
        </button>
      </div>
    </section>
  )
}
