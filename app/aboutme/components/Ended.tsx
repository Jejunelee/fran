"use client";

import React, { useEffect, useRef, useState } from "react";

const scriptSpanClass =
  "font-script text-[1.5em] md:text-[1.65em] leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

export default function TheMomentItEnded() {
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
      className={`moment-ended-section w-full px-4 py-[35px] sm:px-[3%] md:py-[40px]
        max-md:py-7 ${isVisible ? "moment-ended-section--visible" : ""}`}
    >
      <div
        className="moment-ended-panel relative mx-auto w-full overflow-hidden"
        style={{
          backgroundImage: "url('/AboutMe/ended/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Two-column layout */}
        <div className="grid grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-[60%_40%] md:gap-8 md:px-10 md:py-14 lg:grid-cols-[62%_38%] lg:px-14 lg:py-16
          max-md:gap-6 max-md:px-5 max-md:py-9">
          {/* Left text column */}
          <div className="order-1 md:order-1 min-w-0">
            {/* Heading */}
            <h2 className="moment-ended-heading font-serif font-normal text-[#750000] leading-[0.85] tracking-[-0.03em] text-[clamp(32px,4.2vw,70px)]
              max-md:text-[clamp(28px,8.5vw,42px)] max-md:leading-[0.9]">
              <span className="font-serif">The moment it</span>{" "}
              <span
                className={`${scriptSpanClass} moment-ended-script md:!text-[2.475em] max-md:!text-[2.175em] max-md:!leading-[0.75]`}
              >
                ended
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="mt-[30px] md:mt-[33px] space-y-[25px] md:space-y-[28px]
              max-md:mt-6 max-md:space-y-5">
              <p className="moment-ended-paragraph moment-ended-paragraph--1 max-w-[760px] font-josefin font-normal text-[#750000] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.15] md:leading-[1.08]
                max-md:leading-[1.5]">
                I was writing a content calendar for a feminine hygiene brand,
                for an influencer I didn&rsquo;t respect, and something in me
                just went quiet. I quit the next week. No plan. I just
                couldn&rsquo;t keep maintaining a life I&rsquo;d already moved
                past.
              </p>

              <p className="moment-ended-paragraph moment-ended-paragraph--2 max-w-[760px] font-josefin font-normal text-[#750000] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.15] md:leading-[1.1]
                max-md:leading-[1.5]">
                That was the start of the real work.
              </p>

              <p className="moment-ended-paragraph moment-ended-paragraph--3 max-w-[780px] font-josefin font-normal text-[#750000] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] leading-[1.15] md:leading-[1.08]
                max-md:leading-[1.5]">
                I didn&rsquo;t find my purpose in a single clean epiphany. I
                found it the way most people do. Slowly, awkwardly, while doing
                other things. The thread that kept showing up was this: I was
                the friend people called when their life was falling apart. The
                one who could sit with someone in the worst version of
                themselves and not flinch. The one who asked the question nobody
                else would.
              </p>
            </div>
          </div>

          {/* Right image column */}
          <div className="order-2 md:order-2 flex justify-center md:justify-end min-w-0">
            <img
              src="/AboutMe/ended/red.png"
              alt=""
              className="moment-ended-image h-auto w-full max-w-[400px] object-cover shadow-[0_3px_5px_rgba(0,0,0,0.25)] md:max-w-none md:w-[475px] md:h-[565px]
                max-md:max-w-[min(80vw,340px)]"
            />
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading — editorial slide from left, de-blur ============ */
        .moment-ended-heading {
          opacity: 0;
          transform: translate3d(-24px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }
        .moment-ended-section--visible .moment-ended-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "ended" — elastic settle ============
           The element already carries translate-y-[0.02em]
           (md:translate-y-[0em] on desktop). We compose the transform
           with translate3d and bake the 0.02em offset into the final
           state so the script baseline lands pixel-identical to its
           static position. transform-origin near baseline so the
           script flourish stays aligned. No clip-path. */
        .moment-ended-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 340ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 340ms;
        }
        .moment-ended-section--visible .moment-ended-script {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }

        /* Desktop removes the y-offset with md:translate-y-[0em];
           bake that 0 into the final state for md+ so the baseline
           sits exactly where the utility intended it to. */
        @media (min-width: 768px) {
          .moment-ended-section--visible .moment-ended-script {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* ============ Paragraphs — staggered rise + de-blur ============ */
        .moment-ended-paragraph {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(4px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .moment-ended-paragraph--1 { transition-delay: 620ms; }
        .moment-ended-paragraph--2 { transition-delay: 760ms; }
        .moment-ended-paragraph--3 { transition-delay: 900ms; }

        .moment-ended-section--visible .moment-ended-paragraph {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Image — dramatic reveal + ambient float ============
           The image rises with a slight counter-rotation and a strong
           de-blur, then settles into a slow drift. transform-origin
           at the bottom-center so the rise reads as the image
           "standing up" into place. Uses translate3d in the keyframes
           so it composes cleanly with the existing object-cover /
           max-w utilities. No clip-path. */
        .moment-ended-image {
          opacity: 0;
          transform: translate3d(0, 30px, 0) rotate(2deg);
          filter: blur(8px);
          transform-origin: 50% 100%;
          transition: opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 260ms;
          will-change: transform, opacity;
        }
        .moment-ended-section--visible .moment-ended-image {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: blur(0);
          animation: momentEndedImageFloat 7s ease-in-out 1.6s infinite;
        }
        @keyframes momentEndedImageFloat {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(0, -6px, 0) rotate(-0.4deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        /* ============ Panel — very soft shadow breath ============
           The rounded, image-backed panel already has a subtle
           overflow-hidden and no shadow of its own (the shadow is
           on the inner image), so we skip touching the panel's
           visual identity and instead let the background image
           itself get a slow ambient brightness breath. */
        .moment-ended-panel {
          animation: momentEndedPanelBreath 22s ease-in-out infinite alternate;
        }
        @keyframes momentEndedPanelBreath {
          0%   { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.02) saturate(1.03); }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .moment-ended-heading,
          .moment-ended-script,
          .moment-ended-paragraph,
          .moment-ended-image,
          .moment-ended-panel {
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