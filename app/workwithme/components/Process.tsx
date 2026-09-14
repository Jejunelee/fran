"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

  const processSteps = [
    {
      number: "01",
      title: "Book a free 20-minute call.",
      description:
        "We talk. I ask questions. You ask questions. We figure out whether this is the right work, at the right time, with the right person.",
    },
    {
      number: "02",
      title: "If it's a fit, you pick a start date.",
      description:
        "I send the welcome pack: a short intake, the schedule, everything you need to begin.",
    },
    {
      number: "03",
      title: "We begin.",
      description:
        "Weekly sessions, between-session access, and we shape the work around whatever is actually happening in your life.",
    },
    {
      number: "04",
      title: "After 8 sessions, we check in.",
      description:
        "Some people close out the work here, some extend to 12 weeks. Both are right.",
    },
  ];

  // Same pattern as the working Explain component.
  // Mobile text heights reduced further via tighter `leading` + smaller sizes.
  // Desktop (md:/lg:) is untouched.

  const numberClass = [
    "font-josefin font-semibold text-[#5a0a0a] tracking-[0.02em] flex-shrink-0",
    "!text-[14px] sm:!text-[15px] !leading-[1.05]",
    "md:!text-[clamp(1.2rem,1.5vw,1.6rem)] md:!leading-[1.3]",
    "min-w-[1.7rem] sm:min-w-[1.9rem] md:min-w-[2.8rem] lg:min-w-[3.2rem]",
  ].join(" ");

  const stepTitleClass = [
    "font-josefin font-semibold text-[#5a0a0a]",
    "!text-[11px] sm:!text-[12px] !leading-[1.15]",
    "md:!text-[clamp(1.05rem,1.25vw,1.35rem)] md:!leading-[1.3]",
  ].join(" ");

  const stepDescClass = [
    "font-josefin font-normal text-[#5a0a0a] mt-0.5",
    "!text-[10.5px] sm:!text-[11.5px] !leading-[1.35]",
    "md:!text-[clamp(0.9rem,1.05vw,1.15rem)] md:!leading-[1.5]",
  ].join(" ");

  return (
    <div className="relative w-full overflow-visible">
      {/* PROCESS SECTION */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-visible min-h-[80vh] md:min-h-[80vh] z-20 max-md:!-mt-10"
        style={{ marginTop: "-3%" }}
        aria-label="Process section"
      >
        {/* Background: bgcombined1.png */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/WorkWithMe/Process/bgcombined1.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 1.png — behind everything (including bgcombined1), centered in left column */}
        <div
          className="hidden lg:block absolute top-1/2 pointer-events-none z-[-1]"
          style={{
            left: "20%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <Image
            src="/WorkWithMe/Process/1.png"
            alt=""
            width={420}
            height={420}
            className="w-full h-auto object-contain"
            priority
            quality={100}
          />
        </div>

        {/* Content wrapper */}
        <div
          className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 min-h-[80vh] md:min-h-[80vh] flex items-center
            max-md:px-5 max-md:py-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
            {/* Left column: empty space */}
            <div className="relative hidden lg:block" />

            {/* Right column: Process content */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col justify-center w-full max-w-[680px] lg:max-w-[660px] px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12 ml-auto lg:ml-0 lg:mr-8
                max-md:px-0 max-md:py-2 max-md:pl-6 max-md:pr-4"
            >
              {/* Heading */}
              <motion.div
                variants={headingVariants}
                className="mb-6 md:mb-8 lg:mb-10 max-md:mb-3"
              >
                <h2
                  className="font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed]
                    !text-[24px] sm:!text-[28px] !leading-[0.95]
                    md:!text-[clamp(2.2rem,4vw,3.6rem)] md:!leading-[0.6]"
                >
                  <span
                    className="block font-serif font-light text-[#750000]
                      !text-[24px] sm:!text-[28px] !leading-[0.95]
                      md:!text-[clamp(2.2rem,4vw,3.6rem)] md:!leading-[0.6]"
                  >
                    The{" "}
                    <span
                      className="font-script font-medium tracking-[0.02em]
                        !text-[1.7em] sm:!text-[1.75em]
                        md:!text-[1.85em]"
                    >
                      process
                    </span>
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