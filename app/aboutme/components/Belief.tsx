"use client";

import React, { useEffect, useRef, useState } from "react";

const scriptSpanClass =
  "font-script text-[1.8em] md:text-[2.05em] leading-[0.5] mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

const leftBeliefs = [
  "Awareness is not the same as change. Most people get stuck mistaking one for the other.",
  "Toxic positivity is just avoidance with better lighting.",
  "You can be deeply emotional and brutally honest at the same time.",
  "Self-abandonment is socially rewarded. That's why it's so hard to spot.",
];

const rightBeliefs = [
  "Resilience isn't bouncing back. It's trusting that you can navigate whatever's next, because you can navigate yourself.",
  "The goal was never certainty about what happens. The goal is knowing you'll be okay regardless of what happens.",
  "If a coach tells you they have all the answers, run.",
];

export default function Belief() {
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
      className={`belief-section relative w-full ${
        isVisible ? "belief-section--visible" : ""
      }`}
      style={{
        backgroundImage: "url('/AboutMe/belief/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto w-full max-w-[1350px] px-6 py-[55px] md:px-[7vw] md:py-[65px]
        max-md:px-5 max-md:py-10">
        {/* Heading */}
        <h2 className="belief-heading font-serif font-normal text-center text-[#750000] tracking-[-0.04em] text-[1.75rem] leading-[1.1] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] mb-[35px] md:mb-[45px]
          max-md:mb-7 max-md:leading-[1.05]">
          <span className="font-serif">What I actually</span>{" "}
          <span
            className={`${scriptSpanClass} belief-script md:!text-[2.665em] max-md:!text-[1.95em] max-md:!leading-[0.75]`}
          >
            believe
          </span>
        </h2>

        {/* Two-column content */}
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-x-[70px] gap-y-[30px] md:grid-cols-2 md:gap-x-[85px] lg:gap-x-[100px]
          max-md:gap-y-6">
          {/* Left column */}
          <div>
            <ul className="font-josefin font-normal text-[#5a0a0a] text-[15px] leading-[1.35] sm:text-[16px] md:text-[18px] lg:text-[19px] md:leading-[1.25] list-disc list-outside pl-5 space-y-[18px] md:space-y-[24px]
              max-md:text-[16px] max-md:leading-[1.55] max-md:space-y-4">
              {leftBeliefs.map((belief, index) => (
                <li
                  key={index}
                  className="belief-item belief-item--left"
                  style={{ animationDelay: `${320 + index * 110}ms` }}
                >
                  {belief}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div>
            <ul className="font-josefin font-normal text-[#5a0a0a] text-[15px] leading-[1.35] sm:text-[16px] md:text-[18px] lg:text-[19px] md:leading-[1.25] list-disc list-outside pl-5 space-y-[18px] md:space-y-[24px]
              max-md:text-[16px] max-md:leading-[1.55] max-md:space-y-4">
              {rightBeliefs.map((belief, index) => (
                <li
                  key={index}
                  className="belief-item belief-item--right"
                  style={{ animationDelay: `${760 + index * 110}ms` }}
                >
                  {belief}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading — soft rise + de-blur ============ */
        .belief-heading {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }
        .belief-section--visible .belief-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "believe" — elastic settle ============
           Preserves translate-y-[0.02em] on mobile by baking the
           offset into the final transform, and overrides to 0 at
           md+ so the baseline lands pixel-identical to its static
           position. transform-origin near baseline. No clip-path. */
        .belief-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms;
        }
        .belief-section--visible .belief-script {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }
        @media (min-width: 768px) {
          .belief-section--visible .belief-script {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* ============ Belief list items — staggered rise + de-blur ============
           Each of the seven items rises into place with a soft de-blur.
           Left column delays start at 320ms; right column at 760ms.
           The left column runs its cascade first, then the right
           column picks up, so the eye reads left → right in a
           deliberate sweep rather than two simultaneous cascades. */
        .belief-item {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          filter: blur(4px);
          animation: beliefItemIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .belief-section--visible .belief-item {
          animation-play-state: running;
        }
        @keyframes beliefItemIn {
          0% {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }
        }

        /* ============ Panel — very slow ambient brightness breath ============
           The image-backed section gets a subliminal brightness and
           saturation breath so the composition feels alive even when
           nothing is moving. 22s alternate loop. */
        .belief-section {
          animation: beliefPanelBreath 22s ease-in-out infinite alternate;
        }
        @keyframes beliefPanelBreath {
          0%   { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.02) saturate(1.03); }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .belief-heading,
          .belief-script,
          .belief-item,
          .belief-section {
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