import type { BuiltAssessment, BuiltPersona, BuiltQuestion } from "./cms";
import type { Readiness, StickingPoint } from "./content";

export type DraftChoice = {
  key: string;
  text: string;
  viable: boolean;
};

export type DraftQuestion = {
  id: string;
  prompt: string;
  choices: DraftChoice[];
};

export type DraftPartId = "persona" | "sticking" | "readiness";

export type DraftPart = {
  id: DraftPartId;
  label: string;
  questions: DraftQuestion[];
};

export type DraftPersona = {
  key: string;
  name: string;
  corePattern: string;
  strengths: string;
  weaknesses: string;
  watch: string;
  growth: string;
};

export type DraftPoint = {
  key: string;
  title: string;
  body: string;
};

export type DraftCta = {
  label: string;
  href: string;
};

export type DraftBand = {
  id: string;
  min: number;
  max: number;
  headline: string;
  body: string;
  ctas: DraftCta[];
};

export type AssessmentDraft = {
  intro: BuiltAssessment["intro"];
  labels: BuiltAssessment["labels"];
  parts: DraftPart[];
  tieBreakQuestionId: string;
  personaSectionLabel: string;
  personaHeadings: {
    core: string;
    strengths: string;
    weaknesses: string;
    watch: string;
    growth: string;
  };
  personas: DraftPersona[];
  stickingSectionLabel: string;
  stickingPoints: DraftPoint[];
  nextStepSectionLabel: string;
  bands: DraftBand[];
};

const PARTS: DraftPartId[] = ["persona", "sticking", "readiness"];

export function createBuilderId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function nextChoiceKey(choices: readonly { key: string }[]) {
  const used = new Set(choices.map((choice) => choice.key.trim().toUpperCase()));
  for (let code = 65; code <= 90; code += 1) {
    const letter = String.fromCharCode(code);
    if (!used.has(letter)) return letter;
  }
  return `C${choices.length + 1}`;
}

export function moveItem<T>(list: readonly T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return [...list];
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function numberValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function paragraphs(value: string) {
  return value
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function cta(label: string, href: string) {
  const destination = href.trim() || "/";
  return {
    label: label.trim() || "Continue",
    href: destination,
    external: /^https?:\/\//i.test(destination),
  };
}

export function keysFor(draft: AssessmentDraft, partId: DraftPartId) {
  const part = draft.parts.find((item) => item.id === partId);
  const keys: string[] = [];
  for (const question of part?.questions ?? []) {
    for (const choice of question.choices) {
      const key = choice.key.trim();
      if (key && !keys.includes(key)) keys.push(key);
    }
  }
  return keys;
}

export function draftFromBuilt(built: BuiltAssessment): AssessmentDraft {
  const groups: Record<DraftPartId, DraftQuestion[]> = {
    persona: [],
    sticking: [],
    readiness: [],
  };
  const labels: Record<DraftPartId, string> = {
    persona: "Part 1",
    sticking: "What gets in the way",
    readiness: "Where you are now",
  };

  for (const question of built.questions) {
    labels[question.part] = question.partLabel;
    groups[question.part].push({
      id: question.id,
      prompt: question.prompt,
      choices: question.choices.map((choice) => ({
        key: choice.letter,
        text: choice.text,
        viable: choice.viable,
      })),
    });
  }

  const firstPersona = Object.values(built.personaByLetter)[0];
  const headingOf = (fallback: string) =>
    firstPersona?.sections.find((section) => section.heading === fallback)?.heading ?? fallback;

  return {
    intro: built.intro,
    labels: built.labels,
    parts: PARTS.map((id) => ({ id, label: labels[id], questions: groups[id] })),
    tieBreakQuestionId: groups.persona[built.tieBreakPersonaIndex]?.id ?? groups.persona.at(-1)?.id ?? "",
    personaSectionLabel: built.personaSectionLabel,
    personaHeadings: {
      core: headingOf("Core pattern"),
      strengths: headingOf("Strengths"),
      weaknesses: headingOf("Weaknesses"),
      watch: headingOf("What to watch"),
      growth: headingOf("Growth edge"),
    },
    personas: Object.values(built.personaByLetter).map((persona) => ({
      key: persona.letter,
      name: persona.name,
      corePattern: sectionText(persona, headingOf("Core pattern")),
      strengths: sectionText(persona, headingOf("Strengths")),
      weaknesses: sectionText(persona, headingOf("Weaknesses")),
      watch: sectionText(persona, headingOf("What to watch")),
      growth: sectionText(persona, headingOf("Growth edge")),
    })),
    stickingSectionLabel: built.stickingSectionLabel,
    stickingPoints: Object.values(built.stickingByLetter).map((point) => ({
      key: point.letter,
      title: point.title,
      body: point.body,
    })),
    nextStepSectionLabel: built.nextStepSectionLabel,
    bands: built.bands.map((band) => {
      const result = built.readinessById[band.id];
      return {
        id: band.id,
        min: band.min,
        max: band.max,
        headline: result?.headline ?? "",
        body: result?.body ?? "",
        ctas: result?.ctas.map((item) => ({ label: item.label, href: item.href })) ?? [{ label: "", href: "" }],
      };
    }),
  };
}

function sectionText(persona: BuiltPersona, heading: string) {
  return persona.sections.find((section) => section.heading === heading)?.paragraphs.join("\n\n") ?? "";
}

function choiceFrom(value: unknown): DraftChoice | null {
  const source = asRecord(value);
  const key = text(source.key).trim();
  if (!key) return null;
  return {
    key,
    text: text(source.text),
    viable: source.viable === true,
  };
}

function questionFrom(value: unknown): DraftQuestion | null {
  const source = asRecord(value);
  const choices = Array.isArray(source.choices)
    ? source.choices.map(choiceFrom).filter((choice): choice is DraftChoice => choice != null)
    : [];
  if (choices.length === 0) return null;
  return {
    id: text(source.id) || createBuilderId("q"),
    prompt: text(source.prompt),
    choices,
  };
}

export function normalizeDraft(value: unknown): AssessmentDraft | null {
  const source = asRecord(value);
  if (!Array.isArray(source.parts)) return null;

  const parts = PARTS.map((id) => {
    const stored = (source.parts as unknown[]).find((item) => asRecord(item).id === id);
    const record = asRecord(stored);
    const questions = Array.isArray(record.questions)
      ? record.questions.map(questionFrom).filter((question): question is DraftQuestion => question != null)
      : [];
    return {
      id,
      label: text(record.label, id),
      questions,
    };
  });

  const personaQuestions = parts.find((part) => part.id === "persona")?.questions ?? [];
  const tieBreakQuestionId = text(source.tieBreakQuestionId);
  const headings = asRecord(source.personaHeadings);
  const personas = Array.isArray(source.personas)
    ? source.personas.map((item) => {
        const record = asRecord(item);
        return {
          key: text(record.key).trim(),
          name: text(record.name),
          corePattern: text(record.corePattern),
          strengths: text(record.strengths),
          weaknesses: text(record.weaknesses),
          watch: text(record.watch),
          growth: text(record.growth),
        };
      }).filter((item) => item.key)
    : [];
  const stickingPoints = Array.isArray(source.stickingPoints)
    ? source.stickingPoints.map((item) => {
        const record = asRecord(item);
        return { key: text(record.key).trim(), title: text(record.title), body: text(record.body) };
      }).filter((item) => item.key)
    : [];
  const bands = Array.isArray(source.bands)
    ? source.bands.map((item) => {
        const record = asRecord(item);
        const calls = Array.isArray(record.ctas)
          ? record.ctas.map((call) => {
              const ctaRecord = asRecord(call);
              return { label: text(ctaRecord.label), href: text(ctaRecord.href) };
            })
          : [];
        return {
          id: text(record.id) || createBuilderId("band"),
          min: numberValue(record.min, 0),
          max: numberValue(record.max, 0),
          headline: text(record.headline),
          body: text(record.body),
          ctas: calls.length > 0 ? calls : [{ label: "", href: "" }],
        };
      })
    : [];

  const intro = asRecord(source.intro);
  const styles = asRecord(intro.styles);
  const labels = asRecord(source.labels);

  return {
    intro: {
      styles: {
        headingColor: text(styles.headingColor, "#750000"),
        bodyColor: text(styles.bodyColor, "#5a0a0a"),
        scriptColor: text(styles.scriptColor, "#750000"),
        accentColor: text(styles.accentColor, "#F5B7C4"),
      },
      eyebrow: text(intro.eyebrow),
      heading: text(intro.heading),
      headingScript: text(intro.headingScript),
      body: text(intro.body),
      note: text(intro.note),
      begin: text(intro.begin, "Begin"),
    },
    labels: {
      back: text(labels.back, "Back"),
      continue: text(labels.continue, "Continue"),
      seeResult: text(labels.seeResult, "See my result"),
      changeAnswer: text(labels.changeAnswer, "Change an answer"),
      startOver: text(labels.startOver, "Start over"),
    },
    parts,
    tieBreakQuestionId: personaQuestions.some((question) => question.id === tieBreakQuestionId)
      ? tieBreakQuestionId
      : (personaQuestions.at(-1)?.id ?? ""),
    personaSectionLabel: text(source.personaSectionLabel, "Your persona"),
    personaHeadings: {
      core: text(headings.core, "Core pattern"),
      strengths: text(headings.strengths, "Strengths"),
      weaknesses: text(headings.weaknesses, "Weaknesses"),
      watch: text(headings.watch, "What to watch"),
      growth: text(headings.growth, "Growth edge"),
    },
    personas,
    stickingSectionLabel: text(source.stickingSectionLabel, "Your sticking point"),
    stickingPoints,
    nextStepSectionLabel: text(source.nextStepSectionLabel, "Your next step"),
    bands,
  };
}

export function compileDraft(draft: AssessmentDraft): BuiltAssessment {
  const questions: BuiltQuestion[] = draft.parts.flatMap((part) =>
    part.questions.map((question) => ({
      id: question.id,
      part: part.id,
      partLabel: part.label,
      prompt: question.prompt,
      choices: question.choices
        .filter((choice) => choice.key.trim())
        .map((choice) => ({
          letter: choice.key.trim(),
          text: choice.text,
          viable: part.id === "readiness" && choice.viable,
        })),
    })),
  );

  const headings = draft.personaHeadings;
  const personaByLetter: Record<string, BuiltPersona> = {};
  for (const key of keysFor(draft, "persona")) {
    const source = draft.personas.find((item) => item.key === key);
    const persona: BuiltPersona = {
      id: key,
      letter: key,
      name: source?.name.trim() || key,
      sections: [
        { heading: headings.core, paragraphs: paragraphs(source?.corePattern ?? "") },
        { heading: headings.strengths, paragraphs: paragraphs(source?.strengths ?? "") },
        { heading: headings.weaknesses, paragraphs: paragraphs(source?.weaknesses ?? "") },
        { heading: headings.watch, paragraphs: paragraphs(source?.watch ?? "") },
        { heading: headings.growth, paragraphs: paragraphs(source?.growth ?? "") },
      ].filter((section) => section.paragraphs.length > 0),
    };
    personaByLetter[key] = persona;
  }

  const stickingByLetter: Record<string, StickingPoint> = {};
  for (const key of keysFor(draft, "sticking")) {
    const source = draft.stickingPoints.find((item) => item.key === key);
    stickingByLetter[key] = {
      letter: key as StickingPoint["letter"],
      title: source?.title.trim() || key,
      body: source?.body ?? "",
    };
  }

  const readinessById: Record<string, Readiness> = {};
  const bands = draft.bands.map((band) => ({ id: band.id, min: band.min, max: band.max }));
  for (const band of draft.bands) {
    readinessById[band.id] = {
      id: band.id as Readiness["id"],
      headline: band.headline,
      body: band.body,
      ctas: band.ctas.filter((item) => item.label.trim() || item.href.trim()).map((item) => cta(item.label, item.href)),
    };
  }

  const personaQuestions = draft.parts.find((part) => part.id === "persona")?.questions ?? [];
  const foundTieBreak = personaQuestions.findIndex((question) => question.id === draft.tieBreakQuestionId);
  const tieBreakPersonaIndex =
    foundTieBreak === -1 ? Math.max(0, personaQuestions.length - 1) : foundTieBreak;

  return {
    styles: draft.intro.styles,
    intro: draft.intro,
    labels: draft.labels,
    questions,
    personaByLetter,
    stickingByLetter,
    readinessById,
    bands,
    tieBreakPersonaIndex,
    personaSectionLabel: draft.personaSectionLabel,
    stickingSectionLabel: draft.stickingSectionLabel,
    nextStepSectionLabel: draft.nextStepSectionLabel,
  };
}

export function blankQuestion(part: DraftPartId): DraftQuestion {
  const choices = ["A", "B", "C", "D"].map((key) => ({
    key,
    text: "",
    viable: false,
  }));
  return { id: createBuilderId(part), prompt: "", choices };
}

export function blankPersona(key: string): DraftPersona {
  return { key, name: "", corePattern: "", strengths: "", weaknesses: "", watch: "", growth: "" };
}

export function blankPoint(key: string): DraftPoint {
  return { key, title: "", body: "" };
}

export function blankBand(questionCount: number): DraftBand {
  return {
    id: createBuilderId("band"),
    min: 0,
    max: questionCount,
    headline: "",
    body: "",
    ctas: [{ label: "", href: "" }],
  };
}

export function validateDraft(draft: AssessmentDraft) {
  const errors: string[] = [];
  const questions = draft.parts.flatMap((part) => part.questions);
  if (questions.length === 0) errors.push("Add at least one question.");

  draft.parts.forEach((part) => {
    part.questions.forEach((question, index) => {
      const label = `${part.label || part.id} question ${index + 1}`;
      if (!question.prompt.trim()) errors.push(`${label} needs a prompt.`);
      if (question.choices.length < 2) errors.push(`${label} needs at least two answers.`);
      const keys = question.choices.map((choice) => choice.key.trim()).filter(Boolean);
      if (keys.length !== question.choices.length) errors.push(`${label} has an answer without a key.`);
      if (new Set(keys).size !== keys.length) errors.push(`${label} has two answers with the same key.`);
    });
  });

  if (draft.bands.length === 0 && (draft.parts.find((part) => part.id === "readiness")?.questions.length ?? 0) > 0) {
    errors.push("Add at least one next-step result.");
  }

  draft.bands.forEach((band, index) => {
    if (band.min > band.max) errors.push(`Next step ${index + 1} has a minimum higher than its maximum.`);
    if (!band.headline.trim()) errors.push(`Next step ${index + 1} needs a headline.`);
  });

  return errors;
}
