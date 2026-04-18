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
import { LeadForm } from "@/components/blackline/LeadForm";
import { Footer } from "@/components/blackline/Footer";
import { FloatingWhatsApp } from "@/components/blackline/FloatingWhatsApp";
import { StickyMobileCta } from "@/components/blackline/StickyMobileCta";
import { useReveal } from "@/hooks/use-reveal";

export default function App() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
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
        <LeadForm />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCta />
    </div>
  );
}
