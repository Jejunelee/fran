import { PERSONA_BY_LETTER, type Persona, type Readiness, type ReadinessId, READINESS, STICKING_POINTS, type StickingPoint } from "./content";
import { CHOICES, isChoice, type Choice } from "./types";

export type PersonaAnswers = readonly [Choice, Choice, Choice, Choice, Choice, Choice, Choice];
export type ReadinessAnswers = readonly [Choice, Choice, Choice, Choice];
export type AssessmentAnswers = readonly [
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
  Choice,
];

export type AssessmentResult = {
  persona: Persona;
  stickingPoint: StickingPoint;
  readiness: Readiness;
  viableCount: number;
};

/**
 * Viable answers for questions 9–12.
 *
 * The source says to count predetermined viable answers, then:
 * 4 = Ready, 2–3 = Close, 0–1 = Not yet.
 * It never lists which choices count. The Ready paragraph is the only
 * definition given, so each question is scored against that definition.
 *
 * Q9 — can see the pattern and wants it to change: A, D.
 *      B has not identified the pattern. C has decided to live with it.
 * Q10 — has already tried to shift it: A, B, D.
 *       C is “mostly nothing.”
 * Q11 — willing to be uncomfortable now: C.
 *       A is only “starting to” realize the cost of staying. B and D
 *       still choose to avoid the discomfort.
 * Q12 — ready to take ownership: C.
 *       A is still “trying.” B puts it on circumstances or other people.
 *       D keeps reasons change has not been possible.
 *
 * One selected choice per question counts at most once, so the total is 0–4.
 */
export const VIABLE_ANSWERS: Record<9 | 10 | 11 | 12, readonly Choice[]> = {
  9: ["A", "D"],
  10: ["A", "B", "D"],
  11: ["C"],
  12: ["C"],
};

function assertAnswers(answers: readonly Choice[], expected: number, label: string) {
  if (answers.length !== expected || answers.some((answer) => !isChoice(answer))) {
    throw new Error(`${label} requires ${expected} answers of A, B, C, or D.`);
  }
}

/**
 * Persona from questions 1–7.
 *
 * The letter chosen most often wins. Two or more letters sharing that
 * highest count is a tie. A score of 3 against 2s is not a tie.
 *
 * Question 7 breaks a tie when its letter is one of the tied letters.
 * The instructions’ example (A2 B2 C2 D1, Question 7 = B) is The Compromiser.
 *
 * The instructions do not say what happens when Question 7 is the letter
 * that was not tied. The most recent earlier answer whose letter is tied
 * is used, so Question 7 stays the first tie-break and the result is
 * always a single persona.
 */
export function scorePersona(answers: readonly Choice[]): Persona {
  assertAnswers(answers, 7, "Persona");

  const counts: Record<Choice, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const answer of answers) counts[answer] += 1;

  const highest = Math.max(...CHOICES.map((letter) => counts[letter]));
  const tied = CHOICES.filter((letter) => counts[letter] === highest);

  if (tied.length === 1) return PERSONA_BY_LETTER[tied[0]];

  const questionSeven = answers[6];
  if (tied.includes(questionSeven)) return PERSONA_BY_LETTER[questionSeven];

  for (let index = answers.length - 2; index >= 0; index -= 1) {
    const letter = answers[index];
    if (tied.includes(letter)) return PERSONA_BY_LETTER[letter];
  }

  return PERSONA_BY_LETTER[tied[0]];
}

/** Question 8 maps directly to a sticking point. It does not affect the other results. */
export function scoreStickingPoint(answer: Choice): StickingPoint {
  if (!isChoice(answer)) {
    throw new Error("Sticking point requires an answer of A, B, C, or D.");
  }
  return STICKING_POINTS[answer];
}

export function countViableAnswers(answers: readonly Choice[]): number {
  assertAnswers(answers, 4, "Readiness");
  const questionNumbers = [9, 10, 11, 12] as const;
  return answers.reduce((total, answer, index) => {
    return VIABLE_ANSWERS[questionNumbers[index]].includes(answer) ? total + 1 : total;
  }, 0);
}

export function readinessForCount(viableCount: number): ReadinessId {
  if (viableCount === 4) return "ready";
  if (viableCount === 2 || viableCount === 3) return "close";
  if (viableCount === 0 || viableCount === 1) return "not-yet";
  throw new Error("Readiness count must be between 0 and 4.");
}

export function scoreReadiness(answers: readonly Choice[]): Readiness {
  return READINESS[readinessForCount(countViableAnswers(answers))];
}

/**
 * Three independent results. Persona, sticking point, and readiness
 * never feed each other.
 */
export type DefinedQuestion = {
  part: "persona" | "sticking" | "readiness";
  choices: readonly { key: string; viable?: boolean }[];
};

export type DefinedBand = {
  id: string;
  min: number;
  max: number;
};

export type DefinedScore = {
  personaKey: string | null;
  stickingKey: string | null;
  readinessId: string | null;
  viableCount: number;
};

function answerWinner(
  answers: readonly string[],
  tieBreakIndex: number,
  order: readonly string[],
): string | null {
  if (answers.length === 0) return null;

  const counts = new Map<string, number>();
  for (const answer of answers) counts.set(answer, (counts.get(answer) ?? 0) + 1);

  let highest = 0;
  for (const count of counts.values()) highest = Math.max(highest, count);

  const ranked = order.filter((key) => counts.get(key) === highest);
  const tied = ranked.length > 0 ? ranked : [...counts.keys()];
  if (tied.length === 1) return tied[0];

  const index = Math.min(Math.max(tieBreakIndex, 0), answers.length - 1);
  if (tied.includes(answers[index])) return answers[index];

  for (let cursor = answers.length - 1; cursor >= 0; cursor -= 1) {
    if (tied.includes(answers[cursor])) return answers[cursor];
  }

  return tied[0] ?? null;
}

function bandForCount(count: number, bands: readonly DefinedBand[]): string | null {
  const match = bands.find((band) => count >= band.min && count <= band.max);
  if (match) return match.id;
  if (bands.length === 0) return null;

  return bands
    .map((band) => ({
      id: band.id,
      distance: count < band.min ? band.min - count : count > band.max ? count - band.max : 0,
    }))
    .sort((left, right) => left.distance - right.distance)[0]?.id ?? null;
}

/**
 * Scores whatever quiz the admin saved.
 * Persona and sticking point stay independent of the readiness count.
 */
export function scoreDefined(input: {
  answers: readonly string[];
  questions: readonly DefinedQuestion[];
  tieBreakPersonaIndex: number;
  bands: readonly DefinedBand[];
}): DefinedScore {
  const personaQuestions = input.questions
    .map((question, index) => ({ question, index }))
    .filter((item) => item.question.part === "persona");
  const stickingQuestions = input.questions
    .map((question, index) => ({ question, index }))
    .filter((item) => item.question.part === "sticking");

  const uniqueKeys = (keys: string[]) => keys.filter((key, index) => key.length > 0 && keys.indexOf(key) === index);
  const personaOrder = uniqueKeys(
    personaQuestions.flatMap((item) => item.question.choices.map((choice) => choice.key)),
  );
  const stickingOrder = uniqueKeys(
    stickingQuestions.flatMap((item) => item.question.choices.map((choice) => choice.key)),
  );

  const personaAnswers = personaQuestions.map((item) => input.answers[item.index] ?? "");
  const stickingAnswers = stickingQuestions.map((item) => input.answers[item.index] ?? "");
  const personaKey = answerWinner(
    personaAnswers.filter((answer) => answer.length > 0),
    personaAnswers.length === 0
      ? 0
      : Math.min(Math.max(input.tieBreakPersonaIndex, 0), personaAnswers.length - 1),
    personaOrder,
  );
  const stickingKey = answerWinner(
    stickingAnswers.filter((answer) => answer.length > 0),
    Math.max(0, stickingAnswers.filter((answer) => answer.length > 0).length - 1),
    stickingOrder,
  );

  let viableCount = 0;
  input.questions.forEach((question, index) => {
    if (question.part !== "readiness") return;
    const selected = question.choices.find((choice) => choice.key === input.answers[index]);
    if (selected?.viable) viableCount += 1;
  });

  return {
    personaKey,
    stickingKey,
    readinessId: input.questions.some((question) => question.part === "readiness")
      ? bandForCount(viableCount, input.bands)
      : null,
    viableCount,
  };
}

export function scoreAssessment(answers: readonly Choice[]): AssessmentResult {
  assertAnswers(answers, 12, "Assessment");
  const readinessAnswers = answers.slice(8);
  const viableCount = countViableAnswers(readinessAnswers);

  return {
    persona: scorePersona(answers.slice(0, 7)),
    stickingPoint: scoreStickingPoint(answers[7]),
    readiness: READINESS[readinessForCount(viableCount)],
    viableCount,
  };
}
