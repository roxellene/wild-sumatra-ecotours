import type { Graph } from "schema-dts";
import { expeditions } from "@/data/expeditions";
import { faqs } from "@/data/guides-and-faq";

const SITE_URL = "https://wildsumatraecotours.com";

const jsonLd: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Multi-typed entity (schema-dts only types single @type values).
      "@type": ["TravelAgency", "LocalBusiness"] as unknown as "TravelAgency",
      "@id": `${SITE_URL}/#business`,
      name: "Wild Sumatra Ecotours",
      url: SITE_URL,
      description:
        "Ethical orangutan trekking and jungle expeditions in Bukit Lawang, Gunung Leuser National Park, with HPI-licensed local guides.",
      image: `${SITE_URL}/exp-overnight-camp.png`,
      telephone: "+6281234567890",
      email: "booking@wildsumatraecotours.com",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bukit Lawang, Kec. Bahorok",
        addressLocality: "Kab. Langkat",
        addressRegion: "North Sumatra",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 3.5553,
        longitude: 98.1449,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 184,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#expeditions`,
      name: "Bukit Lawang Expeditions",
      itemListElement: expeditions.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristTrip",
          name: e.name,
          description: e.summary,
          image: `${SITE_URL}${e.image}`,
          touristType: e.categories.includes("family")
            ? "Families"
            : "Nature and wildlife travelers",
          provider: { "@id": `${SITE_URL}/#business` },
          offers: {
            "@type": "Offer",
            price: e.priceEur,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/?package=${e.slug}#booking`,
          },
          itinerary: {
            "@type": "ItemList",
            itemListElement: e.itinerary.map((d) => ({
              "@type": "ListItem",
              position: d.day,
              name: `Day ${d.day}: ${d.title}`,
            })),
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
