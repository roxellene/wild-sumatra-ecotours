import { MessageCircle } from "lucide-react";

const HREF = `https://wa.me/6281234567890?text=${encodeURIComponent(
  "Hello! I have a question about trekking in Bukit Lawang.",
)}`;

export default function FloatingWhatsApp() {
  return (
    <a
      id="floating-whatsapp"
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask a Local Guide on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#1FA855] px-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 ring-2 ring-white/70 transition hover:scale-105 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">Ask a Local Guide</span>
    </a>
  );
}
