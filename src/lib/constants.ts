export const WEDDING = {
  couple: {
    partner1: "Pubudu",
    partner2: "Chaya",
  },
  families: {
    groom: "Perera",
    bride: "Rathnayaka",
  },
  date: new Date("2026-09-27T09:00:00"),
  displayDate: "September 27, 2026",
  displayTime: "9:00 AM",
  venue: {
    name: "Saminro Grand Palace",
    ceremony: "Poruwa Ceremony",
    reception: "Crystal Ballroom",
    address: "Saminro Grand Palace, No.287, Makola North, Makola, Sri Lanka",
    mapUrl: "https://maps.app.goo.gl/gbQRutryQHci2NpP9",
  },
  timeline: [
    { time: "9:00 AM", event: "Ceremony Begins", icon: "heart" as const },
    { time: "9:30 AM", event: "Poruwa Ceremony", icon: "heart" as const },
    { time: "12:30 PM", event: "Lunch", icon: "utensils" as const },
    { time: "4:00 PM", event: "Ceremony Ends", icon: "music" as const },
  ],
  dressCode: "Formal / Elegant",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
