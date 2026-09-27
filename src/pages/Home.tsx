import CampusLostFoundHero from "@/components/ui/hero-01";
import { CampusMap } from "@/components/sections/CampusMap";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { QuickActions } from "@/components/sections/QuickActions";
import { RecentItems } from "@/components/sections/RecentItems";
import { Statistics } from "@/components/sections/Statistics";
import { TrustSection } from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <>
      <CampusLostFoundHero />
      <QuickActions />
      <RecentItems />
      <HowItWorks />
      <CampusMap />
      <Statistics />
      <TrustSection />
    </>
  );
}
