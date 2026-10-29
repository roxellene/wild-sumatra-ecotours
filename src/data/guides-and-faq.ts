export interface Guide {
  id: string;
  name: string;
  role: string;
  yearsExperience: number;
  languages: string[];
  specialty: string;
  quote: string;
  initials: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  country: string;
  flag: string;
  expedition: string;
  date: string;
  text: string;
}

export const guides: Guide[] = [
  {
    id: "hendri",
    name: "Banghendri (Hendri)",
    role: "Lead Tracker & Co-Founder",
    yearsExperience: 14,
    languages: ["English", "Indonesian"],
    specialty: "Reading wild orangutan nests & medicinal plants",
    quote:
      "The jungle tells you where the orangutans are. You just have to learn to listen.",
    initials: "BH",
  },
  {
    id: "rizaldo",
    name: "Rizaldo",
    role: "Senior Wildlife Guide",
    yearsExperience: 9,
    languages: ["English", "Dutch", "Indonesian"],
    specialty: "Birdwatching, Thomas Leaf Monkeys & photography angles",
    quote:
      "Patience gives you the best photo. I will tell you when to wait and when to press.",
    initials: "R",
  },
  {
    id: "supri",
    name: "Supri",
    role: "Jungle Chef & Camp Master",
    yearsExperience: 11,
    languages: ["English", "Indonesian"],
    specialty:
      "River tubing navigation & cooking authentic jungle curry over campfire",
    quote:
      "After a long trek, a hot curry by the river tastes better than any restaurant.",
    initials: "S",
  },
  {
    id: "bayu",
    name: "Bayu",
    role: "Family & Eco-Education Specialist",
    yearsExperience: 7,
    languages: ["English", "German", "Indonesian"],
    specialty: "Kid-friendly pace & rainforest conservation storytelling",
    quote:
      "When a child understands the forest, they protect it for life. We walk at their pace.",
    initials: "B",
  },
];

export const faqs: Faq[] = [
  {
    id: "getting-there",
    question: "How do I get to Bukit Lawang from Medan (Kualanamu Airport)?",
    answer:
      "The fastest and most comfortable option is a private tourist car, which takes 3.5 to 4 hours. The public bus is cheaper, but it needs a change in Medan and takes 5 to 6 hours. We arrange your airport pick-up: your driver waits at arrivals with your name on a sign.",
  },
  {
    id: "wild-orangutans",
    question: "Are the orangutans truly wild, and am I guaranteed to see them?",
    answer:
      "We have a 98% sighting rate. Bukit Lawang has semi-wild orangutans, rehabilitated animals who now live freely in the forest and are used to people. Deeper in Gunung Leuser National Park, fully wild orangutans live with no human contact. Nothing in nature is guaranteed, but we follow strict ethical rules: no feeding, no touching, and a safe distance at all times.",
  },
  {
    id: "physical-demand",
    question: "How physically demanding is the trek?",
    answer:
      "It depends on the package. The 1-Day Jungle Explorer is Easy to Moderate, with steady hills and plenty of rest stops. The overnight and multi-day treks are Moderate to Challenging, with steep, muddy sections. Our guides set the pace for your group, and you do not need to be an athlete. Basic fitness and good shoes are enough.",
  },
  {
    id: "jungle-taxi",
    question: 'What happens during the "Jungle Taxi" river tubing return?',
    answer:
      "You float back to the village on a rubber tube down the Bahorok River, with a guide beside you. The ride is gentle, with a few small rapids. We provide waterproof dry-bags for your cameras and backpacks, so your gear stays dry.",
  },
  {
    id: "packing-atm",
    question: "What should I pack, and are there ATMs in Bukit Lawang?",
    answer:
      "Pack light, quick-dry clothes, long trousers, trekking shoes or sandals with grip, a rain jacket, insect repellent, sunscreen and a small torch. ATMs in the village are not reliable, so bring cash in IDR or EUR, or pay your deposit online before you arrive.",
  },
  {
    id: "leeches-mosquitoes",
    question: "Are there leeches or mosquitoes, and how do we handle them?",
    answer:
      "Yes, both exist in a rainforest, especially after rain. Leeches are harmless and our guides remove them quickly. Wear long socks over your trousers and use repellent. Mosquitoes are mostly a problem at dusk, so we provide nets at camp, and we recommend repellent in the evening.",
  },
];

export const reviews: Review[] = [
  {
    id: "review-de",
    name: "Lena K.",
    country: "Germany",
    flag: "🇩🇪",
    expedition: "2D1N Overnight Camp",
    date: "October 2026",
    text: "Hendri found a wild mother and her baby from a nest he spotted before we even saw it. We slept by the river and ate Supri's curry. I cried a little. It was the best trip of my year.",
  },
  {
    id: "review-nl",
    name: "Daan & Sanne V.",
    country: "Netherlands",
    flag: "🇳🇱",
    expedition: "1-Day Jungle Explorer",
    date: "September 2026",
    text: "Rizaldo speaks Dutch, which made the day really relaxed. He knew where to find Thomas Leaf Monkeys and got us great photos. The tube ride back was the highlight.",
  },
  {
    id: "review-uk",
    name: "Charlotte M.",
    country: "United Kingdom",
    flag: "🇬🇧",
    expedition: "3D2N Deep Leuser Expedition",
    date: "August 2026",
    text: "Three days with no one else around. The guides never fed the animals or crowded them, and they were open about how they protect the forest. Worth every euro.",
  },
];
