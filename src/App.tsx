import { Navbar } from "@/components/blackline/Navbar";
import { Hero } from "@/components/blackline/Hero";
import { SocialProof } from "@/components/blackline/SocialProof";
import { Problem } from "@/components/blackline/Problem";
import { About } from "@/components/blackline/About";
import { Method } from "@/components/blackline/Method";
import { Services } from "@/components/blackline/Services";
import { Plans } from "@/components/blackline/Plans";
import { Results } from "@/components/blackline/Results";
import { Testimonials } from "@/components/blackline/Testimonials";
import { Faq } from "@/components/blackline/Faq";
import { FinalCta } from "@/components/blackline/FinalCta";
import { Footer } from "@/components/blackline/Footer";
// import { FloatingWhatsApp } from "@/components/blackline/FloatingWhatsApp";
import { StickyMobileCta } from "@/components/blackline/StickyMobileCta";
import { ExitIntentPopup } from "@/components/blackline/ExitIntentPopup";
import { Tentacles } from "@/components/blackline/Tentacles";
import { useReveal } from "@/hooks/use-reveal";

export default function App() {
  useReveal();
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <Tentacles />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <About />
        <Method />
        <Services />
        <Plans />
        <Results />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      {/* <FloatingWhatsApp /> */}
      <StickyMobileCta />
      <ExitIntentPopup />
    </div>
  );
}
