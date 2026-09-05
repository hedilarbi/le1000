import { HomeEffects } from "@/app/components/home-effects";
import { getHomeMarkup } from "@/app/lib/home-markup";

export default function Home() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: getHomeMarkup() }} />
      <HomeEffects />
    </main>
  );
}
