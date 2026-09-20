"use client";

import React, { useEffect, useRef, useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const scriptSpanClass =
  "font-script leading-[0.5] mx-[0.04em] md:mx-[0.08em] translate-y-[0.02em] md:translate-y-[0em] inline-block tracking-[0.02em] text-[#750000] relative z-[2] font-normal [text-shadow:0_1px_2px_rgba(127,15,15,0.06)] " +
  "!text-[1.4em] sm:!text-[1.5em] md:!text-[1.85em]";

const credentialsCss = String.raw`
  /* ============ Heading — soft rise + de-blur ============ */
  .credentials-heading {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
    filter: blur(6px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
  }
  .credentials-section--visible .credentials-heading {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }

  /* ============ Script "credentials" — elastic settle ============
     The element carries translate-y-[0.02em] (md:translate-y-[0em]).
     We compose with translate3d and bake the 0.02em offset into
     the final state on mobile, overriding to 0 at md+ so the
     baseline lands pixel-identical to its static position at
     every breakpoint. transform-origin near baseline so the
     script flourish stays aligned. No clip-path. */
  .credentials-script {
    transform-origin: 50% 70%;
    opacity: 0;
    transform: translate3d(0, 22px, 0) scale(0.82) rotate(-6deg);
    transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms,
                transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms;
  }
  .credentials-section--visible .credentials-script {
    opacity: 1;
    transform: translate3d(0, 0.02em, 0) scale(1) rotate(0deg);
  }
  @media (min-width: 768px) {
    .credentials-section--visible .credentials-script {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }

  /* ============ Credential list items — staggered rise ============ */
  .credentials-item {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
    filter: blur(4px);
    animation: credentialsItemIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-play-state: paused;
  }
  .credentials-section--visible .credentials-item {
    animation-play-state: running;
  }
  @keyframes credentialsItemIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
      filter: blur(4px);
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

  /* ============ Description — rises last ============ */
  .credentials-description {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    filter: blur(4px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms,
                transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms,
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 1120ms;
  }
  .credentials-section--visible .credentials-description {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }

  /* ============ Panel — very slow ambient brightness breath ============ */
  .credentials-section {
    animation: credentialsPanelBreath 20s ease-in-out infinite alternate;
  }
  @keyframes credentialsPanelBreath {
    0%   { filter: brightness(1) saturate(1); }
    100% { filter: brightness(1.02) saturate(1.03); }
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .credentials-heading,
    .credentials-script,
    .credentials-item,
    .credentials-description,
    .credentials-section {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

export default function Credentials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    headingScript: string;
    headingMid: string;
    headingEnd: string;
    items: string[];
  }>("about", "credentials");
  const items = c.items ?? [];
  const listItems = items.length > 4 ? items.slice(0, -1) : items;
  const description = items.length > 4 ? items[items.length - 1] : "";

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
    <div className="w-full bg-[#FED2DB] py-[45px] md:py-[50px]">
      <section
        ref={sectionRef}
        className={`credentials-section cms-section mx-auto flex flex-col items-center justify-center rounded-[2px] text-center ${
          isVisible ? "credentials-section--visible" : ""
        }`}
        style={{
          width: "min(71vw, 1090px)",
          minHeight: "700px",
          ...cmsBg(c.background),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          ...cmsStyleVars(c.styles),
        }}
      >
        {/* Inner padding wrapper */}
        <div className="flex w-full min-w-0 flex-col items-center justify-center px-6 py-12 md:px-16 md:py-16">
          {/* Heading — sizes reduced a bit more. */}
          <h2
            className="credentials-heading font-serif font-normal text-center text-[#750000] tracking-[-0.04em] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
              !text-[22px] sm:!text-[26px] !leading-[0.9]
              md:!text-[clamp(40px,3.8vw,46px)] md:!leading-[0.8]"
          >
            <span className="font-serif">The</span>{" "}
            <span className={`${scriptSpanClass} credentials-script`} data-cms="script">
              {c.headingScript}
            </span>
            <span className="font-serif" data-cms="heading">{c.headingMid}</span>
            <br />
            <span className="font-serif" data-cms="heading">{c.headingEnd}</span>
          </h2>

          {/* Credentials list */}
          <div className="mt-[25px] md:mt-[30px] flex flex-col items-center gap-[20px] md:gap-[22px]">
            {listItems.map((credential, index) => (
              <p
                key={index}
                className="credentials-item font-josefin font-normal text-center text-[#750000]
                  !text-[13px] sm:!text-[14px] !leading-[1.3]
                  md:!text-[clamp(24px,1.8vw,25px)] md:!leading-[1.2]"
                style={{ animationDelay: `${560 + index * 130}ms` }}
              >
                <span data-cms="body">{credential}</span>
              </p>
            ))}
          </div>

          {/* Description */}
          {description ? (
          <p
            className="credentials-description mt-[25px] md:mt-[35px] mx-auto max-w-[320px] md:max-w-[680px] font-josefin font-normal text-center text-[#750000]
              !text-[12.5px] sm:!text-[13.5px] !leading-[1.45]
              md:!text-[clamp(23px,1.7vw,24px)] md:!leading-[1.15]"
            data-cms="body"
          >
            {description}
          </p>
          ) : null}
        </div>

        {/* CSS lives in a String.raw constant at module scope. */}
        <style dangerouslySetInnerHTML={{ __html: credentialsCss }} />
      </section>
    </div>
  );
}