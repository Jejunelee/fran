import { getSiteContent } from "@/lib/content/get-site-content";
import { cmsBg } from "@/lib/content/style";
import Lead from "./components/Lead";
import Hero from "./components/Hero";
import Credentials from "./components/Credentials";
import Belief from "./components/Belief";
import Pivot from "./components/Pivot";
import Ended from "./components/Ended";
import WhereIAm from "./components/WhereIAm";
import Again from "./components/Again";
import Hi from "./components/Hi";
import Built from "./components/Built";

export default async function Home() {
  const content = await getSiteContent();
  const page = content.about.page as { background?: string };

  return (
    <div
      className="min-h-screen bg-white bg-cover bg-center bg-no-repeat bg-fixed"
      style={cmsBg(page.background)}
    >
      <Hero />
      <Hi />
      <Built />
      <Ended />
      <Pivot />
      <Again />
      <WhereIAm />
      <Credentials />
      <Belief />
      <Lead />
    </div>
  );
}
