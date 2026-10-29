import Link from "next/link";
import { MapPin, Clock, Plane, ShieldCheck } from "lucide-react";
import { expeditions } from "@/data/expeditions";

const quickLinks = [
  { href: "#expeditions", label: "Expeditions" },
  { href: "#eco-standard", label: "Why Us" },
  { href: "#ethical-promise", label: "Ethical Promise" },
  { href: "#guides", label: "Our Guides" },
  { href: "#faq", label: "FAQ" },
  { href: "#booking", label: "Book Now" },
];

const linkClass = "transition hover:text-[#D96B43]";

export default function Footer() {
  return (
    <footer className="bg-[#1B3B2B] pb-24 pt-20 text-[#F7F5F0] sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr]">
        <div>
          <p className="font-heading text-3xl font-semibold">
            Wild Sumatra Ecotours
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F7F5F0]/75">
            Born in the village of Bukit Lawang, we guide small groups into the
            Gunung Leuser rainforest to meet orangutans respectfully, with local
            families who have protected this forest for generations.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[#F7F5F0]/85">
            <li className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              Guides certified by HPI (Himpunan Pramuwisata Indonesia)
            </li>
            <li className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              Official TNGL permits (Gunung Leuser National Park)
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-xl font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#F7F5F0]/80">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-heading text-xl font-semibold">Packages</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#F7F5F0]/80">
            {expeditions.map((e) => (
              <li key={e.slug}>
                <a href={`/?package=${e.slug}#booking`} className={linkClass}>
                  {e.name} <span className="text-[#D96B43]">€{e.priceEur}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-xl font-semibold">Visit Us</h2>
          <address className="mt-4 space-y-4 text-sm not-italic text-[#F7F5F0]/80">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              Bukit Lawang, Kec. Bahorok, Kab. Langkat, North Sumatra, Indonesia
            </p>
            <p className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              Open daily, 07:00 - 20:00 (WIB)
            </p>
            <p className="flex gap-2">
              <Plane className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              <span>
                <strong className="text-[#F7F5F0]">From Kualanamu (KNO):</strong>{" "}
                about 3.5-4 hours by private car via Binjai and Bahorok. Add our
                private transfer when booking and your driver will meet you at
                arrivals.
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-[#F7F5F0]/15 px-6 pt-6 text-xs text-[#F7F5F0]/60">
        © 2026 Wild Sumatra Ecotours. All rights reserved.
      </div>
    </footer>
  );
}
