import { notFound } from "next/navigation";
import { AssessmentBuilder } from "../../components/assessment-builder";
import { getSiteContent } from "@/lib/content/get-site-content";
import { PAGE_LABELS, SECTION_LABELS, type PageKey } from "@/lib/content/types";
import { SectionEditor } from "../../components/SectionEditor";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const { page, section } = await params;
  if (!(page in PAGE_LABELS)) notFound();
  const pageKey = page as PageKey;
  const label = SECTION_LABELS[pageKey][section];
  if (!label) notFound();

  const content = await getSiteContent();

  if (pageKey === "assessment") {
    return <AssessmentBuilder initial={content} />;
  }

  return (
    <SectionEditor
      page={pageKey}
      section={section}
      sectionLabel={label}
      initial={content}
    />
  );
}
