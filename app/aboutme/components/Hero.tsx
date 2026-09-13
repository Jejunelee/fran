"use client";

import React, { useEffect, useState } from "react";

const genuinelyScriptClass =
  "font-script text-[1.6em] sm:text-[1.7em] md:text-[1.75em] leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

const outgrewScriptClass =
  "font-script text-[1.7em] sm:text-[1.8em] md:text-[1.85em] leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]";

/* ---------------- Navigation ---------------- */

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

export const Navigation = (): React.ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* ---------- Mobile Menu Overlay (BELOW the nav) ---------- */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-[#750100]/95 backdrop-blur-sm md:hidden overflow-y-auto overscroll-contain hero-mobile-menu-enter"
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
                style={{ animationDelay: `${120 + index * 70}ms` }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            {/* Explicit close fallback */}
            <button
              type="button"
              onClick={closeMenu}
              className="hero-mobile-menu-link mt-4 font-josefin text-xs uppercase tracking-[0.2em] text-[#f7f3ee]/80 underline underline-offset-4 hover:text-[#f7f3ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f3ee] py-2 px-4"
              style={{ animationDelay: `${120 + navigationItems.length * 70}ms` }}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------- Nav Bar (ALWAYS above the overlay on mobile) ---------- */}
      <nav
        className="hero-nav-enter fixed md:absolute left-0 right-0 z-50 bg-[#750100]/90 backdrop-blur-sm shadow-lg
          top-0 md:bottom-0 md:top-auto"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        aria-label="Primary navigation"
      >
        <div className="max-w-[1120px] mx-auto min-h-[48px] h-[48px] sm:h-[52px] md:h-[52px] lg:h-[56px] px-3 sm:px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-full gap-2 sm:gap-3 md:gap-4">
            {/* Mobile hamburger (only < md) */}
            <div className="md:hidden">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
              />
            </div>

            {/* Left desktop nav group */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(0, 2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${900 + index * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            {/* Desktop spacer */}
            <div className="hidden md:block flex-1 min-w-0"></div>

            {/* Right desktop nav group */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-18">
              {navigationItems.slice(2).map((item, index) => (
                <span
                  key={item.label}
                  className="hero-nav-item"
                  style={{ animationDelay: `${900 + (index + 2) * 90}ms` }}
                >
                  <NavLink href={item.href} label={item.label} />
                </span>
              ))}
            </div>

            {/* Mobile brand (only < md) */}
            <span className="hero-mobile-brand md:hidden font-josefin text-xs font-light text-[#f7f3ee] tracking-[0.2em] uppercase">
              About
            </span>

            {/* Mobile spacer to balance hamburger */}
            <div className="md:hidden w-11" aria-hidden="true"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

/* ---------------- Hero ---------------- */

/* Small helper: wraps each word in a span so it can be animated
   independently without altering the DOM text content. */
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

export default function Hero() {
  // Scroll-linked parallax for the background image.
  // rAF-throttled, transform-only (no layout shifts).
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
      // Move background slower than scroll for depth.
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
      {/* Background image — full bleed, behind everything */}
      <div
        id="hero-bg-parallax"
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/AboutMe/Hero/hero.png')" }}
      >
        {/* Hidden img kept as intrinsic-sizing fallback / preload */}
        <img src="/AboutMe/Hero/hero.png" alt="" className="hidden" />
      </div>

      {/*
        Content wrapper — flex-centered in the viewport.
        No top padding, so `items-center` lands on the true vertical
        midpoint. The fixed mobile nav simply overlays the top of the
        image without biasing the centering.
        `min-h-[100dvh]` uses the dynamic viewport height so mobile
        browser chrome (URL bar) doesn't shift the visual center.
      */}
      <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-12 lg:px-16 xl:px-24 min-h-[100dvh] flex items-center justify-center">
        <div className="mx-auto w-full max-w-[900px] text-center">
          <h1
            id="about-heading"
            className="font-serif font-normal text-[#750000] tracking-[-0.02em] [text-wrap:balance]
              text-[clamp(1.5rem,7.5vw,3.5rem)] md:text-[clamp(1.5rem,3.4vw,3.5rem)]
              leading-[0.85]
              [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]
              m-0"
          >
            {/* Line 1 */}
            <span className="block">
              <Word delay={0}>I</Word>{" "}
              <Word delay={90}>built</Word>{" "}
              <Word delay={180}>a</Word>{" "}
              <Word delay={270}>life</Word>{" "}
              <Word delay={360}>I</Word>{" "}
              <Word delay={470} variant="script" className={genuinelyScriptClass}>
                genuinely
              </Word>{" "}
              <Word delay={640}>wanted</Word>
            </span>

            {/* Line 2 */}
            <span className="block leading-[0.9]">
              <Word delay={820}>Then</Word>{" "}
              <Word delay={910}>I</Word>{" "}
              <Word delay={1020} variant="script" className={outgrewScriptClass}>
                outgrew
              </Word>{" "}
              <Word delay={1190}>it</Word>
            </span>

            {/* Line 3 */}
            <span className="block font-script text-[1.4em] sm:text-[1.5em] md:text-[1.55em] leading-[0.8] text-[#750000] relative z-[2] font-normal tracking-[0.01em] [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]">
              <Word delay={1380} variant="script">Then</Word>{" "}
              <Word delay={1470} variant="script">I</Word>{" "}
              <Word delay={1560} variant="script">did</Word>{" "}
              <Word delay={1650} variant="script">it</Word>{" "}
              <Word delay={1740} variant="script">again.</Word>
            </span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Base states (pre-animation) ============ */
        .hero-word {
          display: inline-block;
          will-change: transform, opacity, filter;
          /* default end-state so reduced-motion users see static text */
          opacity: 1;
        }

        /* Serif words: clean vertical mask reveal + tiny upward settle. */
        .hero-word--serif {
          opacity: 0;
          transform: translate3d(0, 0.85em, 0);
          clip-path: inset(-20% -10% 100% -10%);
          animation: heroWordSerifReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Script words: elastic overshoot + subtle rotation. */
        .hero-word--script {
          opacity: 0;
          transform: translate3d(0, 0.9em, 0) scale(0.9) rotate(-4deg);
          transform-origin: 50% 70%;
          animation: heroWordScriptReveal 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes heroWordSerifReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 0.85em, 0);
            clip-path: inset(-20% -10% 100% -10%);
            filter: blur(2px);
          }
          55% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            clip-path: inset(-20% -10% -20% -10%);
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

        /* ============ Background ambient drift ============ */
        .hero-bg {
          transform: translate3d(0, 0, 0) scale(1.08);
          animation: heroBgDrift 18s ease-in-out infinite alternate;
        }

        @keyframes heroBgDrift {
          0%   { background-position: 50% 45%; }
          100% { background-position: 50% 55%; }
        }

        /* ============ Navigation entrance ============ */
        /* Mobile: from top. Desktop: from bottom. */
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

        /* Nav links: fade + rise with stagger */
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

        /* ============ Mobile menu ============ */
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

        /* ============ Reduced motion ============ */
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
      `}</style>
    </section>
  );
}