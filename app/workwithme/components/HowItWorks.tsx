"use client";

import React, { useEffect, useRef, useState } from "react";

const worksScriptClass =
  "font-script leading-[0.5] mx-[0.04em] translate-y-[0.02em] inline-block tracking-[0.02em] text-[#8F4A4A] relative z-[2] font-normal";

export default function HowItWorks() {
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
      className={`how-section relative w-full overflow-hidden max-md:![min-height:0px] ${
        isVisible ? "how-section--visible" : ""
      }`}
      style={{
        minHeight: "clamp(650px, 49vw, 760px)",
        backgroundImage: "url('/WorkWithMe/HowItWorks/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* CAT IMAGE — decorative, bottom-right on desktop */}
      <img
        src="/WorkWithMe/HowItWorks/cat.png"
        alt=""
        aria-hidden="true"
        className="how-cat-desktop pointer-events-none absolute right-0 bottom-0 z-[1] hidden h-auto w-[42vw] max-w-[700px] object-contain md:block"
      />

      {/* CONTENT — extra bottom padding on mobile so the pinned cat doesn't overlap */}
      <div className="relative z-[2] mx-auto w-full max-w-[1504px] px-6 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-20
        max-md:py-10 max-md:px-5 max-md:pb-[220px]">
        {/* Desktop two-column composition */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-8 lg:gap-12
          max-md:gap-8">
          {/* LEFT COLUMN */}
          <div className="md:max-w-[720px]">
            {/* Heading — sizes follow the Explain pattern:
                base = mobile (plain px), md: = clamp() for desktop.
                Script "works" is scaled with `em` relative to the heading,
                so it flows automatically. */}
            <h2
              className="how-heading font-serif font-normal text-[#8F4A4A] leading-[0.95] tracking-[-0.04em]
                !text-[30px]
                sm:!text-[34px]
                !leading-[0.95]
                md:!text-[clamp(34px,3.7vw,58px)]
                md:!leading-[0.92]"
            >
              <span className="how-heading-line block">
                <span className="font-serif">How it </span>
                <span className={`${worksScriptClass} how-heading-script !text-[2.4em]`}>
                  works
                </span>
              </span>
              <span className="how-heading-line block font-serif">
                1:1 Coaching Container:
              </span>
              <span className="how-heading-line block font-serif">
                &ldquo;Homecoming&rdquo;
              </span>
            </h2>

            {/* Bullet list — sizes follow the Explain pattern:
                base = mobile (plain px), md: = clamp() for desktop.
                Mobile sizes reduced a lot vs. original. */}
            <ul
              className="mt-7 md:mt-[40px] list-disc list-outside pl-6 md:pl-8 space-y-6 md:space-y-[30px] font-josefin font-normal text-[#750100] tracking-[0.01em]
                !text-[13px] sm:!text-[14px] !leading-[1.5]
                md:!text-[clamp(16px,1.5vw,24px)] md:!leading-[1.15]"
            >
              <li className="how-bullet" style={{ animationDelay: "360ms" }}>
                Minimum 8 sessions, up to 12 weeks
              </li>
              <li className="how-bullet" style={{ animationDelay: "460ms" }}>
                60-minute weekly sessions, conversational, led by whatever is
                actually coming up for you that week
              </li>
              <li className="how-bullet" style={{ animationDelay: "560ms" }}>
                Voice-note and message support between sessions, for when
                something hits midweek and you can&rsquo;t wait for the next
                call
              </li>
              <li className="how-bullet" style={{ animationDelay: "660ms" }}>
                Prompts, reflections, and the occasional framework sent between
                sessions, built around what you&rsquo;re working through. No
                generic workbooks.
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:w-[min(44vw,680px)] md:pt-4 lg:pt-6">
            {/* Investment box — sizes follow the Explain pattern. */}
            <div className="how-investment bg-[#750100] px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-11 lg:py-7">
              <p
                className="font-josefin font-bold tracking-[0.01em] text-[#F8F1E7] uppercase
                  !text-[14px] sm:!text-[15px]
                  md:!text-[clamp(16px,1.3vw,20px)]"
              >
                Investment
              </p>
              <p
                className="mt-2 font-serif font-normal text-[#F8F1E7] leading-[1.05]
                  !text-[24px] sm:!text-[28px]
                  md:!text-[clamp(28px,3vw,46px)]"
              >
                USD $120 per session
              </p>
              <p
                className="mt-3 font-josefin font-normal text-[#F8F1E7]
                  !text-[13px] sm:!text-[14px] !leading-[1.5]
                  md:!text-[clamp(15px,1.4vw,20px)] md:!leading-[1.35]"
              >
                8-session minimum, payable per session or as a full container.
              </p>
            </div>

            {/* Right body paragraph — sizes follow the Explain pattern. */}
            <p
              className="how-right-copy mt-6 md:mt-[30px] font-josefin font-normal text-[#750100] tracking-[0.01em]
                !text-[13px] sm:!text-[14px] !leading-[1.5]
                md:!text-[clamp(16px,1.5vw,23px)] md:!leading-[1.15]"
            >
              Eight sessions isn&rsquo;t arbitrary. Real pattern change takes
              time, and most of the meaningful shifts I see happen between
              sessions four and seven. Anything shorter is a conversation, not
              a container.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE CAT — pinned to section bottom on mobile */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center md:hidden">
        <img
          src="/WorkWithMe/HowItWorks/cat.png"
          alt=""
          aria-hidden="true"
          className="how-cat-mobile h-auto w-full max-w-[min(80vw,360px)] object-contain"
        />
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading lines — editorial cascade ============
           Each line rises with a soft de-blur, staggered so the
           three-line heading reveals line-by-line. */
        .how-heading-line {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-heading-line:nth-child(1) { transition-delay: 80ms; }
        .how-heading-line:nth-child(2) { transition-delay: 220ms; }
        .how-heading-line:nth-child(3) { transition-delay: 320ms; }

        .how-section--visible .how-heading-line {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Script "works" — elastic settle.
           transform-origin near baseline so the script flourish
           stays aligned. NO clip-path. */
        .how-heading-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms,
                      transform 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) 420ms;
        }
        .how-section--visible .how-heading-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* ============ Bullet list items — directional cascade ============
           Each li slides in from the right with a soft de-blur.
           Delays are inline per item (360ms / 460ms / 560ms / 660ms). */
        .how-bullet {
          opacity: 0;
          transform: translate3d(20px, 0, 0);
          filter: blur(4px);
          transition: opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-section--visible .how-bullet {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Investment box — rise + idle glow ============
           The dark panel rises with a bit of scale and then breathes
           its shadow gently so it reads as the "anchor" of the right
           column. */
        .how-investment {
          opacity: 0;
          transform: translate3d(0, 26px, 0) scale(0.97);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
                      box-shadow 4500ms ease-in-out;
        }
        .how-section--visible .how-investment {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          animation: howInvestmentPulse 5s ease-in-out 1.4s infinite;
        }
        @keyframes howInvestmentPulse {
          0%   { box-shadow: 0 0 0 0 rgba(117, 1, 0, 0); }
          50%  { box-shadow: 0 10px 30px -6px rgba(117, 1, 0, 0.35); }
          100% { box-shadow: 0 0 0 0 rgba(117, 1, 0, 0); }
        }

        /* ============ Right body paragraph ============ */
        .how-right-copy {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) 900ms,
                      transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 900ms;
        }
        .how-section--visible .how-right-copy {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Cat (desktop) — static, entrance fade only ============ */
        .how-cat-desktop {
          opacity: 0;
          transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms;
        }
        .how-section--visible .how-cat-desktop {
          opacity: 1;
        }

        /* ============ Cat (mobile) — static, entrance fade only ============ */
        .how-cat-mobile {
          opacity: 0;
          transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) 800ms;
        }
        .how-section--visible .how-cat-mobile {
          opacity: 1;
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .how-heading-line,
          .how-heading-script,
          .how-bullet,
          .how-investment,
          .how-right-copy,
          .how-cat-desktop,
          .how-cat-mobile {
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