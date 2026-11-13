import type { InvitationContent } from '@/types/invitation'

/** Sample invitation — edit this file or use the admin dashboard */
export const defaultInvitation: InvitationContent = {
  id: 'local-demo',
  slug: 'abhi-riya',
  published: true,
  theme: 'garden-curtain',
  couple: {
    partner1: {
      name: 'Abhilash',
      parents: 'Son of Mr.Hari Kumar Nair & Mrs.Jaishree Nair',
    },
    partner2: {
      name: 'Riya',
      parents: 'Daughter of Mr.P N Muraleedharan & Mrs. Kushala Muraleedharan',
    },
    tagline: "We're getting engaged",
  },
  welcomeMessage:
    'With hearts full of joy and gratitude, we warmly invite you to celebrate the engagement ceremony of **Abhilash & Riya**. As they take the first beautiful step towards a lifetime of love, togetherness, and cherished memories, your presence and blessings will make this special occasion even more meaningful. 💚',
  eventDate: '2026-12-20T10:30:00',
  events: [
    {
      id: 'ceremony',
      title: 'Engagement Ceremony',
      datetime: '2026-12-20T10:30:00',
      description: 'Join us as we exchange vows',
      type: 'ceremony',
    },
  ],
  timeline: [
    {
      id: 'arrival',
      title: 'Guest Arrival',
      datetime: '2026-12-20T10:00:00',
      description: 'We welcome you.. ❤️',
    },
    {
      id: 'ceremony-start',
      title: 'Ceremony Begins',
      datetime: '2026-12-20T10:30:00',
      description: 'Exchange of vows and blessings',
    },
    {
      id: 'lunch',
      title: 'Lunch Reception',
      datetime: '2026-12-20T12:30:00',
      description: 'Celebrate with us over a meal',
    },
  ],
  venue: {
    name: 'Kerala Bhavan',
    address: 'MCI Colony, Katanga, Jabalpur',
    city: 'Jabalpur, MP',
    lat: 23.148060509315115,
    lng: 79.93423250236579,
  },
  photos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    'https://images.unsplash.com/photo-1522673607200-164a1a3c4d54?w=800&q=80',
  ],
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  musicAutoplay: true,
  scratch: {
    title: 'Scratch to Reveal',
    dateLabel: 'December 20, 2026',
    dayLabel: 'Sunday',
    timeLabel: '10:30 AM',
    presenceNote: 'Your presence means a lot...',
  },
  countdownTitle: 'Counting Down to Forever',
  rsvp: {
    enabled: false,
    whatsappNumber: '',
  },
  shareMessage: "You're invited to celebrate Abhilash & Riya's engagement!",
}
