"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsStyleVars, mediaUrl, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const builtScriptClass =
  "font-script text-[2.325em] leading-[0.5] mx-[0.04em] translate-y-[0.02em] inline-block tracking-[0.02em] text-[#F3C8D0] relative z-[2] font-normal";

export default function TheLifeIBuilt() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    panelColor: string;
    book: string;
    photo: string;
    heading: string;
    headingScript: string;
    body1: string;
    body2: string;
  }>("about", "built");

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
      className={`life-built-section cms-section relative w-full overflow-visible min-h-fit ${
        isVisible ? "life-built-section--visible" : ""
      }`}
      style={{
        backgroundColor: c.panelColor || "#5B0706",
        ...cmsStyleVars(c.styles),
      }}
    >
      {/* BOOK LAYER — sticks left, overlaps top (all sizes) */}
      <div className="life-built-book pointer-events-none absolute left-0 top-[-40px] sm:top-[-55px] md:top-[-55px] z-[3] w-[min(62vw,380px)] sm:w-[min(58vw,460px)] md:w-[clamp(500px,46vw,720px)]">
        <div className="relative w-full">
          <img
            src={mediaUrl(c.book)}
            alt=""
            aria-hidden="true"
            className="life-built-book-img relative z-[1] h-auto w-full object-contain"
          />
          <img
            src={mediaUrl(c.photo)}
            alt=""
            aria-hidden="true"
            className="life-built-picture absolute left-[30%] top-[18%] z-[2] w-[54%] h-auto object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-[2] mx-auto w-full max-w-[1504px] px-6 py-12 sm:px-8 md:py-14 lg:px-12
        max-md:!z-10 max-md:px-5 max-md:pt-[70vw] max-md:pb-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[48%_52%] md:gap-8 lg:gap-12
          max-md:gap-0">
          {/* LEFT COLUMN — spacer on desktop, empty on mobile */}
          <div className="hidden md:block md:pointer-events-none md:min-h-[600px]" />

          {/* RIGHT COLUMN — text, pulled left with negative margin */}
          <div className="min-w-0 md:max-w-[700px] md:pt-[60px] md:pb-[60px] md:-ml-6 lg:-ml-10">
            {/* Heading */}
            <h2 className="life-built-heading font-serif font-normal text-[#F3C8D0] leading-[0.85] tracking-[-0.04em] text-[clamp(38px,4.5vw,70px)]
              max-md:text-[clamp(30px,8.5vw,44px)] max-md:leading-[0.95]">
              <span className="font-serif" data-cms="heading">{c.heading} </span>
              <span
                className={`${builtScriptClass} life-built-script max-md:!text-[2.175em] max-md:!leading-[0.75]`}
                data-cms="script"
              >
                {c.headingScript}
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="mt-[35px] md:mt-[38px] space-y-[32px] md:space-y-[36px]
              max-md:mt-6 max-md:space-y-6">
              <p className="life-built-paragraph life-built-paragraph--1 font-josefin font-normal text-[#EFC0C9] text-[16px] sm:text-[18px] md:text-[22px] lg:text-[23px] leading-[1.45] md:leading-[1.4]
                max-md:leading-[1.6]" data-cms="body">
                {c.body1}
              </p>

              <p className="life-built-paragraph life-built-paragraph--2 font-josefin font-normal text-[#EFC0C9] text-[16px] sm:text-[18px] md:text-[22px] lg:text-[23px] leading-[1.45] md:leading-[1.4]
                max-md:leading-[1.6]" data-cms="body">
                {c.body2}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Book — dramatic drop-in + ambient float ============
           The book layer enters from above with a small counter-rotation
           and de-blur, then settles into a slow float. Transform-origin
           at the top-center so the tilt reads as the book hinging down
           rather than swinging from its middle. Uses translate3d in the
           keyframes so it composes cleanly with the existing absolute
           positioning utilities. No clip-path. */
        .life-built-book {
          opacity: 0;
          transform: translate3d(0, -40px, 0) rotate(-3deg);
          filter: blur(6px);
          transform-origin: 50% 0%;
          transition: opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
          will-change: transform, opacity;
        }
        .life-built-section--visible .life-built-book {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: blur(0);
          animation: lifeBuiltBookFloat 8s ease-in-out 1.6s infinite;
        }
        @keyframes lifeBuiltBookFloat {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(0, -7px, 0) rotate(-0.4deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        /* ============ Picture (inside the book) — delayed pop + slow drift ============
           The picture sits inside the book's frame. It arrives a beat
           after the book itself, with a small scale overshoot, and then
           breathes on a slower loop than the book so the two are never
           in sync — layered motion rather than a single rigid object. */
        .life-built-picture {
          opacity: 0;
          transform: scale(0.85);
          transform-origin: 50% 50%;
          transition: opacity 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 620ms,
                      transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 620ms;
          will-change: transform, opacity;
        }
        .life-built-section--visible .life-built-picture {
          opacity: 1;
          transform: scale(1);
          animation: lifeBuiltPictureDrift 10s ease-in-out 2s infinite;
        }
        @keyframes lifeBuiltPictureDrift {
          0%   { transform: scale(1) translate3d(0, 0, 0); }
          50%  { transform: scale(1.015) translate3d(0, -3px, 0); }
          100% { transform: scale(1) translate3d(0, 0, 0); }
        }

        /* ============ Heading — editorial slide from left, de-blur ============ */
        .life-built-heading {
          opacity: 0;
          transform: translate3d(-24px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms;
        }
        .life-built-section--visible .life-built-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "built" — elastic settle ============
           The element already carries translate-y-[0.02em] and
           max-md:!text / !leading. We compose the transform with
           translate3d so the existing y-offset is preserved (0.02em
           is baked into the keyframes' final state as a micro
           correction — the effect is invisible but keeps the script
           baseline exactly where it was). transform-origin near
           baseline so the script flourish stays aligned. */
        .life-built-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 500ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 500ms;
        }
        .life-built-section--visible .life-built-script {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }

        /* ============ Paragraphs — staggered rise + de-blur ============ */
        .life-built-paragraph {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(4px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .life-built-paragraph--1 { transition-delay: 800ms; }
        .life-built-paragraph--2 { transition-delay: 960ms; }

        .life-built-section--visible .life-built-paragraph {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .life-built-book,
          .life-built-picture,
          .life-built-heading,
          .life-built-script,
          .life-built-paragraph {
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