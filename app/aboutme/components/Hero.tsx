"use client";

import React, { useEffect } from "react";
import { Navigation } from "@/app/components/Navigation";

/* ---------------- Script type styles ---------------- */

const scriptWordClass =
  "font-script !text-[2.15em] inline-block tracking-[0.01em] text-[#750000] relative z-[2] font-normal overflow-visible";

/* ---------------- Hero ---------------- */

const Word = ({
  children,
  className,
  delay,
  variant = "serif",
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  variant?: "serif" | "script";
}) => (
  <span
    className={`hero-word hero-word--${variant} ${className ?? ""}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </span>
);

const heroCss = String.raw`
  .hero-word {
    display: inline-block;
    will-change: transform, opacity, filter;
    opacity: 1;
  }

  /* Serif: rise from below with blur-out. NO clip-path — script
     glyphs that share the line can overflow their inline box. */
  .hero-word--serif {
    opacity: 0;
    transform: translate3d(0, 0.85em, 0);
    animation: heroWordSerifReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .hero-word--script {
    opacity: 0;
    overflow: visible;
    transform: translate3d(0, 0.9em, 0) scale(0.9) rotate(-4deg);
    transform-origin: 50% 70%;
    animation: heroWordScriptReveal 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .hero-section .hero-line {
    overflow: visible;
    height: 0.85em;
    line-height: 0.85;
  }

  @media (min-width: 768px) {
    .hero-section .hero-line {
      height: 0.7em;
      line-height: 0.7;
    }
  }

  @keyframes heroWordSerifReveal {
    0% {
      opacity: 0;
      transform: translate3d(0, 0.85em, 0);
      filter: blur(2px);
    }
    55% {
      opacity: 1;
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      filter: blur(0);
    }
  }

  @keyframes heroWordScriptReveal {
    0% {
      opacity: 0;
      transform: translate3d(0, 0.9em, 0) scale(0.9) rotate(-4deg);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, -0.06em, 0) scale(1.04) rotate(1.5deg);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }

  .hero-bg {
    transform: translate3d(0, 0, 0) scale(1.08);
  }

  .hero-nav-enter {
    opacity: 0;
    animation: heroNavEnterTop 800ms cubic-bezier(0.22, 1, 0.36, 1) 700ms both;
  }

  @media (min-width: 768px) {
    .hero-nav-enter {
      animation-name: heroNavEnterBottom;
    }
  }

  @keyframes heroNavEnterTop {
    0%   { opacity: 0; transform: translate3d(0, -110%, 0); }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @keyframes heroNavEnterBottom {
    0%   { opacity: 0; transform: translate3d(0, 110%, 0); }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  .hero-nav-item {
    display: inline-block;
    opacity: 0;
    transform: translate3d(0, 8px, 0);
    animation: heroNavItemIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes heroNavItemIn {
    0%   { opacity: 0; transform: translate3d(0, 8px, 0); }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  .hero-mobile-brand {
    opacity: 0;
    animation: heroNavItemIn 600ms cubic-bezier(0.22, 1, 0.36, 1) 950ms both;
  }

  .hero-mobile-menu-enter {
    animation: heroMenuFade 260ms ease-out both;
  }

  @keyframes heroMenuFade {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }

  .hero-mobile-menu-link {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
    animation: heroMenuLinkIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes heroMenuLinkIn {
    0%   { opacity: 0; transform: translate3d(0, 14px, 0); }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-word,
    .hero-word--serif,
    .hero-word--script,
    .hero-bg,
    .hero-nav-enter,
    .hero-nav-item,
    .hero-mobile-brand,
    .hero-mobile-menu-enter,
    .hero-mobile-menu-link {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      clip-path: none !important;
      filter: none !important;
    }
  }
`;

export default function Hero() {
  // Parallax on the background (transform only — no background-position trick)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const bg = document.getElementById("hero-bg-parallax");
    if (!bg) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      bg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="hero-section relative w-full min-h-screen overflow-x-clip"
      aria-labelledby="about-heading"
    >
      <div
        id="hero-bg-parallax"
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/AboutMe/hero/hero.png')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-12 lg:px-16 xl:px-24 min-h-[100dvh] flex items-center justify-center
        pt-[68px] sm:pt-[76px] md:pt-0">
        <div className="mx-auto w-full max-w-[900px] text-center min-w-0 overflow-x-clip">
          {/* MOBILE — wrap so lines fit */}
          <h1
            id="about-heading"
            className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] m-0 relative flex md:hidden flex-col items-center gap-[0.22em] text-center w-full text-[clamp(1.75rem,7.5vw,4.2rem)] leading-[0.85]"
          >
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
              <Word delay={0}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={90}>built</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={180}>a</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={270}>life</Word>
            </span>
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
              <Word delay={360}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={470} variant="script" className={scriptWordClass}>
                genuinely
              </Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={640}>wanted</Word>
            </span>
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
              <Word delay={820}>Then</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={910}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={1020} variant="script" className={scriptWordClass}>
                outgrew
              </Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={1190}>it</Word>
            </span>
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible font-script tracking-[0.01em] text-[#750000] relative z-[2] font-normal mt-5">
              <Word delay={2280} variant="script">Then</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2370} variant="script">I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2460} variant="script">did</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2550} variant="script">it</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2640} variant="script">again.</Word>
            </span>
          </h1>

          {/* DESKTOP — original 3 lines */}
          <h1
            className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] m-0 relative hidden md:flex flex-col items-center gap-[0.22em] md:gap-[0.28em] text-center w-full md:text-[clamp(1.5rem,4.2vw,4.2rem)] leading-[0.85] md:leading-[0.7]"
          >
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
              <Word delay={0}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={90}>built</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={180}>a</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={270}>life</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={360}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={470} variant="script" className={scriptWordClass}>
                genuinely
              </Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={640}>wanted</Word>
            </span>

            {/* Line 2 */}
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
              <Word delay={820}>Then</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={910}>I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={1020} variant="script" className={scriptWordClass}>
                outgrew
              </Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={1190}>it</Word>
            </span>

            {/* Line 3 */}
            <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible font-script tracking-[0.01em] text-[#750000] relative z-[2] font-normal mt-10 md:mt-14 lg:mt-16">
              <Word delay={2280} variant="script">Then</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2370} variant="script">I</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2460} variant="script">did</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2550} variant="script">it</Word>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <Word delay={2640} variant="script">again.</Word>
            </span>
          </h1>
        </div>
      </div>

      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: heroCss }} />
    </section>
  );
}