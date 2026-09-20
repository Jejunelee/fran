"use client";

import React, { useEffect, useRef, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question:
      "I've worked with coaches before and it didn't stick. How is this different?",
    answer:
      "Most coaching hands you frameworks. This is more like holding a mirror up. Accurately, without judgment, and with enough care that you can actually look at what's reflected back. Frameworks fade. Seeing yourself clearly doesn't.",
  },
  {
    question: "I'm not based in Manila. Does that matter?",
    answer:
      "No. Sessions are virtual, or in person if you're local. I work with clients all over.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. I have a master's in psychology, but coaching and therapy are different practices. If you're navigating clinical-level concerns like active depression, trauma processing, or an eating disorder, I'll always point you to a licensed therapist. Sometimes alongside coaching, sometimes instead of it. I'll be honest with you about what I think you need.",
  },
  {
    question:
      "What if I can't commit to 8 sessions, financially or time-wise?",
    answer:
      "Then this isn't the right container right now, and that's okay. Take the self-assessment, join the email list for free reflections and supper club invites, and come back when the timing's right.",
  },
  {
    question: "Can I pay per session?",
    answer:
      "Yes. Pay as you go, or pay for the full 8-session container upfront. There's no discount for paying upfront, but some clients prefer it, because the commitment is part of the work.",
  },
];

// Same pattern as the working Explain component:
//  - base = mobile size (plain px, no clamp)
//  - md: variant = clamp() for tablet/desktop
//  - `!` prefix forces each size
const questionClass = [
  "font-josefin text-[#8B0000] font-normal",
  "!text-[18px] sm:!text-[20px] !leading-[1.3]",
  "md:!text-[clamp(18px,1.5vw,22px)] md:!leading-[1.3]",
].join(" ");

const answerClass = [
  "font-josefin text-[#8B0000] font-light",
  "!text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]",
  "md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]",
].join(" ");

const faqCss = String.raw`
  /* ============ Heading — rise + de-blur ============ */
  .faq-heading {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
    filter: blur(6px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 40ms,
                transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 40ms,
                filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 40ms;
  }
  .faq-section--visible .faq-heading {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }

  /* ============ FAQ rows — staggered rise + de-blur ============ */
  .faq-item {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    filter: blur(4px);
    animation: faqItemIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-play-state: paused;
  }
  .faq-section--visible .faq-item {
    animation-play-state: running;
  }
  @keyframes faqItemIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 18px, 0);
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

  /* ============ Divider — draws in from the left ============ */
  .faq-divider {
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .faq-section--visible .faq-divider {
    transform: scaleX(1);
  }
  .faq-section--visible .faq-item:nth-child(1) .faq-divider { transition-delay: 320ms; }
  .faq-section--visible .faq-item:nth-child(2) .faq-divider { transition-delay: 430ms; }
  .faq-section--visible .faq-item:nth-child(3) .faq-divider { transition-delay: 540ms; }

  /* ============ Plus/minus icon — springy spin on toggle ============ */
  .faq-icon {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: 50% 50%;
  }
  .faq-icon--open {
    transform: rotate(180deg) scale(1.1);
  }

  /* ============ Row hover — subtle lift + question darken ============ */
  .faq-toggle {
    transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .faq-toggle:hover {
      transform: translate3d(4px, 0, 0);
    }
    .faq-toggle:hover span:first-child {
      color: #6a0000;
    }
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .faq-heading,
    .faq-item,
    .faq-divider,
    .faq-icon,
    .faq-toggle {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`faq-section bg-[#F6F2E7] w-full px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20
        max-md:px-5 max-md:py-10 ${
          isVisible ? "faq-section--visible" : ""
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header — mobile-first sizes, clamp only inside md: */}
        <h1
          className="faq-heading font-serif font-light text-[#8B0000] tracking-[-0.02em] [font-stretch:extra-condensed]
            !text-[48px] sm:!text-[56px] !leading-[0.9]
            md:!text-[clamp(60px,5.4vw,96px)] md:!leading-[0.8]
            m-0
            [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
        >
          FAQs
        </h1>

        {/* Spacer */}
        <div className="h-10 md:h-12 lg:h-14 max-md:h-7" />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6 max-md:gap-y-5">
          {/* Left Column */}
          <div className="space-y-6 max-md:space-y-5">
            {faqData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="faq-item"
                style={{ animationDelay: `${120 + index * 110}ms` }}
              >
                <button
                  type="button"
                  className="faq-toggle w-full text-left flex justify-between items-start gap-4 group max-md:gap-3 max-md:min-h-[44px]"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={questionClass}>{item.question}</span>
                  <span
                    className={`faq-icon text-[#8B0000] flex-shrink-0 mt-0.5 transition-transform duration-300
                      !text-[20px] max-md:!text-[20px] max-md:mt-0 ${
                        openIndex === index ? "faq-icon--open" : ""
                      }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className={answerClass}>{item.answer}</p>
                </div>
                <hr className="faq-divider border-t border-[#8B0000]/20 mt-5 w-full max-md:mt-4" />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6 max-md:space-y-5">
            {faqData.slice(3).map((item, index) => {
              const actualIndex = index + 3;
              return (
                <div
                  key={actualIndex}
                  className="faq-item"
                  style={{ animationDelay: `${120 + actualIndex * 110}ms` }}
                >
                  <button
                    type="button"
                    className="faq-toggle w-full text-left flex justify-between items-start gap-4 group max-md:gap-3 max-md:min-h-[44px]"
                    onClick={() => toggleAccordion(actualIndex)}
                    aria-expanded={openIndex === actualIndex}
                  >
                    <span className={questionClass}>{item.question}</span>
                    <span
                      className={`faq-icon text-[#8B0000] flex-shrink-0 mt-0.5 transition-transform duration-300
                        !text-[20px] max-md:!text-[20px] max-md:mt-0 ${
                          openIndex === actualIndex ? "faq-icon--open" : ""
                        }`}
                    >
                      {openIndex === actualIndex ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === actualIndex
                        ? "max-h-96 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className={answerClass}>{item.answer}</p>
                  </div>
                  <hr className="faq-divider border-t border-[#8B0000]/20 mt-5 w-full max-md:mt-4" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS lives in a String.raw constant at module scope — no template
          literal in JSX, so nothing can break the compiled chunk. */}
      <style dangerouslySetInnerHTML={{ __html: faqCss }} />
    </section>
  );
};

export default FAQ;