"use client";

import React, { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const scriptSpanClass =
  "font-script !text-[2.15em] inline-block tracking-[0.01em] text-[#750000] relative z-[2] font-normal overflow-visible";

export default function Lead() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    image: string;
    imageAlt: string;
    heading: string;
    scriptWords: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }>("home", "lead");
  const scriptWords = c.scriptWords?.split(/\s+/) ?? [];
  const bodyLines = c.body?.split("\n") ?? [];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      className={`lead-section cms-section relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12 pt-6 md:pt-12 lg:pt-18 pb-12 md:pb-16 lg:pb-20 -mt-12 md:-mt-16 lg:-mt-24 ${
        isVisible ? "lead-section--visible" : ""
      }`}
      style={cmsStyleVars(c.styles)}
    >
      {/* =========================================================
          BACKGROUND
          ========================================================= */}

      <div
        className="lead-bg absolute top-12 md:top-16 lg:top-24 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat rounded-b-[2rem] md:rounded-b-[1.5rem] lg:rounded-b-[2rem] shadow-[0_8px_32px_rgba(80,40,20,0.08)] -z-10"
        style={cmsBg(c.background)}
      />

      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] lg:grid-cols-[70%_30%] gap-2 md:gap-4 lg:gap-6 items-center w-full">

        {/* =======================================================
            LEFT: TEXT PANEL
            ======================================================= */}

        <section className="relative z-[2] flex flex-col justify-center w-full h-full overflow-visible py-3 md:py-6 lg:py-8 md:pr-4 lg:pr-6">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full max-w-full mt-9 md:mt-14 lg:mt-18">

            {/* ===================================================
                DESKTOP HEADING
                =================================================== */}

            <h1 className="font-serif font-light text-[clamp(2.625rem,11.25vw,6.3rem)] md:text-[clamp(2.25rem,6.3vw,6.3rem)] leading-[0.85] md:leading-[0.7] tracking-[-0.02em] text-[#750000] m-0 relative hidden md:flex flex-col items-start gap-[0.22em] md:gap-[0.28em] text-left w-full [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]">

              <span className="lead-line lead-line--desktop flex items-end justify-start whitespace-nowrap overflow-visible h-[0.85em] leading-[0.85] md:h-[0.7em] md:leading-[0.7]">
                <span data-cms="heading">{c.heading}</span>
              </span>

              <span className="lead-line lead-line--desktop flex items-end justify-start whitespace-nowrap overflow-visible relative h-[0.85em] leading-[0.85] md:h-[0.7em] md:leading-[0.7]">
                {scriptWords.map((word, i) => (
                  <React.Fragment key={word}>
                    {i > 0 && (
                      <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                    )}
                    <span
                      className={`${scriptSpanClass} lead-script-word`}
                      style={{
                        animationDelay: `${520 + i * 160}ms`,
                      }}
                      data-cms="script"
                    >
                      {word}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            </h1>

            {/* ===================================================
                MOBILE HEADING
                =================================================== */}

            <h1 className="pt-10 lead-mobile-heading font-serif font-light !text-[24px] sm:!text-[28px] leading-[0.85] tracking-[-0.02em] text-[#750000] m-0 relative flex md:hidden flex-col items-center gap-[0.2em] text-center w-full [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]">

              <span className="lead-line lead-line--mobile flex items-end justify-center whitespace-nowrap overflow-visible h-[0.85em] leading-[0.85]" data-cms="heading">
                {c.heading}
              </span>

              <span className="lead-script-line lead-line--mobile flex items-end justify-center whitespace-nowrap overflow-visible h-[0.85em] leading-[0.85]">
                {scriptWords.map((word, i) => (
                  <React.Fragment key={word}>
                    {i > 0 && (
                      <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                    )}
                    <span
                      className={`${scriptSpanClass} lead-script-word`}
                      style={{
                        animationDelay: `${520 + i * 160}ms`,
                      }}
                    >
                      {word}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            </h1>

            {/* ===================================================
                SUPPORTING COPY
                =================================================== */}

            <p className="lead-copy font-josefin !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl md:!text-[clamp(16px,1.25vw,20px)] font-normal !leading-[1.5] tracking-[0.01em] text-[#5a0a0a] text-left mt-10 md:mt-12 md:text-left text-center" data-cms="body">
              {bodyLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < bodyLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            {/* ===================================================
                CTA BUTTONS
                =================================================== */}

            <div className="lead-buttons flex gap-3 md:gap-4 flex-wrap mt-1 md:justify-start justify-center">

              <button className="lead-cta lead-cta--primary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-bold tracking-[0.05em] text-[#750100] bg-[#F5B7C4] border-none px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase shadow-[0_4px_14px_-4px_rgba(91,7,6,0.55)] hover:bg-[#ecb4b8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.65)]">
                {c.ctaPrimary}
              </button>

              <button className="lead-cta lead-cta--secondary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-semibold tracking-[0.05em] text-white bg-[#5B0706] border border-[#5B0706] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase hover:bg-[#5B0706] hover:text-[#fdd1db] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-4px_rgba(91,7,6,0.3)]">
                {c.ctaSecondary}
              </button>

            </div>
          </div>
        </section>

        {/* =======================================================
            RIGHT: IMAGE PANEL — DESKTOP ONLY
            ======================================================= */}

        <section className="relative z-[2] flex items-center justify-center w-full h-full overflow-visible py-3 md:py-6 lg:py-8 md:pl-4 lg:pl-6 hidden md:flex">
          <div className="flex items-center justify-center w-full h-full overflow-visible">

            <div
              className={`lead-image-float flex items-center justify-center w-full ${
                isVisible ? "lead-image-float--active" : ""
              }`}
            >
              <CmsImage
                src={c.image}
                alt={c.imageAlt}
                width={400}
                height={488}
                className="relative z-[2] w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] h-auto aspect-[0.82/1] object-contain block drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)] scale-[1.20] rounded-lg -mt-2 md:-mt-4 lg:-mt-6 overflow-visible"
                priority
              />
            </div>

          </div>
        </section>
      </div>

      {/* =========================================================
          RESPONSIVE + ANIMATION
          ========================================================= */}

      <style jsx>{`

        /* =======================================================
           MOBILE LAYOUT
           ======================================================= */

        @media (max-width: 767px) {

          .lead-section {
            width: 100%;
            max-width: 100%;

            padding-left: 24px;
            padding-right: 24px;

            padding-top: 24px;
            padding-bottom: 48px;

            margin-top: -48px;
          }

          .lead-section > .grid {
            display: flex !important;
            flex-direction: column !important;

            align-items: center !important;
            justify-content: center !important;

            gap: 0 !important;

            min-height: auto !important;
          }

          /*
           * Text section
           */

          .lead-section > .grid > section:first-child {
            width: 100% !important;
            max-width: 600px !important;

            height: auto !important;

            padding: 0 !important;

            order: 1 !important;

            align-items: center !important;
            justify-content: center !important;

            overflow: visible !important;
          }

          .lead-section > .grid > section:first-child > div {
            width: 100% !important;
            max-width: 100% !important;

            margin-top: 32px !important;

            gap: 18px !important;

            align-items: center !important;
          }

          /*
           * Hide desktop image.
           */

          .lead-section > .grid > section:last-child {
            display: none !important;
          }

          /* =====================================================
             MOBILE HEADING
             ===================================================== */

          .lead-mobile-heading {
            width: 100% !important;
            margin: 0 !important;
          }

          .lead-mobile-heading > .lead-line--mobile:first-child {
            white-space: nowrap;
          }

          .lead-script-line {
            width: 100% !important;

            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;

            white-space: nowrap !important;

            transform: none !important;
          }

          .lead-script-line .lead-script-word {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
          }

          .lead-copy {
            width: 100% !important;
            max-width: 92% !important;
            text-align: center !important;
            margin: 32px 0 0 0 !important;
            font-size: clamp(0.95rem, 1.8vw, 1.25rem) !important;
            line-height: 1.5 !important;
          }

          @media (min-width: 640px) {
            .lead-copy {
              font-size: 1.25rem !important;
            }
          }

          /*
           * Buttons.
           */

          .lead-buttons {
            width: 100% !important;

            flex-direction: column !important;

            align-items: center !important;
            justify-content: center !important;

            gap: 10px !important;

            margin-top: 2px !important;
          }

          .lead-buttons button {
            width: auto !important;
            min-width: 180px !important;

            font-size: 13px !important;

            padding:
              0.75rem
              1.6rem !important;

            text-align: center !important;
          }
        }

        /* =======================================================
           NARROW PHONES
           ======================================================= */

        @media (max-width: 430px) {

          .lead-section {
            padding-left: 20px;
            padding-right: 20px;

            padding-top: 20px;
            padding-bottom: 42px;

            margin-top: -42px;
          }

          .lead-section > .grid > section:first-child > div {
            margin-top: 28px !important;

            gap: 17px !important;
          }

          .lead-copy {
            max-width: 94% !important;
          }
        }

        /* =======================================================
           VERY NARROW PHONES
           ======================================================= */

        @media (max-width: 375px) {

          .lead-section {
            padding-left: 18px;
            padding-right: 18px;
          }

          .lead-buttons button {
            min-width: 170px !important;
          }
        }

        /* =======================================================
           HEADLINE ANIMATION
           ======================================================= */

        .lead-line {
          opacity: 0;

          transform:
            translate3d(-22px, 0, 0);

          filter: blur(6px);

          transition:
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .lead-line:nth-child(1) {
          transition-delay: 80ms;
        }

        .lead-line:nth-child(2) {
          transition-delay: 200ms;
        }

        .lead-section--visible .lead-line {
          opacity: 1;

          transform:
            translate3d(0, 0, 0);

          filter: blur(0);
        }

        /* =======================================================
           SCRIPT WORD ANIMATION
           ======================================================= */

        .lead-script-word {
          opacity: 0;

          transform:
            translate3d(0, 22px, 0)
            scale(0.85)
            rotate(-6deg);

          transform-origin: 50% 70%;

          transition:
            opacity 950ms cubic-bezier(0.34, 1.56, 0.64, 1),
            transform 950ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lead-section--visible .lead-script-word {
          opacity: 1;

          transform:
            translate3d(0, 0, 0)
            scale(1)
            rotate(0deg);
        }

        /* =======================================================
           SCRIPT BREATH
           ======================================================= */

        .lead-section--visible .lead-script-word {
          animation:
            leadScriptBreath
            5.5s
            ease-in-out
            1.7s
            infinite;
        }

        @keyframes leadScriptBreath {

          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -2px, 0)
              rotate(-0.5deg)
              scale(1.008);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }
        }

        /* =======================================================
           DESKTOP SCRIPT
           ======================================================= */

        @media (min-width: 768px) {

          .lead-script-word {
            transform:
              translate3d(0, 22px, 0)
              scale(0.85)
              rotate(-6deg);
          }

          .lead-section--visible .lead-script-word {
            transform:
              translate3d(0, 0, 0)
              scale(1)
              rotate(0deg);
          }

          @keyframes leadScriptBreath {

            0% {
              transform:
                translate3d(0, 0, 0)
                rotate(0deg)
                scale(1);
            }

            50% {
              transform:
                translate3d(0, -2px, 0)
                rotate(-0.5deg)
                scale(1.008);
            }

            100% {
              transform:
                translate3d(0, 0, 0)
                rotate(0deg)
                scale(1);
            }
          }
        }

        /* =======================================================
           SUPPORTING COPY ANIMATION
           ======================================================= */

        .lead-copy {
          opacity: 0;

          transform:
            translate3d(0, 14px, 0);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms;
        }

        .lead-section--visible .lead-copy {
          opacity: 1;

          transform:
            translate3d(0, 0, 0);
        }

        /* =======================================================
           CTA ANIMATION
           ======================================================= */

        .lead-cta {
          opacity: 0;

          transform:
            translate3d(0, 16px, 0);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .lead-cta--primary {
          transition-delay: 1300ms;
        }

        .lead-cta--secondary {
          transition-delay: 1440ms;
        }

        .lead-section--visible .lead-cta {
          opacity: 1;

          transform:
            translate3d(0, 0, 0);
        }

        .lead-section--visible .lead-cta--primary {
          animation:
            leadCtaPulsePink
            4.5s
            ease-in-out
            2s
            infinite;
        }

        .lead-section--visible .lead-cta--secondary {
          animation:
            leadCtaPulseDark
            4.5s
            ease-in-out
            2.2s
            infinite;
        }

        @keyframes leadCtaPulsePink {

          0% {
            box-shadow:
              0 4px 14px -4px rgba(91, 7, 6, 0.55);
          }

          50% {
            box-shadow:
              0 6px 20px -4px rgba(91, 7, 6, 0.75);
          }

          100% {
            box-shadow:
              0 4px 14px -4px rgba(91, 7, 6, 0.55);
          }
        }

        @keyframes leadCtaPulseDark {

          0% {
            box-shadow:
              0 0 0 0 rgba(91, 7, 6, 0);
          }

          50% {
            box-shadow:
              0 6px 20px -4px rgba(91, 7, 6, 0.32);
          }

          100% {
            box-shadow:
              0 0 0 0 rgba(91, 7, 6, 0);
          }
        }

        .lead-cta:hover {
          animation-play-state: paused;
        }

        /* =======================================================
           BACKGROUND BREATH
           ======================================================= */

        .lead-section--visible .lead-bg {
          animation:
            leadBgBreath
            14s
            ease-in-out
            1.8s
            infinite;
        }

        @keyframes leadBgBreath {

          0% {
            box-shadow:
              0 8px 32px rgba(80, 40, 20, 0.08);
          }

          50% {
            box-shadow:
              0 14px 44px rgba(80, 40, 20, 0.12);
          }

          100% {
            box-shadow:
              0 8px 32px rgba(80, 40, 20, 0.08);
          }
        }

        /* =======================================================
           DESKTOP FLOATING IMAGE
           ======================================================= */

        .lead-image-float {
          opacity: 1;
        }

        .lead-image-float--active {
          animation:
            leadImageFloat
            6s
            ease-in-out
            infinite;

          animation-delay: 0.4s;
        }

        @keyframes leadImageFloat {

          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          25% {
            transform:
              translate3d(0, -8px, 0)
              rotate(-0.3deg);
          }

          50% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          75% {
            transform:
              translate3d(0, -5px, 0)
              rotate(0.2deg);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }
        }

        /* =======================================================
           REDUCED MOTION
           ======================================================= */

        @media (prefers-reduced-motion: reduce) {

          .lead-line,
          .lead-script-word,
          .lead-copy,
          .lead-cta,
          .lead-image-float--active,
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

      `}</style>
    </main>
  );
}