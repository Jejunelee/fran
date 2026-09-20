"use client";

import React, { useEffect, useRef, useState } from "react";

const WhoIsThisFor = () => {
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

  const items = [
    {
      id: 1,
      icon: "/WorkWithMe/WhoIsThisFor/1.png",
      title: "You're already self-aware.",
      description:
        "You've done the reading, the journaling, maybe the therapy. You don't need a lecture on boundaries or attachment styles. You need help actually living what you already know.",
    },
    {
      id: 2,
      icon: "/WorkWithMe/WhoIsThisFor/2.png",
      title: "You're high-functioning and quietly disconnected.",
      description:
        "From the outside, your life works. Inside, you've lost track of yourself somewhere along the way.",
    },
    {
      id: 3,
      icon: "/WorkWithMe/WhoIsThisFor/3.png",
      title: "You're done with surface-level advice.",
      description:
        "You don't want a five-step framework. You want someone who can see you clearly, name what's happening, and stay in it with you.",
    },
    {
      id: 4,
      icon: "/WorkWithMe/WhoIsThisFor/4.png",
      title: "You're in transition.",
      description:
        "A relationship, a career, a version of yourself. You're not lost. You're recalibrating, and you'd rather not do it alone.",
    },
  ];

  const leftColumnItems = items.slice(0, 2);
  const rightColumnItems = items.slice(2);

  // Same pattern as the working Explain component:
  //  - `!` prefix forces the size
  //  - base class = mobile size
  //  - `md:` variant overrides for desktop
  //  - clamp() appears ONLY inside md:, never in the base
  const titleClass = [
    "font-josefin font-semibold text-[#F8F2E7]",
    "!text-[18px] sm:!text-[20px] !leading-[1.3]",
    "md:!text-[clamp(18px,1.5vw,22px)] md:!leading-[1.3]",
  ].join(" ");

  const descClass = [
    "font-josefin font-normal text-[#F8F2E7]/90 mt-1",
    "!text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5]",
    "md:!text-[clamp(16px,1.25vw,20px)] md:!leading-[1.5]",
  ].join(" ");

  return (
    <section
      ref={sectionRef}
      className={`who-section relative w-full bg-cover bg-center bg-no-repeat max-md:![min-height:0px] ${
        isVisible ? "who-section--visible" : ""
      }`}
      style={{
        backgroundImage: "url('/WorkWithMe/WhoIsThisFor/bg.png')",
        minHeight: "675px",
      }}
    >
      {/* Content Container */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24
        max-md:py-12 max-md:px-5"
      >
        {/* Heading */}
        <div className="text-center mb-12 md:mb-14 lg:mb-16 max-md:mb-10">
          <h2
            className="who-heading font-serif font-light text-[#F8F2E7]
              !text-[48px] sm:!text-[56px] !leading-[0.9]
              md:!text-[clamp(60px,5.4vw,96px)] md:!leading-[0.8]
              tracking-[-0.02em] [font-stretch:extra-condensed]
              flex items-end justify-center whitespace-nowrap overflow-visible
              h-[0.9em] md:h-[0.8em]
              [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
              m-0"
          >
            <span className="who-heading-script inline-block font-script !text-[2.15em] tracking-[0.01em] text-[#F8F2E7] font-normal overflow-visible relative z-[2]">
              W
            </span>
            <span className="font-serif font-light tracking-[-0.02em] [font-stretch:extra-condensed]">
              ho this is for
            </span>
          </h2>
        </div>

        {/* Grid - 2 columns on desktop, 1 on mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-14 lg:gap-y-16 gap-x-8 md:gap-x-12 lg:gap-x-16
          max-md:gap-y-8"
        >
          {/* Left Column */}
          <div className="space-y-10 md:space-y-14 lg:space-y-16 max-md:space-y-8">
            {leftColumnItems.map((item, index) => (
              <div
                key={item.id}
                className="who-item flex items-start gap-4 sm:gap-5 md:gap-6
                  max-md:gap-3"
                style={{ animationDelay: `${index * 180}ms` }}
              >
                <div
                  className="flex-shrink-0 w-[90px] sm:w-[110px] md:w-[120px] lg:w-[135px]
                  max-md:w-[72px]"
                >
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="who-coin w-full h-auto"
                    style={{ animationDelay: `${index * 180}ms` }}
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className={titleClass}>{item.title}</h3>
                  <p className={descClass}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-10 md:space-y-14 lg:space-y-16 max-md:space-y-8">
            {rightColumnItems.map((item, index) => (
              <div
                key={item.id}
                className="who-item flex items-start gap-4 sm:gap-5 md:gap-6
                  max-md:gap-3"
                style={{ animationDelay: `${(index + 2) * 180}ms` }}
              >
                <div
                  className="flex-shrink-0 w-[90px] sm:w-[110px] md:w-[120px] lg:w-[135px]
                  max-md:w-[72px]"
                >
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="who-coin w-full h-auto"
                    style={{ animationDelay: `${(index + 2) * 180}ms` }}
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className={titleClass}>{item.title}</h3>
                  <p className={descClass}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Heading — soft rise ============ */
        .who-heading {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 60ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 60ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 60ms;
        }
        .who-section--visible .who-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* The script "W" gently settles in after the heading line. */
        .who-heading-script {
          transform-origin: 50% 70%;
          overflow: visible;
          opacity: 0;
          transform: translate3d(0, 14px, 0) rotate(-6deg) scale(0.85);
          transition: opacity 900ms cubic-bezier(0.34, 1.56, 0.64, 1) 260ms,
                      transform 900ms cubic-bezier(0.34, 1.56, 0.64, 1) 260ms;
        }
        .who-section--visible .who-heading-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
        }

        /* ============ Item rows — fade/rise in with stagger ============ */
        .who-item {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .who-section--visible .who-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Coin spin on each item image ============
           A 3D rotateY flip, pivoting around the vertical center of
           the image. It spins a couple of full turns (720deg) and
           settles flat at 0deg. Only fires when the section enters
           the viewport. perspective is applied to the img element
           itself so the flip reads as a real coin, not a flat squash. */
        .who-coin {
          transform-style: preserve-3d;
          backface-visibility: visible;
          animation: whoCoinSpin 1400ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-play-state: paused;
          will-change: transform;
        }
        .who-section--visible .who-coin {
          animation-play-state: running;
        }

        @keyframes whoCoinSpin {
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
          .who-heading,
          .who-heading-script,
          .who-item,
          .who-coin {
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

export default WhoIsThisFor;