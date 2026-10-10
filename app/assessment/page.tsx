import type { Metadata } from "next";
import Navigation from "@/app/components/Navigation";
import { AssessmentClient } from "./assessment-client";

export const metadata: Metadata = {
  title: "Self-assessment · Francesca Atendido",
  description:
    "Twelve questions. They show which of four patterns you’re most stuck in, what gets in the way, and where the work starts.",
};

export default function AssessmentPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F3EE] text-[#5B0706]">
      <Navigation placement="top" />
      <AssessmentClient />
    </div>
  );
}
