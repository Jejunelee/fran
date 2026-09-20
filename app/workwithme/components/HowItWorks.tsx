"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsBg, cmsStyleVars, mediaUrl, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const worksScriptClass =
  "font-script !text-[2.15em] inline-block tracking-[0.01em] text-[#8F4A4A] relative z-[2] font-normal overflow-visible";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    cat: string;
    heading: string;
    headingScript: string;
    containerLabel: string;
    containerName: string;
    bullets: string[];
    investmentLabel: string;
    investmentPrice: string;
    investmentNote: string;
    investmentBoxBg: string;
    investmentBoxText: string;
    rightCopy: string;
  }>("work", "how");
  const bullets = c.bullets ?? [];

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
      className={`how-section cms-section relative w-full overflow-hidden max-md:![min-height:0px] ${
        isVisible ? "how-section--visible" : ""
      }`}
      style={{
        minHeight: "clamp(650px, 49vw, 760px)",
        ...cmsBg(c.background),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...cmsStyleVars(c.styles),
      }}
    >
      {/* CAT IMAGE — decorative, bottom-right on desktop */}
      <img
        src={mediaUrl(c.cat)}
        alt=""
        aria-hidden="true"
        className="how-cat-desktop pointer-events-none absolute right-0 bottom-0 z-[1] hidden h-auto w-[42vw] max-w-[700px] object-contain md:block"
      />

      {/* CONTENT — extra bottom padding on mobile so the pinned cat doesn't overlap */}
      <div className="relative z-[2] mx-auto w-full max-w-[1504px] px-6 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-20
        max-md:py-10 max-md:px-5 max-md:pb-[220px]">
        {/* Desktop two-column composition */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-8 lg:gap-12
          max-md:gap-8">
          {/* LEFT COLUMN */}
          <div className="md:max-w-[720px]">
            {/* Heading — sizes follow the Explain pattern:
                base = mobile (plain px), md: = clamp() for desktop.
                Script "works" is scaled with `em` relative to the heading,
                so it flows automatically. */}
            <h2
              className="how-heading font-serif font-light text-[#8F4A4A] tracking-[-0.02em] [font-stretch:extra-condensed]
                !text-[36px] sm:!text-[42px] !leading-[0.9]
                md:!text-[clamp(45px,4.05vw,72px)] md:!leading-[0.8]
                flex flex-col items-start gap-[0.2em] md:gap-[0.24em]
                m-0
                [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <span className="how-heading-line flex items-end justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]">
                <span className="font-serif" data-cms="heading">{c.heading}</span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className={`${worksScriptClass} how-heading-script`} data-cms="script">
                  {c.headingScript}
                </span>
              </span>
              <span className="how-heading-line flex items-end justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8] font-serif" data-cms="heading">
                {c.containerLabel}
              </span>
              <span className="how-heading-line flex items-end justify-center md:justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8] font-serif font-semibold mt-9 md:mt-12 w-full" data-cms="heading">
                {c.containerName}
              </span>
            </h2>

            <ul
              className="mt-7 md:mt-[40px] list-disc list-outside pl-6 md:pl-8 space-y-6 md:space-y-[30px] font-josefin font-normal text-[#750100] tracking-[0.01em]
                !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]
                md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]"
            >
              {bullets.map((text, i) => (
              <li key={i} className="how-bullet" style={{ animationDelay: `${360 + i * 100}ms` }} data-cms="body">
                {text}
              </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:w-[min(44vw,680px)] md:pt-4 lg:pt-6">
            {/* Investment box — sizes follow the Explain pattern. */}
            <div
              className="how-investment px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-11 lg:py-7"
              style={{ backgroundColor: c.investmentBoxBg, color: c.investmentBoxText }}
            >
              <p
                className="font-josefin font-bold tracking-[0.01em] uppercase
                  !text-[18px] sm:!text-[20px]
                  md:!text-[clamp(18px,1.5vw,22px)]"
              >
                {c.investmentLabel}
              </p>
              <p
                className="mt-2 font-serif font-light tracking-[-0.02em] [font-stretch:extra-condensed] leading-[1.05]
                  !text-[24px] sm:!text-[28px]
                  md:!text-[clamp(30px,2.7vw,48px)]"
              >
                {c.investmentPrice}
              </p>
              <p
                className="mt-3 font-josefin font-normal
                  !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]
                  md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]"
              >
                {c.investmentNote}
              </p>
            </div>

            {/* Right body paragraph — sizes follow the Explain pattern. */}
            <p
              className="how-right-copy mt-6 md:mt-[30px] font-josefin font-normal text-[#750100] tracking-[0.01em]
                !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]
                md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]"
              data-cms="body"
            >
              {c.rightCopy}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE CAT — pinned to section bottom on mobile */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center md:hidden">
        <img
          src={mediaUrl(c.cat)}
          alt=""
          aria-hidden="true"
          className="how-cat-mobile h-auto w-full max-w-[min(80vw,360px)] object-contain"
        />
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading lines — editorial cascade ============
           Each line rises with a soft de-blur, staggered so the
           three-line heading reveals line-by-line. */
        .how-heading-line {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-heading-line:nth-child(1) { transition-delay: 80ms; }
        .how-heading-line:nth-child(2) { transition-delay: 220ms; }
        .how-heading-line:nth-child(3) { transition-delay: 320ms; }

        .how-section--visible .how-heading-line {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Script "works" — elastic settle.
           transform-origin near baseline so the script flourish
           stays aligned. NO clip-path. */
        .how-heading-script {
          transform-origin: 50% 70%;
          overflow: visible;
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms,
                      transform 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms;
        }
        .how-section--visible .how-heading-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* ============ Bullet list items — directional cascade ============
           Each li slides in from the right with a soft de-blur.
           Delays are inline per item (360ms / 460ms / 560ms / 660ms). */
        .how-bullet {
          opacity: 0;
          transform: translate3d(20px, 0, 0);
          filter: blur(4px);
          transition: opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-section--visible .how-bullet {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Investment box — rise + idle glow ============
           The dark panel rises with a bit of scale and then breathes
           its shadow gently so it reads as the "anchor" of the right
           column. */
        .how-investment {
          opacity: 0;
          transform: translate3d(0, 26px, 0) scale(0.97);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      box-shadow 4500ms ease-in-out;
        }
        .how-section--visible .how-investment {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          animation: howInvestmentPulse 5s ease-in-out 1.4s infinite;
        }
        @keyframes howInvestmentPulse {
          0%   { box-shadow: 0 0 0 0 rgba(117, 1, 0, 0); }
          50%  { box-shadow: 0 10px 30px -6px rgba(117, 1, 0, 0.35); }
          100% { box-shadow: 0 0 0 0 rgba(117, 1, 0, 0); }
        }

        /* ============ Right body paragraph ============ */
        .how-right-copy {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) 900ms,
                      transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 900ms;
        }
        .how-section--visible .how-right-copy {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Cat (desktop) — static, entrance fade only ============ */
        .how-cat-desktop {
          opacity: 0;
          transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms;
        }
        .how-section--visible .how-cat-desktop {
          opacity: 1;
        }

        /* ============ Cat (mobile) — static, entrance fade only ============ */
        .how-cat-mobile {
          opacity: 0;
          transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) 800ms;
        }
        .how-section--visible .how-cat-mobile {
          opacity: 1;
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .how-heading-line,
          .how-heading-script,
          .how-bullet,
          .how-investment,
          .how-right-copy,
          .how-cat-desktop,
          .how-cat-mobile {
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
}