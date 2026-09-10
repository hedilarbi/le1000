import { HomeEffects } from "@/app/components/home-effects";
import { OpeningIntro } from "@/app/components/opening-intro";
import { HomeContent } from "@/app/components/page-content/home-content";

export default function Home() {
  return (
    <main>
      <OpeningIntro />
      <HomeContent />
      <HomeEffects />
    </main>
  );
}
