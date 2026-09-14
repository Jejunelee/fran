"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

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
      className="relative w-full overflow-hidden"
      aria-label="Call to action"
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
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-6 md:gap-8 lg:gap-12 w-full items-center">
          {/* LEFT COLUMN - Headline */}
          <motion.div
            variants={leftVariants}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2
              className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
                !text-[26px] sm:!text-[30px] !leading-[1.05]
                md:!text-[clamp(1.6rem,3.2vw,2.6rem)] md:!leading-[0.75]
                lg:!text-[clamp(1.8rem,2.8vw,2.6rem)]"
            >
              <span className="block">
                If you&apos;re still reading, you&apos;re
              </span>
              <span className="block mt-1 md:mt-1 lg:mt-1 whitespace-nowrap max-md:whitespace-normal">
                probably the{" "}
                <motion.span
                  variants={scriptVariants}
                  className="cta-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] align-middle -mt-3 md:-mt-4 lg:-mt-5
                    !text-[2.2em] sm:!text-[2.4em]
                    md:!text-[clamp(4.2rem,7.5vw,6.2rem)]"
                  style={{ transformOrigin: "50% 70%" }}
                >
                  right person.
                </motion.span>
              </span>
            </h2>
          </motion.div>

          {/* RIGHT COLUMN - Copy and Buttons */}
          <motion.div
            variants={rightVariants}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <p
              className="font-josefin font-normal text-[#5A0A0A] max-w-[560px]
                !text-[14px] sm:!text-[15px] !leading-[1.5]
                md:!text-[clamp(1.2rem,2vw,1.55rem)] md:!leading-[1.6]
                lg:!text-[clamp(1.3rem,1.6vw,1.65rem)]"
            >
              Not quite ready? &nbsp;
              <br className="hidden sm:block" />
              Take the self-assessment <br className="md:hidden" />and join the list.
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
                BOOK A CALL
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
                TAKE A QUIZ
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS lives in a String.raw constant at module scope. */}
      <style dangerouslySetInnerHTML={{ __html: ctaCss }} />
    </section>
  );
}