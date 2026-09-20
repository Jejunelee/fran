"use client";

import React, { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { motion, Variants } from "framer-motion";
import { cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

const ctaCss = String.raw`
  /* ============ Background texture — slow ambient drift ============ */
  .cta-texture {
    animation: ctaTextureDrift 24s linear infinite;
  }
  @keyframes ctaTextureDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 256px 256px; }
  }

  /* ============ Buttons — idle glow pulse ============ */
  .cta-button {
    will-change: box-shadow;
  }
  .cta-button--primary {
    animation: ctaPrimaryPulse 5s ease-in-out 1.6s infinite;
  }
  .cta-button--secondary {
    animation: ctaSecondaryPulse 5s ease-in-out 1.8s infinite;
  }

  @keyframes ctaPrimaryPulse {
    0%   { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.15); }
    50%  { box-shadow: 0 8px 24px -4px rgba(91, 7, 6, 0.32); }
    100% { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.15); }
  }

  @keyframes ctaSecondaryPulse {
    0%   { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.25); }
    50%  { box-shadow: 0 8px 26px -4px rgba(91, 7, 6, 0.48); }
    100% { box-shadow: 0 4px 14px -4px rgba(91, 7, 6, 0.25); }
  }

  .cta-button:hover {
    animation-play-state: paused;
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .cta-texture,
    .cta-button--primary,
    .cta-button--secondary {
      animation: none !important;
    }
  }
`;

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const c = useSection<{
    styles: SectionStyles;
    image: string;
    headingLine1: string;
    headingLine2: string;
    headingScript: string;
    notReady: string;
    selfAssess: string;
    joinList: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }>("work", "cta");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const leftVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 70,
        duration: 0.7,
        delay: 0.1,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 70,
        duration: 0.7,
        delay: 0.28,
      },
    },
  };

  const scriptVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 22,
      scale: 0.82,
      rotate: -6,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 150,
        duration: 0.95,
        delay: 0.45,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        duration: 0.5,
        delay: 0.55 + i * 0.12,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="cms-section relative w-full overflow-hidden"
      aria-label="Call to action"
      style={cmsStyleVars(c.styles)}
    >
      {/* Background with subtle texture */}
      <div className="absolute inset-0 w-full h-full bg-[#DFA0B2]">
        <div
          className="cta-texture absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-10 lg:py-8 min-h-[220px] md:min-h-[280px] lg:min-h-[325px] flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(200px,280px)] gap-6 md:gap-8 lg:gap-10 w-full items-center">
          {/* LEFT COLUMN - Headline */}
          <motion.div
            variants={leftVariants}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2
              className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
                !text-[30px] sm:!text-[35px] !leading-[0.9]
                md:!text-[clamp(37.5px,3.375vw,60px)] md:!leading-[0.8]
                flex flex-col items-center lg:items-start gap-[0.2em] md:gap-[0.24em]
                m-0 w-full
                [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <span className="flex items-end justify-center lg:justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]" data-cms="heading">
                {c.headingLine1}
              </span>
              <span className="flex items-end justify-center lg:justify-start whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]">
                <span data-cms="heading">{c.headingLine2}</span>
                <span className="w-[0.28em] shrink-0" aria-hidden="true" />
                <motion.span
                  variants={scriptVariants}
                  className="cta-script inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] font-normal overflow-visible relative z-[2]"
                  style={{ transformOrigin: "50% 70%" }}
                  data-cms="script"
                >
                  {c.headingScript}
                </motion.span>
              </span>
            </h2>
          </motion.div>

          {/* MIDDLE COLUMN - Copy and Buttons */}
          <motion.div
            variants={rightVariants}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-4 xl:pl-6"
          >
            <p
              className="font-josefin font-normal text-[#5A0A0A] max-w-[560px]
                !text-[clamp(1.1875rem,2.25vw,1.5625rem)] sm:!text-[25px] !leading-[1.5]
                md:!text-[clamp(20px,1.5625vw,25px)] md:!leading-[1.5]"
            >
              <span data-cms="body">{c.notReady}</span>
              <br />
              <span data-cms="body">{c.selfAssess}</span>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              <span data-cms="body">{c.joinList}</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 md:mt-5 lg:mt-6 max-md:w-full">
              <motion.a
                href="#book-a-call"
                custom={0}
                variants={buttonVariants}
                whileHover={{
                  y: -2,
                  boxShadow: "0 6px 20px -4px rgba(91,7,6,0.3)",
                  transition: { type: "spring" as const, damping: 20, stiffness: 150 },
                }}
                whileTap={{ scale: 0.98 }}
                className="cta-button cta-button--primary font-josefin font-semibold uppercase tracking-[0.05em] text-[#750000] bg-[#F8F3EE] px-6 md:px-7 lg:px-9 py-3 md:py-3.5 lg:py-4 min-w-[150px] md:min-w-[160px] lg:min-w-[176px] text-center transition-all duration-300 ease-in-out shadow-[0_4px_14px_-4px_rgba(91,7,6,0.15)] hover:bg-[#f0e8df] hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#750000]
                  !text-[12px] sm:!text-[13px]
                  md:!text-[clamp(0.85rem,1vw,1rem)]
                  max-md:w-full max-md:max-w-[280px] max-md:min-h-[48px]"
              >
                {c.ctaPrimary}
              </motion.a>

              <motion.a
                href="#take-quiz"
                custom={1}
                variants={buttonVariants}
                whileHover={{
                  y: -2,
                  boxShadow: "0 6px 20px -4px rgba(91,7,6,0.4)",
                  transition: { type: "spring" as const, damping: 20, stiffness: 150 },
                }}
                whileTap={{ scale: 0.98 }}
                className="cta-button cta-button--secondary font-josefin font-semibold uppercase tracking-[0.05em] text-[#F8F3EE] bg-[#750000] px-6 md:px-7 lg:px-9 py-3 md:py-3.5 lg:py-4 min-w-[140px] md:min-w-[150px] lg:min-w-[166px] text-center transition-all duration-300 ease-in-out shadow-[0_4px_14px_-4px_rgba(91,7,6,0.25)] hover:bg-[#8a0a0a] hover:shadow-[0_6px_20px_-4px_rgba(91,7,6,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F3EE]
                  !text-[12px] sm:!text-[13px]
                  md:!text-[clamp(0.85rem,1vw,1rem)]
                  max-md:w-full max-md:max-w-[280px] max-md:min-h-[48px]"
              >
                {c.ctaSecondary}
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Placeholder image */}
          <motion.div
            variants={rightVariants}
            className="flex justify-center lg:justify-end w-full"
          >
            <div
              className="relative w-full max-w-[240px] sm:max-w-[260px] lg:max-w-none aspect-[4/5] rounded-lg overflow-hidden bg-[#750000]/15 border border-[#750000]/20"
              aria-hidden={!c.image}
            >
              {c.image ? (
                <CmsImage
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
              <div className="absolute inset-0 flex items-center justify-center font-josefin uppercase tracking-[0.18em] text-[#750000]/45 !text-[11px] sm:!text-[12px]">
                Image
              </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS lives in a String.raw constant at module scope. */}
      <style dangerouslySetInnerHTML={{ __html: ctaCss }} />
    </section>
  );
}