import assert from "node:assert/strict";
import test from "node:test";
import { draftFromBuilt, compileDraft, normalizeDraft } from "./builder";
import { buildAssessment, defaultAssessmentContent } from "./cms";
import { QUESTIONS } from "./content";
import { scoreDefined } from "./score";
import type { SiteContent } from "../content/types";

function siteWith(assessment: SiteContent["assessment"]): SiteContent {
  return { home: {}, about: {}, work: {}, contact: {}, assessment };
}

test("the saved builder replaces the fixed 12-question quiz", () => {
  const draft = draftFromBuilt(buildAssessment(siteWith(defaultAssessmentContent)));
  draft.parts = draft.parts.map((part) =>
    part.id === "persona"
      ? {
          ...part,
          questions: [
            {
              id: "only",
              prompt: "A custom prompt",
              choices: [
                { key: "Yes", text: "Yes answer", viable: false },
                { key: "No", text: "No answer", viable: false },
              ],
            },
          ],
        }
      : { ...part, questions: [] },
  );
  draft.tieBreakQuestionId = "only";
  draft.personas = [
    { key: "Yes", name: "Yes result", corePattern: "Yes core", strengths: "", weaknesses: "", watch: "", growth: "" },
    { key: "No", name: "No result", corePattern: "", strengths: "", weaknesses: "", watch: "", growth: "" },
  ];

  const built = buildAssessment(siteWith({ builder: draft as unknown as SiteContent["assessment"] }));
  assert.equal(built.questions.length, 1);
  assert.equal(built.questions[0]?.prompt, "A custom prompt");
  assert.deepEqual(
    built.questions[0]?.choices.map((choice) => choice.letter),
    ["Yes", "No"],
  );
  assert.equal(built.personaByLetter.Yes?.name, "Yes result");
});

test("a rebuilt quiz scores its own viable answers and bands", () => {
  const draft = normalizeDraft({
    parts: [
      {
        id: "persona",
        label: "Who",
        questions: [
          { id: "p1", prompt: "One", choices: [{ key: "A", text: "A" }, { key: "B", text: "B" }] },
          { id: "p2", prompt: "Two", choices: [{ key: "A", text: "A" }, { key: "B", text: "B" }] },
        ],
      },
      { id: "sticking", label: "Stuck", questions: [] },
      {
        id: "readiness",
        label: "Now",
        questions: [
          {
            id: "r1",
            prompt: "Ready?",
            choices: [
              { key: "A", text: "Yes", viable: true },
              { key: "B", text: "No", viable: false },
            ],
          },
        ],
      },
    ],
    tieBreakQuestionId: "p2",
    bands: [{ id: "go", min: 1, max: 1, headline: "Go", body: "Go now", ctas: [{ label: "Book", href: "/contact" }] }],
    personas: [{ key: "B", name: "Bee", corePattern: "Pattern", strengths: "", weaknesses: "", watch: "", growth: "" }],
  });
  assert.ok(draft);
  const built = compileDraft(draft);

  const score = scoreDefined({
    answers: ["B", "B", "A"],
    questions: built.questions.map((question) => ({
      part: question.part,
      choices: question.choices.map((choice) => ({ key: choice.letter, viable: choice.viable })),
    })),
    tieBreakPersonaIndex: built.tieBreakPersonaIndex,
    bands: built.bands,
  });

  assert.equal(score.personaKey, "B");
  assert.equal(score.stickingKey, null);
  assert.equal(score.viableCount, 1);
  assert.equal(score.readinessId, "go");
  assert.equal(built.readinessById.go?.ctas[0]?.href, "/contact");
});

test("the default quiz still round-trips through the builder", () => {
  const built = buildAssessment(siteWith(defaultAssessmentContent));
  const again = compileDraft(draftFromBuilt(built));
  assert.deepEqual(
    again.questions.map((question) => question.prompt),
    QUESTIONS.map((question) => question.prompt),
  );
  assert.equal(again.questions[8]?.choices.find((choice) => choice.letter === "A")?.viable, true);
  assert.equal(again.questions[8]?.choices.find((choice) => choice.letter === "B")?.viable, false);
  assert.equal(again.tieBreakPersonaIndex, 6);
  assert.equal(again.personaByLetter.A?.name, built.personaByLetter.A?.name);
  assert.equal(
    again.personaByLetter.A?.sections[0]?.paragraphs.join("\n\n"),
    built.personaByLetter.A?.sections[0]?.paragraphs.join("\n\n"),
  );
  assert.equal(again.stickingByLetter.A?.body, built.stickingByLetter.A?.body);
  assert.equal(again.readinessById.ready?.headline, built.readinessById.ready?.headline);
});
