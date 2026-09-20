"use client";

import React, { useState } from "react";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const testimonialsCss = String.raw`
  /* ============ Heading — editorial slide from the left with soft de-blur ============ */
  .testimonials-heading-line {
    opacity: 0;
    transform: translate3d(-24px, 0, 0);
    filter: blur(6px);
    animation: testimonialsHeading 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
  }
  @keyframes testimonialsHeading {
    0% {
      opacity: 0;
      transform: translate3d(-24px, 0, 0);
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

  /* Script clients — elastic settle. transform-origin near baseline. No clip-path. */
  .testimonials-script {
    transform-origin: 50% 70%;
    overflow: visible;
    opacity: 0;
    transform: translate3d(0, 18px, 0) scale(0.82) rotate(-6deg);
    animation: testimonialsScript 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms both;
  }
  @keyframes testimonialsScript {
    0% {
      opacity: 0;
      transform: translate3d(0, 18px, 0) scale(0.82) rotate(-6deg);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, -3px, 0) scale(1.05) rotate(1.5deg);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }

  /* Background — slow ambient brightness breath */
  .testimonials-bg {
    animation: testimonialsBgBreath 18s ease-in-out infinite alternate;
  }
  @keyframes testimonialsBgBreath {
    0%   { filter: brightness(1) saturate(1); }
    100% { filter: brightness(1.03) saturate(1.04); }
  }

  /* Desktop testimonial cards — staggered rise + de-blur */
  .testimonials-card {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
    filter: blur(4px);
    animation: testimonialsCardIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .testimonials-card:nth-child(1) { animation-delay: 460ms; }
  .testimonials-card:nth-child(2) { animation-delay: 580ms; }
  .testimonials-card:nth-child(3) { animation-delay: 700ms; }

  @keyframes testimonialsCardIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 24px, 0);
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

  /* Mobile testimonial text + author — fade/rise on index change */
  .testimonials-mobile-text {
    animation: testimonialsMobileIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .testimonials-mobile-author {
    animation: testimonialsMobileIn 520ms cubic-bezier(0.22, 1, 0.36, 1) 90ms both;
  }
  @keyframes testimonialsMobileIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .testimonials-heading-line,
    .testimonials-script,
    .testimonials-bg,
    .testimonials-card,
    .testimonials-mobile-text,
    .testimonials-mobile-author {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    headingLine1: string;
    headingLine2: string;
    headingScript: string;
    items: { text: string; desktopLines: string; author: string }[];
  }>("work", "testimonials");
  const testimonials = c.items ?? [];
  const desktopLines = testimonials.map((item) => item.desktopLines.split("\n"));

  const desktopTextClass =
    "font-josefin font-medium tracking-[0.01em] text-[#5a0a0a] m-0 text-left " +
    "!text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5] " +
    "md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]";

  const desktopAuthorClass =
    "font-serif font-medium tracking-[-0.02em] [font-stretch:extra-condensed] text-[#750000] mt-3 md:mt-4 lg:mt-5 m-0 text-left " +
    "!text-[24px] sm:!text-[28px] !leading-[1.3] " +
    "md:!text-[clamp(28px,2.4vw,40px)] md:!leading-[1.2]";

  return (
    <section
      className="testimonials-section cms-section relative w-full overflow-x-clip py-8 md:py-10 lg:py-12"
      style={cmsStyleVars(c.styles)}
    >
      {/* Background */}
      <div
        className="testimonials-bg absolute inset-0 bg-cover bg-[#F6F2E7] bg-center bg-no-repeat"
        style={cmsBg(c.background)}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1504px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-8xl mx-auto">
          {/* Heading — sizes reduced a bit. */}
          <div className="md:col-span-3 mb-2 md:mb-3 lg:mb-4 min-w-0">
            <h2
              className="testimonials-heading font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
                !text-[36px] sm:!text-[42px] !leading-[0.9]
                flex md:hidden flex-col items-center gap-[0.2em]
                m-0 w-full
                [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <span className="testimonials-heading-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9]">
                <span data-cms="heading">{c.headingLine1}</span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className="testimonials-script inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] font-normal overflow-visible relative z-[2]" data-cms="script">
                  {c.headingLine2}
                </span>
              </span>
              <span className="testimonials-heading-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9]" data-cms="heading">
                {c.headingScript}
              </span>
            </h2>

            <h2
              className="testimonials-heading font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed] text-left
                hidden md:flex items-end justify-start whitespace-nowrap overflow-visible
                md:!text-[clamp(45px,4.05vw,72px)] md:!leading-[0.8]
                h-[0.8em] m-0
                [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <span className="testimonials-heading-line flex items-end justify-start whitespace-nowrap overflow-visible">
                <span data-cms="heading">{c.headingLine1}</span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span className="testimonials-script inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] font-normal overflow-visible relative z-[2]" data-cms="script">
                  {c.headingLine2}
                </span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <span data-cms="heading">{c.headingScript}</span>
              </span>
            </h2>
          </div>

          {/* Desktop: 3 testimonials */}
          <div className="hidden md:contents">
            {testimonials.map((item, i) => (
            <div key={i} className="testimonials-card flex flex-col">
              <p className={desktopTextClass}>
                {desktopLines[i]?.map((line, j) => (
                  <React.Fragment key={j}>
                    <span data-cms="body">{line}</span>
                    {j < (desktopLines[i]?.length ?? 0) - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              <p className={desktopAuthorClass} data-cms="heading">{item.author}</p>
            </div>
            ))}
          </div>

          {/* Mobile: 1 testimonial at a time */}
          <div className="flex flex-col items-center w-full md:hidden">
            <div className="flex flex-col items-center w-full max-w-[600px] flex-1 justify-center min-h-[220px] px-1 min-w-0">
              <p
                key={`text-${currentIndex}`}
                className="testimonials-mobile-text font-josefin font-medium tracking-[0.01em] text-[#5a0a0a] m-0 text-center
                  !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]
                  whitespace-normal break-words w-full"
              >
                {testimonials[currentIndex].text}
              </p>
              <p
                key={`author-${currentIndex}`}
                className="testimonials-mobile-author font-serif font-medium tracking-[-0.02em] [font-stretch:extra-condensed] text-[#750000] mt-3 m-0 text-center
                  !text-[24px] sm:!text-[28px] !leading-[1.3]"
              >
                {testimonials[currentIndex].author}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#750000] w-6"
                      : "bg-[#D4C5B2] hover:bg-[#B8A892]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: testimonialsCss }} />
    </section>
  );
}