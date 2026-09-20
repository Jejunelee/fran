"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SiteContentProvider } from "@/lib/content/context";
import { cmsBg } from "@/lib/content/style";
import type { PageKey, SiteContent } from "@/lib/content/types";

const HomeHero = dynamic(() => import("@/app/components/Hero"));
const HomeExplain = dynamic(() => import("@/app/components/Explain"));
const HomeQuote = dynamic(() => import("@/app/components/Quote"));
const HomeLion = dynamic(() => import("@/app/components/Lion"));
const HomeSelfAssess = dynamic(() => import("@/app/components/SelfAssess"));
const HomeTestimonials = dynamic(() => import("@/app/components/Testimonials"));
const HomeIntro = dynamic(() => import("@/app/components/Intro"));
const HomeLead = dynamic(() => import("@/app/components/Lead"));

const AboutHero = dynamic(() => import("@/app/aboutme/components/Hero"));
const AboutHi = dynamic(() => import("@/app/aboutme/components/Hi"));
const AboutBuilt = dynamic(() => import("@/app/aboutme/components/Built"));
const AboutEnded = dynamic(() => import("@/app/aboutme/components/Ended"));
const AboutPivot = dynamic(() => import("@/app/aboutme/components/Pivot"));
const AboutAgain = dynamic(() => import("@/app/aboutme/components/Again"));
const AboutWhere = dynamic(() => import("@/app/aboutme/components/WhereIAm"));
const AboutCredentials = dynamic(() => import("@/app/aboutme/components/Credentials"));
const AboutBelief = dynamic(() => import("@/app/aboutme/components/Belief"));
const AboutLead = dynamic(() => import("@/app/aboutme/components/Lead"));

const WorkHero = dynamic(() => import("@/app/workwithme/components/Hero"));
const WorkWho = dynamic(() => import("@/app/workwithme/components/WhoIsThisFor"));
const WorkNotFor = dynamic(() => import("@/app/workwithme/components/NotForYouIf"));
const WorkHow = dynamic(() => import("@/app/workwithme/components/HowItWorks"));
const WorkWhat = dynamic(() => import("@/app/workwithme/components/WhatWorkOn"));
const WorkTestimonials = dynamic(() => import("@/app/workwithme/components/Testimonials"));
const WorkProcess = dynamic(() => import("@/app/workwithme/components/Process"));
const WorkFaq = dynamic(() => import("@/app/workwithme/components/FAQ"));
const WorkCta = dynamic(() => import("@/app/workwithme/components/CTA"));

const ContactMain = dynamic(() => import("@/app/contact/components/contact"));

const PREVIEW_COMPONENTS: Record<PageKey, Record<string, React.ComponentType>> = {
  home: {
    hero: HomeHero,
    explain: HomeExplain,
    quote: HomeQuote,
    lion: HomeLion,
    selfAssess: HomeSelfAssess,
    testimonials: HomeTestimonials,
    intro: HomeIntro,
    lead: HomeLead,
  },
  about: {
    hero: AboutHero,
    hi: AboutHi,
    built: AboutBuilt,
    ended: AboutEnded,
    pivot: AboutPivot,
    again: AboutAgain,
    whereIAm: AboutWhere,
    credentials: AboutCredentials,
    belief: AboutBelief,
    lead: AboutLead,
  },
  work: {
    hero: WorkHero,
    who: WorkWho,
    notForYou: WorkNotFor,
    how: WorkHow,
    what: WorkWhat,
    testimonials: WorkTestimonials,
    process: WorkProcess,
    faq: WorkFaq,
    cta: WorkCta,
  },
  contact: {
    main: ContactMain,
  },
};

const ARTBOARD = 1280;

function AboutPageBackdrop({ content }: { content: SiteContent }) {
  const page = content.about.page as { background?: string };
  return (
    <div
      className="flex min-h-[70vh] items-end bg-white bg-cover bg-center p-16"
      style={cmsBg(page.background)}
    >
      <p className="font-serif text-5xl font-light tracking-[-0.03em] text-[#5B0706]">
        About me page background
      </p>
    </div>
  );
}

function useForceInView() {
  useLayoutEffect(() => {
    const Original = window.IntersectionObserver;
    class AlwaysOn extends Original {
      private callback: IntersectionObserverCallback;
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        super(callback, options);
        this.callback = callback;
      }
      observe(target: Element) {
        super.observe(target);
        const rect = target.getBoundingClientRect();
        this.callback(
          [
            {
              isIntersecting: true,
              intersectionRatio: 1,
              target,
              time: performance.now(),
              boundingClientRect: rect,
              intersectionRect: rect,
              rootBounds: null,
            } as IntersectionObserverEntry,
          ],
          this,
        );
      }
    }
    window.IntersectionObserver = AlwaysOn as typeof IntersectionObserver;
    return () => {
      window.IntersectionObserver = Original;
    };
  }, []);
}

export function SectionPreview({
  page,
  section,
  content,
}: {
  page: PageKey;
  section: string;
  content: SiteContent;
}) {
  useForceInView();
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [stageHeight, setStageHeight] = useState(420);

  const Component = PREVIEW_COMPONENTS[page]?.[section];
  const isAboutPage = page === "about" && section === "page";

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const width = frame.clientWidth || ARTBOARD;
      const nextScale = Math.min(1, width / ARTBOARD);
      setScale(nextScale);
      const natural = stageRef.current?.scrollHeight ?? 900;
      setStageHeight(Math.min(Math.max(natural * nextScale, 220), 560));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    const timer = window.setInterval(measure, 800);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [page, section]);

  if (!Component && !isAboutPage) {
    return (
      <p className="px-5 py-10 text-center font-josefin text-sm text-[#5a0a0a]/60">
        No preview for this section.
      </p>
    );
  }

  return (
    <div
      ref={frameRef}
      className="admin-section-preview relative overflow-hidden bg-[#efe8d8]"
      style={{ height: stageHeight }}
    >
      <div
        ref={stageRef}
        className="absolute left-0 top-0 origin-top-left bg-white"
        style={{
          width: ARTBOARD,
          transform: `scale(${scale})`,
          pointerEvents: "none",
        }}
      >
        <SiteContentProvider value={content}>
          {isAboutPage ? <AboutPageBackdrop content={content} /> : Component ? <Component /> : null}
        </SiteContentProvider>
      </div>
    </div>
  );
}
