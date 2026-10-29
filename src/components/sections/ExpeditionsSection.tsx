"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, Clock, Mountain, Users, X } from "lucide-react";
import {
  expeditions,
  type Expedition,
  type ExpeditionCategory,
} from "@/data/expeditions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Filter = "all" | ExpeditionCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Expeditions" },
  { value: "day", label: "Day Treks" },
  { value: "overnight", label: "Overnight Camping" },
  { value: "family", label: "Family Friendly" },
];

function ItineraryDialog({ expedition }: { expedition: Expedition }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-11 flex-1 rounded-full border-[#1B3B2B] bg-transparent px-4 text-[#1B3B2B] hover:bg-[#1B3B2B] hover:text-[#F7F5F0]"
          />
        }
      >
        Day-by-Day Itinerary
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#F7F5F0] p-6 text-[#1B3B2B] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {expedition.name}
          </DialogTitle>
          <DialogDescription className="text-[#1B3B2B]/70">
            {expedition.summary}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="day-1">
          <TabsList variant="line" className="h-auto flex-wrap">
            {expedition.itinerary.map((d) => (
              <TabsTrigger
                key={d.day}
                value={`day-${d.day}`}
                className="px-4 py-2 data-active:text-[#D96B43] after:bg-[#D96B43]"
              >
                Day {d.day}
              </TabsTrigger>
            ))}
            <TabsTrigger
              value="inclusions"
              className="px-4 py-2 data-active:text-[#D96B43] after:bg-[#D96B43]"
            >
              Inclusions
            </TabsTrigger>
          </TabsList>

          {expedition.itinerary.map((d) => (
            <TabsContent key={d.day} value={`day-${d.day}`} className="pt-4">
              <h4 className="mb-3 font-semibold">{d.title}</h4>
              <ol className="space-y-3 border-l-2 border-[#1B3B2B]/15 pl-4">
                {d.stops.map((s) => (
                  <li key={s.time + s.activity} className="relative">
                    <span className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-[#D96B43]" />
                    <span className="mr-2 font-semibold text-[#D96B43]">
                      {s.time}
                    </span>
                    {s.activity}
                  </li>
                ))}
              </ol>
            </TabsContent>
          ))}

          <TabsContent value="inclusions" className="grid gap-6 pt-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Included</h4>
              <ul className="space-y-2">
                {expedition.included.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1B3B2B]" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Not included</h4>
              <ul className="space-y-2">
                {expedition.notIncluded.map((i) => (
                  <li key={i} className="flex gap-2 text-[#1B3B2B]/75">
                    <X className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-[#1B3B2B]/70 sm:col-span-2">
              {expedition.permitInfo}
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ExpeditionCard({
  expedition: e,
  priority,
}: {
  expedition: Expedition;
  priority: boolean;
}) {
  const metrics = [
    { icon: Clock, label: e.duration },
    { icon: Mountain, label: e.difficulty },
    { icon: Users, label: `Max ${e.maxGroup} guests` },
  ];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#1B3B2B]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={e.image}
          alt={e.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {e.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#D96B43] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
            {e.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <h3 className="text-2xl font-semibold text-[#1B3B2B]">{e.name}</h3>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#1B3B2B]/80">
          {metrics.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-4 text-[#D96B43]" aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <ul className="space-y-2 text-sm text-[#1B3B2B]">
          {e.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-[#D96B43]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-[#1B3B2B]/10 pt-4">
          <p className="text-[#1B3B2B]">
            <span className="text-sm">From </span>
            <span className="text-3xl font-semibold">€{e.priceEur}</span>
            <span className="text-sm"> / person</span>
          </p>
          <p className="text-xs text-[#1B3B2B]/70">All permits included</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ItineraryDialog expedition={e} />
          <a
            href={`/?package=${e.slug}#booking`}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#D96B43] px-4 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Book This Trek
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ExpeditionsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? expeditions
        : expeditions.filter((e) => e.categories.includes(filter)),
    [filter],
  );

  return (
    <section id="expeditions" className="bg-[#F7F5F0] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D96B43]">
          Bukit Lawang Expeditions
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold text-[#1B3B2B] sm:text-5xl">
          Choose Your Jungle Adventure
        </h2>
        <p className="mt-4 max-w-2xl text-[#1B3B2B]/75">
          Small groups, certified local guides and transparent prices in euro.
          Gunung Leuser National Park permits are always included.
        </p>

        <div
          role="tablist"
          aria-label="Filter expeditions"
          className="mt-10 flex flex-wrap gap-3"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                filter === f.value
                  ? "border-[#1B3B2B] bg-[#1B3B2B] text-[#F7F5F0]"
                  : "border-[#1B3B2B]/30 text-[#1B3B2B] hover:border-[#1B3B2B]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {visible.map((e, i) => (
            <ExpeditionCard key={e.slug} expedition={e} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
