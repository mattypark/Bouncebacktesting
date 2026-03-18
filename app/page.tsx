import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import WasteStatSection from "@/components/WasteStatSection";
import RecycledRevealSection from "@/components/RecycledRevealSection";
import TheProcessSection from "@/components/TheProcessSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import WaitlistSection from "@/components/WaitlistSection";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      {/* Storytelling slides */}
      <TextRevealSection
        id="slide-problem"
        text="There's a major problem in the Pickleball community."
      />
      <WasteStatSection />
      <TextRevealSection
        id="slide-solution"
        text="So what did we do?"
        className="flex w-full items-center justify-center bg-bb-lime py-24 pb-32 md:py-32 md:pb-40"
      />
      <RecycledRevealSection />
      <TheProcessSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <WaitlistSection />
    </>
  );
}
