"use client";

import React, { useEffect, useRef, useState } from "react";

/* ---------------- Navigation items ---------------- */

const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "HOW IT WORKS", href: "/workwithme" },
  { label: "WORK WITH ME", href: "/workwithme" },
  { label: "RESOURCES", href: "/resources" },
];

const mobileNavigationItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT ME", href: "/aboutme" },
  { label: "HOW IT WORKS", href: "/workwithme" },
  { label: "WORK WITH ME", href: "/workwithme" },
  { label: "RESOURCES", href: "/resources" },
];

/* ---------------- Nav Link ---------------- */

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

/* ---------------- Mobile Hamburger Button ---------------- */

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

/* ---------------- Navigation ---------------- */

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
            {mobileNavigationItems.map((item, index) => (
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
              style={{ animationDelay: `${120 + mobileNavigationItems.length * 70}ms` }}
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
              ABOUT ME
            </span>

            <div className="md:hidden w-11" aria-hidden="true"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;