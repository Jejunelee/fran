"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { cmsStyleVars, mediaUrl, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

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

// -------------------------------------------------------------
// Hero Background Video
// Plays through once, then holds on the last frame.
// Signals `onReady` once the browser can actually paint frames.
// -------------------------------------------------------------
const HeroBackgroundVideo = ({ onReady, src }: { onReady: () => void; src: string }) => {
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
        <source src={mediaUrl(src)} type="video/mp4" />
      </video>
    </div>
  );
};

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    video: string;
    line1: string;
    line2: string;
    body: string;
    comingHome: string;
  }>("work", "hero");
  const line2Parts = c.line2?.split(/\s+with\s+/i) ?? ["", ""];
  const line2Main = line2Parts[0] ?? c.line2;
  const line2Name = line2Parts[1] ?? "";

  return (
    <section
      className="hero-section cms-section relative w-full min-h-screen overflow-hidden"
      aria-labelledby="homecoming-heading"
      style={cmsStyleVars(c.styles)}
    >
      {/* Background video covering the entire section — plays once, holds last frame.
          Signals back when it can paint so the text animation can start in sync. */}
      <HeroBackgroundVideo src={c.video} onReady={() => setVideoReady(true)} />

      {/* Animated content is only mounted once the video can paint,
          so every CSS animation starts from frame zero with the first
          visible video frame — no more racing animations behind a
          hidden curtain. */}
      {videoReady && (
        <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-12 lg:px-16 xl:px-24 min-h-screen flex items-start md:items-center
          pt-[68px] sm:pt-[76px] md:pt-0">
          <div className="flex w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex-col items-center md:items-start gap-6 sm:gap-8 text-center md:text-left mx-auto md:mx-0 md:ml-10 lg:ml-16 xl:ml-24
            pt-8 sm:pt-12 md:pt-16 lg:pt-0
            pb-16 sm:pb-20 md:pb-24 lg:pb-28
            max-md:w-full max-md:px-0">
            <h1
              id="homecoming-heading"
              className="font-serif font-light text-[#750000] tracking-normal [font-stretch:extra-condensed] m-0 relative flex flex-col items-center md:items-start gap-[0.22em] md:gap-[0.28em] text-center md:text-left w-full text-[clamp(2.45rem,10.5vw,5.88rem)] md:text-[clamp(2.1rem,5.88vw,5.88rem)] leading-[0.85] md:leading-[0.7]"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              {/* Line 1: Homecoming with script H */}
              <span className="hero-line hero-line--1 flex w-full items-end justify-center md:justify-start whitespace-nowrap overflow-visible">
                <span className="hero-script-inline inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] relative z-[2] font-normal overflow-visible" data-cms="script">
                  {c.line1.charAt(0)}
                </span>
                <span data-cms="heading">{c.line1.slice(1)}</span>
              </span>

              {/* Line 2: 1:1 coaching */}
              <span className="hero-line hero-line--2 flex w-full items-end justify-center md:justify-start whitespace-nowrap overflow-visible">
                <span className="hidden md:block w-[1.15em] shrink-0" aria-hidden="true" />
                <span data-cms="heading">{line2Main}</span>
              </span>

              {/* Line 3: with Francesca with script F */}
              {line2Name ? (
              <span className="hero-line hero-line--3 flex w-full items-end justify-center md:justify-start whitespace-nowrap overflow-visible">
                <span className="hidden md:block w-[1.15em] shrink-0" aria-hidden="true" />
                <span>with</span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className="hero-script-inline inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] relative z-[2] font-normal overflow-visible" data-cms="script">
                  {line2Name.charAt(0)}
                </span>
                <span data-cms="heading">{line2Name.slice(1)}</span>
              </span>
              ) : null}
            </h1>

            <p className="hero-subtitle mt-10 max-w-[28ch] sm:max-w-md md:max-w-xl lg:max-w-2xl font-josefin tracking-normal
              text-[clamp(0.95rem,1.8vw,1.25rem)] sm:text-xl leading-relaxed
              md:!text-[clamp(24px,1.875vw,30px)] md:!leading-[1.5]
              text-[#2b1210]/80 text-center md:text-left
              px-1 sm:px-0
              ml-3 md:ml-6 lg:ml-8"
              data-cms="body">
              {c.body}
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
          overflow: visible;
          height: 0.85em;
          line-height: 0.85;
          transform: translate3d(0, 26px, 0);
          filter: blur(6px);
          animation: heroLineReveal 950ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (min-width: 768px) {
          .hero-line {
            height: 0.7em;
            line-height: 0.7;
          }
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
          overflow: visible;
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