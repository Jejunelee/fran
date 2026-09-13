"use client";

import React, { useEffect, useRef, useState } from "react";

const francescaScriptClass =
  "font-script text-[3.8em] sm:text-[4em] md:text-[4.2em] leading-[0.5] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

export default function HiImFrancesca() {
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
      className={`hi-francesca-section relative w-full max-md:![min-height:0px] ${
        isVisible ? "hi-francesca-section--visible" : ""
      }`}
      style={{
        minHeight: "clamp(480px, 34.5vw, 560px)",
      }}
    >
      {/* Background layer */}
      <div
        className="hi-francesca-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/AboutMe/hi/bg.png')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[inherit] w-full items-center justify-center px-5 py-12 sm:px-6
        max-md:py-10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
          {/* Heading */}
          <h1 className="font-serif font-normal text-[#750000] leading-[0.7] tracking-[-0.03em] text-[clamp(34px,4vw,62px)]
            max-md:leading-[0.85]">
            <span className="hi-francesca-greeting block font-serif translate-y-[0.6em] max-md:translate-y-[1.3em]">
              Hi, I&rsquo;m
            </span>
            <span className="block max-md:mt-1">
              <span
                className={`${francescaScriptClass} hi-francesca-script max-md:!text-[4.4em] max-md:!leading-[0.7]`}
              >
                Francesca
              </span>
            </span>
          </h1>

          {/* Paragraph */}
          <p className="hi-francesca-paragraph mx-auto mt-[30px] md:mt-[38px] w-full max-w-[350px] sm:max-w-[700px] md:max-w-[1100px] font-josefin font-normal text-[#111111] text-[16px] sm:text-[18px] md:text-[21px] lg:text-[22px] leading-[1.45] md:leading-[1.5]
            max-md:mt-6 max-md:max-w-full max-md:text-[16px] max-md:leading-[1.6]">
            Most coaching pages open with credentials. I&rsquo;ll get to mine.
            But credentials aren&rsquo;t why anyone hires a coach. They hire a
            coach because they want to know one thing: have you been where I
            am, and did you find your way through? So here&rsquo;s the version
            that matters.
          </p>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ "Hi, I'm" — rises and de-blurs ============ */
        .hi-francesca-greeting {
          opacity: 0;
          filter: blur(5px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms;
          /* NOTE: no transform transition here — the element already
             carries translate-y-[0.6em] / max-md:translate-y-[1.3em]
             Tailwind utilities. Animating transform would clobber
             those. We only animate opacity + blur. */
        }
        .hi-francesca-section--visible .hi-francesca-greeting {
          opacity: 1;
          filter: blur(0);
        }

        /* ============ "Francesca" — elastic settle.
           The element already has inline-block + script sizing.
           transform-origin near baseline so the script flourish
           stays aligned. We compose the transform with translate3d
           so no existing utility gets clobbered (there are none on
           this node besides max-md:!text / !leading, which are
           font-size / line-height, not transform). */
        .hi-francesca-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 26px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms,
                      transform 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms;
          will-change: transform, opacity;
        }
        .hi-francesca-section--visible .hi-francesca-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* After settle, gentle ambient breath. */
        .hi-francesca-section--visible .hi-francesca-script {
          animation: hiFrancescaBreath 6s ease-in-out 1.6s infinite;
        }
        @keyframes hiFrancescaBreath {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50%  { transform: translate3d(0, -3px, 0) rotate(-0.5deg) scale(1.008); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }

        /* ============ Paragraph — rises and de-blurs ============ */
        .hi-francesca-paragraph {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(4px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms;
        }
        .hi-francesca-section--visible .hi-francesca-paragraph {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Background — very slow ambient brightness breath ============ */
        .hi-francesca-bg {
          animation: hiFrancescaBgBreath 20s ease-in-out infinite alternate;
        }
        @keyframes hiFrancescaBgBreath {
          0%   { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.025) saturate(1.035); }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .hi-francesca-greeting,
          .hi-francesca-script,
          .hi-francesca-paragraph,
          .hi-francesca-bg {
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