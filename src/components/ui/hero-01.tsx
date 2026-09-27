/**
 * Hero-01 (21st.dev) — adapted for Campus Lost & Found.
 *
 * The original composition was: <Header navigationData /> + <HeroSection avatarList />
 * + <BrandSlider brandList />. It keeps the same structure, re-cast for the product:
 *   Header      → components/layout/Navbar      (rendered once in the app layout)
 *   HeroSection → components/hero/CampusHero    (animated campus scene + search)
 *   BrandSlider → components/hero/CampusTicker  (live feed of the latest reports)
 */
import CampusHero from "@/components/hero/CampusHero";
import { CampusTicker } from "@/components/hero/CampusTicker";

export default function CampusLostFoundHero() {
  return (
    <div className="relative">
      <CampusHero />
      <CampusTicker />
    </div>
  );
}
