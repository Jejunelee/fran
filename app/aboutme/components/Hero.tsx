"use client";

import React, { useEffect, useRef, useState } from "react";

/* ---------------- Script type styles ---------------- */

const genuinelyScriptClass =
  "font-script leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)] " +
  "!text-[1.5em] sm:!text-[1.6em] md:!text-[1.75em]";

const outgrewScriptClass =
  "font-script leading-[0.5] mx-[0.06em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)] " +
  "!text-[1.55em] sm:!text-[1.65em] md:!text-[1.85em]";

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
    className="relative font-josefin font-normal text-[#f7f3ee] whitespace-nowrap transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] sm:after:h-[1.5px] after:bg-[#f7f3ee] after:transition-all after:duration-300 hover:after:w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]
      !text-[9px] sm:!text-[11px]
      md:!text-[clamp(0.5rem,1.2vw,1rem)]"
  >
    {label}
  </a>
);

const MobileMenuButton = ({
  isOpen,
  onClick,
  buttonRef,
}: {
  isOpen: boolean;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) => (
  <button
    ref={buttonRef}
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Body scroll lock
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Escape to close (depends on isMobileMenuOpen so it's inert when closed)
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  // Focus trap + focus return
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = menuPanelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Move focus into the dialog on open
    (first ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      // Return focus to the toggle button when the menu closes
      menuButtonRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuPanelRef}
          tabIndex={-1}
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
                className="hero-mobile-menu-link font-josefin font-normal text-[#f7f3ee] transition-all duration-300 hover:opacity-80 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f3ee] py-2
                  !text-[18px] sm:!text-[20px]"
                style={{ animationDelay: `${120 + index * 70}ms` }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={closeMenu}
              className="hero-mobile-menu-link mt-4 font-josefin uppercase tracking-[0.2em] text-[#f7f3ee]/80 underline underline-offset-4 hover:text-[#f7f3ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f3ee] py-2 px-4
                !text-[11px] sm:!text-[12px]"
              style={{ animationDelay: `${120 + navigationItems.length * 70}ms` }}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav
        className="hero-nav-enter fixed md:absolute left-0 right-0 z-50 bg-[#750100]/90 backdrop-blur-sm shadow-lg
          top-0 md:bottom-0 md:top-auto"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        aria-label="Primary navigation"
      >
        <div className="max-w-[1120px] mx-auto min-h-[48px] h-[48px] sm:h-[52px] md:h-[52px] lg:h-[56px] px-3 sm:px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-full gap-2 sm:gap-3 md:gap-4">
            <div className="md:hidden">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                buttonRef={menuButtonRef}
              />
            </div>

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

            <div className="hidden md:block flex-1 min-w-0"></div>

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

            <span className="hero-mobile-brand md:hidden font-josefin text-xs font-light text-[#f7f3ee] tracking-[0.2em] uppercase">
              About
            </span>

            <div className="md:hidden w-11" aria-hidden="true"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

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
    transform: translate3d(0, 0.9em, 0) scale(0.9) rotate(-4deg);
    transform-origin: 50% 70%;
    animation: heroWordScriptReveal 1050ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
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
        style={{ backgroundImage: "url('/AboutMe/Hero/hero.png')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-12 lg:px-16 xl:px-24 min-h-[100dvh] flex items-center justify-center">
        <div className="mx-auto w-full max-w-[900px] text-center min-w-0">
          {/* STRICT 3 LINES */}
          <h1
            id="about-heading"
            className="font-serif font-normal text-[#750000] tracking-[-0.02em] [text-shadow:0_1px_2px_rgba(127,15,15,0.06)] m-0 overflow-x-clip
              !text-[clamp(1.05rem,5.2vw,2rem)] !leading-[0.9]
              md:!text-[clamp(1.5rem,3.4vw,3.5rem)] md:!leading-[0.85]"
          >
            {/* Line 1 */}
            <span className="block whitespace-nowrap">
              <Word delay={0}>I</Word>{" "}
              <Word delay={90}>built</Word>{" "}
              <Word delay={180}>a</Word>{" "}
              <Word delay={270}>life</Word>{" "}
              <Word delay={360}>I</Word>{" "}
              <Word delay={470} variant="script" className={genuinelyScriptClass}>
                genuinely
              </Word>{" "}
              <Word delay={640} className="!text-[0.85em]">wanted</Word>
            </span>

            {/* Line 2 */}
            <span className="block whitespace-nowrap leading-[0.9]">
              <Word delay={820}>Then</Word>{" "}
              <Word delay={910}>I</Word>{" "}
              <Word delay={1020} variant="script" className={outgrewScriptClass}>
                outgrew
              </Word>{" "}
              <Word delay={1190} className="!text-[0.85em]">it</Word>
            </span>

            {/* Line 3 */}
            <span
              className="block whitespace-nowrap font-script leading-[0.85] text-[#750000] relative z-[2] font-normal tracking-[0.01em] [text-shadow:0_1px_2px_rgba(127,15,15,0.06)]
                !text-[1.15em] sm:!text-[1.25em]
                md:!text-[1.55em]"
            >
              <Word delay={1380} variant="script">Then</Word>{" "}
              <Word delay={1470} variant="script">I</Word>{" "}
              <Word delay={1560} variant="script">did</Word>{" "}
              <Word delay={1650} variant="script">it</Word>{" "}
              <Word delay={1740} variant="script" className="!text-[0.85em]">again.</Word>
            </span>
          </h1>
        </div>
      </div>

      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: heroCss }} />
    </section>
  );
}