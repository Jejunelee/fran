"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const bodyText =
  "font-josefin text-[15px] sm:text-[16px] md:text-[clamp(14px,1.2vw,18px)] lg:text-[clamp(16px,1.3vw,20px)] font-normal leading-[1.65] md:leading-[1.7] lg:leading-[1.8] tracking-[0.01em] text-[#5a0a0a] text-center md:text-left m-0 whitespace-normal break-words transition-all duration-700";

export default function Lion() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  const paragraphs = [
    {
      text: "You don't need another book, another podcast, another framework. I'm not against frameworks. I have a master's in psychology, I know they have their place. But you've already done that part. You've understood yourself from every possible angle.",
      delay: "0.1s",
      emphasis: false,
    },
    {
      text: "The problem was never that you don't know. It's that you're too close to your own patterns to see them clearly.",
      delay: "0.2s",
      emphasis: false,
    },
    {
      text: "That's where I come in. I see what you're doing, clearly and without flinching. The truths you soften. The stories you keep repeating. The ways you abandon yourself and call it being reasonable.",
      delay: "0.3s",
      emphasis: false,
    },
    {
      text: "Then I hold the mirror up. Not to shame you, not to fix you. Just to show you what you've been too close to see. And once you've seen it, you can't unsee it.",
      delay: "0.4s",
      emphasis: false,
    },
    {
      text: "That's where it starts to change. It's not always comfortable. But it sticks.",
      delay: "0.5s",
      emphasis: true,
    },
  ];

  return (
    <main
      ref={sectionRef}
      className="relative z-10 w-full max-w-[1504px] mx-auto
        px-4 sm:px-6 md:px-8 lg:px-12
        pt-6 sm:pt-8 md:pt-16 lg:pt-24
        pb-6 sm:pb-8 md:pb-8 lg:pb-12
        mb-0 md:-mb-16 lg:-mb-24
        overflow-visible"
    >
      {/* Background layer — soft unfold + subtle ambient drift */}
      <div
        className={`lion-bg absolute top-0 left-0 right-0 bottom-6 sm:bottom-8 md:bottom-16 lg:bottom-24
          bg-[rgba(243,237,229,0.6)] backdrop-blur-[0.5px] bg-cover bg-center bg-no-repeat bg-blend-overlay
          rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[1.5rem] lg:rounded-[2rem] rounded-b-none
          shadow-[0_8px_32px_rgba(80,40,20,0.08)] -z-10
          transition-all duration-1000
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-6 md:gap-8 lg:gap-10 items-center">
        {/* ===================== LEFT: IMAGE PANEL (desktop only) ===================== */}
        <section className="relative z-[2] hidden md:flex items-center justify-center w-full h-full overflow-visible py-4 md:py-8 lg:py-12">
          <div className="flex items-center justify-center w-full h-full overflow-visible">
            <Image
              src="/Lion/1.png"
              alt="Lion – majestic, powerful, and aware"
              width={400}
              height={488}
              className={`lion-desktop-img relative z-[2] w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] h-auto aspect-[0.82/1] object-contain block
                drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)] scale-[1.25] rounded-lg -mt-8 md:-mt-14 lg:-mt-16
                overflow-visible transition-all duration-1000
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
        <section className="relative z-[2] flex flex-col justify-center w-full h-full overflow-visible py-4 md:py-8 lg:py-12">
          <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-2.5 lg:gap-[0.7rem] w-full max-w-full mt-0 md:-mt-16 lg:-mt-28 -translate-y-[10px] md:-translate-y-[14px] lg:-translate-y-[18px]">
            {/* Mobile-only image at top of text column */}
            <div
              className={`lion-mobile-img md:hidden flex items-center justify-center w-full transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <Image
                src="/Lion/1.png"
                alt="Lion – majestic, powerful, and aware"
                width={400}
                height={488}
                className={`w-full max-w-[min(70vw,280px)] h-auto object-contain
                  drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)]
                  transition-all duration-1000
                  ${isVisible ? "translate-y-0" : "translate-y-8"}`}
                priority
              />
            </div>

            {/* Header — two lines on mobile, one line on desktop */}
            <header
              className={`w-full text-center md:text-left mb-1 md:mb-0 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? "0.05s" : "0s" }}
            >
              <h2 className="font-serif font-light text-[#750000] text-[clamp(2.75rem,5.625vw,5rem)] md:text-[clamp(1.75rem,2.4vw,3.25rem)] leading-[0.6] md:leading-[1.1] tracking-[-0.02em] [font-stretch:extra-condensed] text-center md:text-left m-0">
                {/* Mobile: two stacked lines */}
                <span className="block md:hidden">
                  I don&rsquo;t give you more{" "}
                  <span className="lion-script-inline inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                    information
                  </span>
                  .
                </span>
                <span className="block md:hidden -mt-1">
                  You&rsquo;ve got{" "}
                  <span className="lion-script-inline inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                    plenty
                  </span>
                  .
                </span>

                {/* Desktop: single line */}
                <span className="hidden md:inline">
                  I don&rsquo;t give you more{" "}
                  <span className="lion-script-inline inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                    information
                  </span>
                  . You&rsquo;ve got{" "}
                  <span className="lion-script-inline inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                    plenty
                  </span>
                  .
                </span>
              </h2>
            </header>

            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`lion-paragraph ${bodyText} ${
                  p.emphasis ? "font-bold text-[#7f0f0f]" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: isVisible ? p.delay : "0s" }}
              >
                {p.text}
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Ambient float on the lion image ============
           Both the desktop and mobile versions drift gently once
           the section is in view. Transform-only. */
        .lion-desktop-img {
          animation: lionFloat 7s ease-in-out 1.4s infinite;
        }
        .lion-mobile-img img {
          animation: lionFloat 7s ease-in-out 1.2s infinite;
        }

        @keyframes lionFloat {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(0, -6px, 0) rotate(-0.4deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        /* NOTE: The lion image already has Tailwind translate/rotate
           utilities applied when isVisible. To let the float keyframe
           take over cleanly after entrance, the animation only starts
           after a delay (1.4s desktop / 1.2s mobile), by which time
           the entrance transition has finished. The keyframe uses
           translate3d so it plays well with the existing transform. */

        /* ============ Soft glow pulse on the background panel ============
           Very subtle, only after entrance. */
        .lion-bg {
          animation: lionGlow 12s ease-in-out 1.8s infinite;
        }

        @keyframes lionGlow {
          0%   { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
          50%  { box-shadow: 0 12px 40px rgba(80, 40, 20, 0.12); }
          100% { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
        }

        /* ============ Script accent words ============
           "information" and "plenty" get a soft elastic drift so they
           stand out as the decorative accents of the headline. */
        .lion-script-inline {
          transform-origin: 50% 70%;
          animation: lionScriptPulse 5s ease-in-out infinite;
        }

        @keyframes lionScriptPulse {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50%  { transform: translate3d(0, -2px, 0) rotate(-0.6deg) scale(1.015); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }

        /* ============ Paragraph hover micro-interaction ============
           A barely-there lift on hover. Keeps the paragraph feel
           interactive without changing the reading experience. */
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