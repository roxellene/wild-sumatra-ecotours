"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BadgeCheck, ChevronLeft, ChevronRight, Languages, Leaf } from "lucide-react";
import { guides, type Guide } from "@/data/guides-and-faq";
import "swiper/css";

function GuideCard({ g }: { g: Guide }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#1B3B2B]/10 bg-white p-7">
      <div className="mb-5 flex items-center gap-4">
        <div
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#1B3B2B] font-heading text-2xl text-[#F7F5F0]"
        >
          {g.initials}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#1E2420]">{g.name}</h3>
          <p className="text-sm text-[#1E2420]/70">{g.role}</p>
        </div>
      </div>

      <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#1B3B2B]/10 px-3 py-1 text-xs font-semibold text-[#1B3B2B]">
        <BadgeCheck className="size-4" aria-hidden />
        HPI Licensed Guide
      </span>

      <dl className="mb-6 space-y-3 text-sm text-[#1E2420]/85">
        <div className="flex gap-3">
          <Leaf className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
          <div>
            <dt className="sr-only">Experience</dt>
            <dd>{g.yearsExperience} years in the jungle</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Languages className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
          <div>
            <dt className="sr-only">Languages</dt>
            <dd>{g.languages.join(", ")}</dd>
          </div>
        </div>
        <div className="border-t border-[#1B3B2B]/10 pt-3">
          <dt className="font-semibold text-[#1B3B2B]">Specialty</dt>
          <dd className="mt-1">{g.specialty}</dd>
        </div>
      </dl>

      <blockquote className="mt-auto border-l-2 border-[#D96B43] pl-4 font-heading text-xl leading-snug text-[#1B3B2B]">
        &ldquo;{g.quote}&rdquo;
      </blockquote>
    </article>
  );
}

export default function GuidesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sync = (s: SwiperType) => {
    setAtStart(s.isBeginning);
    setAtEnd(s.isEnd);
  };

  const arrow =
    "flex size-12 items-center justify-center rounded-full border border-[#1B3B2B]/30 text-[#1B3B2B] transition hover:bg-[#1B3B2B] hover:text-[#F7F5F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43] disabled:pointer-events-none disabled:opacity-30";

  return (
    <section
      id="guides"
      aria-labelledby="guides-heading"
      className="bg-[#F7F5F0] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="guides-heading"
              className="font-heading text-4xl font-semibold text-[#1B3B2B] sm:text-5xl"
            >
              Meet the Locals Who Walk You Through the Jungle
            </h2>
            <p className="mt-4 max-w-xl text-lg text-[#1E2420]/75">
              Every guide grew up in Bukit Lawang and is certified by the
              Indonesian Tourist Guide Association (HPI).
            </p>
          </div>
          {isMounted && (
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous guide"
                className={arrow}
                disabled={atStart}
                onClick={() => swiper?.slidePrev()}
              >
                <ChevronLeft aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next guide"
                className={arrow}
                disabled={atEnd}
                onClick={() => swiper?.slideNext()}
              >
                <ChevronRight aria-hidden />
              </button>
            </div>
          )}
        </div>

        {!isMounted ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <GuideCard key={g.id} g={g} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[A11y, Keyboard]}
            keyboard
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.2 },
            }}
            onSwiper={(s) => {
              setSwiper(s);
              sync(s);
            }}
            onSlideChange={sync}
            onResize={sync}
          >
            {guides.map((g) => (
              <SwiperSlide key={g.id} className="!h-auto">
                <GuideCard g={g} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
