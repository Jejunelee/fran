"use client";

import React, { useEffect, useRef, useState } from 'react';

const SelfAssess: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
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

  return (
    <main
      ref={sectionRef}
      className="relative max-w-[1600px] mx-auto w-full overflow-visible
        grid grid-cols-1 md:grid-cols-2 min-h-[80dvh] px-6 md:px-12 lg:px-16 py-8 md:py-12 bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_rgba(80,40,20,0.08)] items-center"
      style={{ backgroundImage: "url('/SelfAssess/P4.png')" }}
    >
      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="flex flex-col items-center text-center w-full md:hidden">
        {/* Heading — centered on mobile */}
        <h2
          className={`mt-10 font-serif font-light text-[#750000] text-[clamp(1.75rem,5.625vw,5rem)] leading-[0.6] tracking-[-0.02em] [font-stretch:extra-condensed] text-center w-full m-0 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
        >
          <span className="block text-center">Not sure if this is</span>
          <span className="block text-center -mt-1">
            <span className="font-script font-normal tracking-[0.02em] text-[#750000] text-[2em] inline-block translate-x-[0.15em]">
              your thing?
            </span>
          </span>
        </h2>

        {/* Everything below the heading */}
        <div className="flex flex-col items-center text-center w-full mt-6">
          {/* Subheading — centered */}
          <h3
            className={`font-serif font-light text-[#750000] text-[clamp(22px,6vw,30px)] leading-none m-0 [transform:scaleX(0.75)] [transform-origin:center] text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            Find out in 2 minutes
          </h3>

          {/* Body copy — centered */}
          <p
            className={`font-josefin text-[10px] leading-[1.5] tracking-[0.01em] text-[#5a0a0a] m-0 mt-2 max-w-[340px] text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '0.35s' : '0s' }}
          >
            Twelve questions. They show which of four patterns you&apos;re stuck in — and where your work actually starts.
          </p>

          {/* CTA button — centered */}
          <button
            className={`font-josefin text-[14px] font-semibold text-white bg-[#5a0a0a] px-6 py-3 min-h-[48px] w-full max-w-[320px] mx-auto border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-4 hover:bg-[#750000] hover:scale-[1.02] active:scale-[0.98] text-center ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}
          >
            TAKE THE SELF ASSESSMENT
          </button>
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT ==================== */}
      <section className="hidden md:flex items-center justify-center w-full h-full md:-mr-8 lg:-mr-12">
        <div className="flex flex-col items-start gap-0.5 md:items-start text-center md:text-left">
          <h1 className="flex flex-col items-center md:items-start gap-0 m-0 leading-[0.5]">
            <span className={`font-serif font-light text-[#750000] text-[clamp(28px,5vw,56px)] md:text-[clamp(40px,4.5vw,64px)] lg:text-[clamp(48px,5vw,80px)] leading-[1.1] inline-block [transform:scaleX(0.75)] [transform-origin:left_center] md:[transform-origin:left_center] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}>
              Not sure if this is
            </span>
            <span className={`font-script font-normal tracking-[0.04em] text-[#750000] text-[clamp(52px,12vw,100px)] md:text-[clamp(82px,10vw,140px)] lg:text-[clamp(98px,12vw,170px)] leading-[0.5] block -mt-4 md:-mt-10 lg:-mt-[2.5rem] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
              your thing?
            </span>
          </h1>
        </div>
      </section>

      <section className="hidden md:flex flex-col justify-center w-full h-full md:-ml-8 lg:-ml-12">
        <div className="flex flex-col gap-3 max-w-[680px] items-center md:items-start text-center md:text-left">
          <h2 className={`font-serif font-light text-[#750000] text-[clamp(22px,4vw,32px)] md:text-[clamp(24px,2.5vw,38px)] lg:text-[clamp(28px,3vw,48px)] leading-[1.1] m-0 inline-block [transform:scaleX(0.75)] [transform-origin:left_center] md:[transform-origin:left_center] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}>
            Find out in 2 minutes
          </h2>

          <p className={`font-josefin text-[clamp(14px,1.2vw,16px)] md:text-[clamp(14px,1.2vw,18px)] lg:text-[clamp(16px,1.3vw,20px)] font-normal leading-[1.7] md:leading-[1.8] tracking-[0.01em] text-[#5a0a0a] m-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
            <span className="hidden md:inline">
              Here are twelve questions. They show you which of four patterns you&apos;re most stuck in, and where the work actually starts for you. You get your result the second you finish, plus a breakdown that&apos;s specific to you.
            </span>
          </p>

          <button className={`font-josefin text-[clamp(12px,1vw,16px)] md:text-[clamp(14px,1vw,16px)] lg:text-[clamp(16px,1.1vw,18px)] font-semibold text-white bg-[#5a0a0a] px-5 md:px-8 lg:px-10 py-2.5 md:py-3 border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-1 hover:bg-[#750000] hover:scale-[1.02] active:scale-[0.98] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}>
            TAKE THE SELF ASSESSMENT
          </button>
        </div>
      </section>

      {/* ==================== CAT IMAGE (bottom-right, overlapping — desktop only) ==================== */}
      <img
        src="/SelfAssess/cat.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block pointer-events-none select-none absolute md:right-[18px] lg:right-[22px] xl:right-[26px] bottom-0 z-20 h-auto md:w-[420px] lg:w-[510px] xl:w-[600px] translate-y-[47%] object-contain"
      />
    </main>
  );
};

export default SelfAssess;