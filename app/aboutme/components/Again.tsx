"use client";

import React, { useEffect, useRef, useState } from "react";

const scriptSpanClass =
  "font-script text-[1.5em] md:text-[1.6em] leading-[0.5] mx-[0.04em] md:mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#F8F1E7] relative z-[2] font-normal";

export default function VersionOfMeAgain() {
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

  return (
    <section
      ref={sectionRef}
      className={`version-again-section w-full px-4 py-[30px] sm:px-[3%]
        max-md:py-6 ${isVisible ? "version-again-section--visible" : ""}`}
    >
      <div className="version-again-panel mx-auto pt-8 w-full bg-[#750100]">
        <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-2 md:gap-12 md:px-14 md:py-14 lg:px-[5vw] lg:py-16
          max-md:gap-8 max-md:px-5 max-md:py-8">
          {/* LEFT COLUMN */}
          <div className="flex flex-col min-w-0">
            {/* Heading */}
            <h2 className="version-again-heading font-serif font-normal text-[#F8F1E7] leading-[0.9] tracking-[-0.04em] text-[clamp(36px,4.3vw,68px)] [text-shadow:0_1px_2px_rgba(0,0,0,0.08)]
              max-md:text-[clamp(30px,8.5vw,44px)] max-md:leading-[0.95]">
              <span className="version-again-line version-again-line--1 block font-serif">
                The version of me
              </span>
              <span className="version-again-line version-again-line--2 block font-serif">
                that did it{" "}
                <span
                  className={`${scriptSpanClass} version-again-script md:!text-[2.4em] max-md:!text-[2.1em] max-md:!leading-[0.75]`}
                >
                  again
                </span>
              </span>
            </h2>

            {/* Left paragraphs — pushed down on desktop */}
            <div className="mt-[30px] md:mt-[33px] space-y-[25px] md:space-y-[28px]
              max-md:mt-6 max-md:space-y-5 md:translate-y-[40px]">
              <p className="version-again-paragraph version-again-paragraph--left-1 max-w-[600px] font-josefin font-normal text-[#F8F1E7] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.25] md:leading-[1.08]
                max-md:leading-[1.55]">
                I trained as a coach. I built the business. I got clients. I
                moved back to London. I did a second master&rsquo;s, this time
                in psychology, because I wanted the work grounded in more than
                my own instincts.
              </p>

              <p className="version-again-paragraph version-again-paragraph--left-2 max-w-[600px] font-josefin font-normal text-[#F8F1E7] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.25] md:leading-[1.08]
                max-md:leading-[1.55]">
                And then life rerouted me again. Visa issues, of all things. So
                I came back to Manila, and started over one more time.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col min-w-0">
            <div className="space-y-[25px] md:space-y-[28px] max-md:space-y-5">
              <p className="version-again-paragraph version-again-paragraph--right-1 max-w-[600px] font-josefin font-normal text-[#F8F1E7] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.25] md:leading-[1.08]
                max-md:leading-[1.55]">
                But this time I knew what I was building toward. Not a version
                of myself that looked impressive. A version that fits who
                I&rsquo;d actually become.
              </p>

              <p className="version-again-paragraph version-again-paragraph--right-2 max-w-[600px] font-josefin font-normal text-[#F8F1E7] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.25] md:leading-[1.08]
                max-md:leading-[1.55]">
                Here&rsquo;s the thing I&rsquo;ve learned doing this over and
                over. The careers changed. The cities changed. The dreams
                changed. The one constant, through all of it, was my
                relationship with myself. That&rsquo;s the whole of what I do
                now. I don&rsquo;t help you become someone new. I help you
                build a relationship with yourself that&rsquo;s strong enough to
                survive every version of your life.
              </p>
            </div>

            {/* Gold decorative image */}
            <div className="version-again-image-wrap mt-[35px] flex justify-center md:mt-auto md:justify-end md:pt-[30px]
              max-md:mt-7">
              <img
                src="/AboutMe/again/gold.png"
                alt=""
                className="version-again-image h-auto w-[min(75%,360px)] object-contain md:w-[380px] lg:w-[420px]
                  max-md:w-[min(70%,300px)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading line 1 — editorial slide from left ============ */
        .version-again-line--1 {
          opacity: 0;
          transform: translate3d(-24px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }
        .version-again-section--visible .version-again-line--1 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Heading line 2 — slide from right (mirrored) ============ */
        .version-again-line--2 {
          opacity: 0;
          transform: translate3d(24px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 220ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 220ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 220ms;
        }
        .version-again-section--visible .version-again-line--2 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "again" — elastic settle ============
           The element carries translate-y-[0.02em] (md:translate-y-[0em]).
           We bake the mobile offset into the final transform state
           and override to 0 at md+ so the script baseline lands
           pixel-identical to its static position at every breakpoint.
           transform-origin near baseline; no clip-path. */
        .version-again-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 24px, 0) scale(0.8) rotate(-7deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms;
        }
        .version-again-section--visible .version-again-script {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }
        @media (min-width: 768px) {
          .version-again-section--visible .version-again-script {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* ============ Paragraphs — staggered rise + de-blur ============
           Six paragraphs total (2 left, 2 right on desktop; all
           stacked on mobile). The delays are ordered reading-order:
           left column first, then right column. */
        .version-again-paragraph {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(4px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .version-again-paragraph--left-1  { transition-delay: 620ms; }
        .version-again-paragraph--left-2  { transition-delay: 760ms; }
        .version-again-paragraph--right-1 { transition-delay: 900ms; }
        .version-again-paragraph--right-2 { transition-delay: 1040ms; }

        .version-again-section--visible .version-again-paragraph {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Gold image — dramatic reveal + ambient float ============
           The gold ornamental image arrives last with a strong de-blur
           and a gentle rotation settle, then enters a slow float.
           transform-origin at bottom-center so the rise reads as the
           image "standing up" rather than falling. Uses translate3d
           in keyframes to compose cleanly with existing width
           utilities. No clip-path. */
        .version-again-image {
          opacity: 0;
          transform: translate3d(0, 26px, 0) rotate(3deg);
          filter: blur(8px);
          transform-origin: 50% 100%;
          transition: opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 1160ms,
                      transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 1160ms,
                      filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 1160ms;
          will-change: transform, opacity;
        }
        .version-again-section--visible .version-again-image {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: blur(0);
          animation: versionAgainGoldFloat 8s ease-in-out 2.4s infinite;
        }
        @keyframes versionAgainGoldFloat {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(0, -6px, 0) rotate(-0.4deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        /* ============ Panel — very soft depth breath ============ */
        .version-again-panel {
          animation: versionAgainPanelBreath 20s ease-in-out infinite alternate;
        }
        @keyframes versionAgainPanelBreath {
          0%   { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.02) saturate(1.03); }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .version-again-line--1,
          .version-again-line--2,
          .version-again-script,
          .version-again-paragraph,
          .version-again-image,
          .version-again-panel {
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