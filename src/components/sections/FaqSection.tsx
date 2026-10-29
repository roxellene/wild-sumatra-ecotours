import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, reviews } from "@/data/guides-and-faq";

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#F7F5F0] py-24 text-[#1E2420]"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <aside
          aria-label="Traveler Spotlight"
          className="self-start rounded-3xl bg-[#1B3B2B] p-8 text-[#F7F5F0] lg:sticky lg:top-24"
        >
          <h2 className="font-heading text-3xl font-semibold">
            Traveler Spotlight
          </h2>
          <ul className="mt-6 divide-y divide-[#F7F5F0]/15">
            {reviews.map((r) => (
              <li key={r.id} className="py-6 first:pt-0 last:pb-0">
                <blockquote className="leading-relaxed text-[#F7F5F0]/90">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm font-semibold">
                  <span aria-hidden>{r.flag} </span>
                  {r.name}, {r.country}
                </p>
                <p className="text-sm text-[#D96B43]">
                  {r.expedition} &bull; {r.date}
                </p>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <h2
            id="faq-heading"
            className="font-heading text-4xl font-semibold text-[#1B3B2B] sm:text-5xl"
          >
            Questions Travelers Ask Before Booking
          </h2>
          <Accordion className="mt-8" defaultValue={[faqs[0].id]}>
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent className="text-[#1E2420]/80">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
