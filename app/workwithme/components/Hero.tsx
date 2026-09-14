"use client";

import React, { useEffect, useRef, useState } from "react";

// -------------------------------------------------------------
// Reduced-motion hook
// -------------------------------------------------------------
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return prefersReduced;
};

// Navigation Component
const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "HOW IT WORKS", href: "/workwithme" },
  { label: "WORK WITH ME", href: "/workwithme" },
  { label: "RESOURCES", href: "/resources" },
];

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="relative font-josefin text-[clamp(0.5rem,1.2vw,1rem)] font-normal text-[#f7f3ee] whitespace-nowrap transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] sm:after:h-[1.5px] after:bg-[#f7f3ee] after:transition-all after:duration-300 hover:after:w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]"
  >
    {label}
  </a>
);

// Mobile Hamburger Menu
const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="relative z-50 flex flex-col items-center justify-center w-8 h-8 focus:outline-none md:hidden"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    <span
      className={`block h-0.5 w-6 bg-[#f7f3ee] transition-transform duration-300 ease-in-out ${
        isOpen ? "rotate-45 translate-y-1.5" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-[#f7f3ee] transition-opacity duration-300 ease-in-out my-1 ${
        isOpen ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-[#f7f3ee] transition-transform duration-300 ease-in-out ${
        isOpen ? "-rotate-45 -translate-y-1.5" : ""
      }`}
    />
  </button>
);

export const Navigation = (): React.ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Lock body scroll while the mobile menu is open (no effect on desktop —
  // the menu can't be opened there).
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay — sits BELOW the nav (z-40 vs z-50) so the X stays tappable */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="hero-mobile-menu-enter fixed inset-0 z-40 bg-[#750100]/95 backdrop-blur-sm md:hidden overflow-y-auto overscroll-contain"
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="flex flex-col items-center justify-center min-h-full gap-8 px-6"
            style={{
              paddingTop: "calc(4rem + env(safe-area-inset-top))",
              paddingBottom: "calc(4rem + env(safe-area-inset-bottom))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navigationItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="hero-mobile-menu-link font-josefin text-2xl font-normal text-[#f7f3ee] transition-all duration-300 hover:opacity-80 hover:scale-105 py-2"
                style={{ animationDelay: `${100 + index * 70}ms` }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            {/* Explicit close fallback */}
            <button
              type="button"
              onClick={closeMenu}
              className="hero-mobile-menu-link mt-4 font-josefin text-xs uppercase tracking-[0.2em] text-[#f7f3ee]/80 underline underline-offset-4 hover:text-[#f7f3ee] py-2 px-4"
              style={{ animationDelay: `${100 + navigationItems.length * 70}ms` }}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav
        className="hero-nav-enter absolute left-0 right-0 z-50 bg-[#750100]/90 backdrop-blur-sm shadow-lg
          top-0 md:bottom-0 md:top-auto
          md:bg-[#750100]/90
          max-md:fixed"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        aria-label="Primary navigation"
      >
        <div className="max-w-[1120px] mx-auto h-[44px] sm:h-[48px] md:h-[52px] lg:h-[56px] px-2 sm:px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-full gap-1 sm:gap-3 md:gap-4">
            {/* Mobile Hamburger - visible only on small screens */}
            <div className="md:hidden">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
              />
            </div>

            {/* Left Navigation Group - hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(0, 2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${850 + index * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            {/* Minimal spacer - hidden on mobile */}
            <div className="hidden md:block flex-1 min-w-0"></div>

            {/* Right Navigation Group - hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${850 + (index + 2) * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            {/* Mobile brand - visible only on mobile */}
            <span className="hero-mobile-brand md:hidden font-josefin text-xs font-light text-[#f7f3ee] tracking-[0.2em] uppercase">
              WORK WITH ME
            </span>

            {/* Mobile spacer to balance hamburger */}
            <div className="md:hidden w-8" aria-hidden="true"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

// -------------------------------------------------------------
// Hero Background Video
// Plays through once, then holds on the last frame.
// Signals `onReady` once the browser can actually paint frames.
// -------------------------------------------------------------
const HeroBackgroundVideo = ({ onReady }: { onReady: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasSignaledRef = useRef(false);

  // Wrap the signal so it only ever fires once per mount, no matter
  // how many events race to call it (canplay, error, timeout, etc.).
  const signalReady = () => {
    if (hasSignaledRef.current) return;
    hasSignaledRef.current = true;
    onReady();
  };

  // If reduced motion is preferred, skip playback entirely and jump
  // straight to the final frame so it reads as a static image. We
  // still must signal ready, or these users get a blank hero forever.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      const seekToEnd = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.max(0, video.duration - 0.001);
        }
        video.pause();
        signalReady();
      };

      if (video.readyState >= 1) {
        seekToEnd();
        return;
      }

      video.addEventListener("loadedmetadata", seekToEnd, { once: true });
      video.addEventListener("error", signalReady, { once: true });
      const rmTimeout = window.setTimeout(signalReady, 4000);

      return () => {
        video.removeEventListener("loadedmetadata", seekToEnd);
        video.removeEventListener("error", signalReady);
        window.clearTimeout(rmTimeout);
      };
    }

    // Normal path: wait until the browser can actually render frames.
    // readyState >= 3 (HAVE_FUTURE_DATA) means the current frame is
    // decoded and playable — a cache hit will already be there.
    if (video.readyState >= 3) {
      signalReady();
      return;
    }

    video.addEventListener("canplay", signalReady, { once: true });

    // Safety net: if the video stalls, never trap the user on a
    // blank screen forever.
    video.addEventListener("error", signalReady, { once: true });
    const timeout = window.setTimeout(signalReady, 4000);

    return () => {
      video.removeEventListener("canplay", signalReady);
      video.removeEventListener("error", signalReady);
      window.clearTimeout(timeout);
    };
  }, [prefersReducedMotion, onReady]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers reset to the first frame on 'ended'. Nudging
    // currentTime just before duration keeps the final frame painted.
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(0, video.duration - 0.001);
    }
    video.pause();
  };

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        aria-hidden="true"
      >
        <source src="/WorkWithMe/Hero/herobg4.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      className="hero-section relative w-full min-h-screen overflow-hidden"
      aria-labelledby="homecoming-heading"
    >
      {/* Background video covering the entire section — plays once, holds last frame.
          Signals back when it can paint so the text animation can start in sync. */}
      <HeroBackgroundVideo onReady={() => setVideoReady(true)} />

      {/* Animated content is only mounted once the video can paint,
          so every CSS animation starts from frame zero with the first
          visible video frame — no more racing animations behind a
          hidden curtain. */}
      {videoReady && (
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 xl:px-24 min-h-screen flex items-center
          max-md:pt-[68px]">
          {/* Content block - left aligned with reduced width */}
          <div className="flex max-w-2xl flex-col items-start gap-6 text-left ml-0 lg:ml-[-0.5rem] xl:ml-[-1rem]
            pt-14 sm:pt-16 md:pt-20 lg:pt-0
            pb-16 sm:pb-20 md:pb-24 lg:pb-28
            max-md:pt-4 max-md:pb-20 max-md:w-full">
            {/* Headline */}
            <h1
              id="homecoming-heading"
              className="font-serif font-light leading-[0.7] text-[#750000] [text-wrap:balance] tracking-normal [font-stretch:extra-condensed] [transform:scaleX(1.00)]
                max-md:leading-[0.9]"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              {/* Line 1: Homecoming with script H */}
              <span className="hero-line hero-line--1 block text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-2 md:-mt-3
                max-md:text-[clamp(1.75rem,8vw,2.75rem)] max-md:-mt-1">
                <span className="hero-script-inline inline-block font-script text-[clamp(1.8em,2.0em,2.0em)] leading-none pr-2 md:pr-3">
                  H
                </span>
                omecoming
              </span>

              {/* Line 2: 1:1 coaching */}
              <span className="hero-line hero-line--2 block text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-2 md:-mt-3 font-light
                max-md:text-[clamp(1.75rem,8vw,2.75rem)] max-md:-mt-1">
                &nbsp;&nbsp;&nbsp;&nbsp;1:1 coaching
              </span>

              {/* Line 3: with Francesca with script F */}
              <span className="hero-line hero-line--3 block text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-2 md:-mt-3 font-light
                max-md:text-[clamp(1.75rem,8vw,2.75rem)] max-md:-mt-1">
                &nbsp;&nbsp;&nbsp;&nbsp;with{" "}
                <span className="hero-script-inline inline-block font-script text-[clamp(1.8em,2.0em,2.0em)] leading-none pr-1">
                  F
                </span>
                rancesca
              </span>
            </h1>

            {/* Subtitle text — responsive sizes using the same pattern as Explain:
                - Base = mobile size (plain !text-[...], no clamp)
                - md: variant = clamp() for tablet and desktop
                - `!` prefix forces each size
                This is what makes the mobile size actually take effect. */}
            <p className="hero-subtitle max-w-lg font-josefin text-left tracking-normal
              !text-[14px] sm:!text-[15px] !leading-[1.6]
              md:!text-[clamp(0.85rem,1.5vw,1.1rem)] md:!leading-[1.5]
              text-[#2b1210]/80
              px-0
              max-md:max-w-full">
              This isn&apos;t about becoming someone new, and it isn&apos;t about going back to who you used to be. It&apos;s about building a strong enough relationship with yourself that you can move through any season of your life without losing the thread of who you are.
            </p>
          </div>
        </div>
      )}

      {/* Navigation at bottom on desktop, top on mobile.
          Stays mounted unconditionally so the page is never
          unnavigable if the video fails to load. */}
      <Navigation />

      {/* Decorative "Coming home" text - hidden on mobile.
          Mounts with the rest of the animated content so its
          entrance animation also plays in sync with the video. */}
      {videoReady && (
        <div
          aria-hidden="true"
          className="hero-coming-home pointer-events-none absolute bottom-20 right-8 z-10 hidden lg:flex items-center gap-3 font-josefin text-xs uppercase tracking-[0.2em] text-[#fdd1db] [writing-mode:vertical-rl]"
        >
          <span className="h-10 w-px bg-[#fdd1db]/60" />
          Coming home
        </div>
      )}

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Headline lines — editorial cascade ============
           Each of the three headline lines rises with a soft de-blur,
           staggered so the composition reveals line-by-line. */
        .hero-line {
          opacity: 0;
          transform: translate3d(0, 26px, 0);
          filter: blur(6px);
          animation: heroLineReveal 950ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-line--1 { animation-delay: 100ms; }
        .hero-line--2 { animation-delay: 240ms; }
        .hero-line--3 { animation-delay: 380ms; }

        @keyframes heroLineReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 26px, 0);
            filter: blur(6px);
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

        /* ============ Script letters (H, F) — elastic overshoot ============
           These are the decorative accents, so they get a bolder move:
           rise from below, scale up from 0.8, small rotation, on a
           springy curve. transform-origin near baseline. No clip-path. */
        .hero-script-inline {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.8) rotate(-8deg);
          animation: heroScriptReveal 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .hero-line--1 .hero-script-inline { animation-delay: 420ms; }
        .hero-line--3 .hero-script-inline { animation-delay: 720ms; }

        @keyframes heroScriptReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, 0) scale(0.8) rotate(-8deg);
          }
          60% {
            opacity: 1;
            transform: translate3d(0, -4px, 0) scale(1.06) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* ============ Subtitle ============ */
        .hero-subtitle {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          animation: heroFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms both;
        }
        @keyframes heroFadeUp {
          0%   { opacity: 0; transform: translate3d(0, 16px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* ============ Nav entrance — top on mobile, bottom on desktop ============ */
        .hero-nav-enter {
          opacity: 0;
          animation: heroNavEnterTop 800ms cubic-bezier(0.22, 1, 0.36, 1) 650ms both;
        }
        @media (min-width: 768px) {
          .hero-nav-enter { animation-name: heroNavEnterBottom; }
        }

        @keyframes heroNavEnterTop {
          0%   { opacity: 0; transform: translate3d(0, -110%, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes heroNavEnterBottom {
          0%   { opacity: 0; transform: translate3d(0, 110%, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* ============ Nav links — per-link stagger ============ */
        .hero-nav-item {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 8px, 0);
          animation: heroFadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-mobile-brand {
          opacity: 0;
          animation: heroFadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) 950ms both;
        }

        /* ============ Decorative "Coming home" ============ */
        .hero-coming-home {
          opacity: 0;
          animation: heroFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms both;
        }

        /* ============ Mobile menu ============ */
        .hero-mobile-menu-enter { animation: heroMenuFade 260ms ease-out both; }
        @keyframes heroMenuFade {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .hero-mobile-menu-link {
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          animation: heroFadeUp 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .hero-line,
          .hero-script-inline,
          .hero-subtitle,
          .hero-nav-enter,
          .hero-nav-item,
          .hero-mobile-brand,
          .hero-coming-home,
          .hero-mobile-menu-enter,
          .hero-mobile-menu-link {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}