export interface CouplePerson {
  name: string
  parents: string
}

export interface EventItem {
  id: string
  title: string
  datetime: string
  description?: string
  type: 'ceremony' | 'reception' | 'other'
}

export interface TimelineItem {
  id: string
  title: string
  datetime: string
  description: string
}

export interface VenueInfo {
  name: string
  address: string
  city: string
  lat: number
  lng: number
  mapEmbedUrl?: string
}

export interface ScratchRevealContent {
  title: string
  dateLabel: string
  dayLabel: string
  timeLabel: string
}

export interface RsvpConfig {
  enabled: boolean
  whatsappNumber: string
  email?: string
  deadline?: string
}

export interface InvitationContent {
  id: string
  slug: string
  published: boolean
  theme: 'garden-curtain' | 'classic'
  couple: {
    partner1: CouplePerson
    partner2: CouplePerson
    tagline: string
  }
  welcomeMessage: string
  eventDate: string
  events: EventItem[]
  timeline: TimelineItem[]
  venue: VenueInfo
  photos: string[]
  musicUrl: string
  musicAutoplay: boolean
  scratch: ScratchRevealContent
  countdownTitle: string
  rsvp: RsvpConfig
  shareMessage: string
  createdAt?: string
  updatedAt?: string
}
