import Link from "next/link";
import { getSiteContent } from "@/lib/content/get-site-content";
import { sectionVisual } from "@/lib/content/fields";
import { PAGE_LABELS, PAGE_PREVIEWS, SECTION_LABELS, type PageKey } from "@/lib/content/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminHomePage() {
  const configured = isSupabaseConfigured();
  const content = await getSiteContent();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-5xl font-light tracking-[-0.03em] text-[#5B0706]">
          Choose a page
        </h1>
        <p className="mt-3 max-w-xl font-josefin text-base leading-relaxed text-[#5a0a0a]/70">
          Pick a section, then edit its words, pictures, or colors. The layout stays the same.
        </p>
      </div>

      {!configured && (
        <div className="rounded-2xl border border-[#750000]/15 bg-white p-5 font-josefin text-sm text-[#5a0a0a]">
          Supabase is not connected yet. Add the project keys to <code>.env.local</code> and restart.
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {(Object.keys(PAGE_LABELS) as PageKey[]).map((page) => (
          <section key={page} className="overflow-hidden rounded-2xl border border-[#750000]/10 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#750000]/10 bg-[#F8F2E7]/70 px-5 py-4">
              <h2 className="font-serif text-2xl font-light text-[#5B0706]">{PAGE_LABELS[page]}</h2>
              <a
                href={PAGE_PREVIEWS[page]}
                target="_blank"
                rel="noreferrer"
                className="font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/50 hover:text-[#750000]"
              >
                Live page
              </a>
            </div>
            <div className="divide-y divide-[#750000]/10">
              {Object.entries(SECTION_LABELS[page]).map(([section, label]) => {
                const visual = sectionVisual(content[page][section]);
                return (
                  <Link
                    key={section}
                    href={`/admin/${page}/${section}`}
                    className="flex items-center gap-4 px-5 py-3 transition hover:bg-[#F8F2E7]/80"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#efe8d8]">
                      {visual.media && !visual.isVideo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={visual.media} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div
                          className="flex h-full w-full items-end p-2"
                          style={{ background: visual.accentColor || "#F5B7C4" }}
                        >
                          <span
                            className="line-clamp-2 font-serif text-[11px] leading-tight"
                            style={{ color: visual.headingColor || "#5B0706" }}
                          >
                            {visual.isVideo ? "Video" : visual.title || label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-josefin text-sm text-[#5a0a0a]">{label}</p>
                      {visual.title && visual.title !== label && (
                        <p className="truncate font-serif text-sm text-[#5B0706]/70">{visual.title}</p>
                      )}
                    </div>
                    <span className="text-[#750000]/30">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
