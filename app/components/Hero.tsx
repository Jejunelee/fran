"use client";

import React, { useEffect, useRef, useState } from "react";
import {Navigation} from "./Navigation";

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
// Forward: native play(). Reverse: rAF stepping with seek-chaining
// so we don't skip frames. Loops forever.
// Signals `onReady` once the browser can paint the first frame.
// -------------------------------------------------------------
const HeroBackgroundVideo = ({ onReady }: { onReady: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasSignaledRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const reverseActiveRef = useRef(false);
  const pendingSeekRef = useRef(false);
  const reverseTargetRef = useRef(0);

  const signalReady = () => {
    if (hasSignaledRef.current) return;
    hasSignaledRef.current = true;
    onReady();
  };

  const stopRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Native forward playback.
  const playForward = () => {
    const video = videoRef.current;
    if (!video) return;
    reverseActiveRef.current = false;
    pendingSeekRef.current = false;
    stopRaf();
    video.playbackRate = 1;
    if (
      Number.isFinite(video.duration) &&
      video.currentTime >= video.duration - 0.05
    ) {
      video.currentTime = 0;
    }
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked — start reverse from current position.
        startReverse(video.currentTime);
      });
    }
  };

  // Reverse playback via seek-chaining.
  // We step currentTime backwards in small increments, but only
  // issue the next seek after the previous one has settled
  // (via the `seeked` event), so the browser actually decodes and
  // paints every frame instead of snapping to keyframes.
  const startReverse = (fromTime?: number) => {
    const video = videoRef.current;
    if (!video) return;

    reverseActiveRef.current = true;
    video.pause();

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      // Can't reverse without a duration — just restart forward.
      playForward();
      return;
    }

    // Frame step: ~30fps equivalent. Smaller = smoother but more seeks.
    const FRAME_STEP = 1 / 30;

    // Start from the end if we weren't given a position.
    if (fromTime == null || fromTime >= duration) {
      try {
        video.currentTime = Math.max(0, duration - 0.001);
      } catch {
        /* ignore */
      }
    }

    reverseTargetRef.current = Math.max(
      0,
      (fromTime != null ? fromTime : duration) - FRAME_STEP
    );

    const issueNextSeek = () => {
      const v = videoRef.current;
      if (!v || !reverseActiveRef.current) return;

      const target = reverseTargetRef.current;

      if (target <= 0) {
        // Reached the start — loop back to forward.
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        reverseActiveRef.current = false;
        playForward();
        return;
      }

      pendingSeekRef.current = true;
      try {
        v.currentTime = target;
      } catch {
        // If seeking fails, bail out and restart forward.
        reverseActiveRef.current = false;
        playForward();
      }
    };

    // Chain on `seeked` — only step again once the browser confirms
    // the previous seek has been rendered.
    const onSeeked = () => {
      if (!reverseActiveRef.current) return;
      pendingSeekRef.current = false;
      // Schedule the next step on the next animation frame so we
      // give the compositor a chance to present the frame.
      rafRef.current = requestAnimationFrame(() => {
        const v = videoRef.current;
        if (!v || !reverseActiveRef.current) return;
        reverseTargetRef.current = Math.max(0, v.currentTime - FRAME_STEP);
        issueNextSeek();
      });
    };

    video.addEventListener("seeked", onSeeked);

    // Kick off the first step.
    issueNextSeek();

    // Store the cleanup on the ref's closure by returning it up
    // through the effect teardown. We stash it on a ref so the
    // unmount cleanup can reach it.
    cleanupSeekedRef.current = () => {
      video.removeEventListener("seeked", onSeeked);
    };
  };

  const cleanupSeekedRef = useRef<(() => void) | null>(null);

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
      const rmTimeout = window.setTimeout(signalReady, 4000);
      video.addEventListener("error", signalReady, { once: true });

      return () => {
        video.removeEventListener("loadedmetadata", seekToEnd);
        video.removeEventListener("error", signalReady);
        window.clearTimeout(rmTimeout);
      };
    }

    const start = () => {
      signalReady();
      playForward();
    };

    const handleEnded = () => {
      startReverse();
    };

    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 3) {
      start();
      return () => {
        video.removeEventListener("ended", handleEnded);
        reverseActiveRef.current = false;
        stopRaf();
        cleanupSeekedRef.current?.();
      };
    }

    video.addEventListener("canplay", start, { once: true });

    const timeout = window.setTimeout(signalReady, 4000);
    video.addEventListener("error", signalReady, { once: true });

    return () => {
      video.removeEventListener("canplay", start);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", signalReady);
      window.clearTimeout(timeout);
      reverseActiveRef.current = false;
      stopRaf();
      cleanupSeekedRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        muted
        playsInline
        preload="auto"
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
              className="font-serif font-light leading-[0.85] md:leading-[0.7] text-[#750000] tracking-normal [font-stretch:extra-condensed] [transform:scaleX(1.00)] [text-wrap:nowrap] flex flex-col gap-[0.22em] md:gap-[0.28em] text-[clamp(1.75rem,7.5vw,4.2rem)] md:text-[clamp(1.5rem,4.2vw,4.2rem)]"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              <span className="mt-12 hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
                <Word delay={0} variant="script" className="font-script text-[clamp(1.8em,2.0em,2.0em)] pr-2 md:pr-3">
                  A
                </Word>
                <Word delay={80}>t</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={160}>some</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={240}>point,</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={330}>the</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={420}>life</Word>
              </span>

              <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
                <Word delay={520}>you</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={600}>built</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={680}>stops</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <Word delay={770}>feeling</Word>
              </span>

              <span className="hero-line flex items-end justify-center whitespace-nowrap overflow-visible">
                <Word delay={880}>like</Word>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className="hero-word-group" style={{ animationDelay: "980ms" }}>
                  <Word delay={980} variant="script" className="font-script text-[clamp(0.8em,2.0em,2.0em)]">
                    y
                  </Word>
                  <Word delay={1060}>ours</Word>
                </span>
              </span>
            </h1>

            <p className="mt-10 hero-fade-up max-w-[36ch] sm:max-w-xl font-josefin text-[clamp(0.95rem,1.8vw,1.25rem)] text-[#2b1210]/80 sm:text-xl text-center tracking-normal px-1 sm:px-0 leading-relaxed">
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

        .hero-section .hero-word--script {
          overflow: visible;
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
          display: inline-flex;
          align-items: flex-end;
          overflow: visible;
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