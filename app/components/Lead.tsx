"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SCRIPT_WORDS = ["comfort", "over", "truth?"];

const scriptSpanClass =
  "font-script text-[1.8em] md:text-[2.05em] leading-[0.5] mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

/*
 * MOBILE SCRIPT
 *
 * Mobile words have their own explicit size so they do not
 * inherit an unexpectedly large size from the heading.
 */
const mobileScriptSpanClass =
  "font-script text-[68px] leading-[0.5] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

export default function Lead() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`lead-section relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12 pt-6 md:pt-12 lg:pt-18 pb-12 md:pb-16 lg:pb-20 -mt-12 md:-mt-16 lg:-mt-24 ${
        isVisible ? "lead-section--visible" : ""
      }`}
    >
      {/* =========================================================
          BACKGROUND
          ========================================================= */}

      <div
        className="lead-bg absolute top-12 md:top-16 lg:top-24 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat rounded-b-[2rem] md:rounded-b-[1.5rem] lg:rounded-b-[2rem] shadow-[0_8px_32px_rgba(80,40,20,0.08)] -z-10"
        style={{ backgroundImage: "url('/Lead/bg.png')" }}
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

            <h1 className="font-serif font-normal text-[clamp(30px,6vw,38px)] md:text-[clamp(36px,4vw,56px)] lg:text-[clamp(48px,5vw,76px)] leading-[0.7] tracking-[-0.04em] text-[#750000] m-0 relative flex-col items-start text-left w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] hidden md:flex">

              <span className="lead-line lead-line--desktop block whitespace-nowrap leading-[0.7] mt-[0.1em] first:mt-0">
                Ready to stop choosing
              </span>

              <span className="lead-line lead-line--desktop flex items-baseline flex-wrap whitespace-nowrap relative justify-start leading-[0.7] mt-[0.1em]">
                {SCRIPT_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className={`${scriptSpanClass} lead-script-word`}
                    style={{
                      animationDelay: `${520 + i * 160}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            {/* ===================================================
                MOBILE HEADING
                =================================================== */}

            <h1 className="pt-10 lead-mobile-heading font-serif font-normal leading-[0.8] tracking-[-0.04em] text-[#750000] m-0 relative flex flex-col items-center text-center w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] flex md:hidden">

              {/* First line */}

              <span className="lead-line lead-line--mobile block leading-[0.8]">
                Ready to stop choosing
              </span>

              {/* Script line */}

              <span className="lead-script-line lead-line--mobile flex items-baseline justify-center leading-[0.8] mt-[0.05em] whitespace-nowrap">
                {SCRIPT_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className={`${mobileScriptSpanClass} lead-script-word ${
                      i === 1 ? "mx-[0.17em]" : "mx-[0.08em]"
                    }`}
                    style={{
                      animationDelay: `${520 + i * 160}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            {/* ===================================================
                SUPPORTING COPY
                =================================================== */}

            <p className="lead-copy font-josefin text-[clamp(13px,1vw,14px)] md:text-[clamp(14px,1.2vw,18px)] font-normal leading-[1.5] tracking-[0.01em] text-[#5a0a0a] text-left m-0 md:text-left text-center">
              We start with a free 20-minute call to see if it's a fit.
              <br />
              Not ready yet? Take the quiz instead.
            </p>

            {/* ===================================================
                CTA BUTTONS
                =================================================== */}

            <div className="lead-buttons flex gap-3 md:gap-4 flex-wrap mt-1 md:justify-start justify-center">

              <button className="lead-cta lead-cta--primary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-bold tracking-[0.05em] text-[#750100] bg-[#F5B7C4] border-none px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase shadow-[0_4px_14px_-4px_rgba(91,7,6,0.55)] hover:bg-[#ecb4b8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.65)]">
                BOOK A CALL
              </button>

              <button className="lead-cta lead-cta--secondary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-semibold tracking-[0.05em] text-white bg-[#5B0706] border border-[#5B0706] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase hover:bg-[#5B0706] hover:text-[#fdd1db] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-4px_rgba(91,7,6,0.3)]">
                TAKE A QUIZ
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
              <Image
                src="/Lead/1.png"
                alt="Lead – majestic, powerful, and aware"
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

            font-size: 38px !important;
            line-height: 0.8 !important;

            margin: 0 !important;
          }

          /*
           * First serif line.
           *
           * This stays independent from the script words.
           */

          .lead-mobile-heading > .lead-line--mobile:first-child {
            font-size: 38px !important;
            line-height: 0.8 !important;

            white-space: nowrap;
          }

          /*
           * Script line.
           *
           * IMPORTANT:
           * The parent itself does NOT get a large font size.
           * Each word controls its own size.
           */

          .lead-script-line {
            width: 100% !important;

            font-size: 1px !important;

            line-height: 0.8 !important;

            display: flex !important;
            align-items: baseline !important;
            justify-content: center !important;

            white-space: nowrap !important;

            transform: none !important;
          }

          /*
           * Script words.
           */

          .lead-script-line .lead-script-word {
            font-size: 68px !important;

            line-height: 0.5 !important;

            flex: 0 0 auto !important;

            white-space: nowrap !important;
          }

          /*
           * The middle word needs slightly more separation.
           */

          .lead-script-line .lead-script-word:nth-child(2) {
            margin-left: 0.17em !important;
            margin-right: 0.17em !important;
          }

          /*
           * Supporting paragraph.
           */

          .lead-copy {
            width: 100% !important;
            max-width: 92% !important;

            font-size: 14px !important;
            line-height: 1.5 !important;

            text-align: center !important;

            margin: 0 !important;
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

          /*
           * First line scales slightly according to the phone,
           * but never becomes excessively large.
           */

          .lead-mobile-heading > .lead-line--mobile:first-child {
            font-size: clamp(30px, 8.2vw, 36px) !important;
          }

          /*
           * Script remains independently controlled.
           */

          .lead-script-line .lead-script-word {
            font-size: 64px !important;
          }

          .lead-copy {
            max-width: 94% !important;

            font-size: 14px !important;
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

          .lead-mobile-heading > .lead-line--mobile:first-child {
            font-size: 30px !important;
          }

          .lead-script-line .lead-script-word {
            font-size: 60px !important;
          }

          .lead-copy {
            font-size: 13.5px !important;
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