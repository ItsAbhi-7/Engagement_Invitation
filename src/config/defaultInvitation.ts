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
      titles: 'B.E., M.S. / Data Scientist',
    },
    partner2: {
      name: 'Riya',
      parents: 'Daughter of Mr.P N Muraleedharan & Mrs. Kushala Muraleedharan',
      titles: 'MBBS, M.D / Pediatrician',
    },
    tagline: "We're getting engaged",
  },
  welcomeMessage:
    'We are honored to welcome you to the Engagement ceremony of Abhilash & Riya. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 💚',
  eventDate: '2026-12-20T10:30:00',
  events: [
    {
      id: 'ceremony',
      title: 'Engagement Ceremony',
      datetime: '2026-12-20T10:30:00',
      description: 'Join us as we exchange vows',
      type: 'ceremony',
    },
    {
      id: 'reception',
      title: 'Reception',
      datetime: '2026-12-02T19:30:00',
      description: 'our presence means a lot...',
      type: 'reception',
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
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC4xIlc!5e0!3m2!1sen!2suk!4v1',
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
  },
  countdownTitle: 'Counting Down to Forever',
  rsvp: {
    enabled: true,
    whatsappNumber: '447700900000',
    deadline: '2026-11-15',
  },
  shareMessage:
    "You're invited to celebrate Abhilash & Riya's engagement! Open the invitation:",
}
