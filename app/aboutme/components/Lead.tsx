"use client";

import React, { useEffect, useRef, useState } from "react";

const SCRIPT_WORDS = ["resonated"];

const scriptSpanClass =
  "font-script text-[1.8em] md:text-[2.05em] leading-[0.5] mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

const mobileScriptSpanClass =
  "font-script text-[1em] leading-[0.5] inline-block tracking-[0.02em] text-[#750000]";

export default function Lead() {
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
    <main
      ref={sectionRef}
      className={`lead-section relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12 pt-20 md:pt-12 lg:pt-18 pb-12 md:pb-16 lg:pb-20 -mt-12 md:-mt-16 lg:-mt-24 ${
        isVisible ? "lead-section--visible" : ""
      }`}
    >
      {/* Background layer */}
      <div
        className="lead-bg absolute top-12 md:top-16 lg:top-24 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat rounded-b-[2rem] md:rounded-b-[1.5rem] lg:rounded-b-[2rem] shadow-[0_8px_32px_rgba(80,40,20,0.08)] -z-10"
        style={{ backgroundImage: "url('AboutMe/Lead/bg.png')" }}
      />

      <div className="flex flex-col items-center justify-center w-full">
        {/* TEXT PANEL - Centered */}
        <section className="relative z-[2] flex flex-col justify-center items-center w-full h-full overflow-visible py-3 md:py-6 lg:py-8">
          <div className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6 w-full max-w-full mt-9 md:mt-14 lg:mt-18">
            {/* Desktop heading */}
            <h1 className="lead-heading lead-heading--desktop font-serif font-normal text-[clamp(30px,6vw,38px)] md:text-[clamp(36px,4vw,56px)] lg:text-[clamp(48px,5vw,76px)] leading-[0.7] tracking-[-0.04em] text-[#750000] m-0 relative flex-col items-center text-center w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] hidden md:flex">
              <span className="lead-line lead-line--desktop-1 flex items-baseline flex-wrap whitespace-nowrap relative justify-center leading-[0.7] mt-[0.1em] first:mt-0">
                <span className="font-serif inline-block relative z-[1] leading-[0.7] text-[1em]">
                  If any of that
                </span>
                {SCRIPT_WORDS.map((word) => (
                  <span
                    key={word}
                    className={`${scriptSpanClass} lead-script lead-script--desktop`}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="lead-line lead-line--desktop-2 flex items-baseline flex-wrap whitespace-nowrap relative justify-center leading-[0.7] mt-[0.1em]">
                <span className="font-serif inline-block relative z-[1] leading-[0.7] text-[1em]">
                  we should probably work.
                </span>
              </span>
            </h1>

            {/* Mobile heading */}
            <h1 className="lead-heading lead-heading--mobile font-serif font-normal text-[clamp(38px,6vw,52px)] leading-[0.8] tracking-[-0.04em] text-[#750000] m-0 relative flex flex-col items-center text-center w-full [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] flex md:hidden">
              <span className="lead-line lead-line--mobile-1 flex items-baseline justify-center leading-[0.8] flex-wrap">
                <span className="block leading-[0.8]">
                  If any of that&nbsp;&nbsp;
                </span>
                <span className="flex items-baseline justify-center leading-[0.8] mt-[0.05em] text-[2.8em]">
                  {SCRIPT_WORDS.map((word, i) => (
                    <span
                      key={word}
                      className={`${mobileScriptSpanClass} lead-script lead-script--mobile ${
                        i === 1 ? "mx-[0.04em]" : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="lead-line lead-line--mobile-2 block leading-[0.8] mt-[0.05em]">
                we should probably talk.
              </span>
            </h1>

            <p className="font-josefin text-[clamp(13px,1vw,14px)] md:text-[clamp(14px,1.2vw,18px)] font-normal leading-[1.5] tracking-[0.01em] text-[#5a0a0a] text-center m-0">
            </p>

            <div className="lead-cta-row flex gap-3 md:gap-4 flex-wrap mt-1 justify-center">
              <button className="lead-cta lead-cta--primary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-bold tracking-[0.05em] text-[#750100] bg-[#F5B7C4] border-none px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase shadow-[0_4px_14px_-4px_rgba(91,7,6,0.55)] hover:bg-[#ecb4b8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.65)]">
                BOOK A CALL
              </button>
              <button className="lead-cta lead-cta--secondary font-josefin text-[clamp(12px,0.8vw,13px)] md:text-[clamp(14px,1vw,18px)] font-semibold tracking-[0.05em] text-white bg-[#5B0706] border border-[#5B0706] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.9rem] rounded cursor-pointer transition-all duration-300 ease-in-out uppercase hover:bg-[#5B0706] hover:text-[#fdd1db] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-4px_rgba(91,7,6,0.3)]">
                TAKE A QUIZ
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile responsive overrides + Animation layer */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section:first-child {
            width: 100% !important;
            max-width: 600px !important;
            padding: 0 !important;
            align-items: center !important;
            justify-content: center !important;
            height: 100% !important;
            margin: 0 auto !important;
          }

          section:first-child div {
            align-items: center !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0 !important;
            gap: 1.2rem !important;
            justify-content: center !important;
          }

          section:first-child p {
            text-align: center !important;
            font-size: 16px !important;
          }

          section:first-child div:last-child {
            justify-content: center !important;
          }

          section:first-child div:last-child button {
            font-size: 14px !important;
            padding: 0.8rem 2rem !important;
          }
        }

        @media (max-width: 430px) {
          section:first-child div {
            gap: 1rem !important;
          }

          section:first-child h1 {
            font-size: clamp(30px, 8vw, 42px) !important;
          }

          section:first-child h1 span:last-child {
            font-size: 2.8em !important;
          }

          section:first-child p {
            font-size: 14px !important;
          }

          section:first-child div:last-child {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.8rem !important;
          }

          section:first-child div:last-child button {
            font-size: 13px !important;
            padding: 0.7rem 1.5rem !important;
            width: 100% !important;
            text-align: center !important;
          }
        }

        /* ============ Animation layer ============ */

        /* Heading lines — editorial slide from left, de-blur. */
        .lead-line {
          opacity: 0;
          transform: translate3d(-22px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lead-line--desktop-1 { transition-delay: 80ms; }
        .lead-line--desktop-2 { transition-delay: 240ms; }
        .lead-line--mobile-1  { transition-delay: 80ms; }
        .lead-line--mobile-2  { transition-delay: 240ms; }

        .lead-section--visible .lead-line {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Script "resonated" — elastic settle.
           Desktop keeps the existing translate-y-[0.02em] baked into
           the final state, mobile is baked to 0 via its own mobile
           class. transform-origin near baseline. No clip-path. */
        .lead-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms;
        }
        .lead-section--visible .lead-script--desktop {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }
        .lead-section--visible .lead-script--mobile {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        @media (min-width: 768px) {
          .lead-section--visible .lead-script--desktop {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* CTA buttons — staggered rise + idle glow pulse.
           Primary enters first, secondary follows. The pulse pauses
           on hover so the existing scale/color interactions stay
           clean. box-shadow only — no transform conflicts with the
           existing hover:-translate-y-0.5 utility. */
        .lead-cta {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 300ms ease-in-out;
        }
        .lead-cta--primary   { transition-delay: 700ms; }
        .lead-cta--secondary { transition-delay: 840ms; }

        .lead-section--visible .lead-cta {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .lead-section--visible .lead-cta--primary {
          animation: leadCtaPulsePrimary 4.5s ease-in-out 1.6s infinite;
        }
        .lead-section--visible .lead-cta--secondary {
          animation: leadCtaPulseSecondary 4.5s ease-in-out 1.8s infinite;
        }
        @keyframes leadCtaPulsePrimary {
          0%   { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.55); }
          50%  { box-shadow: 0 6px 20px -4px rgba(91, 7, 6, 0.75); }
          100% { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.55); }
        }
        @keyframes leadCtaPulseSecondary {
          0%   { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
          50%  { box-shadow: 0 6px 20px -4px rgba(91, 7, 6, 0.32); }
          100% { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
        }
        .lead-cta:hover {
          animation-play-state: paused;
        }

        /* Background — slow depth breath. */
        .lead-section--visible .lead-bg {
          animation: leadBgBreath 14s ease-in-out 1.6s infinite;
        }
        @keyframes leadBgBreath {
          0%   { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
          50%  { box-shadow: 0 14px 44px rgba(80, 40, 20, 0.12); }
          100% { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
        }

        /* Reduced motion. */
        @media (prefers-reduced-motion: reduce) {
          .lead-line,
          .lead-script,
          .lead-cta,
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