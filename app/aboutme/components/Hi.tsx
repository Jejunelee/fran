"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const francescaScriptClass =
  "font-script !text-[5.05em] inline-block tracking-[0.01em] text-[#750000] relative z-[2] font-normal overflow-visible";

const hiFrancescaCss = String.raw`
  /* ============ "Hi, I'm" — rises and de-blurs ============ */
  .hi-francesca-greeting {
    opacity: 0;
    filter: blur(5px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms,
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms;
  }
  .hi-francesca-section--visible .hi-francesca-greeting {
    opacity: 1;
    filter: blur(0);
  }

  /* ============ "Francesca" — elastic settle ============
     The span carries a translate-y nudge (set via inline style
     on the element) so the script sits lower relative to
     "Hi, I'm". The animation composes its own translate3d and
     must END at that same offset, so the final transform
     below uses translate3d(0, var(--francesca-nudge, 0), 0)
     to settle where the layout put it. */
  .hi-francesca-script {
    transform-origin: 50% 70%;
    overflow: visible;
    opacity: 0;
    transform: translate3d(0, 26px, 0) scale(0.82) rotate(-6deg);
    transition: opacity 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms,
                transform 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms;
    will-change: transform, opacity;
  }
  .hi-francesca-section--visible .hi-francesca-script {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }

  .hi-francesca-section--visible .hi-francesca-script {
    animation: hiFrancescaBreath 6s ease-in-out 1.6s infinite;
  }
  @keyframes hiFrancescaBreath {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
    50%  { transform: translate3d(0, -3px, 0) rotate(-0.5deg) scale(1.008); }
    100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  }

  /* ============ Paragraph — rises and de-blurs ============ */
  .hi-francesca-paragraph {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    filter: blur(4px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms,
                transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms,
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms;
  }
  .hi-francesca-section--visible .hi-francesca-paragraph {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }

  /* ============ Background — very slow ambient brightness breath ============ */
  .hi-francesca-bg {
    animation: hiFrancescaBgBreath 20s ease-in-out infinite alternate;
  }
  @keyframes hiFrancescaBgBreath {
    0%   { filter: brightness(1) saturate(1); }
    100% { filter: brightness(1.025) saturate(1.035); }
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .hi-francesca-greeting,
    .hi-francesca-script,
    .hi-francesca-paragraph,
    .hi-francesca-bg {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

export default function HiImFrancesca() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    greeting: string;
    name: string;
    body: string;
  }>("about", "hi");

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

  return (
    <section
      ref={sectionRef}
      className={`hi-francesca-section cms-section relative w-full max-md:!min-h-[500px] ${
        isVisible ? "hi-francesca-section--visible" : ""
      }`}
      style={{
        minHeight: "clamp(480px, 34.5vw, 560px)",
        ...cmsStyleVars(c.styles),
      }}
    >
      {/* Background layer */}
      <div
        className="hi-francesca-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={cmsBg(c.background)}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[inherit] w-full items-center justify-center px-5 py-12 sm:px-6 max-md:py-12">
        <div className="mx-auto flex w-full max-w-[1200px] min-w-0 flex-col items-center text-center">
          {/* Heading */}
          <h1
            className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
              !text-[24px] sm:!text-[28px] !leading-[0.9]
              md:!text-[clamp(30px,2.7vw,48px)] md:!leading-[0.8]
              flex flex-col items-center gap-[0.2em] md:gap-[0.24em]
              m-0
              [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <span className="hi-francesca-greeting flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]
              !text-[30px] sm:!text-[35px] md:!text-[clamp(37.5px,3.375vw,60px)]
              -translate-y-3 md:-translate-y-6">
              <span data-cms="heading">{c.greeting}</span>
            </span>
            <span className="flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]">
              <span className={`${francescaScriptClass} hi-francesca-script`} data-cms="script">
                {c.name}
              </span>
            </span>
          </h1>

          <p
            className="hi-francesca-paragraph mx-auto mt-6 md:mt-[38px] w-full max-w-full sm:max-w-[700px] md:max-w-[1100px] font-josefin font-normal text-[#111111]
              !text-[clamp(1.14rem,2.16vw,1.5rem)] sm:!text-[24px] !leading-[1.5]
              md:!text-[clamp(19.2px,1.5vw,24px)] md:!leading-[1.5]"
            data-cms="body"
          >
            {c.body}
          </p>
        </div>
      </div>

      {/* CSS lives in a String.raw constant at module scope. */}
      <style dangerouslySetInnerHTML={{ __html: hiFrancescaCss }} />
    </section>
  );
}