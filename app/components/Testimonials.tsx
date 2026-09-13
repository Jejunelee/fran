"use client";

import React, { useState } from 'react';

const TESTIMONIALS = [
  {
    text: "I thought I needed more motivation. What I actually needed was clarity. Coaching helped me make decisions with more confidence and less second-guessing.",
    author: "BEA T.",
  },
  {
    text: "Working with Francesca helped me gain clarity and confidence in both my personal and professional life. I finally feel like I'm moving forward with purpose",
    author: "LIZA C.",
  },
  {
    text: "The sessions gave me practical tools to manage stress, set boundaries, and stay focused on my goals. I've seen real growth in just a few months",
    author: "THEA D.",
  },
];

// Desktop line-broken variants (preserve exact <br /> layout)
const DESKTOP_LINES = [
  ["I thought I needed more motivation.", "What I actually needed was clarity.", "Coaching helped me make decisions", "with more confidence and less", "second-guessing."],
  ["Working with Francesca helped", "me gain clarity and confidence in", "both my personal and professional", "life. I finally feel like I'm moving", "forward with purpose"],
  ["The sessions gave me practical", "tools to manage stress, set", "boundaries, and stay focused on my", "goals. I've seen real growth in just a", "few months"],
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textClass =
    "font-josefin text-[clamp(1.1rem,1.2vw,1.35rem)] font-medium leading-[1.7] tracking-[0.01em] text-[#5a0a0a] m-0 text-left";
  const authorClass =
    "font-serif font-medium text-[clamp(2.4rem,2.6vw,3rem)] leading-[1.3] tracking-[0.02em] text-[#750000] mt-5 md:mt-7 lg:mt-9 m-0 text-left";

  return (
    <section className="testimonials-section relative w-full overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background */}
      <div
        className="testimonials-bg absolute inset-0 bg-cover bg-[#F6F2E7] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Testimonials/bg.png')" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1504px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-8xl mx-auto">
          {/* Heading */}
          <div className="md:col-span-3 mb-6 md:mb-8 lg:mb-10">
            <h2 className="font-serif font-light text-[#750000] text-[clamp(2.75rem,5.625vw,5rem)] leading-[0.6] tracking-[-0.02em] [font-stretch:extra-condensed] text-left">
              <span className="block testimonials-headline-line">
                What{" "}
                <span className="testimonials-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                  changes
                </span>{" "}
                when
              </span>
              <span className="block -mt-1 md:-mt-2 lg:-mt-3 testimonials-headline-line">
                someone actually{" "}
                <span className="testimonials-script inline-block font-script font-normal tracking-[0.02em] text-[#750000] text-[2em]">
                  sees you
                </span>
              </span>
            </h2>
          </div>

          {/* Desktop: All 3 testimonials */}
          <div className="hidden md:contents">
            {TESTIMONIALS.map((_, i) => (
              <div key={i} className="flex flex-col testimonials-card">
                <p className={textClass}>
                  {DESKTOP_LINES[i].map((line, j) => (
                    <React.Fragment key={j}>
                      {line}
                      {j < DESKTOP_LINES[i].length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <p className={authorClass}>{TESTIMONIALS[i].author}</p>
              </div>
            ))}
          </div>

          {/* Mobile: One testimonial at a time with dots */}
          <div
            className="flex flex-col items-center w-full md:hidden"
            style={{ minHeight: "320px" }}
          >
            <div className="flex flex-col items-center w-full max-w-[600px] flex-1 justify-center">
              <p
                key={`text-${currentIndex}`}
                className="testimonials-mobile-text font-josefin text-[clamp(1rem,4vw,1.2rem)] font-medium leading-[1.6] tracking-[0.01em] text-[#5a0a0a] m-0 text-center"
              >
                {TESTIMONIALS[currentIndex].text}
              </p>
              <p
                key={`author-${currentIndex}`}
                className="testimonials-mobile-author font-serif font-medium text-[clamp(2.2rem,8vw,2.6rem)] leading-[1.3] tracking-[0.02em] text-[#750000] mt-5 m-0 text-center"
              >
                {TESTIMONIALS[currentIndex].author}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-3 mt-6">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#750000] w-8"
                      : "bg-[#D4C5B2] hover:bg-[#B8A892]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile responsive overrides + Animation layer */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
          }

          .md\\:col-span-3 {
            margin-bottom: 0.5rem !important;
            width: 100% !important;
            max-width: 600px !important;
          }

          .md\\:col-span-3 h2 {
            text-align: center !important;
            font-size: clamp(2.5rem, 8vw, 3.5rem) !important;
            line-height: 0.7 !important;
          }

          .md\\:col-span-3 h2 .block {
            display: block !important;
          }

          .md\\:col-span-3 h2 .font-script {
            font-size: 2em !important;
          }

          .md\\:hidden {
            min-height: 350px !important;
            justify-content: space-between !important;
          }
        }

        @media (max-width: 430px) {
          .grid {
            gap: 1.5rem !important;
          }

          .md\\:col-span-3 h2 {
            font-size: clamp(2rem, 10vw, 2.8rem) !important;
            line-height: 0.8 !important;
          }

          .md\\:col-span-3 h2 .font-script {
            font-size: 1.8em !important;
          }

          .md\\:hidden {
            min-height: 320px !important;
          }

          .flex-col p:first-child {
            font-size: clamp(0.95rem, 4.5vw, 1.1rem) !important;
          }

          .flex-col p:last-child {
            font-size: clamp(2rem, 9vw, 2.4rem) !important;
          }
        }

        /* ============ Animation layer ============ */

        /* Heading lines — editorial slide from the left, staggered. */
        .testimonials-headline-line {
          opacity: 0;
          transform: translate3d(-24px, 0, 0);
          filter: blur(6px);
          animation: testimonialsHeadline 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .testimonials-headline-line:nth-child(1) { animation-delay: 0ms; }
        .testimonials-headline-line:nth-child(2) { animation-delay: 120ms; }

        @keyframes testimonialsHeadline {
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

        /* Script accent words ("changes", "sees you") —
           slow ambient drift, no clip-path so flourishes stay intact. */
        .testimonials-script {
          transform-origin: 50% 70%;
          animation: testimonialsScriptPulse 5.5s ease-in-out infinite;
        }
        @keyframes testimonialsScriptPulse {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50%  { transform: translate3d(0, -3px, 0) rotate(-0.5deg) scale(1.012); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        }

        /* Background — very slow ambient brightness breath. */
        .testimonials-bg {
          animation: testimonialsBgBreath 18s ease-in-out infinite alternate;
        }
        @keyframes testimonialsBgBreath {
          0%   { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.03) saturate(1.04); }
        }

        /* Desktop testimonial cards — staggered rise + fade. */
        .testimonials-card {
          opacity: 0;
          transform: translate3d(0, 24px, 0);
          animation: testimonialsCardIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .testimonials-card:nth-child(1) { animation-delay: 260ms; }
        .testimonials-card:nth-child(2) { animation-delay: 380ms; }
        .testimonials-card:nth-child(3) { animation-delay: 500ms; }

        @keyframes testimonialsCardIn {
          0% {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Mobile testimonial text + author — fade/rise on
           every index change (keyed re-mount triggers the animation). */
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
          .testimonials-headline-line,
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
      `}</style>
    </section>
  );
}