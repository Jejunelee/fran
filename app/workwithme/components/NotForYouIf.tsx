"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const NotForYouIf = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const c = useSection<{
    styles: SectionStyles;
    background: string;
    headingBefore: string;
    headingScript: string;
    headingAfter: string;
    bullets: string[];
  }>("work", "notForYou");
  const bulletPoints = c.bullets ?? [];

  return (
    <section
      ref={sectionRef}
      className={`not-for-you-section cms-section w-full bg-cover bg-center bg-no-repeat py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-16 lg:px-24 max-md:![min-height:0px] ${
        isVisible ? "not-for-you-section--visible" : ""
      }`}
      style={{
        ...cmsBg(c.background),
        ...cmsStyleVars(c.styles),
        minHeight: "330px",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-20 xl:gap-x-24 items-start">
          {/* Left Column - Heading */}
          <div className="mb-8 lg:mb-0 max-md:mb-6">
            <h2 className="font-serif font-light text-[#7D0808]
              !text-[48px] sm:!text-[56px] !leading-[0.9]
              md:!text-[clamp(60px,5.4vw,96px)] md:!leading-[0.8]
              tracking-[-0.02em] [font-stretch:extra-condensed]
              flex flex-col items-start gap-[0.2em] md:gap-[0.24em]
              m-0
              [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]">
              <span className="not-for-you-line flex items-end justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]">
                {c.headingBefore}
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className="not-for-you-script inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#7D0808] font-normal overflow-visible relative z-[2]" data-cms="script">
                  {c.headingScript}
                </span>
              </span>
              <span className="not-for-you-line flex items-end justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]">
                {c.headingAfter}
              </span>
            </h2>
          </div>

          {/* Right Column - Bullet Points */}
          <div>
            <ul className="space-y-4 sm:space-y-5 md:space-y-6">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="not-for-you-item font-josefin text-[#7D0808] font-medium tracking-[0.01em] flex items-start gap-3
                    !text-[clamp(1.05rem,2vw,1.35rem)] sm:!text-[22px] !leading-[1.5]
                    md:!text-[clamp(18px,1.4vw,22px)]"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <span className="not-for-you-bullet text-[#7D0808] text-xl sm:text-2xl flex-shrink-0 -mt-0.5">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading lines — directional reveal ============
           Line 1 slides in from the left, line 2 follows. The
           script "not" gets its own elastic settle so the decorative
           word has a moment. No clip-path anywhere. */
        .not-for-you-line {
          opacity: 0;
          transform: translate3d(-26px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .not-for-you-line:nth-child(1) { transition-delay: 80ms; }
        .not-for-you-line:nth-child(2) { transition-delay: 220ms; }

        .not-for-you-section--visible .not-for-you-line {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Script "not" — elastic overshoot, pivot near baseline. */
        .not-for-you-script {
          transform-origin: 50% 70%;
          overflow: visible;
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms;
        }
        .not-for-you-section--visible .not-for-you-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* ============ Bullet points — staggered cascade ============
           Each row slides in from the right with a soft de-blur.
           Delays are set inline per item (index * 120ms), starting
           after the heading has landed. */
        .not-for-you-item {
          opacity: 0;
          transform: translate3d(18px, 0, 0);
          filter: blur(4px);
          transition: opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .not-for-you-section--visible .not-for-you-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Bullet markers — pop in one beat after their row ============
           The "•" scales up from zero with a springy overshoot, so
           it lands with a bit of personality rather than just
           fading in. Delay = row delay + 100ms so the marker
           arrives after the text has begun to settle. */
        .not-for-you-bullet {
          display: inline-block;
          opacity: 0;
          transform: scale(0);
          transition: opacity 500ms ease-out,
                      transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .not-for-you-section--visible .not-for-you-bullet {
          opacity: 1;
          transform: scale(1);
        }
        .not-for-you-section--visible .not-for-you-item:nth-child(1) .not-for-you-bullet { transition-delay: 100ms; }
        .not-for-you-section--visible .not-for-you-item:nth-child(2) .not-for-you-bullet { transition-delay: 220ms; }
        .not-for-you-section--visible .not-for-you-item:nth-child(3) .not-for-you-bullet { transition-delay: 340ms; }
        .not-for-you-section--visible .not-for-you-item:nth-child(4) .not-for-you-bullet { transition-delay: 460ms; }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .not-for-you-line,
          .not-for-you-script,
          .not-for-you-item,
          .not-for-you-bullet {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NotForYouIf;