import { QUESTIONS } from "./content";
import { isChoice, type Choice } from "./types";

export const PROGRESS_VERSION = 1;
export const STORAGE_KEY = "fran-assessment-v1";

export type Progress = {
  /** -1 is the introduction. The last step, equal to the question count, is the result. */
  step: number;
  answers: (string | null)[];
};

export function quizStorageKey(questionIds: readonly string[]) {
  return `fran-assessment-v2:${questionIds.join("|")}`;
}

export function emptyQuizProgress(length: number): Progress {
  return {
    step: -1,
    answers: Array.from({ length }, () => null),
  };
}

export function parseQuizProgress(
  raw: unknown,
  questions: readonly { choices: readonly { letter: string }[] }[],
): Progress | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as { version?: unknown; step?: unknown; answers?: unknown };
  if (record.version !== 2 || !Array.isArray(record.answers)) return null;
  if (record.answers.length !== questions.length) return null;
  if (typeof record.step !== "number" || !Number.isInteger(record.step)) return null;
  if (record.step < -1 || record.step > questions.length) return null;

  const answers = record.answers.map((answer, index) => {
    const keys = questions[index]?.choices.map((choice) => choice.letter) ?? [];
    return typeof answer === "string" && keys.includes(answer) ? answer : null;
  });
  let step = record.step;
  if (step === questions.length && answers.some((answer) => answer == null)) {
    step = answers.findIndex((answer) => answer == null);
  }

  return { step, answers };
}

export function emptyProgress(): Progress {
  return {
    step: -1,
    answers: Array.from({ length: QUESTIONS.length }, () => null),
  };
}

export function firstUnanswered(answers: readonly (Choice | null)[]): number {
  const index = answers.findIndex((answer) => answer == null);
  return index === -1 ? QUESTIONS.length : index;
}

/**
 * Restore a saved session. Incomplete results step back to the first
 * missing answer. Anything malformed is discarded.
 */
export function parseProgress(raw: unknown): Progress | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as { version?: unknown; step?: unknown; answers?: unknown };
  if (record.version !== PROGRESS_VERSION || !Array.isArray(record.answers)) return null;
  if (record.answers.length !== QUESTIONS.length) return null;
  if (typeof record.step !== "number" || !Number.isInteger(record.step)) return null;
  if (record.step < -1 || record.step > QUESTIONS.length) return null;

  const answers = record.answers.map((answer) => (isChoice(answer) ? answer : null));
  let step = record.step;
  if (step === QUESTIONS.length && answers.some((answer) => answer == null)) {
    step = firstUnanswered(answers);
  }

  return { step, answers };
}
