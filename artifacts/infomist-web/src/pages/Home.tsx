import { HeroSlider } from "@/components/hero/HeroSlider";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { SocialProof } from "@/components/SocialProof";
import { PersonaExplorer } from "@/components/who-we-work-with/PersonaExplorer";
import { LeadershipTeaser } from "@/components/LeadershipTeaser";
import { TestimonialTeaser } from "@/components/TestimonialTeaser";
import { Insights } from "@/components/Insights";
import { HomeFaq } from "@/components/HomeFaq";

export function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <SocialProof />
      <Services />
      <PersonaExplorer />
      <LeadershipTeaser />
      <TestimonialTeaser />
      <Insights limit={3} />
      <HomeFaq />
    </>
  );
}
