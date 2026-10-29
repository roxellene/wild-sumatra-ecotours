import { HandHeart, Users, Recycle } from "lucide-react";

const commitments = [
  {
    icon: HandHeart,
    title: "Strictly No Feeding & No Touching",
    text: "Orangutans share 97% of our DNA, so they catch our colds and flu. Keeping our hands off protects their immunity and keeps them wild.",
  },
  {
    icon: Users,
    title: "Fair Wage for Local Trackers & Porters",
    text: "Our entire team is from Bahorok and Bukit Lawang. Your trek pays local families directly, and 100% of our trackers and porters are local.",
  },
  {
    icon: Recycle,
    title: "Zero-Plastic Jungle Camp",
    text: "We use refillable bottles and reusable containers. Everything we carry in, including every piece of rubbish, goes back to the village.",
  },
];

export default function EthicalPromiseSection() {
  return (
    <section
      id="ethical-promise"
      aria-labelledby="ethical-promise-heading"
      className="bg-[#1B3B2B] py-28 text-[#F7F5F0]"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="mb-4 text-sm font-semibold text-[#D96B43]">
            Our Ethical Promise
          </p>
          <h2
            id="ethical-promise-heading"
            className="font-heading text-5xl leading-[1.05] font-semibold sm:text-6xl"
          >
            Guests in Their Home, Never Intruders
          </h2>
          <div className="mt-8 max-w-prose space-y-5 text-lg leading-8 text-[#F7F5F0]/80">
            <p>
              Gunung Leuser National Park is one of the last places on Earth
              where orangutans, tigers, elephants and rhinos still share the
              same forest. It is a UNESCO World Heritage site, and it is
              shrinking.
            </p>
            <p>
              Every step you take here is a step through someone&apos;s home. We
              walk quietly, keep our distance and leave nothing behind, so the
              forest is still there for the next traveller and for the animals
              who live in it.
            </p>
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-[#F7F5F0]/15 self-center border-y border-[#F7F5F0]/15">
          {commitments.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-5 py-8">
              <Icon
                className="mt-1 size-8 shrink-0 text-[#D96B43]"
                aria-hidden
              />
              <div>
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="leading-relaxed text-[#F7F5F0]/75">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
