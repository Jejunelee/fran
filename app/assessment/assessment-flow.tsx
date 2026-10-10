"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildAssessment, type BuiltAssessment, type BuiltQuestion } from "@/lib/assessment/cms";
import {
  emptyQuizProgress,
  parseQuizProgress,
  quizStorageKey,
  type Progress,
} from "@/lib/assessment/progress";
import { scoreDefined } from "@/lib/assessment/score";
import { useSiteContent } from "@/lib/content/context";
import { cmsStyleVars } from "@/lib/content/style";

function isComplete(answers: readonly (string | null)[], total: number): answers is string[] {
  return answers.length === total && answers.every((answer) => answer != null);
}

function useStepHeading(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = node.querySelector("h1");
    if (heading instanceof HTMLElement) heading.focus({ preventScroll: true });
    node.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [ref]);
}

export function AssessmentFlow() {
  const built = buildAssessment(useSiteContent());
  const storageKey = quizStorageKey(built.questions.map((question) => question.id));
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      return (
        parseQuizProgress(JSON.parse(sessionStorage.getItem(storageKey) ?? "null"), built.questions) ??
        emptyQuizProgress(built.questions.length)
      );
    } catch {
      return emptyQuizProgress(built.questions.length);
    }
  });
  const headingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify({ version: 2, ...progress }));
  }, [progress, storageKey]);

  const select = (letter: string) => {
    setProgress((current) => {
      if (current.step < 0 || current.step >= built.questions.length) return current;
      const answers = current.answers.slice();
      answers[current.step] = letter;
      return { ...current, answers };
    });
  };

  const goForward = () => {
    setProgress((current) => {
      if (current.step < 0) return { ...current, step: 0 };
      if (current.answers[current.step] == null) return current;
      return { ...current, step: Math.min(current.step + 1, built.questions.length) };
    });
  };

  const goBack = () => {
    setProgress((current) => ({ ...current, step: Math.max(current.step - 1, -1) }));
  };

  const restart = () => setProgress(emptyQuizProgress(built.questions.length));

  const scored =
    progress.step === built.questions.length && isComplete(progress.answers, built.questions.length)
      ? scoreDefined({
          answers: progress.answers,
          questions: built.questions.map((question) => ({
            part: question.part,
            choices: question.choices.map((choice) => ({ key: choice.letter, viable: choice.viable })),
          })),
          tieBreakPersonaIndex: built.tieBreakPersonaIndex,
          bands: built.bands,
        })
      : null;
  const result = scored
    ? {
        persona: scored.personaKey ? built.personaByLetter[scored.personaKey] : undefined,
        stickingPoint: scored.stickingKey ? built.stickingByLetter[scored.stickingKey] : undefined,
        readiness: scored.readinessId ? built.readinessById[scored.readinessId] : undefined,
      }
    : null;

  return (
    <main
      className="cms-section mx-auto w-full max-w-[760px] px-5 pb-24 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8"
      style={cmsStyleVars(built.styles)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={progress.step}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
        >
          {progress.step < 0 ? (
            <Intro built={built} headingRef={headingRef} onBegin={goForward} />
          ) : null}

          {progress.step >= 0 && progress.step < built.questions.length ? (
            <QuestionStep
              question={built.questions[progress.step]}
              index={progress.step}
              total={built.questions.length}
              selected={progress.answers[progress.step]}
              labels={built.labels}
              headingRef={headingRef}
              onSelect={select}
              onBack={goBack}
              onContinue={goForward}
            />
          ) : null}

          {result ? (
            <Results
              built={built}
              result={result}
              headingRef={headingRef}
              onBack={goBack}
              onRestart={restart}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function Intro({
  built,
  headingRef,
  onBegin,
}: {
  built: BuiltAssessment;
  headingRef: RefObject<HTMLElement | null>;
  onBegin: () => void;
}) {
  useStepHeading(headingRef);
  const intro = built.intro;

  return (
    <section
      ref={headingRef}
      className="mx-auto flex max-w-[640px] scroll-mt-24 flex-col items-center pt-8 text-center sm:pt-16"
    >
      <p data-cms="heading" className="font-josefin text-[12px] uppercase tracking-[0.22em] text-[#750000] sm:text-[13px]">
        {intro.eyebrow}
      </p>
      <h1
        tabIndex={-1}
        className="mt-5 font-serif text-[clamp(2.4rem,7vw,4.6rem)] font-light leading-[0.9] tracking-[-0.03em] text-[#750000] outline-none"
      >
        <span data-cms="heading" className="block">{intro.heading}</span>
        <span data-cms="script" className="mt-1 block font-script text-[1.35em] font-normal leading-[0.7] tracking-[0.01em]">
          {intro.headingScript}
        </span>
      </h1>
      <p data-cms="body" className="mt-8 max-w-[38rem] font-josefin text-[17px] leading-[1.6] text-[#5a0a0a] sm:text-[19px]">
        {intro.body}
      </p>
      <p data-cms="body" className="mt-4 max-w-[36rem] font-josefin text-[15px] leading-[1.6] text-[#7A3A3A] sm:text-[16px]">
        {intro.note}
      </p>
      <button
        type="button"
        onClick={onBegin}
        className="mt-10 inline-flex min-h-12 items-center justify-center bg-[#5B0706] px-8 py-3 font-josefin text-[14px] font-semibold tracking-[0.06em] text-[#F7F1E7] uppercase transition-colors hover:bg-[#750000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
      >
        {intro.begin}
      </button>
    </section>
  );
}

function QuestionStep({
  question,
  index,
  total,
  selected,
  labels,
  headingRef,
  onSelect,
  onBack,
  onContinue,
}: {
  question: BuiltQuestion;
  index: number;
  total: number;
  selected: string | null;
  labels: BuiltAssessment["labels"];
  headingRef: RefObject<HTMLElement | null>;
  onSelect: (letter: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const groupId = useId();
  const isLast = index === total - 1;
  useStepHeading(headingRef);

  return (
    <section ref={headingRef} className="scroll-mt-24 pt-6 sm:pt-10">
      <div className="flex items-end justify-between gap-4">
        <p data-cms="heading" className="font-josefin text-[12px] uppercase tracking-[0.18em] text-[#750000] sm:text-[13px]">
          {question.partLabel ?? "Part 1"}
        </p>
        <p data-cms="body" className="font-josefin text-[12px] tracking-[0.08em] text-[#7A3A3A] sm:text-[13px]">
          <span className="sr-only">Question </span>
          {index + 1}
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> of </span>
          {total}
        </p>
      </div>
      <ol className="mt-3 flex gap-1" aria-hidden="true">
        {Array.from({ length: total }, (_, itemIndex) => (
          <li
            key={itemIndex}
            className={`h-1 flex-1 rounded-full ${
              itemIndex <= index ? "bg-[#750000]" : "bg-[#750000]/15"
            }`}
          />
        ))}
      </ol>

      <h1
        id={groupId}
        tabIndex={-1}
        data-cms="heading"
        className="mt-8 font-serif text-[clamp(1.55rem,3.2vw,2.15rem)] font-normal leading-[1.2] tracking-[-0.02em] text-[#750000] outline-none"
      >
        {question.prompt}
      </h1>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (selected) onContinue();
        }}
      >
        <fieldset aria-labelledby={groupId} className="m-0 flex flex-col gap-3 border-0 p-0">
          {question.choices.map((choice) => {
            const isSelected = selected === choice.letter;
            return (
              <label
                key={choice.letter}
                className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#750000] sm:gap-4 sm:px-5 ${
                  isSelected
                    ? "border-[#750000] bg-white shadow-[0_8px_24px_-16px_rgba(91,7,6,0.45)]"
                    : "border-[#750000]/15 bg-white/55 hover:border-[#750000]/40 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={choice.letter}
                  checked={isSelected}
                  onChange={() => onSelect(choice.letter)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-serif text-[14px] ${
                    isSelected
                      ? "border-[#750000] bg-[#750000] text-[#F7F1E7]"
                      : "border-[#750000]/30 text-[#750000]"
                  }`}
                >
                  {choice.letter}
                </span>
                <span data-cms="body" className="font-josefin text-[15.5px] leading-[1.55] text-[#5a0a0a] sm:text-[17px]">
                  {choice.text}
                </span>
              </label>
            );
          })}
        </fieldset>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-12 items-center justify-center px-2 font-josefin text-[14px] tracking-[0.04em] text-[#5B0706] underline decoration-[#5B0706]/30 underline-offset-4 hover:decoration-[#5B0706] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
          >
            {labels.back}
          </button>
          <button
            type="submit"
            disabled={selected == null}
            className="inline-flex min-h-12 items-center justify-center bg-[#5B0706] px-8 py-3 font-josefin text-[14px] font-semibold tracking-[0.06em] text-[#F7F1E7] uppercase transition-colors hover:bg-[#750000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706] disabled:cursor-not-allowed disabled:bg-[#5B0706]/35"
          >
            {isLast ? labels.seeResult : labels.continue}
          </button>
        </div>
      </form>
    </section>
  );
}

function Results({
  built,
  result,
  headingRef,
  onBack,
  onRestart,
}: {
  built: BuiltAssessment;
  result: {
    persona?: BuiltAssessment["personaByLetter"][string];
    stickingPoint?: BuiltAssessment["stickingByLetter"][string];
    readiness?: BuiltAssessment["readinessById"][string];
  };
  headingRef: RefObject<HTMLElement | null>;
  onBack: () => void;
  onRestart: () => void;
}) {
  useStepHeading(headingRef);

  return (
    <article ref={headingRef} className="scroll-mt-24 pt-8 sm:pt-14">
      {result.persona ? (
        <>
      <p data-cms="heading" className="font-josefin text-[12px] uppercase tracking-[0.22em] text-[#750000]">
        {built.personaSectionLabel}
      </p>
      <h1
        tabIndex={-1}
        data-cms="heading"
        className="mt-3 font-serif text-[clamp(2.2rem,6vw,3.6rem)] font-light leading-[0.95] tracking-[-0.03em] text-[#750000] outline-none"
      >
        {result.persona.name}
      </h1>

      <section className="mt-10" aria-label={result.persona.name}>
        <div className="flex flex-col gap-8">
          {result.persona.sections.map((section) => (
            <div key={section.heading}>
              <h3 data-cms="heading" className="font-serif text-[1.35rem] leading-tight text-[#750000] sm:text-[1.5rem]">
                {section.heading}
              </h3>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-cms="body"
                  className="mt-3 font-josefin text-[16px] leading-[1.65] text-[#5a0a0a] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
        </>
      ) : (
        <h1 tabIndex={-1} className="sr-only">
          Your result
        </h1>
      )}

      {result.stickingPoint ? (
        <>
      <hr className="my-12 border-0 border-t border-[#750000]/15" />

      <section aria-labelledby="sticking-heading">
        <h2
          id="sticking-heading"
          data-cms="heading"
          className="font-josefin text-[12px] uppercase tracking-[0.18em] text-[#7A3A3A]"
        >
          {built.stickingSectionLabel}
        </h2>
        <h3 data-cms="heading" className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-[#750000]">
          {result.stickingPoint.title}
        </h3>
        <p data-cms="body" className="mt-4 font-josefin text-[16px] leading-[1.65] text-[#5a0a0a] sm:text-[17px]">
          {result.stickingPoint.body}
        </p>
      </section>
        </>
      ) : null}

      {result.readiness ? (
        <>
      <hr className="my-12 border-0 border-t border-[#750000]/15" />

      <section aria-labelledby="next-heading">
        <h2
          id="next-heading"
          data-cms="heading"
          className="font-josefin text-[12px] uppercase tracking-[0.18em] text-[#7A3A3A]"
        >
          {built.nextStepSectionLabel}
        </h2>
        <h3 data-cms="heading" className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-[#750000]">
          {result.readiness.headline}
        </h3>
        <p data-cms="body" className="mt-4 font-josefin text-[16px] leading-[1.65] text-[#5a0a0a] sm:text-[17px]">
          {result.readiness.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {result.readiness?.ctas.map((cta, index) => {
            const primary =
              (result.readiness?.ctas.length ?? 0) === 1 || index === (result.readiness?.ctas.length ?? 1) - 1;
            return (
              <a
                key={cta.label}
                href={cta.href}
                {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={
                  primary
                    ? "inline-flex min-h-12 items-center justify-center bg-[#5B0706] px-6 py-3 text-center font-josefin text-[14px] font-semibold text-[#F7F1E7] transition-colors hover:bg-[#750000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
                    : "inline-flex min-h-12 items-center justify-center border border-[#5B0706] bg-transparent px-6 py-3 text-center font-josefin text-[14px] font-semibold text-[#5B0706] transition-colors hover:bg-[#5B0706] hover:text-[#F7F1E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
                }
              >
                {cta.label}
                {cta.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            );
          })}
        </div>
      </section>
        </>
      ) : null}

      <div className="mt-14 flex flex-col gap-3 border-t border-[#750000]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center font-josefin text-[14px] text-[#5B0706] underline decoration-[#5B0706]/30 underline-offset-4 hover:decoration-[#5B0706] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
        >
          {built.labels.changeAnswer}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center font-josefin text-[14px] text-[#7A3A3A] underline decoration-[#7A3A3A]/30 underline-offset-4 hover:decoration-[#7A3A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B0706]"
        >
          {built.labels.startOver}
        </button>
      </div>
    </article>
  );
}
