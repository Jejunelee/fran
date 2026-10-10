"use client";

import type { ReactNode } from "react";
import { buildAssessment, type BuiltAssessment } from "@/lib/assessment/cms";
import { useSiteContent } from "@/lib/content/context";
import { cmsStyleVars } from "@/lib/content/style";

function useBuilt() {
  return buildAssessment(useSiteContent());
}

function Frame({ children }: { children: ReactNode }) {
  const built = useBuilt();
  return (
    <div
      className="cms-section min-h-[70vh] bg-[#F7F3EE] px-16 py-16 text-left"
      style={cmsStyleVars(built.styles)}
    >
      {children}
    </div>
  );
}

export function AssessmentIntroPreview() {
  const { intro } = useBuilt();
  return (
    <Frame>
      <p data-cms="heading" className="font-josefin text-[13px] uppercase tracking-[0.22em]">
        {intro.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-6xl font-light leading-[0.9]">
        <span data-cms="heading" className="block">{intro.heading}</span>
        <span data-cms="script" className="mt-2 block font-script text-[1.3em] leading-none">
          {intro.headingScript}
        </span>
      </h1>
      <p data-cms="body" className="mt-8 max-w-xl font-josefin text-lg leading-relaxed">
        {intro.body}
      </p>
      <p data-cms="body" className="mt-4 max-w-xl font-josefin text-base leading-relaxed">
        {intro.note}
      </p>
      <p className="mt-8 inline-flex bg-[#5B0706] px-8 py-3 font-josefin text-sm font-semibold tracking-[0.06em] text-[#F7F1E7] uppercase">
        {intro.begin}
      </p>
    </Frame>
  );
}

export function AssessmentLabelsPreview() {
  const { labels } = useBuilt();
  return (
    <Frame>
      <div className="flex flex-wrap gap-4">
        {[labels.back, labels.continue, labels.seeResult, labels.changeAnswer, labels.startOver].map(
          (label) => (
            <span
              key={label}
              className="inline-flex bg-[#5B0706] px-6 py-3 font-josefin text-sm font-semibold tracking-[0.06em] text-[#F7F1E7] uppercase"
            >
              {label}
            </span>
          ),
        )}
      </div>
    </Frame>
  );
}

function QuestionPreview({ question }: { question: BuiltAssessment["questions"][number] }) {
  return (
    <Frame>
      <p data-cms="heading" className="font-josefin text-[13px] uppercase tracking-[0.18em]">
        {question.partLabel}
      </p>
      <h1 data-cms="heading" className="mt-6 max-w-3xl font-serif text-4xl font-normal leading-tight">
        {question.prompt}
      </h1>
      <ol className="mt-8 flex max-w-3xl flex-col gap-3">
        {question.choices.map((choice) => (
          <li
            key={choice.letter}
            className="flex gap-4 border border-[#750000]/15 bg-white px-5 py-4 font-josefin text-lg"
          >
            <span className="font-serif text-[#750000]">{choice.letter}</span>
            <span data-cms="body">{choice.text}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function AssessmentPersonaQuestionsPreview() {
  const question = useBuilt().questions[0];
  return question ? <QuestionPreview question={question} /> : null;
}

export function AssessmentStickingQuestionPreview() {
  const question = useBuilt().questions[7];
  return question ? <QuestionPreview question={question} /> : null;
}

export function AssessmentReadinessQuestionsPreview() {
  const question = useBuilt().questions[8];
  return question ? <QuestionPreview question={question} /> : null;
}

export function AssessmentPersonasPreview() {
  const built = useBuilt();
  const persona = built.personaByLetter.A;
  return (
    <Frame>
      <p data-cms="heading" className="font-josefin text-[13px] uppercase tracking-[0.18em]">
        {built.personaSectionLabel}
      </p>
      <h1 data-cms="heading" className="mt-3 font-serif text-6xl font-light">
        {persona.name}
      </h1>
      <div className="mt-8 flex flex-wrap gap-3 font-josefin text-sm uppercase tracking-[0.08em] text-[#750000]">
        {(["A", "B", "C", "D"] as const).map((letter) => (
          <span key={letter}>{built.personaByLetter[letter].name}</span>
        ))}
      </div>
      {persona.sections[0] ? (
        <div className="mt-10 max-w-3xl">
          <h2 data-cms="heading" className="font-serif text-3xl">
            {persona.sections[0].heading}
          </h2>
          <p data-cms="body" className="mt-3 font-josefin text-lg leading-relaxed">
            {persona.sections[0].paragraphs[0]}
          </p>
        </div>
      ) : null}
    </Frame>
  );
}

export function AssessmentStickingPointsPreview() {
  const built = useBuilt();
  return (
    <Frame>
      <p data-cms="heading" className="font-josefin text-[13px] uppercase tracking-[0.18em]">
        {built.stickingSectionLabel}
      </p>
      <div className="mt-8 grid max-w-4xl grid-cols-2 gap-6">
        {(["A", "B", "C", "D"] as const).map((letter) => {
          const point = built.stickingByLetter[letter];
          return (
            <div key={letter}>
              <h2 data-cms="heading" className="font-serif text-2xl leading-tight">
                {point.title}
              </h2>
              <p data-cms="body" className="mt-2 font-josefin text-base leading-relaxed">
                {point.body}
              </p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export function AssessmentNextStepPreview() {
  const built = useBuilt();
  return (
    <Frame>
      <p data-cms="heading" className="font-josefin text-[13px] uppercase tracking-[0.18em]">
        {built.nextStepSectionLabel}
      </p>
      <div className="mt-8 grid max-w-5xl grid-cols-3 gap-6">
        {(["ready", "close", "not-yet"] as const).map((id) => {
          const step = built.readinessById[id];
          return (
            <div key={id}>
              <h2 data-cms="heading" className="font-serif text-3xl leading-tight">
                {step.headline}
              </h2>
              <p data-cms="body" className="mt-3 font-josefin text-base leading-relaxed">
                {step.body}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {step.ctas.map((cta) => (
                  <span key={cta.href} className="font-josefin text-sm font-semibold uppercase">
                    {cta.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
