"use client";

import React, { useEffect, useRef, useState } from "react";

const coachingScriptClass =
  "font-script font-normal text-[#7A2E2E] inline-block relative z-[2] leading-[0.5] tracking-[0.01em] text-[2.8em] sm:text-[3em] md:text-[3.1em] lg:text-[3.2em] [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

const pivotScriptClass =
  "font-script font-normal text-[#7A2E2E] inline-block relative z-[2] leading-[0.5] tracking-[0.01em] text-[2em] sm:text-[2.2em] md:text-[2.3em] lg:text-[2.4em] mx-[0.05em] [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

export default function CoachingPivot() {
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
      className={`coaching-pivot-section flex min-h-[60vh] w-full flex-col items-center justify-center px-5 py-[80px] sm:px-6 md:min-h-[70vh] md:py-[120px] text-center
        max-md:py-14 ${isVisible ? "coaching-pivot-section--visible" : ""}`}
    >
      <div className="mx-auto w-full max-w-[980px] min-w-0">
        {/* Headline */}
        <h1 className="coaching-pivot-heading font-serif font-normal text-[#7A2E2E] leading-[0.7] tracking-[-0.03em] text-[32px] sm:text-[42px] md:text-[50px] lg:text-[58px]
          max-md:leading-[0.85]">
          {/* Line 1 */}
          <span className="coaching-pivot-line coaching-pivot-line--1 block">
            <span
              className={`${coachingScriptClass} coaching-pivot-script coaching-pivot-script--coaching max-md:!text-[1.8em] max-md:!leading-[0.75]`}
            >
              Coaching
            </span>
          </span>

          {/* Line 2 */}
          <span className="coaching-pivot-line coaching-pivot-line--2 block leading-[0.8] max-md:leading-[0.95]">
            <span className="font-serif font-normal">wasn&rsquo;t a</span>{" "}
            <span
              className={`${pivotScriptClass} coaching-pivot-script coaching-pivot-script--pivot max-md:!text-[1.5em] max-md:!leading-[0.75]`}
            >
              pivot
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="coaching-pivot-subtitle mx-auto mt-[35px] md:mt-[42px] max-w-[340px] sm:max-w-[500px] md:max-w-[760px] font-josefin font-normal text-[#7A2E2E] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[26px] leading-[1.3] md:leading-[1.28]
          max-md:mt-6 max-md:max-w-full max-md:leading-[1.5]">
          It was the only thing I&rsquo;d been doing consistently
          <br className="hidden sm:block" /> my whole life. I just hadn&rsquo;t
          named it yet.
        </p>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Line 1 ("Coaching") — dramatic scale-in ============
           The script word that opens the headline arrives as the
           biggest visual statement of the pair, so it gets a
           springy scale overshoot from 0.7 with a strong de-blur. */
        .coaching-pivot-script--coaching {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.7) rotate(-8deg);
          filter: blur(8px);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms,
                      filter 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms;
        }
        .coaching-pivot-section--visible .coaching-pivot-script--coaching {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          filter: blur(0);
        }

        /* ============ Line 2 ("wasn't a pivot") — staged reveal ============
           The serif words and the script "pivot" arrive in sequence
           so the line builds word-by-word rather than as a block.
           The serif text slides in from the left; the script word
           settles with the same elastic overshoot as line 1, a beat
           later. */
        .coaching-pivot-line--2 {
          opacity: 0;
          transform: translate3d(-18px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 320ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 320ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 320ms;
        }
        .coaching-pivot-section--visible .coaching-pivot-line--2 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        .coaching-pivot-script--pivot {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.78) rotate(-6deg);
          filter: blur(6px);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 520ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 520ms,
                      filter 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 520ms;
        }
        .coaching-pivot-section--visible .coaching-pivot-script--pivot {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          filter: blur(0);
        }

        /* ============ Subtitle — rises last ============ */
        .coaching-pivot-subtitle {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          filter: blur(3px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms;
        }
        .coaching-pivot-section--visible .coaching-pivot-subtitle {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ After-settle breath on both script words ============
           Once each script word has landed, it enters a slow, out-of-
           phase ambient breath. "Coaching" and "pivot" use slightly
           different durations so they never sync, which keeps the
           composition feeling alive rather than mechanical. */
        .coaching-pivot-section--visible .coaching-pivot-script--coaching {
          animation: coachingBreath 6.5s ease-in-out 1.4s infinite;
        }
        .coaching-pivot-section--visible .coaching-pivot-script--pivot {
          animation: coachingBreath 5.5s ease-in-out 1.8s infinite;
        }
        @keyframes coachingBreath {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50%  { transform: translate3d(0, -2px, 0) rotate(-0.4deg) scale(1.01); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .coaching-pivot-line--2,
          .coaching-pivot-script--coaching,
          .coaching-pivot-script--pivot,
          .coaching-pivot-subtitle {
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