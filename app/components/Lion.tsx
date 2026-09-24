"use client";

import React, { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const bodyText =
  "font-josefin !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl md:!text-[clamp(16px,1.25vw,20px)] font-normal !leading-[1.5] tracking-[0.01em] text-[#5a0a0a] text-center md:text-left m-0 whitespace-normal break-words transition-all duration-700";

const scriptWord =
  "lion-script-inline inline-block font-script font-normal tracking-[0.01em] text-[#750000] !text-[2.15em] overflow-visible";

export default function Lion() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    image: string;
    imageAlt: string;
    headingBefore1: string;
    headingScript1: string;
    headingBefore2: string;
    headingScript2: string;
    paragraphs: string[];
  }>("home", "lion");
  const paragraphs = (c.paragraphs ?? []).map((text, i) => ({
    text,
    delay: `${0.1 + i * 0.1}s`,
    emphasis: i === (c.paragraphs?.length ?? 0) - 1,
  }));

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
      className="
        cms-section
        relative z-10
        w-full

        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24

        /* MOBILE */
        pt-5 sm:pt-7

        /* DESKTOP - ORIGINAL */
        md:pt-16 lg:pt-24

        pb-6 sm:pb-8
        md:pb-8 lg:pb-12

        mb-0
        md:-mb-16 lg:-mb-24

        overflow-visible
      "
      style={cmsStyleVars(c.styles)}
    >
      {/* ===================== BACKGROUND ===================== */}
      <div
        className={`lion-bg absolute top-0 left-0 right-0
          bottom-5 sm:bottom-7 md:bottom-16 lg:bottom-24
          bg-[rgba(243,237,229,0.6)]
          backdrop-blur-[0.5px]
          bg-cover bg-center bg-no-repeat bg-blend-overlay
          rounded-[1.5rem]
          sm:rounded-[1.75rem]
          md:rounded-[1.5rem]
          lg:rounded-[2rem]
          rounded-b-none
          shadow-[0_8px_32px_rgba(80,40,20,0.08)]
          -z-10
          transition-all duration-1000
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={cmsBg(c.background)}
      />

      {/* ===================== MAIN GRID ===================== */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-[35%_65%]
          lg:grid-cols-[30%_70%]

          gap-5 sm:gap-7
          md:gap-8 lg:gap-10

          items-center
        "
      >
        {/* ===================== LEFT: IMAGE PANEL ===================== */}
        <section
          className="
            relative z-[2]
            hidden md:flex
            items-center justify-center
            w-full h-full
            overflow-visible
            py-4 md:py-8 lg:py-12
          "
        >
          <div className="flex items-center justify-center w-full h-full overflow-visible">
            <CmsImage
              src={c.image}
              alt={c.imageAlt}
              width={400}
              height={488}
              className={`lion-desktop-img
                relative z-[2]
                w-full
                max-w-[240px]
                md:max-w-[280px]
                lg:max-w-[360px]
                xl:max-w-[28vw]
                2xl:max-w-[480px]
                h-auto
                aspect-[0.82/1]
                object-contain
                block
                drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)]
                scale-[1.25]
                rounded-lg
                -mt-8
                md:-mt-14
                lg:-mt-16
                overflow-visible
                transition-all duration-1000
                ${
                  isVisible
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 -translate-x-12 rotate-[-5deg]"
                }`}
              priority
            />
          </div>
        </section>

        {/* ===================== RIGHT: TEXT PANEL ===================== */}
        <section
          className="
            relative z-[2]
            flex flex-col justify-center
            w-full h-full
            overflow-visible

            py-3 sm:py-5
            md:py-8 lg:py-12
          "
        >
          <div
            className="
              flex flex-col

              /* MOBILE SPACING */
              gap-4 sm:gap-5

              /* DESKTOP - ORIGINAL */
              md:gap-2.5 lg:gap-[0.7rem]

              w-full max-w-full

              mt-0
              md:-mt-16 lg:-mt-28

              -translate-y-[5px]
              md:-translate-y-[14px]
              lg:-translate-y-[18px]
            "
          >
            {/* ===================== MOBILE IMAGE ===================== */}
            <div
              className={`lion-mobile-img
                md:hidden
                flex items-center justify-center
                w-full

                /* Slightly smaller than before */
                -mt-1
                mb-1

                transition-all duration-1000
                ${
                  isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
            >
              <CmsImage
                src={c.image}
                alt={c.imageAlt}
                width={400}
                height={488}
                className={`w-full
                  max-w-[min(58vw,240px)]
                  sm:max-w-[min(60vw,260px)]
                  h-auto
                  object-contain
                  drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)]
                  transition-all duration-1000
                  ${
                    isVisible
                      ? "translate-y-0"
                      : "translate-y-8"
                  }`}
                priority
              />
            </div>

            {/* ===================== HEADER ===================== */}
            <header
              className={`w-full
                text-center md:text-left
                mb-1 md:mb-0
                transition-all duration-1000
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              style={{
                transitionDelay: isVisible ? "0.05s" : "0s",
              }}
            >
              <h2
                className="
                  font-serif font-light text-[#750000]

                  !text-[24px]
                  sm:!text-[28px]
                  !leading-[0.9]

                  md:!text-[clamp(30px,2.7vw,48px)]
                  md:!leading-[0.8]

                  tracking-[-0.02em]
                  [font-stretch:extra-condensed]

                  text-center
                  md:text-left
                  m-0

                  flex flex-col items-center gap-[0.2em]
                  md:block
                "
              >
                <span className="flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:hidden">
                  <span data-cms="heading">{c.headingBefore1}</span>
                  <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                  <span className={scriptWord} data-cms="script">{c.headingScript1}</span>
                  .
                </span>

                <span className="flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:hidden">
                  <span data-cms="heading">{c.headingBefore2}</span>
                  <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                  <span className={scriptWord} data-cms="script">{c.headingScript2}</span>
                  .
                </span>

                <span className="hidden md:inline">
                  <span data-cms="heading">{c.headingBefore1}</span>
                  <span className="inline-block w-[0.28em]" aria-hidden="true" />
                  <span className={scriptWord} data-cms="script">{c.headingScript1}</span>
                  . <span data-cms="heading">{c.headingBefore2}</span>
                  <span className="inline-block w-[0.28em]" aria-hidden="true" />
                  <span className={scriptWord} data-cms="script">{c.headingScript2}</span>
                  .
                </span>
              </h2>
            </header>

            {/* ===================== PARAGRAPHS ===================== */}
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`lion-paragraph
                  ${bodyText}
                  ${
                    p.emphasis
                      ? "font-bold text-[#7f0f0f]"
                      : ""
                  }
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                style={{
                  transitionDelay: isVisible
                    ? p.delay
                    : "0s",
                }}
              >
                <span data-cms="body">{p.text}</span>
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* ===================== ANIMATION LAYER ===================== */}
      <style>{`
        /* ============ Ambient float on the lion image ============ */

        .lion-desktop-img {
          animation: lionFloat 7s ease-in-out 1.4s infinite;
        }

        .lion-mobile-img img {
          animation: lionFloat 7s ease-in-out 1.2s infinite;
        }

        @keyframes lionFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(0, -6px, 0) rotate(-0.4deg);
          }

          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        /* ============ Soft glow pulse on background ============ */

        .lion-bg {
          animation: lionGlow 12s ease-in-out 1.8s infinite;
        }

        @keyframes lionGlow {
          0% {
            box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08);
          }

          50% {
            box-shadow: 0 12px 40px rgba(80, 40, 20, 0.12);
          }

          100% {
            box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08);
          }
        }

        /* ============ Script accent words ============ */

        .lion-script-inline {
          transform-origin: 50% 70%;
          animation: lionScriptPulse 5s ease-in-out infinite;
        }

        @keyframes lionScriptPulse {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }

          50% {
            transform: translate3d(0, -2px, 0) rotate(-0.6deg) scale(1.015);
          }

          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        /* ============ Paragraph hover micro-interaction ============ */

        .lion-paragraph {
          transition-property: opacity, transform, color;
        }

        @media (hover: hover) and (pointer: fine) {
          .lion-paragraph:hover {
            transform: translate3d(2px, 0, 0);
          }
        }

        /* ============ Reduced motion ============ */

        @media (prefers-reduced-motion: reduce) {
          .lion-desktop-img,
          .lion-mobile-img img,
          .lion-bg,
          .lion-script-inline,
          .lion-paragraph {
            animation: none !important;
          }

          .lion-paragraph:hover {
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}