"use client";

import { useEffect, useState } from "react";
import { Menu, X, Trees } from "lucide-react";

const links = [
  { label: "Expeditions", href: "#expeditions" },
  { label: "Our Guides", href: "#guides" },
  { label: "Ethical Promise", href: "#ethical-promise" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-[#1B3B2B]/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"
      >
        <a href="#" className="flex items-center gap-2 text-sand">
          <Trees className="size-6 text-[#D96B43]" aria-hidden />
          <span className="font-heading text-2xl font-semibold tracking-wide">
            Wild Sumatra
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-[#F7F5F0]/85 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#book"
              className="rounded-full bg-[#D96B43] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Book Your Trek
            </a>
          </li>
        </ul>

        <button
          type="button"
          id="mobile-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-sand md:hidden"
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 px-6 pb-6 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-[#F7F5F0]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-[#D96B43] py-3 text-center font-semibold text-white"
            >
              Book Your Trek
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
