"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const scriptSpanClass =
  "font-script leading-[0.5] mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)] " +
  "!text-[1.8em] md:!text-[2.05em]";

const mobileScriptSpanClass =
  "font-script leading-[0.5] inline-block tracking-[0.02em] text-[#750000]";

const leadCss = String.raw`
  /* ============ Animation layer ============ */

  /* Heading lines — editorial slide from left, de-blur. */
  .lead-line {
    opacity: 0;
    transform: translate3d(-22px, 0, 0);
    filter: blur(6px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .lead-line--desktop-1 { transition-delay: 80ms; }
  .lead-line--desktop-2 { transition-delay: 240ms; }
  .lead-line--mobile-1  { transition-delay: 80ms; }
  .lead-line--mobile-2  { transition-delay: 240ms; }

  .lead-section--visible .lead-line {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }

  /* Script "resonated" — elastic settle. */
  .lead-script {
    transform-origin: 50% 70%;
    opacity: 0;
    transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
    transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms,
                transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms;
  }
  .lead-section--visible .lead-script--desktop {
    opacity: 1;
    transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
  }
  .lead-section--visible .lead-script--mobile {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
  @media (min-width: 768px) {
    .lead-section--visible .lead-script--desktop {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }

  /* CTA buttons — staggered rise + idle glow pulse. */
  .lead-cta {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
    transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
                transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
                background-color 300ms ease-in-out;
  }
  .lead-cta--primary   { transition-delay: 700ms; }
  .lead-cta--secondary { transition-delay: 840ms; }

  .lead-section--visible .lead-cta {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .lead-section--visible .lead-cta--primary {
    animation: leadCtaPulsePrimary 4.5s ease-in-out 1.6s infinite;
  }
  .lead-section--visible .lead-cta--secondary {
    animation: leadCtaPulseSecondary 4.5s ease-in-out 1.8s infinite;
  }
  @keyframes leadCtaPulsePrimary {
    0%   { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.55); }
    50%  { box-shadow: 0 6px 20px -4px rgba(91, 7, 6, 0.75); }
    100% { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.55); }
  }
  @keyframes leadCtaPulseSecondary {
    0%   { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
    50%  { box-shadow: 0 6px 20px -4px rgba(91, 7, 6, 0.32); }
    100% { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
  }
  .lead-cta:hover {
    animation-play-state: paused;
  }

  /* Background — slow depth breath. */
  .lead-section--visible .lead-bg {
    animation: leadBgBreath 14s ease-in-out 1.6s infinite;
  }
  @keyframes leadBgBreath {
    0%   { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
    50%  { box-shadow: 0 14px 44px rgba(80, 40, 20, 0.12); }
    100% { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
  }

  /* Reduced motion. */
  @media (prefers-reduced-motion: reduce) {
    .lead-line,
    .lead-script,
    .lead-cta,
    .lead-bg {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
    .lead-cta:hover {
      animation: none !important;
    }
  }
`;

export default function Lead() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    heading: string;
    headingScript: string;
    headingEndDesktop: string;
    headingEndMobile: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }>("about", "lead");
  const scriptWords = c.headingScript?.split(/\s+/) ?? [];

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
    <main
      ref={sectionRef}
      className={`lead-section cms-section relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12 pt-20 md:pt-12 lg:pt-18 pb-12 md:pb-16 lg:pb-20 -mt-12 md:-mt-16 lg:-mt-24 ${
        isVisible ? "lead-section--visible" : ""
      }`}
      style={cmsStyleVars(c.styles)}
    >
      {/* Background layer */}
      <div
        className="lead-bg absolute top-12 md:top-16 lg:top-24 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat rounded-b-[2rem] md:rounded-b-[1.5rem] lg:rounded-b-[2rem] shadow-[0_8px_32px_rgba(80,40,20,0.08)] -z-10"
        style={cmsBg(c.background)}
      />

      <div className="flex flex-col items-center justify-center w-full">
        {/* TEXT PANEL - Centered */}
        <section className="relative z-[2] flex flex-col justify-center items-center w-full h-full overflow-visible py-3 md:py-6 lg:py-8">
          <div className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6 w-full max-w-full min-w-0 mt-9 md:mt-14 lg:mt-18">
            {/* Desktop heading — unchanged */}
            <h1
              className="lead-heading lead-heading--desktop font-serif font-normal text-[#750000] tracking-[-0.04em] m-0 relative flex-col items-center text-center w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] hidden md:flex
                md:!text-[clamp(36px,4vw,56px)] md:!leading-[0.7]
                lg:!text-[clamp(48px,5vw,76px)] lg:!leading-[0.7]"
            >
              <span className="lead-line lead-line--desktop-1 flex items-baseline flex-wrap whitespace-nowrap relative justify-center leading-[0.7] mt-[0.1em] first:mt-0">
                <span className="font-serif inline-block relative z-[1] leading-[0.7] text-[1em]" data-cms="heading">
                  {c.heading}
                </span>
                {scriptWords.map((word) => (
                  <span
                    key={word}
                    className={`${scriptSpanClass} lead-script lead-script--desktop`}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="lead-line lead-line--desktop-2 flex items-baseline flex-wrap whitespace-nowrap relative justify-center leading-[0.7] mt-[0.1em]">
                <span className="font-serif inline-block relative z-[1] leading-[0.7] text-[1em]" data-cms="heading">
                  {c.headingEndDesktop}
                </span>
              </span>
            </h1>

            {/* Mobile heading — sizes reduced further */}
            <h1
              className="lead-heading lead-heading--mobile font-serif font-normal text-[#750000] tracking-[-0.04em] m-0 relative flex flex-col items-center text-center w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] flex md:hidden
                !text-[28px] sm:!text-[32px] !leading-[0.85]"
            >
              <span className="lead-line lead-line--mobile-1 flex items-baseline justify-center leading-[0.85] flex-wrap">
                <span className="block leading-[0.85]" data-cms="heading">
                  {c.heading}&nbsp;&nbsp;
                </span>
                <span className="flex items-baseline justify-center leading-[0.85] mt-[0.05em] text-[2.6em]">
                  {scriptWords.map((word, i) => (
                    <span
                      key={word}
                      className={`${mobileScriptSpanClass} lead-script lead-script--mobile ${
                        i === 1 ? "mx-[0.04em]" : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="lead-line lead-line--mobile-2 block leading-[0.85] mt-[0.05em]" data-cms="heading">
                {c.headingEndMobile}
              </span>
            </h1>

            <p
              className="font-josefin font-normal leading-[1.5] tracking-[0.01em] text-[#5a0a0a] text-center m-0
                !text-[12px] sm:!text-[13px]
                md:!text-[clamp(14px,1.2vw,18px)]"
            >
            </p>

            <div className="lead-cta-row flex gap-3 md:gap-4 flex-wrap mt-1 justify-center">
              <button
                className="lead-cta lead-cta--primary font-josefin font-bold tracking-[0.05em] text-[#750100] bg-[#F5B7C4] border-none px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase shadow-[0_4px_14px_-4px_rgba(91,7,6,0.55)] hover:bg-[#ecb4b8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.65)]
                  !text-[11px] sm:!text-[12px]
                  md:!text-[clamp(14px,1vw,18px)]"
              >
                {c.ctaPrimary}
              </button>
              <button
                className="lead-cta lead-cta--secondary font-josefin font-semibold tracking-[0.05em] text-white bg-[#5B0706] border border-[#5B0706] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase hover:bg-[#5B0706] hover:text-[#fdd1db] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-4px_rgba(91,7,6,0.3)]
                  !text-[11px] sm:!text-[12px]
                  md:!text-[clamp(14px,1vw,18px)]"
              >
                {c.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* CSS lives in a String.raw constant at module scope. */}
      <style dangerouslySetInnerHTML={{ __html: leadCss }} />
    </main>
  );
}