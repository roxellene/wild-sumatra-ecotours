"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Star, Users } from "lucide-react";

const trust = [
  { icon: ShieldCheck, text: "100% Ethical Wildlife Viewing" },
  { icon: BadgeCheck, text: "Certified HPI Local Guides" },
  { icon: Star, text: "4.9/5 TripAdvisor Rating" },
  { icon: Users, text: "Small Group Guarantee" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#1B3B2B]">
      <Image
        src="/hero-rainforest.png"
        alt="Misty rainforest canopy in Gunung Leuser National Park"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B2B]/70 via-[#1B3B2B]/40 to-[#1B3B2B]/90" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-48 pt-32">
        <motion.p
          {...fadeUp(0.1)}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#D96B43]"
        >
          Bukit Lawang · Gunung Leuser National Park
        </motion.p>
        <motion.h1
          {...fadeUp(0.25)}
          className="max-w-4xl text-5xl font-semibold leading-[1.05] text-[#F7F5F0] sm:text-6xl lg:text-8xl"
        >
          Where the Ancient Rainforest Meets Ethical Adventure
        </motion.h1>
        <motion.p
          {...fadeUp(0.45)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[#F7F5F0]/85"
        >
          Join a small-group expedition to see wild orangutans in Gunung Leuser
          National Park, led by certified local guides who protect the forest
          they call home.
        </motion.p>
        <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#expeditions"
            className="rounded-full bg-[#D96B43] px-8 py-4 font-semibold text-white shadow-lg shadow-[#D96B43]/30 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Explore Trekking Packages
          </a>
          <a
            href="#guides"
            className="rounded-full border border-[#F7F5F0]/60 px-8 py-4 font-semibold text-[#F7F5F0] transition hover:bg-[#F7F5F0] hover:text-[#1B3B2B]"
          >
            Meet Our Local Guides
          </a>
        </motion.div>
      </div>

      <motion.ul
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
        className="absolute inset-x-6 bottom-8 mx-auto grid max-w-6xl grid-cols-2 gap-5 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl lg:grid-cols-4"
      >
        {trust.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-[#F7F5F0]">
            <Icon className="size-6 shrink-0 text-[#D96B43]" aria-hidden />
            <span className="text-sm font-medium leading-snug">{text}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
