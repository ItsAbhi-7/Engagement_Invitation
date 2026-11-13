import type { InvitationContent } from '@/types/invitation'

/** Sample invitation — edit this file or use the admin dashboard */
export const defaultInvitation: InvitationContent = {
  id: 'local-demo',
  slug: 'zayn-nora',
  published: true,
  theme: 'garden-curtain',
  couple: {
    partner1: {
      name: { en: 'Zayn', ar: 'زين' },
      parents: {
        en: 'Son of Mr. & Mrs. Malik',
        ar: 'ابن السيد والسيدة مالك',
      },
      titles: {
        en: 'B.E., M.S. / Data Scientist',
        ar: 'بكالوريوس هندسة، ماجستير / عالم بيانات',
      },
    },
    partner2: {
      name: { en: 'Nora', ar: 'نورا' },
      parents: {
        en: 'Daughter of Mr. & Mrs. Nasser',
        ar: 'ابنة السيد والسيدة ناصر',
      },
      titles: {
        en: 'MBBS, M.D / Pediatrician',
        ar: 'طب بشري / طبيبة أطفال',
      },
    },
    tagline: {
      en: "We're getting married",
      ar: 'سنتزوج قريباً',
    },
  },
  welcomeMessage: {
    en: 'We are honored to welcome you to the Wedding ceremony of Zayn & Nora. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 💚',
    ar: 'يشرفنا دعوتكم لحضور حفل زفاف زين ونورا. ومع بدئهما رحلتهما معاً في الإيمان والمحبة، نشكركم على مشاركتنا هذه المناسبة المباركة 💚',
  },
  eventDate: '2026-11-30T10:30:00',
  events: [
    {
      id: 'ceremony',
      title: { en: 'Wedding Ceremony', ar: 'حفل الزفاف' },
      datetime: '2026-11-30T10:30:00',
      description: {
        en: 'Join us as we exchange vows',
        ar: 'انضموا إلينا لتبادل العهود',
      },
      type: 'ceremony',
    },
    {
      id: 'reception',
      title: { en: 'Reception', ar: 'حفل الاستقبال' },
      datetime: '2026-12-02T19:30:00',
      description: {
        en: 'our presence means a lot...',
        ar: 'حضوركم يعني لنا الكثير...',
      },
      type: 'reception',
    },
  ],
  timeline: [
    {
      id: 'arrival',
      title: { en: 'Guest Arrival', ar: 'وصول الضيوف' },
      datetime: '2026-11-30T10:00:00',
      description: {
        en: 'We welcome you.. ❤️',
        ar: 'نرحب بكم.. ❤️',
      },
    },
    {
      id: 'ceremony-start',
      title: { en: 'Ceremony Begins', ar: 'بداية الحفل' },
      datetime: '2026-11-30T10:30:00',
      description: {
        en: 'Exchange of vows and blessings',
        ar: 'تبادل العهود والبركات',
      },
    },
    {
      id: 'lunch',
      title: { en: 'Lunch Reception', ar: 'وجبة الغداء' },
      datetime: '2026-11-30T13:00:00',
      description: {
        en: 'Celebrate with us over a meal',
        ar: 'احتفلوا معنا على مائدة الغداء',
      },
    },
  ],
  venue: {
    name: { en: 'Grand Palace Hall', ar: 'قاعة القصر الكبير' },
    address: { en: 'Grand Palace Banqueting Suite', ar: 'جناح الولائم بالقصر الكبير' },
    city: { en: 'City Centre, London', ar: 'وسط المدينة، لندن' },
    lat: 51.5074,
    lng: -0.1278,
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
    title: { en: 'Scratch to Reveal', ar: 'اخدش للكشف' },
    dateLabel: { en: 'November 30, 2026', ar: '٣٠ نوفمبر ٢٠٢٦' },
    dayLabel: { en: 'Monday', ar: 'الإثنين' },
    timeLabel: { en: '10:30 AM', ar: '١٠:٣٠ صباحاً' },
  },
  countdownTitle: {
    en: 'Counting Down to Forever',
    ar: 'العد التنازلي للأبد',
  },
  rsvp: {
    enabled: true,
    whatsappNumber: '447700900000',
    deadline: '2026-11-15',
  },
  shareMessage: {
    en: "You're invited to celebrate Zayn & Nora's wedding! Open the invitation:",
    ar: 'أنتم مدعوون للاحتفال بزفاف زين ونورا! افتحوا الدعوة:',
  },
}
