export type Locale = 'en' | 'ar'

export interface LocalizedString {
  en: string
  ar: string
}

export interface CouplePerson {
  name: LocalizedString
  parents: LocalizedString
  titles: LocalizedString
}

export interface EventItem {
  id: string
  title: LocalizedString
  datetime: string
  description?: LocalizedString
  type: 'ceremony' | 'reception' | 'other'
}

export interface TimelineItem {
  id: string
  title: LocalizedString
  datetime: string
  description: LocalizedString
}

export interface VenueInfo {
  name: LocalizedString
  address: LocalizedString
  city: LocalizedString
  lat: number
  lng: number
  mapEmbedUrl?: string
}

export interface ScratchRevealContent {
  title: LocalizedString
  dateLabel: LocalizedString
  dayLabel: LocalizedString
  timeLabel: LocalizedString
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
    tagline: LocalizedString
  }
  welcomeMessage: LocalizedString
  eventDate: string
  events: EventItem[]
  timeline: TimelineItem[]
  venue: VenueInfo
  photos: string[]
  musicUrl: string
  musicAutoplay: boolean
  scratch: ScratchRevealContent
  countdownTitle: LocalizedString
  rsvp: RsvpConfig
  shareMessage: LocalizedString
  createdAt?: string
  updatedAt?: string
}

export interface RsvpSubmission {
  id?: string
  invitation_id: string
  guest_name: string
  guest_count: number
  attending: boolean
  message?: string
  phone?: string
  created_at?: string
}
