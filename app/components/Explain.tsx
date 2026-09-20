"use client";

import React, { useRef } from "react";
import { CmsImage } from "@/lib/content/CmsImage";
import { motion, useInView, Variants } from "framer-motion";
import { cmsBg, cmsStyleVars, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

export default function Explain() {
  const sectionRef = useRef(null);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    artwork: string;
    artworkAlt: string;
    line1: string;
    line2Before: string;
    line2Script: string;
    line3: string;
    line4Before: string;
    line4Script: string;
    body: string;
    rightHeading: string;
    rightBody: string;
    insights: string[];
  }>("home", "explain");
  const insights = c.insights ?? [];

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
    margin: "-50px",
  });

  // =================== Parent stagger ===================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // =================== Generic item (spring reveal) ===================
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        duration: 0.6,
      },
    },
  };

  // =================== Headline lines ===================
  // Each line enters on its own spring, alternating horizontal
  // direction for a subtle "editorial" back-and-forth rhythm.
  const headlineLineVariants: Variants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 26,
      x: i % 2 === 0 ? -14 : 14,
      filter: "blur(6px)",
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 90,
        duration: 0.75,
        delay: 0.1 + i * 0.09,
      },
    }),
  };

  // =================== Script accent words ===================
  // The decorative script words ("working", "exhausting") get a
  // bolder entrance: elastic overshoot + slight rotation.
  const scriptWordVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: -8,
      y: 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 140,
        duration: 0.9,
        delay: 0.5,
      },
    },
  };

  // =================== Center artwork ===================
  // Dramatic 3D reveal: rotateY from a strong angle, slight drop
  // and overshoot, plus a soft scale settle.
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -25,
      rotateZ: -3,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 65,
        duration: 1.1,
        delay: 0.35,
      },
    },
  };

  // =================== Insight list items ===================
  const listItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -24,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 90,
        duration: 0.55,
        delay: 0.35 + i * 0.1,
      },
    }),
  };

  return (
    <motion.main
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="
        cms-section
        w-full max-w-[1504px] mx-auto
        px-4 sm:px-6 md:px-8 lg:px-12
        py-6 sm:py-8 md:py-8 lg:py-10
        grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
        gap-8 sm:gap-10 md:gap-6 lg:gap-10
        items-center justify-items-center
        bg-cover bg-center bg-no-repeat
        overflow-x-clip
      "
      style={{ ...cmsBg(c.background), ...cmsStyleVars(c.styles) }}
    >
      {/* ===================== LEFT SECTION ===================== */}
      <motion.section
        variants={itemVariants}
        className="
          flex flex-col justify-center items-center
          min-w-0 w-full h-full
          order-1 md:order-none
        "
      >
        <div className="flex flex-col items-center w-full max-w-full">

          {/* ===================== HEADLINE ===================== */}
          <motion.h1
            variants={itemVariants}
            className="
              font-serif font-light

              /* MOBILE — a step under the home hero */
              !text-[24px]
              sm:!text-[28px]
              !leading-[0.9]

              /* DESKTOP — secondary to hero (~67px) */
              md:!text-[clamp(30px,2.7vw,48px)]
              md:!leading-[0.8]

              tracking-[-0.02em]
              text-[#7f0f0f]
              mb-4 sm:mb-3 md:mb-3
              relative
              flex flex-col
              items-center
              gap-[0.2em]
              md:gap-[0.24em]
              text-center
              w-full
              [font-stretch:extra-condensed]
              [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
            "
          >
            <motion.span
              custom={0}
              variants={headlineLineVariants}
              className="explain-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]"
            >
              <span data-cms="heading">{c.line1}</span>
            </motion.span>

            <motion.span
              custom={1}
              variants={headlineLineVariants}
              className="explain-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]"
            >
              <span data-cms="heading">{c.line2Before}</span>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <motion.span
                variants={scriptWordVariants}
                className="
                  inline-block
                  font-script
                  !text-[2.15em]
                  tracking-[0.01em]
                  text-[#7f0f0f]
                  overflow-visible
                "
                style={{ transformOrigin: "50% 70%" }}
                data-cms="script"
              >
                {c.line2Script}
              </motion.span>
            </motion.span>

            <motion.span
              custom={2}
              variants={headlineLineVariants}
              className="explain-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]"
            >
              <span data-cms="heading">{c.line3}</span>
            </motion.span>

            <motion.span
              custom={3}
              variants={headlineLineVariants}
              className="explain-line flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9] md:h-[0.8em] md:leading-[0.8]"
            >
              <span data-cms="heading">{c.line4Before}</span>
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <motion.span
                variants={scriptWordVariants}
                className="
                  inline-block
                  font-script
                  !text-[2.15em]
                  tracking-[0.01em]
                  text-[#7f0f0f]
                  overflow-visible
                "
                style={{ transformOrigin: "50% 70%" }}
                data-cms="script"
              >
                {c.line4Script}
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* ===================== BODY COPY ===================== */}
          <motion.p
            variants={itemVariants}
            className="
              font-josefin

              /* MOBILE — match home hero subcopy */
              !text-[clamp(0.95rem,1.8vw,1.25rem)]
              sm:!text-xl
              !leading-[1.5]

              /* DESKTOP - UNCHANGED */
              md:!text-[clamp(16px,1.25vw,20px)]
              md:!leading-[1.5]

              font-normal
              tracking-[0.01em]
              text-[#5a0a0a]

              w-full
              max-w-[620px]
              md:max-w-[420px]

              text-center
              mt-4
              md:mt-3

              px-5
              sm:px-4
              md:px-0
            "
          >
            <span data-cms="body">{c.body}</span>
          </motion.p>
        </div>
      </motion.section>

      {/* ===================== CENTER ARTWORK ===================== */}
      <motion.section
        variants={imageVariants}
        style={{ transformPerspective: 1200 }}
        className="
          flex items-center justify-center
          w-full md:w-auto
          md:flex-shrink-0
          h-full
          order-2 md:order-none
        "
      >
        <div className="flex items-center justify-center w-full md:w-auto">
          <motion.div
            initial={{ y: 0 }}
            animate={
              isInView
                ? {
                    y: [0, -8, 0, -5, 0],
                    transition: {
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 1.6,
                    },
                  }
                : { y: 0 }
            }
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: {
                type: "spring" as const,
                damping: 15,
                stiffness: 100,
              },
            }}
            className="
              flex items-center justify-center
              w-full md:w-auto
            "
          >
            <CmsImage
              src={c.artwork}
              alt={c.artworkAlt}
              width={400}
              height={488}
              className="
                w-[min(60vw,260px)]
                sm:w-[min(45vw,320px)]
                md:w-[clamp(200px,19vw,320px)]
                lg:w-[clamp(240px,22vw,380px)]
                h-auto
                object-contain
                block
                drop-shadow-[0_2px_6px_rgba(80,40,20,0.08)]
              "
              priority
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ===================== RIGHT SECTION ===================== */}
      <motion.section
        variants={itemVariants}
        className="
          flex flex-col justify-center items-center
          min-w-0 w-full h-full
          order-3 md:order-none
        "
      >
        <motion.h2
          variants={itemVariants}
          className="
            font-serif font-light

            /* MOBILE */
            !text-[24px]
            sm:!text-[28px]
            !leading-[0.9]

            /* DESKTOP */
            md:!text-[clamp(30px,2.7vw,48px)]
            md:!leading-[0.8]

            tracking-[-0.02em]
            text-[#7f0f0f]
            text-center
            mb-2 md:mb-1

            [font-stretch:extra-condensed]
            [transform:scaleX(1.00)]
            [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
          "
        >
          <span data-cms="heading">{c.rightHeading}</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            font-josefin

            /* MOBILE — match home hero subcopy */
            !text-[clamp(0.95rem,1.8vw,1.25rem)]
            sm:!text-xl
            !leading-[1.5]

            /* DESKTOP - UNCHANGED */
            md:!text-[clamp(16px,1.3vw,20px)]
            md:!leading-[1.5]

            font-normal
            text-[#5a0a0a]
            text-center

            max-w-[380px]
            my-2 md:my-1
            px-4 sm:px-2 md:px-1
          "
          data-cms="body"
        >
          {c.rightBody}
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="
            mt-2 md:mt-1
            flex flex-col
            gap-3
            w-full
            max-w-[380px]
            px-4 sm:px-2 md:px-0
          "
        >
          {insights.map((text, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={listItemVariants}
              whileHover={{
                x: 8,
                scale: 1.02,
                transition: {
                  type: "spring" as const,
                  damping: 20,
                  stiffness: 150,
                },
              }}
              className="
                flex items-baseline gap-2

                font-josefin

                /* MOBILE — match home hero subcopy */
                !text-[clamp(0.95rem,1.8vw,1.25rem)]
                sm:!text-xl
                !leading-[1.5]

                /* DESKTOP - UNCHANGED */
                md:!text-[clamp(16px,1.25vw,20px)]
                md:!leading-[1.4]

                font-normal
                text-[#5a0a0a]
                text-left
                cursor-default
              "
            >
              <span
                className="
                  font-josefin
                  font-normal
                  text-[#7f0f0f]
                  min-w-[28px]
                  md:min-w-[34px]
                  !text-[1.05em]
                  tracking-[0.02em]
                  flex-shrink-0
                "
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="font-normal" data-cms="body">
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}