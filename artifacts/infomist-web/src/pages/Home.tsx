import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { SocialProof } from "@/components/SocialProof";
import { WhoWeWorkWith } from "@/components/WhoWeWorkWith";
import { CeoHighlight } from "@/components/CeoHighlight";
import { FounderSection } from "@/components/FounderSection";
import { TestimonialTeaser } from "@/components/TestimonialTeaser";
import { Insights } from "@/components/Insights";
import { HomeFaq } from "@/components/HomeFaq";

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SocialProof />
      <Services />
      <WhoWeWorkWith />
      <CeoHighlight />
      <FounderSection />
      <TestimonialTeaser />
      <Insights />
      <HomeFaq />
    </>
  );
}
