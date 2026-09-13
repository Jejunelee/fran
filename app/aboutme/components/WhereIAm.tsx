"use client";

import React, { useEffect, useRef, useState } from "react";

const scriptSpanClass =
  "font-script text-[1.4em] md:text-[1.5em] leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750100] relative z-[2] font-normal";

export default function WhereIAmNow() {
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
      className={`where-i-am-section relative w-full overflow-visible px-5 py-[80px] sm:px-6 md:py-[100px]
        max-md:py-14 ${isVisible ? "where-i-am-section--visible" : ""}`}
    >
      {/* Frame Images — decorative, desktop only */}
      {/* Frame 4 — Top Right */}
      <img
        src="/AboutMe/WhereIAm/4.png"
        alt=""
        aria-hidden="true"
        className="where-frame where-frame--tr pointer-events-none absolute right-[20px] top-[-60px] z-[1] h-auto w-[143px] object-contain sm:right-[40px] sm:top-[-70px] sm:w-[176px] md:right-[60px] md:top-[-80px] md:w-[220px] lg:right-[105px] lg:w-[275px]
          max-md:hidden"
        style={{ animationDelay: "220ms" }}
      />

      {/* Frame 2 — Bottom Left */}
      <img
        src="/AboutMe/WhereIAm/1.png"
        alt=""
        aria-hidden="true"
        className="where-frame where-frame--bl pointer-events-none absolute left-[10px] top-[55%] z-[1] h-auto w-[143px] object-contain sm:left-[20px] sm:top-[50%] sm:w-[176px] md:left-[30px] md:top-[48%] md:w-[220px] lg:left-[42px] lg:top-[45%] lg:w-[277px]
          max-md:hidden"
        style={{ animationDelay: "340ms" }}
      />

      {/* Frame 1 — Top Left */}
      <img
        src="/AboutMe/WhereIAm/3.png"
        alt=""
        aria-hidden="true"
        className="where-frame where-frame--tl pointer-events-none absolute left-[10px] top-[-30px] z-[3] h-auto w-[163px] object-contain sm:left-[40px] sm:top-[-20px] sm:w-[213px] md:left-[60px] md:top-[-15px] md:w-[263px] lg:left-[100px] lg:top-[-5px] lg:w-[319px]
          max-md:hidden"
        style={{ animationDelay: "120ms" }}
      />

      {/* Frame 3 — Bottom Right */}
      <img
        src="/AboutMe/WhereIAm/2.png"
        alt=""
        aria-hidden="true"
        className="where-frame where-frame--br pointer-events-none absolute right-[10px] bottom-[-40px] z-[3] h-auto w-[154px] object-contain sm:right-[40px] sm:bottom-[-50px] sm:w-[187px] md:right-[60px] md:bottom-[-60px] md:w-[231px] lg:right-[110px] lg:bottom-[-70px] lg:w-[286px]
          max-md:hidden"
        style={{ animationDelay: "440ms" }}
      />

      {/* Main Text Content */}
      <div className="relative z-[2] mx-auto flex w-full max-w-[720px] flex-col items-center text-center
        max-md:z-10 max-md:px-1">
        {/* Mobile-only scattered cluster of 4 frames at top of text */}
        <div className="md:hidden relative mb-5 h-[170px] w-full max-w-[400px]">
          <img
            src="/AboutMe/WhereIAm/3.png"
            alt=""
            aria-hidden="true"
            className="where-mobile-frame where-mobile-frame--1 absolute left-[0%] top-[-6px] h-auto w-[38%] max-w-[120px] object-contain rotate-[-8deg] z-[3]"
            style={{ animationDelay: "0ms" }}
          />
          <img
            src="/AboutMe/WhereIAm/1.png"
            alt=""
            aria-hidden="true"
            className="where-mobile-frame where-mobile-frame--2 absolute left-[33%] top-[6px] h-auto w-[34%] max-w-[108px] object-contain rotate-[6deg] z-[2]"
            style={{ animationDelay: "100ms" }}
          />
          <img
            src="/AboutMe/WhereIAm/4.png"
            alt=""
            aria-hidden="true"
            className="where-mobile-frame where-mobile-frame--3 absolute right-[-2%] top-[-10px] h-auto w-[36%] max-w-[116px] object-contain rotate-[-4deg] z-[1]"
            style={{ animationDelay: "200ms" }}
          />
          <img
            src="/AboutMe/WhereIAm/2.png"
            alt=""
            aria-hidden="true"
            className="where-mobile-frame where-mobile-frame--4 absolute left-[55%] top-[52px] h-auto w-[34%] max-w-[112px] object-contain rotate-[10deg] z-[4]"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Heading */}
        <h2 className="where-i-am-heading font-serif font-normal text-[#750100] leading-[0.9] tracking-[-0.04em] text-[clamp(36px,4vw,62px)]
          max-md:text-[clamp(30px,8.5vw,44px)] max-md:leading-[0.95]">
          <span className="font-serif">Where I am</span>{" "}
          <span
            className={`${scriptSpanClass} where-i-am-script md:!text-[2.25em] max-md:!text-[1.95em] max-md:!leading-[0.75]`}
          >
            now
          </span>
        </h2>

        {/* Paragraphs */}
        <div className="mt-[35px] md:mt-[38px] space-y-[25px] md:space-y-[28px]
          max-md:mt-6 max-md:space-y-5">
          <p className="where-i-am-paragraph where-i-am-paragraph--1 mx-auto max-w-[650px] font-josefin font-normal text-[#750100] text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] leading-[1.3] md:leading-[1.1]
            max-md:leading-[1.55]">
            I&rsquo;m 36. I live in Manila. I work with clients globally. I
            have a master&rsquo;s in psychology and a clinical eye for
            patterns. I also have a colorful personal life, a sharp sense of
            humor, and a low tolerance for nonsense.
          </p>

          <p className="where-i-am-paragraph where-i-am-paragraph--2 mx-auto max-w-[650px] font-josefin font-normal text-[#750100] text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] leading-[1.3] md:leading-[1.1]
            max-md:leading-[1.55]">
            I&rsquo;m not a &ldquo;healing&rdquo; coach. I don&rsquo;t pull
            cards. I won&rsquo;t tell you to manifest your way out of grief.
            I&rsquo;ll tell you the truth, clearly, with care, and in a way
            that&rsquo;s hard to unsee once you&rsquo;ve heard it.
          </p>

          <p className="where-i-am-paragraph where-i-am-paragraph--3 mx-auto max-w-[650px] font-josefin font-normal text-[#750100] text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] leading-[1.3] md:leading-[1.1]
            max-md:leading-[1.55]">
            My work isn&rsquo;t about teaching you who to become. It&rsquo;s
            about helping you stay connected to yourself while you become it.
            That&rsquo;s the work. If it sounds like what you&rsquo;ve been
            looking for, you&rsquo;re in the right place.
          </p>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Decorative frames — scale-in + de-blur ============
           Each frame "blooms" into place from slightly smaller with a
           soft de-blur, staggered around the composition. They settle
           in a loose clockwise order starting top-left, then
           top-right, then bottom-left, then bottom-right. */
        .where-frame {
          opacity: 0;
          transform: scale(0.85);
          filter: blur(6px);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      filter 1000ms cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        .where-i-am-section--visible .where-frame {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }

        /* ============ Mobile frames — staggered pop-in ============
           The four scattered frames enter one by one, each with a
           springy scale + rotation overshoot so they read as
           photographs being tossed onto a table, not placed. */
        .where-mobile-frame {
          opacity: 0;
          transform: scale(0.6);
          filter: blur(5px);
          transition: opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      filter 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        .where-i-am-section--visible .where-mobile-frame {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }

        /* ============ Heading — editorial slide from left ============ */
        .where-i-am-heading {
          opacity: 0;
          transform: translate3d(-22px, 0, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 500ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 500ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 500ms;
        }
        .where-i-am-section--visible .where-i-am-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "now" — elastic settle ============
           Preserves translate-y-[0.02em] on mobile by baking the
           offset into the final transform, and overrides to 0 at
           md+ so the baseline lands pixel-identical to its static
           position at every breakpoint. No clip-path. */
        .where-i-am-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.8) rotate(-7deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms;
        }
        .where-i-am-section--visible .where-i-am-script {
          opacity: 1;
          transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
        }
        @media (min-width: 768px) {
          .where-i-am-section--visible .where-i-am-script {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* ============ Paragraphs — staggered rise + de-blur ============ */
        .where-i-am-paragraph {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(4px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .where-i-am-paragraph--1 { transition-delay: 880ms; }
        .where-i-am-paragraph--2 { transition-delay: 1020ms; }
        .where-i-am-paragraph--3 { transition-delay: 1160ms; }

        .where-i-am-section--visible .where-i-am-paragraph {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .where-frame,
          .where-mobile-frame,
          .where-i-am-heading,
          .where-i-am-script,
          .where-i-am-paragraph {
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