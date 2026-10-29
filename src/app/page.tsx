import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ExpeditionsSection from "@/components/sections/ExpeditionsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import EthicalPromiseSection from "@/components/sections/EthicalPromiseSection";
import GuidesSection from "@/components/sections/GuidesSection";
import FaqSection from "@/components/sections/FaqSection";
import BookingSection from "@/components/sections/BookingSection";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExpeditionsSection />
        <WhyUsSection />
        <EthicalPromiseSection />
        <GuidesSection />
        <FaqSection />
        <BookingSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd />
    </>
  );
}
