"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cmsBg, cmsStyleVars, mediaUrl, useSection } from '@/lib/content/context';
import type { SectionStyles } from '@/lib/content/types';

const SelfAssess: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const c = useSection<{
    styles: SectionStyles;
    background: string;
    cat: string;
    heading: string;
    headingScript: string;
    subheading: string;
    bodyMobile: string;
    bodyDesktop: string;
    cta: string;
  }>('home', 'selfAssess');

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
      className="cms-section relative max-w-[1600px] mx-auto w-full overflow-visible
        grid grid-cols-1 md:grid-cols-2 min-h-[80dvh] px-6 md:px-12 lg:px-16 py-8 md:py-12 bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_rgba(80,40,20,0.08)] items-center"
      style={{ ...cmsBg(c.background), ...cmsStyleVars(c.styles) }}
    >
      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="flex flex-col items-center text-center w-full md:hidden">
        {/* Heading — centered on mobile */}
        <h2
          className={`mt-10 font-serif font-light text-[#750000] !text-[24px] sm:!text-[28px] !leading-[0.9] tracking-[-0.02em] [font-stretch:extra-condensed] flex flex-col items-center gap-[0.2em] text-center w-full m-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
        >
          <span className="flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9]" data-cms="heading">
            {c.heading}
          </span>
          <span className="flex items-end justify-center whitespace-nowrap overflow-visible h-[0.9em] leading-[0.9]">
            <span className="w-[0.28em] shrink-0" aria-hidden="true" />
            <span className="font-script !text-[2.15em] inline-block tracking-[0.01em] text-[#750000] font-normal overflow-visible" data-cms="script">
              {c.headingScript}
            </span>
          </span>
        </h2>

        {/* Everything below the heading */}
        <div className="flex flex-col items-center text-center w-full mt-6">
          {/* Subheading — centered */}
          <h3
            className={`font-serif font-light text-[#750000] !text-[18px] sm:!text-[20px] leading-[1.1] tracking-[-0.02em] m-0 [font-stretch:extra-condensed] text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <span data-cms="heading">{c.subheading}</span>
          </h3>

          {/* Body copy — centered */}
          <p
            className={`font-josefin !text-[clamp(0.95rem,1.8vw,1.25rem)] sm:!text-xl !leading-[1.5] tracking-[0.01em] text-[#5a0a0a] m-0 mt-2 max-w-[340px] text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '0.35s' : '0s' }}
            data-cms="body"
          >
            {c.bodyMobile}
          </p>

          {/* CTA button — centered */}
          <button
            className={`font-josefin text-[14px] font-semibold text-white bg-[#5a0a0a] px-6 py-3 min-h-[48px] w-full max-w-[320px] mx-auto border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-4 hover:bg-[#750000] hover:scale-[1.02] active:scale-[0.98] text-center ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}
          >
            {c.cta}
          </button>
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT ==================== */}
      <section className="hidden md:flex items-center justify-center w-full h-full md:-mr-8 lg:-mr-12 md:-translate-x-6 lg:-translate-x-10">
        <div className="flex flex-col items-start gap-0.5 md:items-start text-center md:text-left">
          <h1 className="flex flex-col items-center md:items-start gap-[0.2em] md:gap-[0.24em] m-0 font-serif font-light text-[#750000] md:!text-[clamp(52.5px,5vw,80px)] md:!leading-[0.8] tracking-[-0.02em] [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]">
            <span
              className={`flex items-end justify-center md:justify-start whitespace-nowrap overflow-visible h-[0.8em] leading-[0.8] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
            >
              <span data-cms="heading">{c.heading}</span>
            </span>
            <span
              className={`flex items-end justify-center md:justify-start whitespace-nowrap overflow-visible h-[0.8em] leading-[0.8] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}
            >
              <span className="w-[0.28em] shrink-0" aria-hidden="true" />
              <span className="font-script !text-[2.15em] inline-block tracking-[0.01em] text-[#750000] font-normal overflow-visible" data-cms="script">
                {c.headingScript}
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="hidden md:flex flex-col justify-center w-full h-full md:-ml-8 lg:-ml-12">
        <div className="flex flex-col gap-3 max-w-[680px] items-center md:items-start text-center md:text-left">
          <h2 className={`font-serif font-light text-[#750000] md:!text-[clamp(30px,2.7vw,48px)] md:!leading-[0.8] tracking-[-0.02em] m-0 [font-stretch:extra-condensed] [text-shadow:0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}>
            <span data-cms="heading">{c.subheading}</span>
          </h2>

          <p className={`font-josefin md:!text-[clamp(16px,1.25vw,20px)] font-normal !leading-[1.5] tracking-[0.01em] text-[#5a0a0a] m-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }} data-cms="body">
            <span className="hidden md:inline">
              {c.bodyDesktop}
            </span>
          </p>

          <button className={`font-josefin text-[clamp(12px,1vw,16px)] md:text-[clamp(14px,1vw,16px)] lg:text-[clamp(16px,1.1vw,18px)] font-semibold text-white bg-[#5a0a0a] px-5 md:px-8 lg:px-10 py-2.5 md:py-3 border-none cursor-pointer transition-all duration-300 ease-in-out tracking-[0.04em] mt-1 hover:bg-[#750000] hover:scale-[1.02] active:scale-[0.98] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}>
            {c.cta}
          </button>
        </div>
      </section>

      {/* ==================== CAT IMAGE (bottom-right, overlapping — desktop only) ==================== */}
      <img
        src={mediaUrl(c.cat)}
        alt=""
        aria-hidden="true"
        className="hidden md:block pointer-events-none select-none absolute md:right-[18px] lg:right-[22px] xl:right-[26px] bottom-0 z-20 h-auto md:w-[420px] lg:w-[510px] xl:w-[600px] translate-y-[47%] object-contain"
      />
    </main>
  );
};

export default SelfAssess;