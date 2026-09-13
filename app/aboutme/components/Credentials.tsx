"use client";

import React, { useEffect, useRef, useState } from "react";

const scriptSpanClass =
  "font-script text-[1.7em] md:text-[2.05em] leading-[0.5] mx-[0.04em] md:mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

const credentials = [
  "MSc Psychology",
  "MA Fashion Communications and Branding",
  "Certified Life Coach",
  "Five years of 1:1 coaching practice",
];

export default function Credentials() {
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
    <div className="w-full bg-[#FED2DB] py-[45px] md:py-[50px]">
      <section
        ref={sectionRef}
        className={`credentials-section mx-auto flex flex-col items-center justify-center rounded-[2px] text-center ${
          isVisible ? "credentials-section--visible" : ""
        }`}
        style={{
          width: "min(71vw, 1090px)",
          minHeight: "700px",
          backgroundImage: "url('/AboutMe/credentials/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Inner padding wrapper so text never touches decorative edges */}
        <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-16 md:py-16">
          {/* Heading */}
          <h2 className="credentials-heading font-serif font-normal text-center text-[#750000] tracking-[-0.04em] leading-[0.78] text-[32px] sm:text-[38px] md:text-[48px] lg:text-[54px] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="font-serif">The</span>{" "}
            <span className={`${scriptSpanClass} credentials-script`}>
              credentials
            </span>
            <span className="font-serif">, for the</span>
            <br />
            <span className="font-serif">people who want them</span>
          </h2>

          {/* Credentials list */}
          <div className="mt-[25px] md:mt-[30px] flex flex-col items-center gap-[20px] md:gap-[22px]">
            {credentials.map((credential, index) => (
              <p
                key={index}
                className="credentials-item font-josefin font-normal text-center text-[#750000] text-[16px] sm:text-[18px] md:text-[24px] lg:text-[25px] leading-[1.2]"
                style={{ animationDelay: `${560 + index * 130}ms` }}
              >
                {credential}
              </p>
            ))}
          </div>

          {/* Description */}
          <p className="credentials-description mt-[25px] md:mt-[35px] mx-auto max-w-[320px] md:max-w-[680px] font-josefin font-normal text-center text-[#750000] text-[16px] sm:text-[18px] md:text-[23px] lg:text-[24px] leading-[1.15] md:leading-[1.1]">
            A background in PR, branding, and communications, which is exactly
            why I can spot a performed version of someone from across a room
          </p>
        </div>

        {/* ---------------- Animation layer (scoped to this section) ---------------- */}
        <style>{`
          /* ============ Heading — soft rise + de-blur ============ */
          .credentials-heading {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
            filter: blur(6px);
            transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                        transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                        filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
          }
          .credentials-section--visible .credentials-heading {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }

          /* ============ Script "credentials" — elastic settle ============
             The element carries translate-y-[0.02em] (md:translate-y-[0em]).
             We compose with translate3d and bake the 0.02em offset into
             the final state on mobile, overriding to 0 at md+ so the
             baseline lands pixel-identical to its static position at
             every breakpoint. transform-origin near baseline so the
             script flourish stays aligned. No clip-path. */
          .credentials-script {
            transform-origin: 50% 70%;
            opacity: 0;
            transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
            transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms,
                        transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms;
          }
          .credentials-section--visible .credentials-script {
            opacity: 1;
            transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
          }
          @media (min-width: 768px) {
            .credentials-section--visible .credentials-script {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            }
          }

          /* ============ Credential list items — staggered rise ============
             Each of the four credentials rises into place with a soft
             de-blur, staggered at 130ms intervals, so the list reads
             as a progression rather than a block. */
          .credentials-item {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
            filter: blur(4px);
            animation: credentialsItemIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .credentials-section--visible .credentials-item {
            animation-play-state: running;
          }
          @keyframes credentialsItemIn {
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

          /* ============ Description — rises last ============ */
          .credentials-description {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
            filter: blur(4px);
            transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms,
                        transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms,
                        filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms;
          }
          .credentials-section--visible .credentials-description {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }

          /* ============ Panel — very slow ambient brightness breath ============
             The image-backed panel gets a subliminal brightness and
             saturation breath so the whole section feels alive even
             when nothing is moving. 20s alternate loop. */
          .credentials-section {
            animation: credentialsPanelBreath 20s ease-in-out infinite alternate;
          }
          @keyframes credentialsPanelBreath {
            0%   { filter: brightness(1) saturate(1); }
            100% { filter: brightness(1.02) saturate(1.03); }
          }

          /* ============ Reduced motion ============ */
          @media (prefers-reduced-motion: reduce) {
            .credentials-heading,
            .credentials-script,
            .credentials-item,
            .credentials-description,
            .credentials-section {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}