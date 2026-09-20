"use client";

import React, { useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

/*
 * MOBILE SCRIPT
 *
 * Explicit sizing prevents "changes" and "sees you"
 * from becoming disproportionately large because of
 * the parent heading's font size.
 */
const mobileScriptClass =
  "font-script font-normal leading-[0.5] tracking-[0.02em] text-[#750000] inline-block relative z-[2]";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    headingBefore1: string;
    headingScript1: string;
    headingAfter1: string;
    headingBefore2: string;
    headingScript2: string;
    items: { text: string; desktopLines: string; author: string }[];
  }>("home", "testimonials");
  const testimonials = c.items ?? [];
  const desktopLines = testimonials.map((item) =>
    item.desktopLines.split("\n")
  );

  const textClass =
    "font-josefin text-[clamp(1.1rem,1.2vw,1.35rem)] font-medium leading-[1.7] tracking-[0.01em] text-[#5a0a0a] m-0 text-left";

  const authorClass =
    "font-serif font-medium text-[clamp(2.4rem,2.6vw,3rem)] leading-[1.3] tracking-[0.02em] text-[#750000] mt-5 md:mt-7 lg:mt-9 m-0 text-left";

  return (
    <section
      className="testimonials-section cms-section relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
      style={cmsStyleVars(c.styles)}
    >
      {/* =========================================================
          BACKGROUND
          ========================================================= */}

      <div
        className="testimonials-bg absolute inset-0 bg-cover bg-[#F6F2E7] bg-center bg-no-repeat"
        style={cmsBg(c.background)}
      />

      {/* =========================================================
          CONTENT
          ========================================================= */}

      <div className="relative z-10 max-w-[1504px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-8xl mx-auto">

          {/* =====================================================
              HEADING
              ===================================================== */}

          <div className="md:col-span-3 mb-6 md:mb-8 lg:mb-10">
            <h2 className="testimonials-heading font-serif font-light text-[#750000] text-[clamp(2.75rem,5.625vw,5rem)] leading-[0.6] tracking-[-0.02em] [font-stretch:extra-condensed] text-left">

              <span className="block testimonials-headline-line">
                <span data-cms="heading">{c.headingBefore1}</span>{" "}
                <span className="testimonials-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]" data-cms="script">
                  {c.headingScript1}
                </span>{" "}
                <span data-cms="heading">{c.headingAfter1}</span>
              </span>

              <span className="block -mt-1 md:-mt-2 lg:-mt-3 testimonials-headline-line">
                <span data-cms="heading">{c.headingBefore2}</span>{" "}
                <span className="testimonials-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]" data-cms="script">
                  {c.headingScript2}
                </span>
              </span>

            </h2>
          </div>

          {/* =====================================================
              DESKTOP — ALL 3 TESTIMONIALS
              ===================================================== */}

          <div className="hidden md:contents">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className="flex flex-col testimonials-card"
              >
                <p className={textClass}>
                  {desktopLines[i]?.map((line, j) => (
                    <React.Fragment key={j}>
                      <span data-cms="body">{line}</span>
                      {j < (desktopLines[i]?.length ?? 0) - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>

                <p className={authorClass} data-cms="heading">
                  {testimonials[i]?.author}
                </p>
              </div>
            ))}
          </div>

          {/* =====================================================
              MOBILE — ONE TESTIMONIAL AT A TIME
              ===================================================== */}

          <div
            className="testimonials-mobile flex flex-col items-center w-full md:hidden"
            style={{ minHeight: "320px" }}
          >
            <div className="flex flex-col items-center w-full max-w-[600px] flex-1 justify-center">

              <p
                key={`text-${currentIndex}`}
                className="testimonials-mobile-text font-josefin font-medium leading-[1.6] tracking-[0.01em] text-[#5a0a0a] m-0 text-center"
              >
                {testimonials[currentIndex]?.text}
              </p>

              <p
                key={`author-${currentIndex}`}
                className="testimonials-mobile-author font-serif font-medium leading-[1.3] tracking-[0.02em] text-[#750000] mt-5 m-0 text-center"
                data-cms="heading"
              >
                {testimonials[currentIndex]?.author}
              </p>

            </div>

            {/* Navigation Dots */}

            <div className="flex gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#750000] w-8"
                      : "bg-[#D4C5B2] hover:bg-[#B8A892]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          RESPONSIVE + ANIMATION
          ========================================================= */}

      <style jsx global>{`

        /* =======================================================
           MOBILE
           ======================================================= */

        @media (max-width: 767px) {

          /*
           * Main grid
           */

          .testimonials-section .grid {
            display: flex !important;
            flex-direction: column !important;

            align-items: center !important;

            gap: 0 !important;
          }

          /*
           * Heading wrapper
           */

          .testimonials-section .md\\:col-span-3 {
            width: 100% !important;
            max-width: 600px !important;

            margin-bottom: 0 !important;
          }

          /*
           * =====================================================
           * MOBILE HEADING
           *
           * Explicit size.
           * No vw-based scaling.
           * =====================================================
           */

          .testimonials-section .testimonials-heading {
            width: 100% !important;

            font-size: 42px !important;
            line-height: 0.7 !important;

            text-align: center !important;

            margin: 0 !important;
          }

          /*
           * Keep the two heading lines as separate lines.
           */

          .testimonials-section
            .testimonials-heading
            .testimonials-headline-line {
            display: block !important;

            width: 100% !important;

            white-space: nowrap !important;
          }

          /*
           * =====================================================
           * MOBILE SCRIPT
           *
           * "changes" and "sees you" no longer use 2em.
           * This makes their actual size predictable.
           * =====================================================
           */

          .testimonials-section
            .testimonials-heading
            .testimonials-script {
            font-size: 1.75em !important;

            line-height: 0.5 !important;

            letter-spacing: 0.02em !important;
          }

          /*
           * Mobile testimonial container
           */

          .testimonials-section .testimonials-mobile {
            width: 100% !important;

            min-height: 330px !important;

            justify-content: space-between !important;

            margin-top: 24px !important;
          }

          /*
           * Testimonial text
           */

          .testimonials-section .testimonials-mobile-text {
            width: 100% !important;
            max-width: 92% !important;

            font-size: 16px !important;

            line-height: 1.6 !important;

            text-align: center !important;
          }

          /*
           * Author
           */

          .testimonials-section .testimonials-mobile-author {
            font-size: 36px !important;

            line-height: 1.3 !important;

            text-align: center !important;

            margin-top: 20px !important;
          }

          /*
           * Navigation
           */

          .testimonials-section .testimonials-mobile > .flex {
            margin-top: 24px !important;
          }
        }

        /* =======================================================
           NARROW PHONES
           ======================================================= */

        @media (max-width: 430px) {

          .testimonials-section {
            padding-top: 48px !important;
            padding-bottom: 64px !important;
          }

          /*
           * Heading
           */

          .testimonials-section .testimonials-heading {
            font-size: 34px !important;

            line-height: 0.76 !important;
          }

          /*
           * Script
           *
           * Still explicit and independent.
           */

          .testimonials-section
            .testimonials-heading
            .testimonials-script {
            font-size: 1.7em !important;
          }

          /*
           * Keep heading from becoming wider than the phone.
           */

          .testimonials-section
            .testimonials-heading
            .testimonials-headline-line {
            white-space: nowrap !important;
          }

          /*
           * Mobile testimonial area
           */

          .testimonials-section .testimonials-mobile {
            min-height: 320px !important;

            margin-top: 20px !important;
          }

          /*
           * Body copy
           */

          .testimonials-section .testimonials-mobile-text {
            max-width: 94% !important;

            font-size: 15px !important;

            line-height: 1.6 !important;
          }

          /*
           * Author
           */

          .testimonials-section .testimonials-mobile-author {
            font-size: 34px !important;

            margin-top: 18px !important;
          }
        }

        /* =======================================================
           SMALL PHONES
           ======================================================= */

        @media (max-width: 375px) {

          .testimonials-section {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .testimonials-section .relative.z-10 {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          /*
           * Heading gets slightly smaller only on very narrow
           * screens so the first line never gets clipped.
           */

          .testimonials-section .testimonials-heading {
            font-size: 30px !important;

            line-height: 0.78 !important;
          }

          /*
           * Script remains prominent without exploding.
           */

          .testimonials-section
            .testimonials-heading
            .testimonials-script {
            font-size: 1.65em !important;
          }

          /*
           * Testimonial copy
           */

          .testimonials-section .testimonials-mobile-text {
            max-width: 95% !important;

            font-size: 14px !important;
          }

          /*
           * Author
           */

          .testimonials-section .testimonials-mobile-author {
            font-size: 32px !important;
          }
        }

        /* =======================================================
           ANIMATION — HEADLINE
           ======================================================= */

        .testimonials-headline-line {
          opacity: 0;

          transform:
            translate3d(-24px, 0, 0);

          filter: blur(6px);

          animation:
            testimonialsHeadline
            900ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .testimonials-headline-line:nth-child(1) {
          animation-delay: 0ms;
        }

        .testimonials-headline-line:nth-child(2) {
          animation-delay: 120ms;
        }

        @keyframes testimonialsHeadline {

          0% {
            opacity: 0;

            transform:
              translate3d(-24px, 0, 0);

            filter: blur(6px);
          }

          60% {
            opacity: 1;

            filter: blur(0);
          }

          100% {
            opacity: 1;

            transform:
              translate3d(0, 0, 0);

            filter: blur(0);
          }
        }

        /* =======================================================
           SCRIPT ANIMATION
           ======================================================= */

        .testimonials-script {
          transform-origin: 50% 70%;

          animation:
            testimonialsScriptPulse
            5.5s
            ease-in-out
            infinite;
        }

        @keyframes testimonialsScriptPulse {

          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -3px, 0)
              rotate(-0.5deg)
              scale(1.012);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }
        }

        /* =======================================================
           BACKGROUND
           ======================================================= */

        .testimonials-bg {
          animation:
            testimonialsBgBreath
            18s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes testimonialsBgBreath {

          0% {
            filter:
              brightness(1)
              saturate(1);
          }

          100% {
            filter:
              brightness(1.03)
              saturate(1.04);
          }
        }

        /* =======================================================
           DESKTOP TESTIMONIAL CARDS
           ======================================================= */

        .testimonials-card {
          opacity: 0;

          transform:
            translate3d(0, 24px, 0);

          animation:
            testimonialsCardIn
            800ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .testimonials-card:nth-child(1) {
          animation-delay: 260ms;
        }

        .testimonials-card:nth-child(2) {
          animation-delay: 380ms;
        }

        .testimonials-card:nth-child(3) {
          animation-delay: 500ms;
        }

        @keyframes testimonialsCardIn {

          0% {
            opacity: 0;

            transform:
              translate3d(0, 24px, 0);
          }

          100% {
            opacity: 1;

            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =======================================================
           MOBILE TESTIMONIAL ANIMATION
           ======================================================= */

        .testimonials-mobile-text {
          animation:
            testimonialsMobileIn
            520ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .testimonials-mobile-author {
          animation:
            testimonialsMobileIn
            520ms
            cubic-bezier(0.22, 1, 0.36, 1)
            90ms
            both;
        }

        @keyframes testimonialsMobileIn {

          0% {
            opacity: 0;

            transform:
              translate3d(0, 10px, 0);
          }

          100% {
            opacity: 1;

            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =======================================================
           REDUCED MOTION
           ======================================================= */

        @media (prefers-reduced-motion: reduce) {

          .testimonials-headline-line,
          .testimonials-script,
          .testimonials-bg,
          .testimonials-card,
          .testimonials-mobile-text,
          .testimonials-mobile-author {
            animation: none !important;

            opacity: 1 !important;

            transform: none !important;

            filter: none !important;
          }
        }

      `}</style>
    </section>
  );
}