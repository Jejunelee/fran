"use client";

import React, { useEffect, useRef, useState } from "react";

const WhatWorkOn = () => {
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

  const topics = [
    {
      id: 1,
      icon: "/WorkWithMe/WhatWorkOn/1.png",
      title: "Identity and self-trust",
      description:
        "Learning to tell the difference between who you are and the roles, careers, and expectations stacked on top of you.",
    },
    {
      id: 2,
      icon: "/WorkWithMe/WhatWorkOn/2.png",
      title: "Self-abandonment",
      description:
        "The small, socially rewarded ways you've been leaving yourself for years without noticing.",
    },
    {
      id: 3,
      icon: "/WorkWithMe/WhatWorkOn/3.png",
      title: "People-pleasing and performance",
      description:
        "The real cost of being easy to love, and what it's doing to your sense of self.",
    },
    {
      id: 4,
      icon: "/WorkWithMe/WhatWorkOn/4.png",
      title: "Relationships and dating",
      description:
        "Closing the gap between knowing your worth and acting like it.",
    },
    {
      id: 5,
      icon: "/WorkWithMe/WhatWorkOn/5.png",
      title: "Family and cultural expectations",
      description:
        "Especially in Asian family dynamics, where loyalty and self-abandonment get tangled up in each other.",
    },
    {
      id: 6,
      icon: "/WorkWithMe/WhatWorkOn/6.png",
      title: "Resilience",
      description:
        "Not bouncing back, and not gritting through. Learning to trust that whatever season you're in, you can navigate it, because you can navigate yourself.",
    },
  ];

  const leftColumnTopics = topics.slice(0, 3);
  const rightColumnTopics = topics.slice(3);

  return (
    <section
      ref={sectionRef}
      className={`what-work-on-section w-full ${
        isVisible ? "what-work-on-section--visible" : ""
      }`}
    >
      {/* White Header Area with Floral Background */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24"
        style={{
          backgroundImage: "url('/WorkWithMe/WhatWorkOn/bg.png')",
          minHeight: "275px",
          height: "auto",
        }}
      >
        <div className="max-w-4xl mx-auto text-center py-8 md:py-10 lg:py-12
          max-md:py-7">
          {/* Main Heading - Single Line */}
          <h2 className="what-heading font-serif font-light text-[#5B0706] text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.0] tracking-[-0.02em] [font-stretch:extra-condensed]
            max-md:text-[clamp(2rem,8.5vw,3rem)]">
            What we&apos;ll{" "}
            <span className="what-heading-script inline-block font-script font-normal tracking-[0.02em] text-[#5B0706] text-[1.8em]
              max-md:text-[1.6em]">
              actually
            </span>
            <span className="font-serif font-light tracking-[-0.02em] [font-stretch:extra-condensed]">
              {" "}
              work on
            </span>
          </h2>

          {/* Subtitle - Very Close to Heading */}
          <div className="mt-1 md:mt-1.5">
            <p className="what-subtitle font-josefin text-[#5B0706] text-[clamp(0.9rem,1.1vw,1.05rem)] font-normal leading-[1.3]
              max-md:text-[0.95rem] max-md:leading-[1.5]">
              Every container is different, because every person is.
              <br className="hidden sm:block" />
              The themes that come up most:
            </p>
          </div>
        </div>
      </div>

      {/* Dark Burgundy Content Area */}
      <div className="w-full bg-[#5B0706] py-12 md:py-14 lg:py-16 px-6 sm:px-10 md:px-16 lg:px-20
        max-md:py-10 max-md:px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-0 relative
            max-md:gap-y-7">
            {/* Vertical Divider - Desktop Only — draws down from top */}
            <div className="what-divider hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-white/20 transform -translate-x-1/2"></div>

            {/* Left Column */}
            <div className="space-y-8 md:space-y-10 lg:space-y-12 pr-0 md:pr-8 lg:pr-12
              max-md:space-y-7">
              {leftColumnTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="what-topic flex items-center gap-4 md:gap-5 lg:gap-6
                    max-md:gap-3.5"
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  <div className="flex-shrink-0 w-[70px] sm:w-[80px] md:w-[90px] lg:w-[105px] xl:w-[115px]
                    max-md:w-[64px]">
                    <img
                      src={topic.icon}
                      alt={`${topic.title} icon`}
                      className="what-topic-icon w-full h-auto"
                      style={{ animationDelay: `${index * 130}ms` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-josefin text-white text-[clamp(0.9rem,1.1vw,1.05rem)] font-normal leading-[1.1]
                      max-md:text-[0.95rem] max-md:leading-[1.25]">
                      {topic.title}
                    </h3>
                    <p className="font-josefin text-white/80 text-[clamp(0.85rem,1vw,0.95rem)] font-light leading-[1.15] mt-1
                      max-md:text-[0.875rem] max-md:leading-[1.45]">
                      {topic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-8 md:space-y-10 lg:space-y-12 pl-0 md:pl-8 lg:pl-12
              max-md:space-y-7">
              {rightColumnTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="what-topic flex items-center gap-4 md:gap-5 lg:gap-6
                    max-md:gap-3.5"
                  style={{ animationDelay: `${(index + 3) * 130}ms` }}
                >
                  <div className="flex-shrink-0 w-[70px] sm:w-[80px] md:w-[90px] lg:w-[105px] xl:w-[115px]
                    max-md:w-[64px]">
                    <img
                      src={topic.icon}
                      alt={`${topic.title} icon`}
                      className="what-topic-icon w-full h-auto"
                      style={{ animationDelay: `${(index + 3) * 130}ms` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-josefin text-white text-[clamp(0.9rem,1.1vw,1.05rem)] font-normal leading-[1.1]
                      max-md:text-[0.95rem] max-md:leading-[1.25]">
                      {topic.title}
                    </h3>
                    <p className="font-josefin text-white/80 text-[clamp(0.85rem,1vw,0.95rem)] font-light leading-[1.15] mt-1
                      max-md:text-[0.875rem] max-md:leading-[1.45]">
                      {topic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading — rise + de-blur ============ */
        .what-heading {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
        }
        .what-work-on-section--visible .what-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Script "actually" — elastic settle.
           transform-origin near baseline so the script flourish
           stays aligned. No clip-path. */
        .what-heading-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 16px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 320ms;
        }
        .what-work-on-section--visible .what-heading-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* ============ Subtitle ============ */
        .what-subtitle {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 480ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 480ms;
        }
        .what-work-on-section--visible .what-subtitle {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Divider — draws down from top ============
           A single vertical line that grows in height from the top
           down, so the two columns "separate" as the list reveals. */
        .what-divider {
          transform-origin: top center;
          transform: translateX(-50%) scaleY(0);
          transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) 260ms;
        }
        .what-work-on-section--visible .what-divider {
          transform: translateX(-50%) scaleY(1);
        }

        /* ============ Topic rows — staggered cascade ============
           Each row rises in, staggered left-column-first, then
           right-column. */
        .what-topic {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .what-work-on-section--visible .what-topic {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Icon — coin spin ============
           Matches the coin spin used in WhoIsThisFor: two full
           720° rotations around the Y axis, decelerating to a stop.
           perspective() is applied to the img itself so each icon
           has its own vanishing point. Transform-origin is the
           default 50% 50% since these icons are centered artwork.
           No clip-path. */
        .what-topic-icon {
          transform-style: preserve-3d;
          backface-visibility: visible;
          will-change: transform, opacity;
          opacity: 0;
          animation: whatCoinSpin 1400ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-play-state: paused;
        }
        .what-work-on-section--visible .what-topic-icon {
          animation-play-state: running;
        }

        @keyframes whatCoinSpin {
          0% {
            transform: perspective(900px) rotateY(0deg) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: perspective(900px) rotateY(720deg) scale(1);
            opacity: 1;
          }
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .what-heading,
          .what-heading-script,
          .what-subtitle,
          .what-divider,
          .what-topic,
          .what-topic-icon {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWorkOn;