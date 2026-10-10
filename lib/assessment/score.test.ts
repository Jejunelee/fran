import assert from "node:assert/strict";
import { test } from "node:test";
import { PERSONA_BY_LETTER, QUESTIONS, READINESS, STICKING_POINTS } from "./content";
import { emptyProgress, parseProgress } from "./progress";
import {
  countViableAnswers,
  readinessForCount,
  scoreAssessment,
  scorePersona,
  scoreReadiness,
  scoreStickingPoint,
  VIABLE_ANSWERS,
} from "./score";
import { CHOICES, type Choice } from "./types";

const fill = (letter: Choice, count: number) => Array.from({ length: count }, () => letter);

test("each unanimous persona maps to its letter", () => {
  for (const letter of CHOICES) {
    const persona = scorePersona(fill(letter, 7));
    assert.equal(persona.letter, letter);
    assert.equal(persona.name, PERSONA_BY_LETTER[letter].name);
  }
});

test("a unique highest count wins even when question 7 differs", () => {
  const persona = scorePersona(["A", "A", "A", "B", "B", "C", "D"]);
  assert.equal(persona.name, "The Curious");
});

test("the documented three-way tie uses question 7", () => {
  const persona = scorePersona(["A", "A", "B", "C", "C", "D", "B"]);
  assert.equal(persona.name, "The Compromiser");
});

test("a 3–3 tie uses question 7 when that letter is tied", () => {
  const persona = scorePersona(["A", "A", "A", "B", "B", "D", "B"]);
  assert.equal(persona.name, "The Compromiser");
});

test("when question 7 is outside the tie, the latest tied answer wins", () => {
  const persona = scorePersona(["A", "B", "C", "A", "B", "C", "D"]);
  assert.equal(persona.name, "The Autopilot");
});

test("a 3–3 tie outside question 7 uses the latest tied answer", () => {
  const persona = scorePersona(["A", "A", "A", "B", "B", "B", "D"]);
  assert.equal(persona.name, "The Compromiser");
});

test("every persona combination follows the majority and tie rules", () => {
  const total = 4 ** 7;
  for (let mask = 0; mask < total; mask += 1) {
    const answers = Array.from({ length: 7 }, (_, index) => {
      return CHOICES[Math.floor(mask / 4 ** index) % 4];
    });
    const counts: Record<Choice, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const answer of answers) counts[answer] += 1;
    const highest = Math.max(...CHOICES.map((letter) => counts[letter]));
    const tied = CHOICES.filter((letter) => counts[letter] === highest);
    const winner = scorePersona(answers).letter;

    assert.equal(counts[winner], highest);

    if (tied.length === 1) {
      assert.equal(winner, tied[0]);
    } else if (tied.includes(answers[6])) {
      assert.equal(winner, answers[6]);
    } else {
      const fallback = [...answers].slice(0, 6).reverse().find((letter) => tied.includes(letter));
      assert.equal(winner, fallback);
    }
  }
});

test("question 8 maps to its own sticking point and nothing else", () => {
  for (const letter of CHOICES) {
    assert.equal(scoreStickingPoint(letter), STICKING_POINTS[letter]);
  }
});

test("readiness buckets are 4, 2–3, and 0–1", () => {
  assert.equal(readinessForCount(4), "ready");
  assert.equal(readinessForCount(3), "close");
  assert.equal(readinessForCount(2), "close");
  assert.equal(readinessForCount(1), "not-yet");
  assert.equal(readinessForCount(0), "not-yet");
  assert.throws(() => readinessForCount(5));
});

test("every readiness combination counts only the viable answers", () => {
  const questionNumbers = [9, 10, 11, 12] as const;
  const total = 4 ** 4;
  for (let mask = 0; mask < total; mask += 1) {
    const answers = Array.from({ length: 4 }, (_, index) => {
      return CHOICES[Math.floor(mask / 4 ** index) % 4];
    });
    const expected = answers.filter((answer, index) => {
      return VIABLE_ANSWERS[questionNumbers[index]].includes(answer);
    }).length;
    assert.equal(countViableAnswers(answers), expected);
    assert.equal(scoreReadiness(answers).id, readinessForCount(expected));
  }
});

test("the three result systems stay independent", () => {
  const base: Choice[] = [...fill("A", 7), "B", "A", "B", "C", "C"];
  const changedPersona: Choice[] = [...fill("D", 7), "B", "A", "B", "C", "C"];
  const changedSticking: Choice[] = [...fill("A", 7), "D", "A", "B", "C", "C"];
  const changedReadiness: Choice[] = [...fill("A", 7), "B", "B", "C", "B", "D"];

  const first = scoreAssessment(base);
  const personaOnly = scoreAssessment(changedPersona);
  const stickingOnly = scoreAssessment(changedSticking);
  const readinessOnly = scoreAssessment(changedReadiness);

  assert.equal(first.persona.name, "The Curious");
  assert.equal(first.stickingPoint.letter, "B");
  assert.equal(first.readiness.id, "ready");
  assert.equal(first.viableCount, 4);

  assert.equal(personaOnly.persona.name, "The Stranger");
  assert.equal(personaOnly.stickingPoint.letter, first.stickingPoint.letter);
  assert.equal(personaOnly.readiness.id, first.readiness.id);

  assert.equal(stickingOnly.persona.name, first.persona.name);
  assert.equal(stickingOnly.stickingPoint.letter, "D");
  assert.equal(stickingOnly.readiness.id, first.readiness.id);

  assert.equal(readinessOnly.persona.name, first.persona.name);
  assert.equal(readinessOnly.stickingPoint.letter, first.stickingPoint.letter);
  assert.equal(readinessOnly.readiness.id, "not-yet");
  assert.equal(readinessOnly.viableCount, 0);
});

test("result copy and calls to action stay attached to the readiness bucket", () => {
  assert.deepEqual(
    READINESS.ready.ctas.map((cta) => cta.label),
    ["Book Your Vibe Check"],
  );
  assert.deepEqual(
    READINESS.close.ctas.map((cta) => cta.label),
    ["Explore free resources", "Book Your Vibe Check"],
  );
  assert.deepEqual(
    READINESS["not-yet"].ctas.map((cta) => cta.label),
    ["Explore free resources"],
  );
});

test("scoring rejects a partial answer set", () => {
  assert.throws(() => scorePersona(["A", "B"]));
  assert.throws(() => scoreReadiness(["A"]));
  assert.throws(() => scoreAssessment(fill("A", 11)));
});

test("saved progress restores, and a finished result with a gap steps back", () => {
  assert.equal(parseProgress(null), null);
  assert.equal(parseProgress({ version: 0, step: 3, answers: emptyProgress().answers }), null);

  const answers = emptyProgress().answers.map((answer, index) => (index < 4 ? "C" : answer));
  const restored = parseProgress({ version: 1, step: 4, answers });
  assert.deepEqual(restored, { step: 4, answers });

  const incomplete = parseProgress({
    version: 1,
    step: QUESTIONS.length,
    answers,
  });
  assert.equal(incomplete?.step, 4);
});
