"use client";

import React, { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    image: string;
    imageAlt: string;
    greeting: string;
    name: string;
    bio: string;
    credentials: string;
    cta: string;
  }>("home", "intro");

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
    <main
      ref={sectionRef}
      className={`intro-panel cms-section grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[38%_62%] gap-6 md:gap-10 lg:gap-16 max-w-[1600px] min-h-[80vh] md:min-h-[70vh] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12 bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_rgba(80,40,20,0.08)] items-center w-full ${
        isVisible ? "intro-panel--visible" : ""
      }`}
      style={{
        ...cmsBg(c.background),
        ...cmsStyleVars(c.styles),
      }}
    >
      {/* =========================================================
          LEFT: IMAGE
          ========================================================= */}

      <section className="intro-image-section flex items-center justify-center w-full h-full order-1 md:order-none">
        <div className="flex items-center justify-center w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] max-h-[240px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-[500px] lg:max-h-[600px]">
          <CmsImage
            src={c.image}
            alt={c.imageAlt}
            width={400}
            height={488}
            className="intro-image w-full h-auto max-h-[240px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-[500px] lg:max-h-[600px] aspect-[0.82/1] object-contain block drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)]"
            priority
          />
        </div>
      </section>

      {/* =========================================================
          RIGHT: TEXT
          ========================================================= */}

      <section className="flex flex-col justify-center w-full h-full order-2 md:order-none">
        <div className="flex flex-col gap-3 xs:gap-4 md:gap-4 lg:gap-[1.2rem] max-w-full md:max-w-[520px] lg:max-w-[680px] items-center md:items-start">

          {/* =====================================================
              HEADING
              ===================================================== */}

          <h2 className="intro-heading font-serif font-light text-[#750000] text-[clamp(2.75rem,5.625vw,5rem)] leading-[0.6] tracking-[-0.02em] [font-stretch:extra-condensed] text-center md:text-left m-0">
            <span className="block">
              <span className="intro-greeting inline-block md:translate-y-[0.3em] text-[0.7em]" data-cms="heading">
                {c.greeting}
              </span>{" "}
              <span className="intro-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[3em] md:translate-x-[0.21em]" data-cms="script">
                {c.name}
              </span>
            </span>
          </h2>

          {/* =====================================================
              BIO
              ===================================================== */}

          <p className="intro-bio font-josefin text-[clamp(14px,1vw,16px)] md:text-[clamp(16px,1.3vw,20px)] font-normal leading-[1.6] md:leading-[1.8] tracking-[0.01em] text-[#5a0a0a] m-0 text-center md:text-left max-w-[90%] md:max-w-full" data-cms="body">
            {c.bio}
          </p>

          {/* =====================================================
              CREDENTIALS
              ===================================================== */}

          <p className="intro-credentials font-josefin text-[clamp(11px,0.8vw,14px)] md:text-[clamp(14px,1vw,17px)] text-[#6a2a1a] pt-2 border-t border-[rgba(90,10,10,0.08)] font-light tracking-[0.02em] m-0 text-center md:text-left max-w-[90%] md:max-w-full" data-cms="body">
            {c.credentials}
          </p>

          {/* =====================================================
              CTA
              ===================================================== */}

          <a
            href="/aboutme"
            className="intro-cta inline-flex items-center justify-center no-underline font-josefin text-[clamp(14px,0.9vw,16px)] md:text-[clamp(16px,1.1vw,18px)] font-semibold text-white bg-[#5a0a0a] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.8rem] border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-1 hover:bg-[#7f0f0f] hover:scale-[1.02] active:scale-[0.98] self-center md:self-start w-auto min-w-[160px] xs:min-w-[180px] md:min-w-0"
          >
            {c.cta}
          </a>
        </div>
      </section>

      {/* =========================================================
          ANIMATION + MOBILE RESPONSIVE LAYER
          ========================================================= */}

      <style>{`
        /* =======================================================
           IMAGE — INITIAL ANIMATION
           ======================================================= */

        .intro-image {
          opacity: 0;
          transform: translate3d(-20px, 30px, 0) rotate(-3deg);
          filter: blur(6px);

          transition:
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
            filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }

        .intro-panel--visible .intro-image {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: blur(0);

          animation:
            introImageFloat 7s ease-in-out 1.4s infinite;
        }

        @keyframes introImageFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(0, -6px, 0) rotate(-0.4deg);
          }

          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        /* =======================================================
           GREETING
           ======================================================= */

        .intro-greeting {
          opacity: 0;
          transform: translate3d(0, -18px, 0);
          filter: blur(4px);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
            filter 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms;
        }

        .intro-panel--visible .intro-greeting {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* =======================================================
           SCRIPT NAME
           ======================================================= */

        .intro-script {
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.85) rotate(-4deg);
          transform-origin: 50% 70%;

          transition:
            opacity 950ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms,
            transform 950ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms;
        }

        .intro-panel--visible .intro-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);

          animation:
            introScriptBreath 5.5s ease-in-out 1.6s infinite;
        }

        /* =======================================================
           DESKTOP SCRIPT POSITION
           ======================================================= */

        @media (min-width: 768px) {
          .intro-script {
            transform:
              translate3d(0.21em, 22px, 0)
              scale(0.85)
              rotate(-4deg);
          }

          .intro-panel--visible .intro-script {
            transform:
              translate3d(0.21em, 0, 0)
              scale(1)
              rotate(0deg);
          }

          @keyframes introScriptBreath {
            0% {
              transform:
                translate3d(0.21em, 0, 0)
                rotate(0deg)
                scale(1);
            }

            50% {
              transform:
                translate3d(0.21em, -2px, 0)
                rotate(-0.5deg)
                scale(1.008);
            }

            100% {
              transform:
                translate3d(0.21em, 0, 0)
                rotate(0deg)
                scale(1);
            }
          }
        }

        /* =======================================================
           BIO
           ======================================================= */

        .intro-bio {
          opacity: 0;
          transform: translate3d(0, 16px, 0);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 560ms,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 560ms;
        }

        .intro-panel--visible .intro-bio {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* =======================================================
           CREDENTIALS
           ======================================================= */

        .intro-credentials {
          opacity: 0;
          transform: translate3d(0, 12px, 0);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 720ms,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 720ms;
        }

        .intro-panel--visible .intro-credentials {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* =======================================================
           CTA
           ======================================================= */

        .intro-cta {
          opacity: 0;
          transform: translate3d(0, 16px, 0);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 880ms,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 880ms,
            background-color 300ms ease-in-out,
            box-shadow 4500ms ease-in-out;
        }

        .intro-panel--visible .intro-cta {
          opacity: 1;
          transform: translate3d(0, 0, 0);

          animation:
            introCtaPulse 4.5s ease-in-out 1.4s infinite;
        }

        @keyframes introCtaPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(90, 10, 10, 0);
          }

          50% {
            box-shadow: 0 6px 20px -4px rgba(90, 10, 10, 0.28);
          }

          100% {
            box-shadow: 0 0 0 0 rgba(90, 10, 10, 0);
          }
        }

        .intro-cta:hover {
          animation-play-state: paused;
        }

        /* =======================================================
           PANEL BREATH
           ======================================================= */

        .intro-panel--visible {
          animation:
            introPanelBreath 14s ease-in-out 1.6s infinite;
        }

        @keyframes introPanelBreath {
          0% {
            box-shadow:
              0 8px 32px rgba(80, 40, 20, 0.08);
          }

          50% {
            box-shadow:
              0 14px 44px rgba(80, 40, 20, 0.12);
          }

          100% {
            box-shadow:
              0 8px 32px rgba(80, 40, 20, 0.08);
          }
        }

        /* =======================================================
           =======================================================
           MOBILE
           =======================================================
           
           IMPORTANT:
           The mobile version is deliberately given explicit
           values instead of relying on vw/em scaling.

           This makes the physical phone render much closer to
           the narrow Chrome viewport.
           ======================================================= */

        @media (max-width: 767px) {

          /* -----------------------------------------------------
             MAIN PANEL
             ----------------------------------------------------- */

          .intro-panel {
            width: 100%;
            min-height: auto;

            grid-template-columns: 1fr;

            gap: 0;

            padding-left: 24px;
            padding-right: 24px;

            padding-top: 32px;
            padding-bottom: 40px;

            align-items: center;
          }

          /* -----------------------------------------------------
             IMAGE
             ----------------------------------------------------- */

          .intro-image-section {
            width: 100%;
            height: auto;

            margin-bottom: 18px;
          }

          .intro-image-section > div {
            width: 100%;
            max-width: 260px;
            max-height: none;
          }

          .intro-image {
            width: 100%;
            height: auto;
            max-width: 260px;
            max-height: none;

            aspect-ratio: 0.82 / 1;
            object-fit: contain;
          }

          /* -----------------------------------------------------
             TEXT PANEL
             ----------------------------------------------------- */

          .intro-panel > section:nth-of-type(2) {
            width: 100%;
            height: auto;
          }

          .intro-panel > section:nth-of-type(2) > div {
            width: 100%;
            max-width: 100%;

            gap: 14px;

            align-items: center;
          }

          /* -----------------------------------------------------
             HEADING
             
             Explicit mobile sizing.
             No vw-based scaling.
             No 3em inheritance.
             ----------------------------------------------------- */

          .intro-heading {
            width: 100%;

            font-size: 48px !important;
            line-height: 0.62 !important;

            letter-spacing: -0.02em;

            text-align: center;

            margin: 0;

            white-space: normal;
          }

          /* -----------------------------------------------------
             "HI, I'M"
             ----------------------------------------------------- */

          .intro-greeting {
            display: inline-block;

            font-size: 0.7em !important;

            transform: translate3d(0, 0, 0);
          }

          /* -----------------------------------------------------
             "FRANCESCA"
             
             Explicit size rather than 3em.
             This is the key mobile correction.
             ----------------------------------------------------- */

          .intro-script {
            display: inline-block;

            font-size: 2.1em !important;

            letter-spacing: 0.02em;

            transform-origin: 50% 70%;
          }

          /* -----------------------------------------------------
             MOBILE SCRIPT ANIMATION
             
             Keeps animation transform self-contained so the
             responsive sizing isn't affected by desktop
             translate-x behavior.
             ----------------------------------------------------- */

          .intro-panel--visible .intro-script {
            animation:
              introScriptBreathMobile 5.5s ease-in-out 1.6s infinite;
          }

          @keyframes introScriptBreathMobile {
            0% {
              transform:
                translate3d(0, 0, 0)
                rotate(0deg)
                scale(1);
            }

            50% {
              transform:
                translate3d(0, -2px, 0)
                rotate(-0.5deg)
                scale(1.008);
            }

            100% {
              transform:
                translate3d(0, 0, 0)
                rotate(0deg)
                scale(1);
            }
          }

          /* -----------------------------------------------------
             BIO
             ----------------------------------------------------- */

          .intro-bio {
            width: 100%;
            max-width: 90%;

            font-size: 15px !important;
            line-height: 1.6 !important;

            text-align: center;
          }

          /* -----------------------------------------------------
             CREDENTIALS
             ----------------------------------------------------- */

          .intro-credentials {
            width: 100%;
            max-width: 90%;

            font-size: 12px !important;
            line-height: 1.5;

            text-align: center;

            padding-top: 8px;
          }

          /* -----------------------------------------------------
             CTA
             ----------------------------------------------------- */

          .intro-cta {
            font-size: 15px !important;

            min-width: 180px;

            padding-left: 24px;
            padding-right: 24px;

            padding-top: 10px;
            padding-bottom: 10px;

            margin-top: 2px;

            align-self: center;
          }
        }

        /* =======================================================
           SMALL PHONES
           ======================================================= */

        @media (max-width: 390px) {

          .intro-panel {
            padding-left: 20px;
            padding-right: 20px;

            padding-top: 28px;
            padding-bottom: 36px;
          }

          .intro-image-section {
            margin-bottom: 16px;
          }

          .intro-image-section > div {
            max-width: 230px;
          }

          .intro-heading {
            font-size: 44px !important;
          }

          .intro-script {
            font-size: 2.05em !important;
          }

          .intro-bio {
            max-width: 92%;

            font-size: 14px !important;
          }

          .intro-credentials {
            max-width: 92%;

            font-size: 11px !important;
          }
        }

        /* =======================================================
           VERY SMALL PHONES
           ======================================================= */

        @media (max-width: 360px) {

          .intro-heading {
            font-size: 41px !important;
          }

          .intro-script {
            font-size: 2em !important;
          }

          .intro-image-section > div {
            max-width: 215px;
          }
        }

        /* =======================================================
           REDUCED MOTION
           ======================================================= */

        @media (prefers-reduced-motion: reduce) {
          .intro-image,
          .intro-greeting,
          .intro-script,
          .intro-bio,
          .intro-credentials,
          .intro-cta,
          .intro-panel,
          .intro-panel--visible {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }

          .intro-cta:hover {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}