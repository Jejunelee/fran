import {
  PERSONA_BY_LETTER,
  QUESTIONS,
  READINESS,
  STICKING_POINTS,
  type Persona,
  type Question,
  type Readiness,
  type StickingPoint,
} from "./content";
import { compileDraft, normalizeDraft } from "./builder";
import { VIABLE_ANSWERS } from "./score";
import { CHOICES, type Choice } from "./types";
import type { SectionStyles, SiteContent } from "@/lib/content/types";

const assessmentColors: SectionStyles = {
  headingColor: "#750000",
  bodyColor: "#5a0a0a",
  scriptColor: "#750000",
  accentColor: "#F5B7C4",
};

type ChoiceFields = {
  prompt: string;
  a: string;
  b: string;
  c: string;
  d: string;
};

export type AssessmentContent = {
  intro: {
    styles: SectionStyles;
    eyebrow: string;
    heading: string;
    headingScript: string;
    body: string;
    note: string;
    begin: string;
  };
  labels: {
    back: string;
    continue: string;
    seeResult: string;
    changeAnswer: string;
    startOver: string;
  };
  personaQuestions: {
    partLabel: string;
    questions: ChoiceFields[];
  };
  stickingQuestion: ChoiceFields & {
    partLabel: string;
  };
  readinessQuestions: {
    partLabel: string;
    questions: ChoiceFields[];
  };
  personas: {
    sectionLabel: string;
    coreHeading: string;
    strengthsHeading: string;
    weaknessesHeading: string;
    watchHeading: string;
    growthHeading: string;
    items: {
      name: string;
      corePattern: string;
      strengths: string;
      weaknesses: string;
      watch: string;
      growth: string;
    }[];
  };
  stickingPoints: {
    sectionLabel: string;
    items: { title: string; body: string }[];
  };
  nextStep: {
    sectionLabel: string;
    ready: { headline: string; body: string; cta: string; href: string };
    close: {
      headline: string;
      body: string;
      resourcesCta: string;
      resourcesHref: string;
      callCta: string;
      callHref: string;
    };
    notYet: { headline: string; body: string; cta: string; href: string };
  };
};

export type BuiltQuestion = {
  id: string;
  part: "persona" | "sticking" | "readiness";
  partLabel: string;
  prompt: string;
  choices: { letter: string; text: string; viable: boolean }[];
};

export type BuiltPersona = {
  id: string;
  letter: string;
  name: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type BuiltAssessment = {
  styles: SectionStyles;
  intro: AssessmentContent["intro"];
  labels: AssessmentContent["labels"];
  questions: BuiltQuestion[];
  personaByLetter: Record<string, BuiltPersona>;
  stickingByLetter: Record<string, StickingPoint>;
  readinessById: Record<string, Readiness>;
  bands: { id: string; min: number; max: number }[];
  tieBreakPersonaIndex: number;
  personaSectionLabel: string;
  stickingSectionLabel: string;
  nextStepSectionLabel: string;
};

function choiceFields(question: Question): ChoiceFields {
  return {
    prompt: question.prompt,
    a: question.choices[0]?.text ?? "",
    b: question.choices[1]?.text ?? "",
    c: question.choices[2]?.text ?? "",
    d: question.choices[3]?.text ?? "",
  };
}

function sectionText(persona: Persona, heading: string) {
  return persona.sections.find((section) => section.heading === heading)?.paragraphs.join("\n\n") ?? "";
}

export const defaultAssessmentContent: AssessmentContent = {
  intro: {
    styles: assessmentColors,
    eyebrow: "Find out in 2 minutes",
    heading: "Not sure if this is",
    headingScript: "your thing?",
    body: "Here are twelve questions. They show you which of four patterns you're most stuck in, and where the work actually starts for you. You get your result the second you finish, plus a breakdown that's specific to you.",
    note: "Your result has three parts: the pattern you get stuck in, what gets in the way, and a next step.",
    begin: "Begin",
  },
  labels: {
    back: "Back",
    continue: "Continue",
    seeResult: "See my result",
    changeAnswer: "Change an answer",
    startOver: "Start over",
  },
  personaQuestions: {
    partLabel: "Part 1",
    questions: QUESTIONS.slice(0, 7).map(choiceFields),
  },
  stickingQuestion: {
    partLabel: QUESTIONS[7]?.partLabel ?? "What gets in the way",
    ...choiceFields(QUESTIONS[7]),
  },
  readinessQuestions: {
    partLabel: "Where you are now",
    questions: QUESTIONS.slice(8).map(choiceFields),
  },
  personas: {
    sectionLabel: "Your persona",
    coreHeading: "Core pattern",
    strengthsHeading: "Strengths",
    weaknessesHeading: "Weaknesses",
    watchHeading: "What to watch",
    growthHeading: "Growth edge",
    items: CHOICES.map((letter) => {
      const persona = PERSONA_BY_LETTER[letter];
      return {
        name: persona.name,
        corePattern: sectionText(persona, "Core pattern"),
        strengths: sectionText(persona, "Strengths"),
        weaknesses: sectionText(persona, "Weaknesses"),
        watch: sectionText(persona, "What to watch"),
        growth: sectionText(persona, "Growth edge"),
      };
    }),
  },
  stickingPoints: {
    sectionLabel: "Your sticking point",
    items: CHOICES.map((letter) => ({
      title: STICKING_POINTS[letter].title,
      body: STICKING_POINTS[letter].body,
    })),
  },
  nextStep: {
    sectionLabel: "Your next step",
    ready: {
      headline: READINESS.ready.headline,
      body: READINESS.ready.body,
      cta: READINESS.ready.ctas[0].label,
      href: READINESS.ready.ctas[0].href,
    },
    close: {
      headline: READINESS.close.headline,
      body: READINESS.close.body,
      resourcesCta: READINESS.close.ctas[0].label,
      resourcesHref: READINESS.close.ctas[0].href,
      callCta: READINESS.close.ctas[1].label,
      callHref: READINESS.close.ctas[1].href,
    },
    notYet: {
      headline: READINESS["not-yet"].headline,
      body: READINESS["not-yet"].body,
      cta: READINESS["not-yet"].ctas[0].label,
      href: READINESS["not-yet"].ctas[0].href,
    },
  },
};

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function choiceList(value: unknown, fallback: ChoiceFields[], expected: number): ChoiceFields[] {
  if (!Array.isArray(value) || value.length !== expected) return fallback;
  return value.map((item, index) => {
      const source = asRecord(item);
    const base = fallback[index];
    return {
      prompt: text(source.prompt, base.prompt),
      a: text(source.a, base.a),
      b: text(source.b, base.b),
      c: text(source.c, base.c),
      d: text(source.d, base.d),
    };
  });
}

function toQuestion(
  id: number,
  part: "persona" | "sticking" | "readiness",
  partLabel: string,
  fields: ChoiceFields,
): BuiltQuestion {
  return {
    id: `legacy-${id}`,
    part,
    partLabel,
    prompt: fields.prompt,
    choices: CHOICES.map((letter) => ({
      letter,
      text: fields[letter.toLowerCase() as "a" | "b" | "c" | "d"],
      viable:
        part === "readiness" &&
        (id === 9 || id === 10 || id === 11 || id === 12) &&
        VIABLE_ANSWERS[id].includes(letter),
    })),
  };
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

export function buildAssessment(site: SiteContent): BuiltAssessment {
  const stored = asRecord(site.assessment);
  const custom = normalizeDraft(stored.builder);
  if (custom && custom.parts.some((part) => part.questions.length > 0)) {
    return compileDraft(custom);
  }
  const introSource = asRecord(stored.intro);
  const labelSource = asRecord(stored.labels);
  const personaSource = asRecord(stored.personaQuestions);
  const stickingSource = asRecord(stored.stickingQuestion);
  const readinessSource = asRecord(stored.readinessQuestions);
  const personasSource = asRecord(stored.personas);
  const pointsSource = asRecord(stored.stickingPoints);
  const nextSource = asRecord(stored.nextStep);
  const readySource = asRecord(nextSource.ready);
  const closeSource = asRecord(nextSource.close);
  const notYetSource = asRecord(nextSource.notYet);
  const fallback = defaultAssessmentContent;

  const styleSource = asRecord(introSource.styles);
  const intro = {
    styles: {
      headingColor: text(styleSource.headingColor, fallback.intro.styles.headingColor),
      bodyColor: text(styleSource.bodyColor, fallback.intro.styles.bodyColor),
      scriptColor: text(styleSource.scriptColor, fallback.intro.styles.scriptColor),
      accentColor: text(styleSource.accentColor, fallback.intro.styles.accentColor),
    },
    eyebrow: text(introSource.eyebrow, fallback.intro.eyebrow),
    heading: text(introSource.heading, fallback.intro.heading),
    headingScript: text(introSource.headingScript, fallback.intro.headingScript),
    body: text(introSource.body, fallback.intro.body),
    note: text(introSource.note, fallback.intro.note),
    begin: text(introSource.begin, fallback.intro.begin),
  };

  const labels = {
    back: text(labelSource.back, fallback.labels.back),
    continue: text(labelSource.continue, fallback.labels.continue),
    seeResult: text(labelSource.seeResult, fallback.labels.seeResult),
    changeAnswer: text(labelSource.changeAnswer, fallback.labels.changeAnswer),
    startOver: text(labelSource.startOver, fallback.labels.startOver),
  };

  const personaPart = text(personaSource.partLabel, fallback.personaQuestions.partLabel);
  const stickingPart = text(stickingSource.partLabel, fallback.stickingQuestion.partLabel);
  const readinessPart = text(readinessSource.partLabel, fallback.readinessQuestions.partLabel);
  const personaQuestions = choiceList(
    personaSource.questions,
    fallback.personaQuestions.questions,
    7,
  );
  const readinessQuestions = choiceList(
    readinessSource.questions,
    fallback.readinessQuestions.questions,
    4,
  );
  const stickingQuestion = {
    prompt: text(stickingSource.prompt, fallback.stickingQuestion.prompt),
    a: text(stickingSource.a, fallback.stickingQuestion.a),
    b: text(stickingSource.b, fallback.stickingQuestion.b),
    c: text(stickingSource.c, fallback.stickingQuestion.c),
    d: text(stickingSource.d, fallback.stickingQuestion.d),
  };

  const questions = [
    ...personaQuestions.map((fields, index) => toQuestion(index + 1, "persona", personaPart, fields)),
    toQuestion(8, "sticking", stickingPart, stickingQuestion),
    ...readinessQuestions.map((fields, index) =>
      toQuestion(index + 9, "readiness", readinessPart, fields),
    ),
  ];

  const headings = {
    core: text(personasSource.coreHeading, fallback.personas.coreHeading),
    strengths: text(personasSource.strengthsHeading, fallback.personas.strengthsHeading),
    weaknesses: text(personasSource.weaknessesHeading, fallback.personas.weaknessesHeading),
    watch: text(personasSource.watchHeading, fallback.personas.watchHeading),
    growth: text(personasSource.growthHeading, fallback.personas.growthHeading),
  };
  const personaItems = Array.isArray(personasSource.items) ? personasSource.items : [];

  const personaByLetter = Object.fromEntries(
    CHOICES.map((letter, index) => {
      const source = asRecord(personaItems[index]);
      const base = fallback.personas.items[index];
      const persona: Persona = {
        id: PERSONA_BY_LETTER[letter].id,
        letter,
        name: text(source.name, base.name),
        sections: [
          { heading: headings.core, paragraphs: paragraphs(text(source.corePattern, base.corePattern)) },
          { heading: headings.strengths, paragraphs: paragraphs(text(source.strengths, base.strengths)) },
          { heading: headings.weaknesses, paragraphs: paragraphs(text(source.weaknesses, base.weaknesses)) },
          { heading: headings.watch, paragraphs: paragraphs(text(source.watch, base.watch)) },
          { heading: headings.growth, paragraphs: paragraphs(text(source.growth, base.growth)) },
        ].filter((section) => section.paragraphs.length > 0),
      };
      return [letter, persona];
    }),
  ) as Record<Choice, Persona>;

  const pointItems = Array.isArray(pointsSource.items) ? pointsSource.items : [];
  const stickingByLetter = Object.fromEntries(
    CHOICES.map((letter, index) => {
      const source = asRecord(pointItems[index]);
      const base = fallback.stickingPoints.items[index];
      const point: StickingPoint = {
        letter,
        title: text(source.title, base.title),
        body: text(source.body, base.body),
      };
      return [letter, point];
    }),
  ) as Record<Choice, StickingPoint>;

  const readinessById = {
    ready: {
      id: "ready" as const,
      headline: text(readySource.headline, fallback.nextStep.ready.headline),
      body: text(readySource.body, fallback.nextStep.ready.body),
      ctas: [
        cta(
          text(readySource.cta, fallback.nextStep.ready.cta),
          text(readySource.href, fallback.nextStep.ready.href),
        ),
      ],
    },
    close: {
      id: "close" as const,
      headline: text(closeSource.headline, fallback.nextStep.close.headline),
      body: text(closeSource.body, fallback.nextStep.close.body),
      ctas: [
        cta(
          text(closeSource.resourcesCta, fallback.nextStep.close.resourcesCta),
          text(closeSource.resourcesHref, fallback.nextStep.close.resourcesHref),
        ),
        cta(
          text(closeSource.callCta, fallback.nextStep.close.callCta),
          text(closeSource.callHref, fallback.nextStep.close.callHref),
        ),
      ],
    },
    "not-yet": {
      id: "not-yet" as const,
      headline: text(notYetSource.headline, fallback.nextStep.notYet.headline),
      body: text(notYetSource.body, fallback.nextStep.notYet.body),
      ctas: [
        cta(
          text(notYetSource.cta, fallback.nextStep.notYet.cta),
          text(notYetSource.href, fallback.nextStep.notYet.href),
        ),
      ],
    },
  };

  return {
    styles: intro.styles,
    intro,
    labels,
    questions,
    personaByLetter: personaByLetter as unknown as Record<string, BuiltPersona>,
    stickingByLetter,
    readinessById,
    bands: [
      { id: "ready", min: 4, max: 4 },
      { id: "close", min: 2, max: 3 },
      { id: "not-yet", min: 0, max: 1 },
    ],
    tieBreakPersonaIndex: 6,
    personaSectionLabel: text(personasSource.sectionLabel, fallback.personas.sectionLabel),
    stickingSectionLabel: text(pointsSource.sectionLabel, fallback.stickingPoints.sectionLabel),
    nextStepSectionLabel: text(nextSource.sectionLabel, fallback.nextStep.sectionLabel),
  };
}
