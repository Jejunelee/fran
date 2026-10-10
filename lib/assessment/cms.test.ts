import assert from "node:assert/strict";
import test from "node:test";
import { buildAssessment, defaultAssessmentContent } from "./cms";
import {
  PERSONA_BY_LETTER,
  QUESTIONS,
  READINESS,
  STICKING_POINTS,
} from "./content";
import type { SiteContent } from "../content/types";

function siteWith(assessment: SiteContent["assessment"]): SiteContent {
  return {
    home: {},
    about: {},
    work: {},
    contact: {},
    assessment,
  };
}

test("default assessment content round-trips into the quiz", () => {
  const built = buildAssessment(siteWith(defaultAssessmentContent));

  assert.deepEqual(
    built.questions.map((question) => question.prompt),
    QUESTIONS.map((question) => question.prompt),
  );
  assert.deepEqual(
    built.questions.map((question) => question.choices.map((choice) => choice.text)),
    QUESTIONS.map((question) => question.choices.map((choice) => choice.text)),
  );
  assert.equal(built.questions[0]?.partLabel, "Part 1");
  assert.equal(built.questions[7]?.partLabel, "What gets in the way");
  assert.equal(built.questions[8]?.partLabel, "Where you are now");

  for (const letter of ["A", "B", "C", "D"] as const) {
    assert.equal(built.personaByLetter[letter].name, PERSONA_BY_LETTER[letter].name);
    assert.deepEqual(
      built.personaByLetter[letter].sections.map((section) => section.paragraphs.join("\n\n")),
      PERSONA_BY_LETTER[letter].sections.map((section) => section.paragraphs.join("\n\n")),
    );
    assert.equal(built.stickingByLetter[letter].title, STICKING_POINTS[letter].title);
    assert.equal(built.stickingByLetter[letter].body, STICKING_POINTS[letter].body);
  }

  for (const id of ["ready", "close", "not-yet"] as const) {
    assert.equal(built.readinessById[id].headline, READINESS[id].headline);
    assert.equal(built.readinessById[id].body, READINESS[id].body);
    assert.deepEqual(
      built.readinessById[id].ctas.map((cta) => [cta.label, cta.href]),
      READINESS[id].ctas.map((cta) => [cta.label, cta.href]),
    );
  }
});

test("edited assessment copy replaces the default wording and keeps letter order", () => {
  const assessment = structuredClone(defaultAssessmentContent);
  assessment.personaQuestions.questions[0].prompt = "Edited prompt";
  assessment.personaQuestions.questions[0].a = "Edited answer A";

  const built = buildAssessment(siteWith(assessment));
  assert.equal(built.questions[0]?.prompt, "Edited prompt");
  assert.equal(built.questions[0]?.choices[0]?.letter, "A");
  assert.equal(built.questions[0]?.choices[0]?.text, "Edited answer A");
  assert.equal(built.questions[0]?.choices[1]?.letter, "B");
  assert.equal(built.questions[1]?.prompt, QUESTIONS[1]?.prompt);
});

test("a question list of the wrong length falls back to the source copy", () => {
  const assessment = structuredClone(defaultAssessmentContent);
  assessment.personaQuestions.questions = [];
  const built = buildAssessment(siteWith(assessment));
  assert.equal(built.questions[0]?.prompt, QUESTIONS[0]?.prompt);
  assert.equal(built.questions.length, 12);
});
