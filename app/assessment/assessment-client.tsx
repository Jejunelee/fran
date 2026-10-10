"use client";

import dynamic from "next/dynamic";

const AssessmentFlow = dynamic(
  () => import("./assessment-flow").then((mod) => mod.AssessmentFlow),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[70vh] pt-[calc(5.5rem+env(safe-area-inset-top))]" aria-busy="true">
        <p className="sr-only">Loading your assessment.</p>
      </div>
    ),
  },
);

export function AssessmentClient() {
  return <AssessmentFlow />;
}
