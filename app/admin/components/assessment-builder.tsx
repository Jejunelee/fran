"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "../actions";
import { buildAssessment } from "@/lib/assessment/cms";
import {
  blankBand,
  blankPersona,
  blankPoint,
  blankQuestion,
  draftFromBuilt,
  keysFor,
  moveItem,
  nextChoiceKey,
  normalizeDraft,
  validateDraft,
  type AssessmentDraft,
  type DraftPartId,
  type DraftQuestion,
} from "@/lib/assessment/builder";
import type { SiteContent } from "@/lib/content/types";

const TABS = [
  ["start", "Start screen"],
  ["questions", "Questions"],
  ["results", "Results and scoring"],
] as const;

const PART_COPY: Record<DraftPartId, { title: string; help: string }> = {
  persona: {
    title: "Persona",
    help: "The answer chosen most often wins. If there is a tie, the tie-break question decides it when its answer is one of the tied answers. Otherwise the latest tied answer wins.",
  },
  sticking: {
    title: "Sticking point",
    help: "One question uses the selected answer as the result. Several questions use the same majority and tie-break rules, with the last question breaking ties.",
  },
  readiness: {
    title: "Next step",
    help: "Mark the answers that count. The total of marked answers picks a result band.",
  },
};

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-xl border border-[#750000]/15 bg-white px-3 py-2 font-josefin text-sm text-[#5a0a0a] outline-none focus:border-[#750000]/40";
  return (
    <label className="block">
      <span className="mb-1 block font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">
        {label}
      </span>
      {multiline ? (
        <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} className={className} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function updatePart(
  draft: AssessmentDraft,
  partId: DraftPartId,
  update: (questions: DraftQuestion[]) => DraftQuestion[],
) {
  return {
    ...draft,
    parts: draft.parts.map((part) =>
      part.id === partId ? { ...part, questions: update(part.questions) } : part,
    ),
  };
}

export function AssessmentBuilder({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [draft, setDraft] = useState<AssessmentDraft>(() => {
    return normalizeDraft(initial.assessment.builder) ?? draftFromBuilt(buildAssessment(initial));
  });
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("questions");
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const personaKeys = useMemo(() => keysFor(draft, "persona"), [draft]);
  const stickingKeys = useMemo(() => keysFor(draft, "sticking"), [draft]);
  const readinessCount = draft.parts.find((part) => part.id === "readiness")?.questions.length ?? 0;
  const personaQuestions = draft.parts.find((part) => part.id === "persona")?.questions ?? [];

  function patchQuestion(partId: DraftPartId, questionId: string, patch: (question: DraftQuestion) => DraftQuestion) {
    setDraft((current) =>
      updatePart(current, partId, (questions) =>
        questions.map((question) => (question.id === questionId ? patch(question) : question)),
      ),
    );
  }

  function renameChoice(partId: DraftPartId, questionId: string, choiceIndex: number, nextKey: string) {
    setDraft((current) => {
      const question = current.parts
        .find((part) => part.id === partId)
        ?.questions.find((item) => item.id === questionId);
      const from = question?.choices[choiceIndex]?.key.trim() ?? "";
      const to = nextKey.trim();
      const patched = updatePart(current, partId, (questions) =>
        questions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                choices: item.choices.map((entry, index) =>
                  index === choiceIndex ? { ...entry, key: nextKey } : entry,
                ),
              }
            : item,
        ),
      );
      if (!from || !to || from === to || (partId !== "persona" && partId !== "sticking")) return patched;

      const copy = structuredClone(patched);
      const used = keysFor(copy, partId).includes(from);
      if (partId === "persona") {
        const existing = copy.personas.find((item) => item.key === from);
        const taken = copy.personas.some((item) => item.key === to);
        if (existing && !used && !taken) existing.key = to;
        else if (existing && used && !taken) copy.personas.push({ ...structuredClone(existing), key: to });
      } else {
        const existing = copy.stickingPoints.find((item) => item.key === from);
        const taken = copy.stickingPoints.some((item) => item.key === to);
        if (existing && !used && !taken) existing.key = to;
        else if (existing && used && !taken) copy.stickingPoints.push({ ...structuredClone(existing), key: to });
      }
      return copy;
    });
  }

  async function onSave() {
    const problems = validateDraft(draft);
    setErrors(problems);
    if (problems.length > 0) {
      setStatus(null);
      return;
    }

    setSaving(true);
    setStatus(null);
    const next = structuredClone(initial) as SiteContent;
    next.assessment = { ...next.assessment, builder: draft as unknown as SiteContent["assessment"] };
    const result = await saveSiteContent(next);
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setStatus("Saved. Refresh the live assessment to see it.");
    router.refresh();
  }

  return (
    <div className="pb-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-josefin text-[11px] uppercase tracking-[0.16em] text-[#750000]/50">
            <Link href="/admin" className="hover:text-[#750000]">
              Pages
            </Link>
            <span className="mx-2">/</span>
            Self-assessment
          </p>
          <h1 className="mt-1 font-serif text-4xl font-light tracking-[-0.03em] text-[#5B0706]">
            Assessment builder
          </h1>
          <p className="mt-2 max-w-2xl font-josefin text-sm leading-relaxed text-[#5a0a0a]/70">
            Change the introduction, every question, the answers, which answers count, and the results.
            Answer keys connect a choice to its result. A blank line in a result starts a new paragraph.
          </p>
        </div>
        <a
          href="/assessment"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#750000]/20 bg-white px-4 py-2 font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]"
        >
          Open live page
        </a>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 font-josefin text-sm ${
              tab === id ? "bg-[#5B0706] text-[#f7f3ee]" : "bg-white text-[#750000]/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {errors.length > 0 && (
        <ul className="mb-6 space-y-1 rounded-2xl border border-[#750000]/20 bg-white px-5 py-4 font-josefin text-sm text-[#750000]">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {tab === "start" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-[#F8F2E7]/50 p-5">
            <h2 className="font-serif text-2xl font-light text-[#5B0706]">Introduction</h2>
            <Field label="Eyebrow" value={draft.intro.eyebrow} onChange={(eyebrow) => setDraft({ ...draft, intro: { ...draft.intro, eyebrow } })} />
            <Field label="Heading" value={draft.intro.heading} onChange={(heading) => setDraft({ ...draft, intro: { ...draft.intro, heading } })} />
            <Field label="Script line" value={draft.intro.headingScript} onChange={(headingScript) => setDraft({ ...draft, intro: { ...draft.intro, headingScript } })} />
            <Field label="Body" value={draft.intro.body} multiline onChange={(body) => setDraft({ ...draft, intro: { ...draft.intro, body } })} />
            <Field label="Note" value={draft.intro.note} multiline onChange={(note) => setDraft({ ...draft, intro: { ...draft.intro, note } })} />
            <Field label="Begin button" value={draft.intro.begin} onChange={(begin) => setDraft({ ...draft, intro: { ...draft.intro, begin } })} />
          </section>
          <div className="space-y-6">
            <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-[#F8F2E7]/50 p-5">
              <h2 className="font-serif text-2xl font-light text-[#5B0706]">Buttons</h2>
              {(
                [
                  ["back", "Back"],
                  ["continue", "Continue"],
                  ["seeResult", "See result"],
                  ["changeAnswer", "Change an answer"],
                  ["startOver", "Start over"],
                ] as const
              ).map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={draft.labels[key]}
                  onChange={(value) => setDraft({ ...draft, labels: { ...draft.labels, [key]: value } })}
                />
              ))}
            </section>
            <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-[#F8F2E7]/50 p-5">
              <h2 className="font-serif text-2xl font-light text-[#5B0706]">Colors</h2>
              {(
                [
                  ["headingColor", "Heading"],
                  ["bodyColor", "Body"],
                  ["scriptColor", "Script"],
                  ["accentColor", "Accent"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between gap-4">
                  <span className="font-josefin text-sm text-[#5a0a0a]">{label}</span>
                  <input
                    type="color"
                    value={draft.intro.styles[key]}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        intro: { ...draft.intro, styles: { ...draft.intro.styles, [key]: event.target.value } },
                      })
                    }
                    className="h-10 w-16 cursor-pointer rounded border border-[#750000]/15 bg-white"
                  />
                </label>
              ))}
            </section>
          </div>
        </div>
      )}

      {tab === "questions" && (
        <div className="space-y-8">
          {draft.parts.map((part) => (
            <section key={part.id} className="rounded-2xl border border-[#750000]/10 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl font-light text-[#5B0706]">{PART_COPY[part.id].title}</h2>
                  <p className="mt-1 max-w-2xl font-josefin text-sm leading-relaxed text-[#5a0a0a]/70">
                    {PART_COPY[part.id].help}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const question = blankQuestion(part.id);
                    setDraft((current) => {
                      const next = updatePart(current, part.id, (questions) => [...questions, question]);
                      if (part.id !== "persona") return next;
                      const stillThere = next.parts
                        .find((item) => item.id === "persona")
                        ?.questions.some((item) => item.id === current.tieBreakQuestionId);
                      return stillThere ? next : { ...next, tieBreakQuestionId: question.id };
                    });
                  }}
                  className="rounded-full bg-[#5B0706] px-4 py-2 font-josefin text-[12px] uppercase tracking-[0.08em] text-[#f7f3ee]"
                >
                  Add question
                </button>
              </div>
              <Field
                label="Part label"
                value={part.label}
                onChange={(label) =>
                  setDraft({
                    ...draft,
                    parts: draft.parts.map((item) => (item.id === part.id ? { ...item, label } : item)),
                  })
                }
              />

              {part.id === "persona" && personaQuestions.length > 0 && (
                <label className="mt-4 block">
                  <span className="mb-1 block font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">
                    Tie-break question
                  </span>
                  <select
                    value={draft.tieBreakQuestionId}
                    onChange={(event) => setDraft({ ...draft, tieBreakQuestionId: event.target.value })}
                    className="w-full rounded-xl border border-[#750000]/15 bg-[#F8F2E7]/40 px-3 py-2 font-josefin text-sm"
                  >
                    {personaQuestions.map((question, index) => (
                      <option key={question.id} value={question.id}>
                        Question {index + 1}
                        {question.prompt ? `: ${question.prompt.slice(0, 80)}` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <div className="mt-5 space-y-5">
                {part.questions.map((question, questionIndex) => (
                  <article key={question.id} className="rounded-2xl border border-[#750000]/10 bg-[#F8F2E7]/40 p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-xl text-[#5B0706]">Question {questionIndex + 1}</h3>
                      <div className="flex gap-2">
                        <button type="button" className="rounded-full bg-white px-3 py-1 font-josefin text-xs" onClick={() => setDraft((current) => updatePart(current, part.id, (questions) => moveItem(questions, questionIndex, -1)))}>Up</button>
                        <button type="button" className="rounded-full bg-white px-3 py-1 font-josefin text-xs" onClick={() => setDraft((current) => updatePart(current, part.id, (questions) => moveItem(questions, questionIndex, 1)))}>Down</button>
                        <button
                          type="button"
                          className="rounded-full bg-white px-3 py-1 font-josefin text-xs text-[#750000]"
                          onClick={() =>
                            setDraft((current) => {
                              const next = updatePart(current, part.id, (questions) =>
                                questions.filter((item) => item.id !== question.id),
                              );
                              if (part.id !== "persona" || current.tieBreakQuestionId !== question.id) return next;
                              const remaining = next.parts.find((item) => item.id === "persona")?.questions ?? [];
                              return { ...next, tieBreakQuestionId: remaining.at(-1)?.id ?? "" };
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <Field
                      label="Prompt"
                      value={question.prompt}
                      multiline
                      onChange={(prompt) => patchQuestion(part.id, question.id, (item) => ({ ...item, prompt }))}
                    />
                    <div className="mt-4 space-y-3">
                      {question.choices.map((choice, choiceIndex) => (
                        <div key={`${question.id}-${choiceIndex}`} className="grid gap-2 rounded-xl bg-white p-3 md:grid-cols-[88px_1fr_auto]">
                          <label className="block">
                            <span className="mb-1 block font-josefin text-[10px] uppercase tracking-[0.12em] text-[#750000]/50">Key</span>
                            <input
                              value={choice.key}
                              onChange={(event) => renameChoice(part.id, question.id, choiceIndex, event.target.value)}
                              className="w-full rounded-lg border border-[#750000]/15 px-2 py-2 font-josefin text-sm"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1 block font-josefin text-[10px] uppercase tracking-[0.12em] text-[#750000]/50">Answer</span>
                            <textarea
                              value={choice.text}
                              rows={2}
                              onChange={(event) =>
                                patchQuestion(part.id, question.id, (item) => ({
                                  ...item,
                                  choices: item.choices.map((entry, index) =>
                                    index === choiceIndex ? { ...entry, text: event.target.value } : entry,
                                  ),
                                }))
                              }
                              className="w-full rounded-lg border border-[#750000]/15 px-2 py-2 font-josefin text-sm"
                            />
                          </label>
                          <div className="flex items-end gap-2 pb-1">
                            {part.id === "readiness" && (
                              <label className="flex items-center gap-2 font-josefin text-xs text-[#5a0a0a]">
                                <input
                                  type="checkbox"
                                  checked={choice.viable}
                                  onChange={(event) =>
                                    patchQuestion(part.id, question.id, (item) => ({
                                      ...item,
                                      choices: item.choices.map((entry, index) =>
                                        index === choiceIndex ? { ...entry, viable: event.target.checked } : entry,
                                      ),
                                    }))
                                  }
                                />
                                Counts
                              </label>
                            )}
                            <button
                              type="button"
                              className="font-josefin text-xs text-[#750000]"
                              onClick={() =>
                                patchQuestion(part.id, question.id, (item) => ({
                                  ...item,
                                  choices: item.choices.filter((_, index) => index !== choiceIndex),
                                }))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="font-josefin text-sm text-[#750000]"
                        onClick={() =>
                          patchQuestion(part.id, question.id, (item) => ({
                            ...item,
                            choices: [...item.choices, { key: nextChoiceKey(item.choices), text: "", viable: false }],
                          }))
                        }
                      >
                        Add answer
                      </button>
                    </div>
                  </article>
                ))}
                {part.questions.length === 0 && (
                  <p className="font-josefin text-sm text-[#5a0a0a]/60">This part is empty, so it will not appear in the quiz.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}

      {tab === "results" && (
        <div className="space-y-8">
          <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-white p-5">
            <h2 className="font-serif text-3xl font-light text-[#5B0706]">Persona results</h2>
            <Field label="Section label" value={draft.personaSectionLabel} onChange={(personaSectionLabel) => setDraft({ ...draft, personaSectionLabel })} />
            <div className="grid gap-3 md:grid-cols-2">
              {(
                [
                  ["core", "Core heading"],
                  ["strengths", "Strengths heading"],
                  ["weaknesses", "Weaknesses heading"],
                  ["watch", "Watch heading"],
                  ["growth", "Growth heading"],
                ] as const
              ).map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={draft.personaHeadings[key]}
                  onChange={(value) =>
                    setDraft({ ...draft, personaHeadings: { ...draft.personaHeadings, [key]: value } })
                  }
                />
              ))}
            </div>
            {personaKeys.length === 0 && (
              <p className="font-josefin text-sm text-[#5a0a0a]/60">Add persona answers to create result cards.</p>
            )}
            {personaKeys.map((key) => {
              const persona = draft.personas.find((item) => item.key === key) ?? blankPersona(key);
              const write = (patch: Partial<typeof persona>) =>
                setDraft((current) => {
                  const existing = current.personas.some((item) => item.key === key);
                  return {
                    ...current,
                    personas: existing
                      ? current.personas.map((item) => (item.key === key ? { ...item, ...patch } : item))
                      : [...current.personas, { ...persona, ...patch }],
                  };
                });
              return (
                <div key={key} className="space-y-3 rounded-2xl bg-[#F8F2E7]/60 p-4">
                  <h3 className="font-serif text-2xl text-[#5B0706]">Key {key}</h3>
                  <Field label="Name" value={persona.name} onChange={(name) => write({ name })} />
                  <Field label="Core pattern" value={persona.corePattern} multiline onChange={(corePattern) => write({ corePattern })} />
                  <Field label="Strengths" value={persona.strengths} multiline onChange={(strengths) => write({ strengths })} />
                  <Field label="Weaknesses" value={persona.weaknesses} multiline onChange={(weaknesses) => write({ weaknesses })} />
                  <Field label="What to watch" value={persona.watch} multiline onChange={(watch) => write({ watch })} />
                  <Field label="Growth edge" value={persona.growth} multiline onChange={(growth) => write({ growth })} />
                </div>
              );
            })}
          </section>

          <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-white p-5">
            <h2 className="font-serif text-3xl font-light text-[#5B0706]">Sticking-point results</h2>
            <Field label="Section label" value={draft.stickingSectionLabel} onChange={(stickingSectionLabel) => setDraft({ ...draft, stickingSectionLabel })} />
            {stickingKeys.map((key) => {
              const point = draft.stickingPoints.find((item) => item.key === key) ?? blankPoint(key);
              const write = (patch: Partial<typeof point>) =>
                setDraft((current) => {
                  const existing = current.stickingPoints.some((item) => item.key === key);
                  return {
                    ...current,
                    stickingPoints: existing
                      ? current.stickingPoints.map((item) => (item.key === key ? { ...item, ...patch } : item))
                      : [...current.stickingPoints, { ...point, ...patch }],
                  };
                });
              return (
                <div key={key} className="space-y-3 rounded-2xl bg-[#F8F2E7]/60 p-4">
                  <h3 className="font-serif text-2xl text-[#5B0706]">Key {key}</h3>
                  <Field label="Title" value={point.title} onChange={(title) => write({ title })} />
                  <Field label="Body" value={point.body} multiline onChange={(body) => write({ body })} />
                </div>
              );
            })}
          </section>

          <section className="space-y-4 rounded-2xl border border-[#750000]/10 bg-white p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-3xl font-light text-[#5B0706]">Next-step results</h2>
                <p className="mt-1 font-josefin text-sm text-[#5a0a0a]/70">
                  There {readinessCount === 1 ? "is" : "are"} {readinessCount} readiness question{readinessCount === 1 ? "" : "s"}, so a score can be 0 to {readinessCount}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDraft({ ...draft, bands: [...draft.bands, blankBand(readinessCount)] })}
                className="rounded-full bg-[#5B0706] px-4 py-2 font-josefin text-[12px] uppercase tracking-[0.08em] text-[#f7f3ee]"
              >
                Add result
              </button>
            </div>
            <Field label="Section label" value={draft.nextStepSectionLabel} onChange={(nextStepSectionLabel) => setDraft({ ...draft, nextStepSectionLabel })} />
            {draft.bands.map((band, bandIndex) => (
              <div key={band.id} className="space-y-3 rounded-2xl bg-[#F8F2E7]/60 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#5B0706]">Result {bandIndex + 1}</h3>
                  <button
                    type="button"
                    className="font-josefin text-xs text-[#750000]"
                    onClick={() => setDraft({ ...draft, bands: draft.bands.filter((item) => item.id !== band.id) })}
                  >
                    Delete
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Minimum counted answers" value={String(band.min)} onChange={(value) => setDraft({ ...draft, bands: draft.bands.map((item) => item.id === band.id ? { ...item, min: Number(value) || 0 } : item) })} />
                  <Field label="Maximum counted answers" value={String(band.max)} onChange={(value) => setDraft({ ...draft, bands: draft.bands.map((item) => item.id === band.id ? { ...item, max: Number(value) || 0 } : item) })} />
                </div>
                <Field label="Headline" value={band.headline} onChange={(headline) => setDraft({ ...draft, bands: draft.bands.map((item) => item.id === band.id ? { ...item, headline } : item) })} />
                <Field label="Body" value={band.body} multiline onChange={(body) => setDraft({ ...draft, bands: draft.bands.map((item) => item.id === band.id ? { ...item, body } : item) })} />
                {band.ctas.map((call, callIndex) => (
                  <div key={`${band.id}-${callIndex}`} className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Button label"
                      value={call.label}
                      onChange={(label) =>
                        setDraft({
                          ...draft,
                          bands: draft.bands.map((item) =>
                            item.id === band.id
                              ? { ...item, ctas: item.ctas.map((cta, index) => index === callIndex ? { ...cta, label } : cta) }
                              : item,
                          ),
                        })
                      }
                    />
                    <Field
                      label="Button link"
                      value={call.href}
                      onChange={(href) =>
                        setDraft({
                          ...draft,
                          bands: draft.bands.map((item) =>
                            item.id === band.id
                              ? { ...item, ctas: item.ctas.map((cta, index) => index === callIndex ? { ...cta, href } : cta) }
                              : item,
                          ),
                        })
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="font-josefin text-sm text-[#750000]"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      bands: draft.bands.map((item) =>
                        item.id === band.id ? { ...item, ctas: [...item.ctas, { label: "", href: "" }] } : item,
                      ),
                    })
                  }
                >
                  Add button
                </button>
              </div>
            ))}
          </section>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#750000]/10 bg-[#F3EEE4]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
          <p className="font-josefin text-sm text-[#5a0a0a]/70">{status}</p>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-[#5B0706] px-6 py-3 font-josefin text-sm font-semibold uppercase tracking-[0.08em] text-[#f7f3ee] disabled:opacity-60"
          >
            {saving ? "Saving" : "Save assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}
