import { Ban, ReceiptText, Waves, Salad } from "lucide-react";

const standards = [
  {
    icon: Ban,
    title: "Zero Feeding Policy",
    text: "100% ethical wildlife observation. We keep a minimum safe distance of 10 meters from every animal.",
  },
  {
    icon: ReceiptText,
    title: "All-Inclusive Transparent Pricing",
    text: "Official TNGL permits and conservation tax are included. No hidden fees, ever.",
  },
  {
    icon: Waves,
    title: "The Famous 'Jungle Taxi' Return",
    text: "Float home down the Bahorok River on a traditional rubber tube, with no tiring walk back.",
  },
  {
    icon: Salad,
    title: "Freshly Cooked Jungle Meals",
    text: "Warm local dishes cooked in the forest, with Vegan and Vegetarian options available.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="eco-standard" className="bg-[#1B3B2B] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D96B43]">
          Why Travel With Us
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold text-[#F7F5F0] sm:text-5xl">
          The Sumatra Eco-Standard
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-2xl border border-[#F7F5F0]/15 bg-[#F7F5F0]/5 p-6 transition hover:-translate-y-1 hover:bg-[#F7F5F0]/10"
            >
              <Icon className="mb-4 size-8 text-[#D96B43]" aria-hidden />
              <h3 className="mb-2 text-lg font-semibold text-[#F7F5F0]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#F7F5F0]/75">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
