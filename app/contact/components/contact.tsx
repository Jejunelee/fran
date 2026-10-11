"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { cmsStyleVars, mediaUrl, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

/* ============================================================
   CONTACT PAGE
   ============================================================ */

const josefin = "font-josefin text-[#5B0706]";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const c = useSection<{
    styles: SectionStyles;
    image: string;
    heading: string;
    headingScript: string;
    headingEnd: string;
    intro: string;
    option1Title: string;
    option1Body: string;
    option1Cta: string;
    option2Title: string;
    option2Body: string;
    option2Cta: string;
    note: string;
    findMe: string;
  }>("contact", "main");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return (
    <main
      ref={sectionRef}
      className={`contact-section relative w-full bg-[#F7F1E7] ${
        isVisible ? "contact-section--visible" : ""
      }`}
    >
      <Navigation placement="top" />

      {/* 
        MOBILE-FIRST LAYOUT:
        - On mobile: the image is a shorter banner (40vh) that sits behind/above content,
          and the content panel overlaps it with rounded top corners, creating an integrated
          card-on-image feel.
        - On md+: the original two-column sticky layout is restored.
      */}
      <div className="relative flex flex-col md:min-h-screen md:flex-row">
        {/* ===================== LEFT IMAGE PANEL ===================== */}
        {/* 
          Mobile: full-width, 40vh tall, image acts as a hero banner.
          Desktop: 42vw wide, sticky full-height side panel.
        */}
        <section className="relative w-full flex-shrink-0 md:w-[42vw]">
          <div className="contact-image-panel relative h-[40vh] min-h-[260px] w-full overflow-hidden md:sticky md:top-0 md:h-screen md:min-h-0">
            <img
              src={mediaUrl(c.image)}
              alt=""
              className="contact-image absolute inset-0 h-full w-full object-cover object-center md:object-center"
            />
            {/* Mobile: soft gradient at bottom so the overlapping content card
                blends smoothly with the image. Hidden on md+. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#F7F1E7] md:hidden"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ===================== RIGHT CONTENT PANEL ===================== */}
        {/* 
          Mobile: pulled up with -mt-8 so it overlaps the image bottom,
          rounded top corners, sits on the cream background, creating
          an integrated card-on-image composition.
          Desktop: normal flow, no overlap, full width of the right column.
        */}
        <section
          className="cms-section relative z-10 -mt-8 w-full flex flex-col rounded-t-[28px] bg-[#F7F1E7] md:mt-0 md:w-[58vw] md:rounded-none md:z-auto"
          style={cmsStyleVars(c.styles)}
        >
          {/* pt-24 on md+ so the absolute nav doesn't cover the heading.
              On mobile, pt-8 after the -mt-8 overlap gives comfortable spacing. */}
          <div className="mx-auto flex w-full max-w-[880px] flex-col px-6 py-8 sm:px-8 md:px-12 md:py-16 md:pt-24 lg:px-16">
            {/* Eyebrow */}
            <p
              className={`contact-eyebrow ${josefin} text-[11px] font-semibold uppercase tracking-[0.32em] sm:text-[12px]`}
              data-cms="heading"
            >
              {c.heading}
            </p>

            {/* Heading */}
            <h1 className="contact-heading mt-3 font-serif text-[clamp(52px,6vw,92px)] font-normal leading-[0.85] tracking-[-0.04em] text-[#750100] md:mt-4">
              <span data-cms="heading">{c.headingScript}</span>{" "}
              <span className="contact-heading-script ml-[0.08em] inline-block font-script !text-[1.5em] font-normal tracking-[0.01em] md:!text-[1em]" data-cms="script">
                {c.headingEnd}
              </span>
            </h1>

            {/* Intro */}
            <p
              className={`contact-intro ${josefin} mt-4 text-[15px] leading-[1.5] sm:text-[16px] md:mt-5 md:text-[17px] lg:text-[18px]`}
              data-cms="body"
            >
              {c.intro}
            </p>

            {/* ===================== OPTIONS ===================== */}
            <div className="mt-8 flex flex-col gap-8 md:mt-12 md:gap-12">
              {/* -------- Option 1 -------- */}
              <div className="contact-option contact-option--1 flex flex-col" style={{ animationDelay: "620ms" }}>
                <h2 className="font-serif text-[clamp(24px,2.2vw,32px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#750100]" data-cms="heading">
                  {c.option1Title}
                </h2>
                <p
                  className={`${josefin} mt-3 max-w-[520px] text-[14px] leading-[1.5] sm:text-[15px] lg:text-[16px]`}
                  data-cms="body"
                >
                  {c.option1Body}
                </p>

                <a
                  href="https://calendly.com/francescaatendido/60min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${josefin} contact-cta mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-[2px] bg-[#5B0706] px-5 py-2.5 text-center text-[13px] font-semibold text-[#F7F1E7] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] max-md:w-full max-md:max-w-[320px] max-md:justify-center sm:text-[14px] md:min-h-0`}
                >
                  {c.option1Cta}
                </a>
              </div>

              {/* Divider */}
              <hr className="contact-divider border-0 border-t border-[rgba(91,7,6,0.2)]" />

              {/* -------- Option 2 -------- */}
              <div className="contact-option contact-option--2 flex flex-col" style={{ animationDelay: "780ms" }}>
                <h2 className="font-serif text-[clamp(24px,2.2vw,32px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#750100]" data-cms="heading">
                  {c.option2Title}
                </h2>
                <p
                  className={`${josefin} mt-3 max-w-[520px] text-[14px] leading-[1.5] sm:text-[15px] lg:text-[16px]`}
                  data-cms="body"
                >
                  {c.option2Body}
                </p>

                <form
                  className="mt-5 flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="contact-field" style={{ animationDelay: "60ms" }}>
                    <Field id="contact-name" label="Name">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="w-full border-0 border-b border-b-[rgba(91,7,6,0.35)] bg-transparent px-0 py-2.5 text-[16px] text-[#5B0706] outline-none transition-colors focus:border-b-[rgba(91,7,6,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] md:py-1.5"
                      />
                    </Field>
                  </div>

                  <div className="contact-field" style={{ animationDelay: "140ms" }}>
                    <Field id="contact-email" label="Email">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full border-0 border-b border-b-[rgba(91,7,6,0.35)] bg-transparent px-0 py-2.5 text-[16px] text-[#5B0706] outline-none transition-colors focus:border-b-[rgba(91,7,6,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] md:py-1.5"
                      />
                    </Field>
                  </div>

                  <div className="contact-field" style={{ animationDelay: "220ms" }}>
                    <Field id="contact-message" label="What&rsquo;s on your mind?">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        className="w-full resize-none border-0 border-b border-b-[rgba(91,7,6,0.35)] bg-transparent px-0 py-2.5 text-[16px] text-[#5B0706] outline-none transition-colors focus:border-b-[rgba(91,7,6,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] md:py-1.5"
                      />
                    </Field>
                  </div>

                  <div className="contact-field" style={{ animationDelay: "300ms" }}>
                    <button
                      type="submit"
                      className={`${josefin} contact-cta mt-1 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-[2px] bg-[#5B0706] px-5 py-2.5 text-[13px] font-semibold text-[#F7F1E7] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] sm:text-[14px] md:min-h-0`}
                    >
                      {c.option2Cta}
                    </button>
                  </div>

                  <p
                    className={`contact-field ${josefin} text-[12px] leading-[1.5] text-[#7A3A3A] sm:text-[12px]`}
                    style={{ animationDelay: "380ms" }}
                    data-cms="body"
                  >
                    {c.note}
                  </p>
                </form>
              </div>

              {/* Divider */}
              <hr className="contact-divider border-0 border-t border-[rgba(91,7,6,0.2)]" />

              {/* -------- Other places -------- */}
              <div className="contact-option contact-option--3 flex flex-col" style={{ animationDelay: "940ms" }}>
                <h2 className="font-serif text-[clamp(24px,2.3vw,34px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#750100]">
                  Other places to{" "}
                  <span className="contact-heading-script ml-[0.18em] inline-block font-script !text-[2.15em] font-normal tracking-[0.01em]" data-cms="script">
                    {c.findMe}
                  </span>
                </h2>

                <nav className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {[
                    {
                      label: "Instagram →",
                      href: "https://www.instagram.com/francescaatendido/",
                    },
                    { label: "TikTok →", href: "#" },
                    { label: "Newsletter →", href: "#" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={(event) => {
                        if (href === "#") event.preventDefault();
                      }}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`${josefin} inline-flex min-h-11 items-center text-[14px] underline decoration-[rgba(91,7,6,0.35)] underline-offset-4 transition-colors hover:decoration-[rgba(91,7,6,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] sm:text-[15px] md:min-h-0`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Animation layer (scoped to this section) ---------------- */}
      <style>{`
        /* ============ Left image — dramatic reveal + ambient float ============
           The portrait-side image fades in with a strong de-blur and
           a subtle scale settle. Once settled, it drifts on a long,
           slow loop. transform-origin center. No clip-path. */
        .contact-image {
          opacity: 0;
          transform: scale(1.06);
          filter: blur(10px);
          transform-origin: 50% 50%;
          transition: opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      transform 1400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
                      filter 1400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
          will-change: transform, opacity;
        }
        .contact-section--visible .contact-image {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
          animation: contactImageFloat 12s ease-in-out 2s infinite;
        }
        @keyframes contactImageFloat {
          0%   { transform: scale(1) translate3d(0, 0, 0); }
          50%  { transform: scale(1.015) translate3d(0, -5px, 0); }
          100% { transform: scale(1) translate3d(0, 0, 0); }
        }

        /* ============ Eyebrow ============ */
        .contact-eyebrow {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          letter-spacing: 0.32em;
          transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms,
                      transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms,
                      letter-spacing 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms;
        }
        .contact-section--visible .contact-eyebrow {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          letter-spacing: 0.32em;
        }

        /* ============ Heading — rise + de-blur ============ */
        .contact-heading {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          filter: blur(6px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
                      transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 240ms,
                      filter 900ms cubic-bezier(0.22, 1, 0.36, 1) 240ms;
        }
        .contact-section--visible .contact-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* ============ Script "talk." / "find me" — elastic settle ============ */
        .contact-heading-script {
          transform-origin: 50% 70%;
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.82) rotate(-6deg);
          transition: opacity 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 500ms,
                      transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 500ms;
        }
        .contact-section--visible .contact-heading-script {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }

        /* ============ Intro ============ */
        .contact-intro {
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 460ms,
                      transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 460ms;
        }
        .contact-section--visible .contact-intro {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ============ Options + form fields — staggered cascade ============ */
        .contact-option,
        .contact-field {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          filter: blur(4px);
          animation: contactItemIn 850ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-play-state: paused;
        }
        .contact-section--visible .contact-option,
        .contact-section--visible .contact-field {
          animation-play-state: running;
        }

        @keyframes contactItemIn {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
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

        /* ============ Dividers — draw in from the left ============ */
        .contact-divider {
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .contact-section--visible .contact-divider {
          transform: scaleX(1);
        }
        .contact-section--visible .contact-option--1 + .contact-divider { transition-delay: 780ms; }
        .contact-section--visible .contact-option--2 + .contact-divider { transition-delay: 1300ms; }

        /* ============ CTA buttons + links — idle glow pulse ============ */
        .contact-section--visible .contact-cta {
          animation: contactCtaPulse 5s ease-in-out 1.8s infinite;
        }
        @keyframes contactCtaPulse {
          0%   { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
          50%  { box-shadow: 0 6px 20px -4px rgba(91, 7, 6, 0.32); }
          100% { box-shadow: 0 0 0 0 rgba(91, 7, 6, 0); }
        }
        .contact-cta:hover {
          animation-play-state: paused;
        }

        /* ============ Reduced motion ============ */
        @media (prefers-reduced-motion: reduce) {
          .contact-image,
          .contact-eyebrow,
          .contact-heading,
          .contact-heading-script,
          .contact-intro,
          .contact-option,
          .contact-field,
          .contact-divider,
          .contact-cta {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .contact-cta:hover {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/* Small helper to keep form fields consistent */
function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-josefin text-[12px] font-semibold uppercase tracking-[0.08em] text-[#750100] md:text-[11px]"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {children}
    </div>
  );
}