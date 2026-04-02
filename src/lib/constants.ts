export const WEDDING = {
  couple: {
    partner1: "Alexander",
    partner2: "Victoria",
  },
  date: new Date("2026-09-12T15:00:00"),
  displayDate: "September 12, 2026",
  displayTime: "3:00 PM",
  venue: {
    name: "The Grand Pavilion",
    ceremony: "Rose Garden Chapel",
    reception: "Crystal Ballroom",
    address: "1234 Garden Estate Drive, Colombo, Sri Lanka",
    mapUrl: "https://maps.google.com",
  },
  timeline: [
    { time: "3:00 PM", event: "Ceremony Begins", icon: "heart" as const },
    { time: "4:00 PM", event: "Cocktail Hour", icon: "wine" as const },
    { time: "5:30 PM", event: "Reception & Dinner", icon: "utensils" as const },
    { time: "8:00 PM", event: "Dancing & Celebration", icon: "music" as const },
  ],
  dressCode: "Formal / Black Tie Optional",
} as const;
