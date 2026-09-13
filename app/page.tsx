import { Footer } from "./components/Footer";
import Hero from "./components/Hero"
import Quote from "./components/Quote"
import Explain from "./components/Explain"
import Lion from "./components/Lion"
import SelfAssess from "./components/SelfAssess"
import Intro from "./components/Intro"
import Lead from "./components/Lead"
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Explain />
      <Quote />
      <Lion />
      <SelfAssess />
      <Testimonials />
      <Intro />
      <Lead />
    </div>
  );
}