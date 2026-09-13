"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Lion() {
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
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return (
    <main
      ref={sectionRef}
      className={`intro-panel grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[38%_62%] gap-6 md:gap-10 lg:gap-16 max-w-[1600px] min-h-[80vh] md:min-h-[70vh] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12 bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_rgba(80,40,20,0.08)] items-center w-full ${
        isVisible ? 'intro-panel--visible' : ''
      }`}
      style={{ backgroundImage: "url('/Intro/Pinkbg.png')" }}
    >
      {/* LEFT: IMAGE PANEL – appears first on mobile */}
      <section className="intro-image-section flex items-center justify-center w-full h-full order-1 md:order-none">
        <div className="flex items-center justify-center w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] max-h-[240px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-[500px] lg:max-h-[600px]">
          <Image
            src="/Intro/1.png"
            alt="Francesca – coach, psychologist, and guide"
            width={400}
            height={488}
            className="intro-image w-full h-auto max-h-[240px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-[500px] lg:max-h-[600px] aspect-[0.82/1] object-contain block drop-shadow-[0_4px_16px_rgba(60,30,10,0.12)]"
            priority
          />
        </div>
      </section>

      {/* RIGHT: TEXT PANEL – appears second on mobile */}
      <section className="flex flex-col justify-center w-full h-full order-2 md:order-none">
        <div className="flex flex-col gap-3 xs:gap-4 md:gap-4 lg:gap-[1.2rem] max-w-full md:max-w-[520px] lg:max-w-[680px] items-center md:items-start">
          {/* Heading — Testimonials sizing/structure */}
          <h2 className="intro-heading font-serif font-light text-[#750000] text-[clamp(2.75rem,5.625vw,5rem)] leading-[0.6] tracking-[-0.02em] [font-stretch:extra-condensed] text-center md:text-left m-0">
            <span className="block">
              <span className="intro-greeting inline-block md:translate-y-[0.3em] text-[0.7em]">
                Hi, I&rsquo;m
              </span>{" "}
              <span className="intro-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[3em] md:translate-x-[0.21em]">
                Francesca
              </span>
            </span>
          </h2>

          {/* Bio paragraph */}
          <p className="intro-bio font-josefin text-[clamp(14px,1vw,16px)] md:text-[clamp(16px,1.3vw,20px)] font-normal leading-[1.6] md:leading-[1.8] tracking-[0.01em] text-[#5a0a0a] m-0 text-center md:text-left max-w-[90%] md:max-w-full">
          I&apos;ve built a few different lives. Each one was real, and I meant every one of them. The work was learning to recognize when a chapter had run its course, and to evolve with it instead of clinging on. Now I help other people do the same, without the years of trial and error it took me.
          </p>

          {/* Credentials */}
          <p className="intro-credentials font-josefin text-[clamp(11px,0.8vw,14px)] md:text-[clamp(14px,1vw,17px)] text-[#6a2a1a] pt-2 border-t border-[rgba(90,10,10,0.08)] font-light tracking-[0.02em] m-0 text-center md:text-left max-w-[90%] md:max-w-full">
            MSc Psychology &nbsp;|&nbsp; Former beauty PR &nbsp;|&nbsp; Based in
            Manila, working with clients globally
          </p>

          {/* CTA Button */}
          <button className="intro-cta font-josefin text-[clamp(14px,0.9vw,16px)] md:text-[clamp(16px,1.1vw,18px)] font-semibold text-white bg-[#5a0a0a] px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-[0.8rem] border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-1 hover:bg-[#7f0f0f] hover:scale-[1.02] active:scale-[0.98] self-center md:self-start w-auto min-w-[160px] xs:min-w-[180px] md:min-w-0">
            Read My Story
          </button>
        </div>
      </section>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Image — dramatic rise + subtle rotation ============
           The portrait enters with a clean upward slide, a small
           counter-rotation, and a soft de-blur. Once settled, it
           drifts gently in an ambient float. */
        .intro-image {
          opacity: 0;
          transform: translate3d(-20px, 30px, 0) rotate(-3deg);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }
        .intro-panel--visible .intro-image {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: blur(0);
        }

        /* Ambient float runs continuously once visible. The keyframe
           starts from the settled transform so nothing jumps. */
        .intro-panel--visible .intro-image {
          animation: introImageFloat 7s ease-in-out 1.4s infinite;
        }
        @keyframes introImageFloat {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(0, -6px, 0) rotate(-0.4deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        /* ============ Heading — "Hi, I'm" + script "Francesca" ============
           The greeting drops in from above; the script name rises
           from below with an elastic overshoot. Two directions,
           one composition. No clip-path. */
        .intro-greeting {
          opacity: 0;
          transform: translate3d(0, -18px, 0);
          filter: blur(4px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
                      filter 800ms cubic-bezier(0.22, 1, 0.36, 1) 240ms;
        }
        .intro-script {
          opacity: 0;
          transform: translate3d(0, 22px, 0) scale(0.85) rotate(-4deg);
          transform-origin: 50% 70%;
          transition: opacity 950ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms,
                      transform 950ms cubic-bezier(0.34, 1.56, 0.64, 1) 380ms;
        }
        .intro-panel--visible .intro-greeting {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }
        .intro-panel--visible .intro-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* Desktop nudge for "Francesca" — matches existing
           md:translate-x-[0.21em] on the element; we keep the x
           offset by baking it into the transform above (translate3d
           x = 0.21em on md) via a media query so the utility class
           doesn't get clobbered by the animation. */
        @media (min-width: 768px) {
          .intro-script {
            transform: translate3d(0.21em, 22px, 0) scale(0.85) rotate(-4deg);
          }
          .intro-panel--visible .intro-script {
            transform: translate3d(0.21em, 0, 0) scale(1) rotate(0deg);
          }
        }

        /* After settle, gentle script breath. */
        .intro-panel--visible .intro-script {
          animation: introScriptBreath 5.5s ease-in-out 1.6s infinite;
        }
        @keyframes introScriptBreath {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50%  { transform: translate3d(0, -2px, 0) rotate(-0.5deg) scale(1.008); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }
        @media (min-width: 768px) {
          @keyframes introScriptBreath {
            0%   { transform: translate3d(0.21em, 0, 0) rotate(0deg) scale(1); }
            50%  { transform: translate3d(0.21em, -2px, 0) rotate(-0.5deg) scale(1.008); }
            100% { transform: translate3d(0.21em, 0, 0) rotate(0deg) scale(1); }
          }
        }

        /* ============ Bio paragraph ============ */
        .intro-bio {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 560ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 560ms;
        }
        .intro-panel--visible .intro-bio {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Credentials ============ */
        .intro-credentials {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 720ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 720ms;
        }
        .intro-panel--visible .intro-credentials {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ CTA Button ============
           Same rise-in as the rest, plus an idle glow pulse once
           settled. Pulse pauses on hover so scale interactions
           stay clean. */
        .intro-cta {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 880ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 880ms,
                      background-color 300ms ease-in-out,
                      box-shadow 4500ms ease-in-out;
        }
        .intro-panel--visible .intro-cta {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          animation: introCtaPulse 4.5s ease-in-out 1.4s infinite;
        }
        @keyframes introCtaPulse {
          0%   { box-shadow: 0 0 0 0 rgba(90, 10, 10, 0); }
          50%  { box-shadow: 0 6px 20px -4px rgba(90, 10, 10, 0.28); }
          100% { box-shadow: 0 0 0 0 rgba(90, 10, 10, 0); }
        }
        .intro-cta:hover {
          animation-play-state: paused;
        }

        /* ============ Panel — soft depth breath ============ */
        .intro-panel--visible {
          animation: introPanelBreath 14s ease-in-out 1.6s infinite;
        }
        @keyframes introPanelBreath {
          0%   { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
          50%  { box-shadow: 0 14px 44px rgba(80, 40, 20, 0.12); }
          100% { box-shadow: 0 8px 32px rgba(80, 40, 20, 0.08); }
        }

        /* ============ Reduced motion ============ */
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