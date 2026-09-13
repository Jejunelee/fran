import Hero from "@/app/workwithme/components/Hero"
import Testimonials from "@/app/workwithme/components/Testimonials"
import FAQ from "@/app/workwithme/components/FAQ"
import NotForYouIf from "@/app/workwithme/components/NotForYouIf"
import WhatWorkOn from "@/app/workwithme/components/WhatWorkOn"
import HowItWorks from "@/app/workwithme/components/HowItWorks"
import WhoIsThisFor from "@/app/workwithme/components/WhoIsThisFor"
import Process from "@/app/workwithme/components/Process"
import CTA from "@/app/workwithme/components/CTA"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <WhoIsThisFor />
      <NotForYouIf />
      <HowItWorks />
      <WhatWorkOn />
      <Testimonials />
      <Process />
      <FAQ />
      <CTA />
    </div>
  );
}