"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { expeditions } from "@/data/expeditions";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const WHATSAPP_NUMBER = "6281234567890";
const BOOKING_EMAIL = "booking@wildsumatraecotours.com";
const TRANSFER_PRICE_PER_CAR = 45;
const TRANSFER_CAR_CAPACITY = 4;
const EXTRA_NIGHT_PRICE = 25;
const MAX_GUESTS = 12;

const schema = z.object({
  packageSlug: z.string().min(1, "Please choose an expedition"),
  date: z.date({ error: "Please choose a departure date" }),
  guests: z.number().int().min(1).max(MAX_GUESTS),
  transfer: z.boolean(),
  extraNight: z.boolean(),
  extraNights: z.number().int().min(1).max(7),
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email"),
  country: z.string().trim().min(2, "Please enter your country"),
  notes: z.string().max(500, "Max 500 characters"),
});

type BookingValues = z.infer<typeof schema>;

const defaultValues: Partial<BookingValues> = {
  packageSlug: "2d1n-overnight-jungle-camp-tubing",
  date: undefined,
  guests: 2,
  transfer: false,
  extraNight: false,
  extraNights: 1,
  name: "",
  email: "",
  country: "",
  notes: "",
};

const fieldClass =
  "h-12 w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 text-[#1B3B2B] outline-none transition placeholder:text-[#1B3B2B]/40 focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/25";
const labelClass = "mb-2 block text-sm font-semibold text-[#1B3B2B]";
const errorClass = "mt-1.5 text-xs font-medium text-[#B3321B]";

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const btn =
    "inline-flex size-12 items-center justify-center text-[#1B3B2B] transition hover:bg-[#1B3B2B]/10 disabled:opacity-30";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center overflow-hidden rounded-xl border border-[#1B3B2B]/20 bg-white"
    >
      <button
        type="button"
        className={btn}
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span
        className="w-12 text-center text-lg font-semibold text-[#1B3B2B]"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export default function BookingSection() {
  const {
    register,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  // Next.js 16: never call new Date() during render/initial state.
  const [today, setToday] = useState<Date | undefined>(undefined);
  const isMounted = today !== undefined;
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  // Auto-select package from `?package=slug#booking` and custom event.
  useEffect(() => {
    const apply = (slug: string | null) => {
      if (slug && expeditions.some((e) => e.slug === slug)) {
        setValue("packageSlug", slug, { shouldValidate: true });
      }
    };
    apply(new URLSearchParams(window.location.search).get("package"));
    const onEvent = (ev: Event) =>
      apply((ev as CustomEvent<string>).detail ?? null);
    const onHash = () =>
      apply(new URLSearchParams(window.location.search).get("package"));
    window.addEventListener("select-package", onEvent);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("select-package", onEvent);
      window.removeEventListener("hashchange", onHash);
    };
  }, [setValue]);

  const [packageSlug, date, guests, transfer, extraNight, extraNights] =
    useWatch({
      control,
      name: [
        "packageSlug",
        "date",
        "guests",
        "transfer",
        "extraNight",
        "extraNights",
      ],
    });

  const pkg = expeditions.find((e) => e.slug === packageSlug);

  const price = useMemo(() => {
    const base = (pkg?.priceEur ?? 0) * (guests ?? 0);
    const cars = Math.ceil((guests ?? 0) / TRANSFER_CAR_CAPACITY);
    const transferCost = transfer ? cars * TRANSFER_PRICE_PER_CAR : 0;
    const nightCost = extraNight ? (extraNights ?? 0) * EXTRA_NIGHT_PRICE : 0;
    return { base, cars, transferCost, nightCost, total: base + transferCost + nightCost };
  }, [pkg, guests, transfer, extraNight, extraNights]);

  const buildSummary = (v: BookingValues) => {
    const p = expeditions.find((e) => e.slug === v.packageSlug);
    const addons = [
      v.transfer
        ? `Private Airport Transfer KNO/Medan - Bukit Lawang (${price.cars} car${price.cars > 1 ? "s" : ""}, EUR ${price.transferCost})`
        : null,
      v.extraNight
        ? `Extra Night at Eco-Lodge Bukit Lawang x${v.extraNights} (EUR ${price.nightCost})`
        : null,
    ].filter(Boolean);
    return [
      "Hello Wild Sumatra Ecotours, I would like to request a booking:",
      "",
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Country: ${v.country}`,
      `Package: ${p?.name ?? "-"} (EUR ${p?.priceEur ?? 0} / person)`,
      `Departure date: ${format(v.date, "EEEE, d MMMM yyyy")}`,
      `Participants: ${v.guests}`,
      `Add-ons: ${addons.length ? addons.join("; ") : "None"}`,
      `Diet / medical notes: ${v.notes?.trim() || "None"}`,
      "",
      `Estimated total: EUR ${price.total}`,
      "(No upfront payment required today)",
    ].join("\n");
  };

  const submit = (channel: "whatsapp" | "email") => {
    const parsed = schema.safeParse(getValues());
    if (!parsed.success) {
      void trigger();
      return;
    }
    const body = buildSummary(parsed.data);
    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const subject = `Booking inquiry: ${pkg?.name ?? "Bukit Lawang trek"} - ${format(parsed.data.date, "d MMM yyyy")}`;
      window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const trust = [
    "No upfront payment required today",
    "Free cancellation up to 48h before trek",
    "Instant confirmation via WhatsApp/Email",
  ];

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-mt-20 bg-[#F7F5F0] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D96B43]">
          Plan Your Trek
        </p>
        <h2
          id="booking-heading"
          className="max-w-3xl text-4xl font-semibold text-[#1B3B2B] sm:text-5xl"
        >
          Request Your Jungle Booking
        </h2>
        <p className="mt-4 max-w-2xl text-[#1B3B2B]/75">
          Tell us when you want to trek. We confirm availability directly with
          you, with no payment needed today.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="space-y-8 rounded-3xl border border-[#1B3B2B]/10 bg-white/70 p-6 shadow-sm sm:p-8"
          >
            <div>
              <label htmlFor="packageSlug" className={labelClass}>
                Expedition Package
              </label>
              <select
                id="packageSlug"
                {...register("packageSlug")}
                className={fieldClass}
              >
                {expeditions.map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {e.name} - €{e.priceEur} / person
                  </option>
                ))}
              </select>
              {errors.packageSlug && (
                <p className={errorClass}>{errors.packageSlug.message}</p>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <span id="date-label" className={labelClass}>
                  Departure Date
                </span>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger
                        id="departure-date"
                        aria-labelledby="date-label"
                        className={`${fieldClass} flex items-center justify-between text-left`}
                      >
                        <span className={field.value ? "" : "text-[#1B3B2B]/40"}>
                          {field.value
                            ? format(field.value, "EEE, d MMM yyyy")
                            : "Select a date"}
                        </span>
                        <CalendarDays
                          className="size-4 text-[#D96B43]"
                          aria-hidden
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        {isMounted && (
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value ?? today}
                            onSelect={(d) => {
                              field.onChange(d);
                              if (d) setCalendarOpen(false);
                            }}
                            disabled={{ before: today }}
                          />
                        )}
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.date && (
                  <p className={errorClass}>{errors.date.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Participants{" "}
                  <span className="font-normal text-[#1B3B2B]/60">
                    (1-{MAX_GUESTS})
                  </span>
                </span>
                <Controller
                  control={control}
                  name="guests"
                  render={({ field }) => (
                    <Stepper
                      label="participants"
                      value={field.value}
                      min={1}
                      max={MAX_GUESTS}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>Optional Add-ons</legend>
              <div className="space-y-3">
                <label
                  htmlFor="addon-transfer"
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#1B3B2B]/15 bg-white p-4 transition has-[:checked]:border-[#D96B43] has-[:checked]:bg-[#D96B43]/5"
                >
                  <input
                    id="addon-transfer"
                    type="checkbox"
                    {...register("transfer")}
                    className="mt-1 size-4 accent-[#D96B43]"
                  />
                  <span className="text-sm text-[#1B3B2B]">
                    <span className="block font-semibold">
                      Private Airport Transfer Kualanamu/Medan to Bukit Lawang
                      <span className="text-[#D96B43]"> +€45 / car</span>
                    </span>
                    <span className="text-[#1B3B2B]/70">
                      Max {TRANSFER_CAR_CAPACITY} people per car. Larger groups
                      get extra cars automatically.
                    </span>
                  </span>
                </label>

                <label
                  htmlFor="addon-night"
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#1B3B2B]/15 bg-white p-4 transition has-[:checked]:border-[#D96B43] has-[:checked]:bg-[#D96B43]/5"
                >
                  <input
                    id="addon-night"
                    type="checkbox"
                    {...register("extraNight")}
                    className="mt-1 size-4 accent-[#D96B43]"
                  />
                  <span className="text-sm text-[#1B3B2B]">
                    <span className="block font-semibold">
                      Extra Night at Eco-Lodge Bukit Lawang
                      <span className="text-[#D96B43]"> +€25 / night</span>
                    </span>
                    <span className="text-[#1B3B2B]/70">
                      Rest before or after your trek.
                    </span>
                  </span>
                </label>

                {extraNight && (
                  <div className="flex items-center gap-4 pl-1">
                    <span className="text-sm font-semibold text-[#1B3B2B]">
                      Number of extra nights
                    </span>
                    <Controller
                      control={control}
                      name="extraNights"
                      render={({ field }) => (
                        <Stepper
                          label="extra nights"
                          value={field.value}
                          min={1}
                          max={7}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </fieldset>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="e.g. Anna Schmidt"
                  {...register("name")}
                  className={fieldClass}
                />
                {errors.name && (
                  <p className={errorClass}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  {...register("email")}
                  className={fieldClass}
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="country" className={labelClass}>
                Country of Origin
              </label>
              <input
                id="country"
                autoComplete="country-name"
                placeholder="e.g. Germany"
                {...register("country")}
                className={fieldClass}
              />
              {errors.country && (
                <p className={errorClass}>{errors.country.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>
                Dietary / Medical Notes{" "}
                <span className="font-normal text-[#1B3B2B]/60">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Vegan, vegetarian, gluten-free, allergies, medical conditions..."
                {...register("notes")}
                className={`${fieldClass} h-auto py-3`}
              />
              {errors.notes && (
                <p className={errorClass}>{errors.notes.message}</p>
              )}
            </div>
          </form>

          <aside
            aria-label="Price summary"
            className="rounded-3xl bg-[#1B3B2B] p-7 text-[#F7F5F0] shadow-xl lg:sticky lg:top-24"
          >
            <h3 className="text-2xl font-semibold">Your Estimate</h3>
            <p className="mt-1 text-sm text-[#F7F5F0]/70">{pkg?.name}</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>
                  €{pkg?.priceEur ?? 0} × {guests} guest
                  {guests > 1 ? "s" : ""}
                </dt>
                <dd className="font-semibold">€{price.base}</dd>
              </div>
              {transfer && (
                <div className="flex justify-between gap-4">
                  <dt>
                    Airport transfer ({price.cars} car
                    {price.cars > 1 ? "s" : ""})
                  </dt>
                  <dd className="font-semibold">€{price.transferCost}</dd>
                </div>
              )}
              {extraNight && (
                <div className="flex justify-between gap-4">
                  <dt>
                    Extra night × {extraNights}
                  </dt>
                  <dd className="font-semibold">€{price.nightCost}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt>Departure</dt>
                <dd className="font-semibold">
                  {date ? format(date, "d MMM yyyy") : "Not selected"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-[#F7F5F0]/20 pt-5">
              <span className="text-sm uppercase tracking-wider text-[#F7F5F0]/70">
                Estimated total
              </span>
              <span
                className="text-4xl font-semibold"
                aria-live="polite"
                id="price-total"
              >
                €{price.total}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                id="submit-whatsapp"
                onClick={() => submit("whatsapp")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D96B43] px-5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <MessageCircle className="size-4" aria-hidden />
                Request Booking via WhatsApp
              </button>
              <button
                type="button"
                id="submit-email"
                onClick={() => submit("email")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#F7F5F0]/40 px-5 text-sm font-semibold text-[#F7F5F0] transition hover:bg-[#F7F5F0] hover:text-[#1B3B2B]"
              >
                <Mail className="size-4" aria-hidden />
                Send Inquiry via Email
              </button>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-[#F7F5F0]/85">
              {trust.map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#D96B43]"
                    aria-hidden
                  />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-[#F7F5F0]/60">
              <ShieldCheck className="size-4" aria-hidden />
              Licensed HPI guides · TNGL permits included
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
