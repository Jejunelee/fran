"use client";

import React, { useState } from "react";

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

  const testimonials = [
    {
      text: "I thought I needed more motivation. What I actually needed was clarity. Coaching helped me make decisions with more confidence and less second-guessing.",
      author: "BEA T.",
    },
    {
      text: "Working with my Francesca helped me gain clarity and confidence in both my personal and professional life. I finally feel like I'm moving forward with purpose",
      author: "LIZA C.",
    },
    {
      text: "The sessions gave me practical tools to manage stress, set boundaries, and stay focused on my goals. I've seen real growth in just a few months",
      author: "THEA D.",
    },
  ];

  const desktopTextClass =
    "font-josefin font-medium leading-[1.5] tracking-[0.01em] text-[#5a0a0a] m-0 text-left " +
    "!text-[clamp(0.95rem,1vw,1.15rem)]";

  const desktopAuthorClass =
    "font-serif font-medium leading-[1.3] tracking-[0.02em] text-[#750000] mt-3 md:mt-4 lg:mt-5 m-0 text-left " +
    "!text-[clamp(2.4rem,2.6vw,3rem)]";

  return (
    <section className="testimonials-section relative w-full overflow-hidden py-8 md:py-10 lg:py-12">
      {/* Background */}
      <div
        className="testimonials-bg absolute inset-0 bg-cover bg-[#F6F2E7] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Testimonials/bg.png')" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1504px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-8xl mx-auto">
          {/* Heading — sizes reduced a bit. */}
          <div className="md:col-span-3 mb-2 md:mb-3 lg:mb-4">
            <h2
              className="testimonials-heading font-serif font-light text-[#750000] tracking-[-0.02em] [font-stretch:extra-condensed] text-center md:text-left
                !text-[27px] sm:!text-[34px] !leading-[0.95]
                md:!text-[clamp(2.3rem,4.7vw,4.2rem)] md:!leading-[0.8]"
            >
              <span className="testimonials-heading-line block">
                What{" "}
                <span
                  className="testimonials-script inline-block font-script font-normal tracking-[0.02em] text-[#750000]
                    !text-[1.65em] sm:!text-[1.75em]
                    md:!text-[1.85em]"
                >
                  clients
                </span>{" "}
                actually say
              </span>
            </h2>
          </div>

          {/* Desktop: 3 testimonials */}
          <div className="hidden md:contents">
            <div className="testimonials-card flex flex-col">
              <p className={desktopTextClass}>
                I thought I needed more motivation.
                <br />
                What I actually needed was clarity.
                <br />
                Coaching helped me make decisions
                <br />
                with more confidence and less
                <br />
                second-guessing.
              </p>
              <p className={desktopAuthorClass}>BEA T.</p>
            </div>

            <div className="testimonials-card flex flex-col">
              <p className={desktopTextClass}>
                Working with my Francesca helped
                <br />
                me gain clarity and confidence in
                <br />
                both my personal and professional
                <br />
                life. I finally feel like I&apos;m moving
                <br />
                forward with purpose
              </p>
              <p className={desktopAuthorClass}>LIZA C.</p>
            </div>

            <div className="testimonials-card flex flex-col">
              <p className={desktopTextClass}>
                The sessions gave me practical
                <br />
                tools to manage stress, set
                <br />
                boundaries, and stay focused on my
                <br />
                goals. I&apos;ve seen real growth in just a
                <br />
                few months
              </p>
              <p className={desktopAuthorClass}>THEA D.</p>
            </div>
          </div>

          {/* Mobile: 1 testimonial at a time */}
          <div className="flex flex-col items-center w-full md:hidden">
            <div className="flex flex-col items-center w-full max-w-[600px] flex-1 justify-center min-h-[220px]">
              <p
                key={`text-${currentIndex}`}
                className="testimonials-mobile-text font-josefin font-medium tracking-[0.01em] text-[#5a0a0a] m-0 text-center
                  !text-[14px] sm:!text-[15px] !leading-[1.6]"
              >
                {testimonials[currentIndex].text}
              </p>
              <p
                key={`author-${currentIndex}`}
                className="testimonials-mobile-author font-serif font-medium tracking-[0.02em] text-[#750000] mt-3 m-0 text-center
                  !text-[28px] sm:!text-[32px] !leading-[1.3]"
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