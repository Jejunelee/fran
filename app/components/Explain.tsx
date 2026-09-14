"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

export default function Explain() {
  const sectionRef = useRef(null);

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

  const insights = [
    "You became who you needed to be to survive, and somewhere along the way, you lost yourself.",
    "You silence your truth before anyone else gets the chance to reject it.",
    "You crave deeper intimacy, yet hide the very parts that would make it possible.",
    "You shrink your power to stay lovable, digestible, and safe.",
    "And you're reaching a point where abandoning yourself hurts more than being fully seen.",
  ];

  return (
    <motion.main
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="
        w-full max-w-[1504px] mx-auto
        px-4 sm:px-6 md:px-8 lg:px-12
        py-6 sm:py-8 md:py-8 lg:py-10
        grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
        gap-8 sm:gap-10 md:gap-6 lg:gap-10
        items-center justify-items-center
        bg-[url('/Explain2/bg.png')]
        bg-cover bg-center bg-no-repeat
        overflow-x-clip
      "
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
              font-serif font-normal

              /* MOBILE */
              !text-[28px]
              sm:!text-[32px]
              !leading-[0.75]

              /* DESKTOP - UNCHANGED */
              md:!text-[clamp(26px,2.7vw,44px)]
              md:!leading-[0.55]

              tracking-[-0.03em]
              text-[#7f0f0f]
              uppercase-none
              mb-4 sm:mb-3 md:mb-3
              relative
              flex flex-col
              items-center
              text-center
              w-full
              [font-stretch:extra-condensed]
              [transform:scaleX(1.00)]
              [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
            "
          >
            <motion.span
              custom={0}
              variants={headlineLineVariants}
              className="block !leading-[0.75] md:!leading-[0.55] mt-[0.1em] first:mt-0"
            >
              You already know
            </motion.span>

            <motion.span
              custom={1}
              variants={headlineLineVariants}
              className="block !leading-[0.75] md:!leading-[0.55] mt-[0.05em]"
            >
              what&apos;s not{" "}
              <motion.span
                variants={scriptWordVariants}
                className="
                  inline-block
                  font-script
                  !text-[2em]
                  !leading-[0.6]
                  tracking-[0.02em]
                  text-[#6d0e0e]
                "
                style={{ transformOrigin: "50% 70%" }}
              >
                working
              </motion.span>
            </motion.span>

            <motion.span
              custom={2}
              variants={headlineLineVariants}
              className="block !leading-[0.75] md:!leading-[0.55] mt-[0.3em]"
            >
              You&apos;ve known for years
            </motion.span>

            <motion.span
              custom={3}
              variants={headlineLineVariants}
              className="block !leading-[0.75] md:!leading-[0.55] mt-[0.01em]"
            >
              That&apos;s the part that&apos;s{" "}
              <motion.span
                variants={scriptWordVariants}
                className="
                  inline-block
                  font-script
                  !text-[2em]
                  !leading-[0.6]
                  tracking-[0.02em]
                  text-[#6d0e0e]
                "
                style={{ transformOrigin: "50% 70%" }}
              >
                exhausting
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* ===================== BODY COPY ===================== */}
          <motion.p
            variants={itemVariants}
            className="
              font-josefin

              /* MOBILE */
              !text-[17px]
              sm:!text-[18px]
              !leading-[1.5]

              /* DESKTOP - UNCHANGED */
              md:!text-[clamp(12px,0.9vw,15px)]
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
            You can name your patterns. You&apos;ve named them out loud, to friends,
            over drinks, more times than you can count. You&apos;ve read the books.
            You follow the accounts. You are not short on information.
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
            <Image
              src="/Explain2/md2.png"
              alt="Ornate mirror with woman and chair – decorative golden artwork"
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
            font-serif font-normal

            /* MOBILE */
            !text-[28px]
            sm:!text-[32px]
            !leading-[0.75]

            /* DESKTOP - UNCHANGED */
            md:!text-[clamp(26px,2.2vw,38px)]
            md:!leading-[0.55]

            tracking-[-0.02em]
            text-[#7f0f0f]
            text-center
            mb-2 md:mb-1

            [font-stretch:extra-condensed]
            [transform:scaleX(1.00)]
            [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
          "
        >
          Deep down, you know:
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            font-josefin

            /* MOBILE */
            !text-[17px]
            sm:!text-[18px]
            !leading-[1.5]

            /* DESKTOP - UNCHANGED */
            md:!text-[clamp(12px,0.95vw,15px)]
            md:!leading-[1.5]

            font-normal
            text-[#5a0a0a]
            text-center

            max-w-[380px]
            my-2 md:my-1
            px-4 sm:px-2 md:px-1
          "
        >
          The exhaustion isn&apos;t from doing too much. It&apos;s from carrying a life
          that no longer fits.
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

                /* MOBILE */
                !text-[17px]
                sm:!text-[18px]
                !leading-[1.5]

                /* DESKTOP - UNCHANGED */
                md:!text-[clamp(12px,0.9vw,15px)]
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

              <span className="font-normal">
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}