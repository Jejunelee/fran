"use client";

import { useState } from "react";
import { Button, Card, Input } from "@/components/ui/forms";
import { useAppStore } from "@/components/providers/app-provider";
import { classifyIntent, intentLabel } from "@/lib/intent/classify";
import { generateQuestions } from "@/lib/keyword/generate";
import { createId, nowIso } from "@/lib/id";

export function QuestionsWorkspace() {
  const { project, setProject } = useAppStore();
  const [question, setQuestion] = useState("");
  if (!project) return <p>Create a research project first.</p>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Questions</h1>
        <p className="text-sm text-slate-600">Questions are generated with templates and classified with deterministic intent rules.</p>
      </div>
      <Card className="flex flex-wrap gap-2">
        <Input className="max-w-lg" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Add a question" />
        <Button
          onClick={() => {
            if (question.trim().length < 4) return;
            setProject({
              ...project,
              questions: [
                {
                  id: createId(),
                  projectId: project.id,
                  question: question.trim(),
                  intents: classifyIntent(question),
                  source: "user",
                  createdAt: nowIso(),
                },
                ...project.questions,
              ],
            });
            setQuestion("");
          }}
        >
          Add question
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const generated = generateQuestions(project.topic, project.city).map((item) => ({
              id: createId(),
              projectId: project.id,
              question: item.question,
              intents: item.intents,
              source: "question" as const,
              createdAt: nowIso(),
            }));
            const existing = new Set(project.questions.map((item) => item.question));
            setProject({
              ...project,
              questions: [...project.questions, ...generated.filter((item) => !existing.has(item.question))],
            });
          }}
        >
          Generate more questions
        </Button>
      </Card>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Question</th>
              <th className="p-3">Intent</th>
              <th className="p-3">Source</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {project.questions.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="p-3">{item.question}</td>
                <td className="p-3">{intentLabel(item.intents)}</td>
                <td className="p-3">{item.source}</td>
                <td className="p-3">
                  <button
                    className="text-red-600"
                    onClick={() =>
                      setProject({ ...project, questions: project.questions.filter((row) => row.id !== item.id) })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
