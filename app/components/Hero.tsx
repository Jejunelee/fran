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

// Navigation items
const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "HOW IT WORKS", href: "/workwithme" },
  { label: "WORK WITH ME", href: "/workwithme" },
  { label: "RESOURCES", href: "#resources" },
];

// -------------------------------------------------------------
// Nav Link
// -------------------------------------------------------------
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="relative font-josefin text-[clamp(0.5rem,1.2vw,1rem)] font-normal text-[#f7f3ee] whitespace-nowrap transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] sm:after:h-[1.5px] after:bg-[#f7f3ee] after:transition-all after:duration-300 hover:after:w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]"
  >
    {label}
  </a>
);

// -------------------------------------------------------------
// Mobile Hamburger Button
// -------------------------------------------------------------
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
    className="relative z-50 flex flex-col items-center justify-center w-11 h-11 -ml-1 rounded-sm bg-transparent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee] md:hidden"
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

// -------------------------------------------------------------
// Navigation
// -------------------------------------------------------------
export const Navigation = (): React.ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
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
            className="flex min-h-full flex-col items-center justify-center gap-8 px-6"
            style={{
              paddingTop: "calc(5rem + env(safe-area-inset-top))",
              paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navigationItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="hero-mobile-menu-link font-josefin text-2xl font-normal text-[#f7f3ee] transition-all duration-300 hover:opacity-80 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f3ee] py-2"
                style={{ animationDelay: `${100 + index * 70}ms` }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={closeMenu}
              className="hero-mobile-menu-link mt-4 font-josefin text-xs uppercase tracking-[0.2em] text-[#f7f3ee]/80 underline underline-offset-4 hover:text-[#f7f3ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f3ee] py-2 px-4"
              style={{ animationDelay: `${100 + navigationItems.length * 70}ms` }}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav
        className="hero-nav-enter fixed md:absolute left-0 right-0 z-50 bg-[#750100]/90 backdrop-blur-sm shadow-lg
          top-0 md:bottom-0 md:top-auto
          md:bg-[#750100]/90"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        aria-label="Primary navigation"
      >
        <div className="max-w-[1120px] mx-auto min-h-[48px] h-[48px] sm:h-[52px] md:h-[52px] lg:h-[56px] px-3 sm:px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-full gap-2 sm:gap-3 md:gap-4">
            <div className="md:hidden">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
              />
            </div>

            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(0, 2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${800 + index * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            <div className="hidden md:block flex-1 min-w-0"></div>

            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${800 + (index + 2) * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            <span className="hero-mobile-brand md:hidden font-josefin text-xs font-light text-[#f7f3ee] tracking-[0.2em] uppercase">
              Homecoming
            </span>

            <div className="md:hidden w-11" aria-hidden="true"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

// -------------------------------------------------------------
// Hero Actions
// -------------------------------------------------------------
const heroActions = [
  {
    label: "Take the 2-minute self-assessment",
    href: "#self-assessment",
    variant: "primary" as const,
  },
  {
    label: "Book a call",
    href: "#book-a-call",
    variant: "secondary" as const,
  },
];

const buttonBase =
  "font-josefin inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-sm px-7 text-center text-sm uppercase tracking-[0.05em] transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-[58px] sm:px-9 sm:text-base";

const buttonVariants = {
  primary: `${buttonBase} bg-[#5B0706] text-[#fdd1db] shadow-[0_4px_14px_-4px_rgba(91,7,6,0.55)] hover:bg-[#750000] focus-visible:outline-[#5B0706]`,
  secondary: `${buttonBase} border border-[#5B0706] bg-[#F8F3EE] text-[#5B0706] hover:bg-[#5B0706] hover:text-[#fdd1db] focus-visible:outline-[#5B0706]`,
};

// -------------------------------------------------------------
// Word wrapper — no clip-path, no overflow tricks.
// -------------------------------------------------------------
const Word = ({
  children,
  delay,
  variant = "serif",
  className,
}: {
  children: React.ReactNode;
  delay: number;
  variant?: "serif" | "script";
  className?: string;
}) => (
  <span
    className={`hero-word hero-word--${variant} ${className ?? ""}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </span>
);

// -------------------------------------------------------------
// Hero Background Video
// Plays through once, holds on last frame.
// Signals `onReady` once the browser can actually paint frames.
// -------------------------------------------------------------
const HeroBackgroundVideo = ({ onReady }: { onReady: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasSignaledRef = useRef(false);

  // Wrap the signal so it only ever fires once per mount, no matter
  // how many events race to call it.
  const signalReady = () => {
    if (hasSignaledRef.current) return;
    hasSignaledRef.current = true;
    onReady();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      // Reduced motion: no playback, so "ready" is metadata + seek
      // to the final frame. Still must signal, or the hero stays
      // hidden forever for these users.
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
      // Safety net in case metadata never arrives.
      const rmTimeout = window.setTimeout(signalReady, 4000);
      video.addEventListener("error", signalReady, { once: true });

      return () => {
        video.removeEventListener("loadedmetadata", seekToEnd);
        video.removeEventListener("error", signalReady);
        window.clearTimeout(rmTimeout);
      };
    }

    // Normal path: wait until the browser can actually render frames.
    if (video.readyState >= 3) {
      signalReady();
      return;
    }

    video.addEventListener("canplay", signalReady, { once: true });

    // Safety net: if the video stalls or errors, never trap the user
    // on a blank screen forever.
    const timeout = window.setTimeout(signalReady, 4000);
    video.addEventListener("error", signalReady, { once: true });

    return () => {
      video.removeEventListener("canplay", signalReady);
      video.removeEventListener("error", signalReady);
      window.clearTimeout(timeout);
    };
  }, [prefersReducedMotion, onReady]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers reset to the first frame on 'ended'.
    // Nudging currentTime to (duration - tiny epsilon) keeps the
    // last frame rendered.
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(0, video.duration - 0.001);
    }
    video.pause();
  };

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        aria-hidden="true"
      >
        <source src="/Hero/herobg4.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

// -------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------
export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      className="hero-section relative w-full min-h-screen overflow-x-clip"
      aria-labelledby="homecoming-heading"
    >
      <HeroBackgroundVideo onReady={() => setVideoReady(true)} />

      {/* Animated hero content is only mounted once the video can paint,
          so every CSS animation starts from frame zero in sync with the
          first visible video frame. */}
      {videoReady && (
        <div
          className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-12 lg:px-16 xl:px-24 min-h-screen flex items-start
            pt-[68px] sm:pt-[76px] md:pt-0"
        >
          <div
            className="flex w-full max-w-3xl flex-col items-center gap-6 sm:gap-8 text-center mx-auto lg:mx-0 lg:ml-[-0.5rem] xl:ml-[-1rem]
              pb-16 sm:pb-20 md:pb-24 lg:pb-28
              pt-8 sm:pt-12 md:pt-16 lg:pt-24"
          >
            <h1
              id="homecoming-heading"
              className="font-serif font-light leading-[0.85] md:leading-[0.7] text-[#750000] [text-wrap:balance] tracking-normal [font-stretch:extra-condensed] [transform:scaleX(1.00)]"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              <span className="block text-[clamp(1.75rem,7.5vw,4.2rem)] md:text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-1 md:-mt-3">
                <Word delay={0} variant="script" className="font-script text-[clamp(1.8em,2.0em,2.0em)] leading-none pr-2 md:pr-3">
                  A
                </Word>
                <Word delay={80}>t</Word>{" "}
                <Word delay={160}>some</Word>{" "}
                <Word delay={240}>point,</Word>{" "}
                <Word delay={330}>the</Word>{" "}
                <Word delay={420}>life</Word>
              </span>

              <span className="block text-[clamp(1.75rem,7.5vw,4.2rem)] md:text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-1 md:-mt-3">
                <Word delay={520}>you</Word>{" "}
                <Word delay={600}>built</Word>{" "}
                <Word delay={680}>stops</Word>{" "}
                <Word delay={770}>feeling</Word>
              </span>

              <span className="block text-[clamp(1.75rem,7.5vw,4.2rem)] md:text-[clamp(1.5rem,4.2vw,4.2rem)] -mt-5 md:-mt-8">
                <Word delay={880}>like</Word>{" "}
                <span className="hero-word-group" style={{ animationDelay: "980ms" }}>
                  <Word delay={980} variant="script" className="font-script align-[0.05em] text-[clamp(0.8em,2.0em,2.0em)] leading-none">
                    y
                  </Word>
                  <Word delay={1060}>ours</Word>
                </span>
              </span>
            </h1>

            <p className="hero-fade-up max-w-[36ch] sm:max-w-xl font-josefin text-[clamp(0.95rem,1.8vw,1.25rem)] text-[#2b1210]/80 sm:text-xl text-center tracking-normal px-1 sm:px-0 leading-relaxed">
              Not because you chose wrong. You wanted it. You meant it. You
              just grew, and it didn&apos;t grow with you. Aren&apos;t you
              exhausted? I help women let go of what no longer fits, shed the
              roles they&apos;ve outgrown, and come back to the one thing
              that&apos;s been there the whole time.
            </p>

            <nav
              aria-label="Hero calls to action"
              className="hero-cta-row flex w-full max-w-sm sm:max-w-none flex-col items-stretch gap-3 pt-1 sm:flex-row sm:justify-center sm:items-center px-2 sm:px-0"
            >
              {heroActions.map((action, index) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`hero-cta-item ${buttonVariants[action.variant]} w-full sm:w-auto text-[clamp(0.7rem,0.9vw,0.875rem)] px-5 sm:px-7 min-h-[48px] h-[48px] sm:h-[52px] lg:h-[58px]`}
                  style={{ animationDelay: `${1500 + index * 130}ms` }}
                >
                  {action.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Decorative "Coming home" — mount with the rest of the hero
          content so its entrance animation also plays in sync. */}
      {videoReady && (
        <div
          aria-hidden="true"
          className="hero-coming-home pointer-events-none absolute bottom-20 right-8 z-10 hidden lg:flex items-center gap-3 font-josefin text-xs uppercase tracking-[0.2em] text-[#fdd1db] [writing-mode:vertical-rl]"
        >
          <span className="h-10 w-px bg-[#fdd1db]/60" />
          Coming home
        </div>
      )}

      {/* Navigation stays mounted unconditionally so the page remains
          usable even if the video never loads. */}
      <Navigation />

      {/* ---------------- Animation layer ---------------- */}
      <style>{`
        /* ============ Word reveal ============
           No clip-path anywhere. Script glyphs (A, y) have
           flourishes that overflow their inline box, so reveal is
           done with transform + opacity + filter. */

        .hero-word {
          display: inline-block;
          will-change: transform, opacity, filter;
          opacity: 1;
        }

        /* Serif words: rise from below with a soft blur-out. */
        .hero-word--serif {
          opacity: 0;
          transform: translate3d(0, 0.85em, 0);
          filter: blur(3px);
          animation: heroWordSerifReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Script words: bigger rise + elastic overshoot + rotation. */
        .hero-word--script {
          opacity: 0;
          transform: translate3d(0, 0.9em, 0) scale(0.85) rotate(-6deg);
          transform-origin: 50% 70%;
          filter: blur(3px);
          animation: heroWordScriptReveal 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes heroWordSerifReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 0.85em, 0);
            filter: blur(3px);
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

        @keyframes heroWordScriptReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 0.9em, 0) scale(0.85) rotate(-6deg);
            filter: blur(3px);
          }
          60% {
            opacity: 1;
            transform: translate3d(0, -0.08em, 0) scale(1.06) rotate(2deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }

        /* "yours" group — animate as one unit, no clip. */
        .hero-word-group {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 0.85em, 0);
          filter: blur(3px);
          animation: heroWordSerifReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ============ Supporting copy ============ */
        .hero-fade-up {
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          animation: heroFadeUp 850ms cubic-bezier(0.22, 1, 0.36, 1) 1250ms both;
        }

        @keyframes heroFadeUp {
          0%   { opacity: 0; transform: translate3d(0, 14px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* ============ CTA buttons ============ */
        .hero-cta-item {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          animation: heroFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ============ Nav entrance ============ */
        .hero-nav-enter {
          opacity: 0;
          animation: heroNavEnterTop 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms both;
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

        .hero-nav-item {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 8px, 0);
          animation: heroFadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-mobile-brand {
          opacity: 0;
          animation: heroFadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) 900ms both;
        }

        /* ============ Decorative "Coming home" ============ */
        .hero-coming-home {
          opacity: 0;
          animation: heroFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 1700ms both;
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
          .hero-word,
          .hero-word--serif,
          .hero-word--script,
          .hero-word-group,
          .hero-fade-up,
          .hero-cta-item,
          .hero-nav-enter,
          .hero-nav-item,
          .hero-mobile-brand,
          .hero-coming-home,
          .hero-mobile-menu-enter,
          .hero-mobile-menu-link {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}