// app/aboutme/page.tsx
import { Footer } from "./components/Footer";
import Lead from "./components/Lead"
import Hero from "./components/Hero"
import Credentials from "./components/Credentials"
import Belief from "./components/Belief"
import Pivot from "./components/Pivot"
import Ended from "./components/Ended"
import WhereIAm from "./components/WhereIAm"
import Again from "./components/Again"
import Hi from "./components/Hi"
import Built from "./components/Built"

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/AboutMe/main/white.png')" }}
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