"use client";

import React, { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { motion, Variants } from "framer-motion";
import { cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

export default function Process() {
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
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        duration: 0.6,
      },
    },
  };

  const headingVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 75,
        duration: 0.7,
        delay: 0.2,
      },
    },
  };

  const c = useSection<{
    styles: SectionStyles;
    background: string;
    frame: string;
    heading: string;
    headingScript: string;
    steps: { number: string; title: string; description: string }[];
  }>("work", "process");
  const processSteps = c.steps ?? [];

  // Same pattern as the working Explain component.
  // Mobile text heights reduced further via tighter `leading` + smaller sizes.
  // Desktop (md:/lg:) is untouched.

  const numberClass = [
    "font-josefin font-semibold text-[#5a0a0a] tracking-[0.02em] flex-shrink-0",
    "!text-[11.7px] sm:!text-[13px] !leading-[1.3]",
    "md:!text-[clamp(18px,1.5vw,22px)] md:!leading-[1.3]",
    "min-w-[1.7rem] sm:min-w-[1.9rem] md:min-w-[2.8rem] lg:min-w-[3.2rem]",
  ].join(" ");

  const stepTitleClass = [
    "font-josefin font-semibold text-[#5a0a0a]",
    "!text-[11.7px] sm:!text-[13px] !leading-[1.3]",
    "md:!text-[clamp(18px,1.5vw,22px)] md:!leading-[1.3]",
  ].join(" ");

  const stepDescClass = [
    "font-josefin font-normal text-[#5a0a0a] mt-0.5",
    "!text-[clamp(0.6175rem,1.17vw,0.8125rem)] sm:!text-[13px] !leading-[1.5]",
    "md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]",
  ].join(" ");

  return (
    <div className="relative w-full overflow-visible">
      {/* PROCESS SECTION */}
      <section
        ref={sectionRef}
        className="relative isolate w-full overflow-visible z-20 max-md:min-h-[80vh] max-md:!-mt-10 cms-section"
        style={{ marginTop: "-3%", ...cmsStyleVars(c.styles) }}
        aria-label="Process section"
      >
        {/* 1.png — very back, behind bgcombined1 (desktop) */}
        <div
          className="hidden lg:block absolute top-1/2 pointer-events-none z-0"
          style={{
            left: "20%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <CmsImage
            src={c.frame}
            alt=""
            width={420}
            height={420}
            className="w-full h-auto object-contain"
            priority
            quality={100}
          />
        </div>

        {/* Mobile background — previous cover treatment */}
        <div className="md:hidden absolute inset-0 z-0 overflow-hidden">
          <CmsImage
            src={c.background}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Desktop background — full image, no crop */}
        <CmsImage
          src={c.background}
          alt=""
          width={1892}
          height={817}
          className="relative z-[1] hidden md:block w-full h-auto pointer-events-none"
          priority
        />

        {/* Content wrapper */}
        <div
          className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 flex items-center
            max-md:min-h-[80vh] max-md:px-5 max-md:py-6
            md:absolute md:inset-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[36%_64%] gap-0 w-full">
            {/* Left column: empty space */}
            <div className="relative hidden lg:block" />

            {/* Right column: Process content */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col justify-center w-full max-w-[800px] lg:max-w-[840px] px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12 ml-auto lg:ml-0 lg:mr-8
                max-md:px-0 max-md:py-2 max-md:pl-6 max-md:pr-4
                mt-6 md:mt-10 lg:mt-14"
            >
              {/* Heading */}
              <motion.div
                variants={headingVariants}
                className="mb-6 md:mb-8 lg:mb-10 max-md:mb-3 max-md:flex max-md:justify-center"
              >
                <h2
                  className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
                    !text-[36px] sm:!text-[42px] !leading-[0.9]
                    md:!text-[clamp(60px,5.4vw,96px)] md:!leading-[0.8]
                    flex items-end justify-center md:justify-start whitespace-nowrap overflow-visible
                    h-[0.9em] md:h-[0.8em] m-0
                    [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  {c.heading}
                  <span className="w-[0.55em] shrink-0" aria-hidden="true" />
                  <span className="inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#750000] font-normal overflow-visible relative z-[2]" data-cms="script">
                    {c.headingScript}
                  </span>
                </h2>
              </motion.div>

              {/* Process steps */}
              <div className="flex flex-col gap-1.5 md:gap-2.5 lg:gap-3 max-md:gap-1.5">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    variants={itemVariants}
                    custom={index}
                    className="flex items-start gap-2.5 md:gap-4 lg:gap-5 max-md:gap-2.5"
                  >
                    <span className={numberClass}>{step.number}</span>
                    <div className="flex flex-col max-md:gap-0">
                      <span className={stepTitleClass}>{step.title}</span>
                      <span className={stepDescClass}>
                        {step.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}