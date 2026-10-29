export type ExpeditionCategory = "day" | "overnight" | "family";

export interface ItineraryStop {
  /** Estimated time, e.g. "08:00" */
  time: string;
  activity: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  stops: ItineraryStop[];
}

export interface Expedition {
  slug: string;
  name: string;
  badge?: "Most Popular" | "Best Value";
  categories: ExpeditionCategory[];
  image: string;
  imageAlt: string;
  duration: string;
  difficulty: string;
  maxGroup: number;
  /** Price per person in EUR */
  priceEur: number;
  highlights: [string, string, string];
  summary: string;
  permitInfo: string;
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
}

const PERMIT =
  "Gunung Leuser National Park (TNGL) entry permit and conservation fee are included and arranged by us.";

const baseIncluded = [
  "Certified HPI (Himpunan Pramuwisata Indonesia) local guide",
  "Gunung Leuser National Park permit & conservation tax",
  "Freshly cooked meals (Vegan/Vegetarian on request)",
  "Safety & trekking equipment",
  "Drinking water & fresh fruit",
];

const baseNotIncluded = [
  "International & domestic flights",
  "Travel insurance",
  "Hotel before/after the trek",
  "Tips for guides & crew (optional)",
  "Personal items & alcoholic drinks",
];

export const expeditions: Expedition[] = [
  {
    slug: "1-day-jungle-explorer",
    name: "1-Day Jungle Explorer",
    categories: ["day"],
    image: "/exp-day-trek.png",
    imageAlt: "Guide leading trekkers through Bukit Lawang rainforest",
    duration: "1 Day / 6-7 Hours",
    difficulty: "Easy-Moderate",
    maxGroup: 6,
    priceEur: 55,
    highlights: [
      "Ethical orangutan observation",
      "Jungle lunch cooked on the trail",
      "Back in Bukit Lawang by afternoon",
    ],
    summary:
      "A half-day immersion into Gunung Leuser to meet semi-wild orangutans respectfully.",
    permitInfo: PERMIT,
    itinerary: [
      {
        day: 1,
        title: "Into the Rainforest",
        stops: [
          { time: "08:00", activity: "Meet your guide, safety briefing & park permit check" },
          { time: "08:30", activity: "Cross the Bahorok River and enter the national park" },
          { time: "09:30", activity: "Ethical orangutan observation (minimum 10 m distance)" },
          { time: "12:00", activity: "Freshly cooked jungle lunch" },
          { time: "13:30", activity: "Forest walk with flora & fauna interpretation" },
          { time: "15:00", activity: "Return to Bukit Lawang village" },
        ],
      },
    ],
    included: baseIncluded.slice(0, 4).concat("Jungle lunch & drinking water"),
    notIncluded: baseNotIncluded,
  },
  {
    slug: "2d1n-overnight-jungle-camp-tubing",
    name: "2D1N Overnight Jungle Camp & Tubing",
    badge: "Most Popular",
    categories: ["overnight"],
    image: "/exp-overnight-camp.png",
    imageAlt: "Riverside jungle camp at dusk in Sumatra",
    duration: "2 Days 1 Night",
    difficulty: "Moderate",
    maxGroup: 6,
    priceEur: 95,
    highlights: [
      "Riverside jungle camp & night forest sounds",
      "Traditional 'Jungle Taxi' tube-rafting back to the village",
      "Orangutan & wildlife encounters",
    ],
    summary:
      "Sleep inside the rainforest, then float home down the river on a rubber tube.",
    permitInfo: PERMIT,
    itinerary: [
      {
        day: 1,
        title: "Trek & Camp",
        stops: [
          { time: "08:00", activity: "Briefing and start of the trek" },
          { time: "10:00", activity: "Orangutan observation along the trail" },
          { time: "12:30", activity: "Jungle lunch" },
          { time: "15:00", activity: "Arrive at the riverside camp, swim & relax" },
          { time: "18:30", activity: "Campfire dinner and night forest sounds" },
        ],
      },
      {
        day: 2,
        title: "Jungle Taxi Home",
        stops: [
          { time: "07:00", activity: "Sunrise breakfast and bird watching" },
          { time: "09:30", activity: "Short forest walk" },
          { time: "11:30", activity: "Lunch at camp" },
          { time: "13:00", activity: "Tube-rafting 'Jungle Taxi' down the Bahorok River" },
          { time: "15:00", activity: "Arrive back in Bukit Lawang" },
        ],
      },
    ],
    included: baseIncluded.concat("Tent, sleeping mat & rubber tube"),
    notIncluded: baseNotIncluded,
  },
  {
    slug: "3d2n-deep-leuser-expedition",
    name: "3D2N Deep Leuser Expedition",
    badge: "Best Value",
    categories: ["overnight"],
    image: "/exp-deep-leuser.png",
    imageAlt: "Travelers tubing down a jungle river near a waterfall",
    duration: "3 Days 2 Nights",
    difficulty: "Moderate-Challenging",
    maxGroup: 6,
    priceEur: 140,
    highlights: [
      "Deeper primary rainforest & higher wildlife diversity",
      "Waterfall swim",
      "River tubing back to the village",
    ],
    summary:
      "Venture deeper into primary forest for the richest wildlife viewing around Bukit Lawang.",
    permitInfo: PERMIT,
    itinerary: [
      {
        day: 1,
        title: "Entering Primary Forest",
        stops: [
          { time: "08:00", activity: "Briefing and trek start" },
          { time: "11:00", activity: "Orangutan and primate observation" },
          { time: "12:30", activity: "Jungle lunch" },
          { time: "16:00", activity: "Arrive at first jungle camp" },
          { time: "19:00", activity: "Dinner & night walk (optional)" },
        ],
      },
      {
        day: 2,
        title: "Deep Leuser & Waterfall",
        stops: [
          { time: "07:30", activity: "Breakfast and move deeper into the forest" },
          { time: "10:30", activity: "Wildlife tracking with your guide" },
          { time: "13:00", activity: "Waterfall swim & lunch" },
          { time: "16:00", activity: "Arrive at second camp beside the river" },
        ],
      },
      {
        day: 3,
        title: "River Tubing Return",
        stops: [
          { time: "08:00", activity: "Breakfast and short trek to the river" },
          { time: "10:30", activity: "River tubing down the Bahorok River" },
          { time: "13:00", activity: "Arrive in Bukit Lawang, farewell lunch" },
        ],
      },
    ],
    included: baseIncluded.concat("Tent, sleeping mat & rubber tube"),
    notIncluded: baseNotIncluded,
  },
  {
    slug: "family-gentle-eco-trek",
    name: "Family & Gentle Eco-Trek",
    categories: ["family", "day"],
    image: "/exp-family-trek.png",
    imageAlt: "Guide teaching children about forest plants on an easy trail",
    duration: "Custom 1-2 Days",
    difficulty: "Easy / Kid-Friendly",
    maxGroup: 6,
    priceEur: 65,
    highlights: [
      "Private pace set by your family",
      "Educational flora & fauna storytelling for kids",
      "Flexible 1 or 2-day format",
    ],
    summary:
      "A slow, safe and playful introduction to the rainforest designed for families.",
    permitInfo: PERMIT,
    itinerary: [
      {
        day: 1,
        title: "Gentle Forest Discovery",
        stops: [
          { time: "09:00", activity: "Welcome, safety briefing & forest scavenger hunt kit" },
          { time: "09:30", activity: "Easy trail walk with frequent rest stops" },
          { time: "10:30", activity: "Orangutan observation (safe distance)" },
          { time: "12:00", activity: "Picnic-style jungle lunch" },
          { time: "14:00", activity: "River play & return to the village" },
        ],
      },
      {
        day: 2,
        title: "Optional Extension",
        stops: [
          { time: "09:00", activity: "Village & rubber/cocoa plantation visit" },
          { time: "11:00", activity: "Short tube float for kids (optional)" },
          { time: "13:00", activity: "Farewell lunch" },
        ],
      },
    ],
    included: baseIncluded.concat("Child-friendly pace & storytelling guide"),
    notIncluded: baseNotIncluded,
  },
];
