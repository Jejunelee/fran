"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "../actions";
import { clusterByGroup, collectFields, groupFields, type EditableField } from "@/lib/content/fields";
import { getPath, setPath } from "@/lib/content/merge";
import { PAGE_LABELS, PAGE_PREVIEWS, type PageKey, type SiteContent } from "@/lib/content/types";
import { contrastOn } from "@/lib/content/style";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { SectionPreview } from "./SectionPreview";

export function SectionEditor({
  page,
  section,
  sectionLabel,
  initial,
}: {
  page: PageKey;
  section: string;
  sectionLabel: string;
  initial: SiteContent;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(initial);
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"text" | "media" | "styles">("text");
  const [query, setQuery] = useState("");

  const sectionData = getPath(draft, `${page}.${section}`);
  const grouped = useMemo(
    () => groupFields(collectFields(sectionData, `${page}.${section}`)),
    [sectionData, page, section],
  );

  function update(path: string, value: string) {
    setDraft((current) => {
      const next = setPath(current, path, value) as SiteContent;
      draftRef.current = next;
      return next;
    });
  }

  async function persist(next: SiteContent, message = "Saved. Refresh the live page to see it.") {
    setSaving(true);
    setStatus(null);
    const result = await saveSiteContent(next);
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return false;
    }
    setStatus(message);
    router.refresh();
    return true;
  }

  async function onSave() {
    await persist(draftRef.current);
  }

  async function onMediaChange(path: string, value: string) {
    const next = setPath(draftRef.current, path, value) as SiteContent;
    draftRef.current = next;
    setDraft(next);
    await persist(next, "Image saved and published.");
  }

  const q = query.trim().toLowerCase();
  const source =
    tab === "text" ? grouped.texts : tab === "media" ? grouped.media : grouped.styles;
  const fields = q
    ? source.filter(
        (field) =>
          field.label.toLowerCase().includes(q) ||
          field.group.toLowerCase().includes(q) ||
          String(getPath(draft, field.path) ?? "").toLowerCase().includes(q),
      )
    : source;
  const clusters = clusterByGroup(fields);

  const styles = (getPath(draft, `${page}.${section}.styles`) ?? {}) as {
    headingColor?: string;
    bodyColor?: string;
    scriptColor?: string;
    accentColor?: string;
  };

  return (
    <div className="pb-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-josefin text-[11px] uppercase tracking-[0.16em] text-[#750000]/50">
            <Link href="/admin" className="hover:text-[#750000]">
              Pages
            </Link>
            <span className="mx-2">/</span>
            {PAGE_LABELS[page]}
          </p>
          <h1 className="mt-1 font-serif text-4xl font-light tracking-[-0.03em] text-[#5B0706]">
            {sectionLabel}
          </h1>
        </div>
        <a
          href={PAGE_PREVIEWS[page]}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#750000]/20 bg-white px-4 py-2 font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000] hover:border-[#750000]/40"
        >
          Open live page
        </a>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-[#750000]/10 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#750000]/10 px-5 py-3">
          <div>
            <p className="font-josefin text-[10px] uppercase tracking-[0.14em] text-[#750000]/40">
              How this section looks
            </p>
            <p className="font-josefin text-sm text-[#5a0a0a]/70">
              Updates as you edit. Save to publish to the live site.
            </p>
          </div>
        </div>
        <SectionPreview page={page} section={section} content={draft} />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-full bg-white p-1 shadow-sm">
          {(
            [
              ["text", "Text", grouped.texts.length],
              ["media", "Images", grouped.media.length],
              ["styles", "Colors", grouped.styles.length],
            ] as const
          ).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 font-josefin text-sm ${
                tab === id
                  ? "bg-[#5B0706] text-[#f7f3ee]"
                  : "text-[#750000]/60 hover:text-[#750000]"
              }`}
            >
              {label}
              <span className={`ml-2 text-[11px] ${tab === id ? "text-[#f7f3ee]/70" : "text-[#750000]/35"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search this section…"
          className="w-full rounded-full border border-[#750000]/15 bg-white px-4 py-2.5 font-josefin text-sm sm:max-w-xs"
        />
      </div>

      {tab === "styles" && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#750000]/10 bg-white shadow-sm">
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="p-6" style={{ background: "#F8F2E7" }}>
              <p className="font-josefin text-[10px] uppercase tracking-[0.14em] text-[#750000]/40">
                Preview
              </p>
              <p
                className="mt-3 font-serif text-3xl font-light tracking-[-0.03em]"
                style={{ color: styles.headingColor || "#750000" }}
              >
                Heading
              </p>
              <p
                className="mt-1 font-script text-4xl leading-none"
                style={{ color: styles.scriptColor || "#750000" }}
              >
                script
              </p>
              <p
                className="mt-4 max-w-sm font-josefin text-sm leading-relaxed"
                style={{ color: styles.bodyColor || "#5a0a0a" }}
              >
                Body copy uses this color. Pink buttons use Accent with auto-contrast type.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="inline-block rounded-sm px-4 py-2 font-josefin text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{
                    background: styles.accentColor || "#F5B7C4",
                    color: contrastOn(styles.accentColor || "#F5B7C4"),
                  }}
                >
                  Accent button
                </span>
                <span className="inline-block rounded-sm bg-[#5B0706] px-4 py-2 font-josefin text-xs font-semibold uppercase tracking-[0.08em] text-[#F7F1E7]">
                  Dark button
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="font-josefin text-sm leading-relaxed text-[#5a0a0a]/70">
                Colors apply to this section only. Layout and spacing stay as designed.
              </p>
            </div>
          </div>
        </div>
      )}

      {fields.length === 0 && (
        <p className="rounded-2xl bg-white px-5 py-10 text-center font-josefin text-sm text-[#5a0a0a]/60">
          Nothing in this tab for this section.
        </p>
      )}

      <div className="space-y-5">
        {clusters.map(([group, groupFieldsList]) => (
          <section key={group} className="overflow-hidden rounded-2xl border border-[#750000]/10 bg-white shadow-sm">
            {group !== "This section" && (
              <div className="border-b border-[#750000]/10 bg-[#F8F2E7]/60 px-5 py-3">
                <h2 className="font-serif text-xl font-light text-[#5B0706]">{group}</h2>
              </div>
            )}
            <div
              className={`p-5 ${
                tab === "media"
                  ? "grid gap-5 sm:grid-cols-2"
                  : tab === "styles"
                    ? "grid gap-4 sm:grid-cols-2"
                    : "grid gap-5"
              }`}
            >
              {groupFieldsList.map((field) => (
                <FieldControl
                  key={field.path}
                  field={field}
                  value={String(getPath(draft, field.path) ?? "")}
                  onChange={(value) => update(field.path, value)}
                  onUpload={(value) => onMediaChange(field.path, value)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#750000]/10 bg-[#F8F2E7]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 lg:pl-64">
          <p className="min-w-0 truncate font-josefin text-sm text-[#5a0a0a]/70">
            {status ?? "Text and colors wait for Save. Image uploads publish immediately."}
          </p>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="shrink-0 rounded-full bg-[#5B0706] px-6 py-2.5 font-josefin text-sm font-semibold uppercase tracking-[0.08em] text-[#f7f3ee] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
  onUpload,
}: {
  field: EditableField;
  value: string;
  onChange: (value: string) => void;
  onUpload: (value: string) => void;
}) {
  if (field.type === "color") {
    const hex = /^#/.test(value) ? value : "#750000";
    return (
      <label className="flex items-center gap-4 rounded-xl border border-[#750000]/10 bg-[#F8F2E7]/50 p-3">
        <input
          type="color"
          value={hex}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-14 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <span className="min-w-0 flex-1">
          <span className="block font-josefin text-sm text-[#5B0706]">{field.label}</span>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="mt-1 w-full border-0 bg-transparent p-0 font-josefin text-xs tracking-[0.04em] text-[#5a0a0a]/60 outline-none"
          />
        </span>
      </label>
    );
  }

  if (field.type === "image" || field.type === "video") {
    return (
      <MediaField
        label={field.label}
        value={value}
        accept={field.type === "video" ? "video/mp4,video/*" : "image/jpeg,image/png,image/webp,image/gif,image/heic,.heic,.jpg,.jpeg,.png,.webp"}
        onChange={onChange}
        onUpload={onUpload}
      />
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[#750000]/12 bg-[#F8F2E7]/40 px-3 py-2.5 font-josefin text-sm text-[#5a0a0a] outline-none transition focus:border-[#750000]/35 focus:bg-white";

  return (
    <label className="block">
      <span className="mb-1.5 block font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">
        {field.label}
      </span>
      {field.type === "textarea" ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className={inputClass} />
      ) : (
        <input type="text" value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      )}
    </label>
  );
}

function MediaField({
  label,
  value,
  accept,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  accept: string;
  onChange: (value: string) => void;
  onUpload: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isImage =
    accept.startsWith("image") ||
    /\.(png|jpe?g|webp|gif|svg|heic|avif)(\?|$)/i.test(value) ||
    /supabase\.co\/storage/i.test(value);

  async function onFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const prepared = await prepareMediaFile(file, accept.startsWith("video"));
      const supabase = createBrowserSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Sign in again, then upload.");
      }
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${prepared.ext}`;
      const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, prepared.blob, {
        upsert: false,
        contentType: prepared.contentType,
        cacheControl: "3600",
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
      onUpload(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#750000]/10 bg-[#F8F2E7]/40">
      <div className="flex h-40 items-center justify-center bg-[#efe8d8]">
        {value && isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-contain p-3" />
        ) : value ? (
          <p className="px-3 text-center font-josefin text-xs text-[#750000]/50">{value}</p>
        ) : (
          <p className="font-josefin text-xs uppercase tracking-[0.12em] text-[#750000]/35">No file</p>
        )}
      </div>
      <div className="space-y-2 p-3">
        <p className="font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">{label}</p>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-[#750000]/12 bg-white px-3 py-2 font-josefin text-xs text-[#5a0a0a]"
        />
        <label className="inline-flex cursor-pointer rounded-full bg-[#5B0706] px-4 py-1.5 font-josefin text-[11px] uppercase tracking-[0.1em] text-[#f7f3ee]">
          {uploading ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void onFile(file);
            }}
          />
        </label>
        <p className="font-josefin text-[11px] leading-snug text-[#750000]/45">
          JPG, PNG, or WebP. Uploads publish as soon as they finish.
        </p>
        {error && <p className="font-josefin text-xs text-[#750000]">{error}</p>}
      </div>
    </div>
  );
}

async function prepareMediaFile(file: File, isVideo: boolean) {
  const rawExt = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  if (isVideo) {
    if (file.size > 80 * 1024 * 1024) {
      throw new Error("Videos need to be under 80MB.");
    }
    return { blob: file, ext: rawExt === "mov" ? "mp4" : rawExt, contentType: file.type || "video/mp4" };
  }

  if (file.size > 25 * 1024 * 1024) {
    throw new Error("Images need to be under 25MB.");
  }

  const type = file.type || "";
  const keepOriginal =
    ["image/png", "image/webp", "image/gif", "image/svg+xml"].includes(type) &&
    file.size <= 8 * 1024 * 1024;
  if (keepOriginal) {
    return { blob: file, ext: rawExt, contentType: type };
  }

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    throw new Error("Use a JPG, PNG, or WebP. iPhone HEIC photos need to be exported as JPEG.");
  }

  const maxEdge = 2400;
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { blob: file, ext: rawExt, contentType: file.type || "image/jpeg" };
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Could not process that image."))),
      "image/jpeg",
      0.88,
    );
  });

  return { blob, ext: "jpg", contentType: "image/jpeg" };
}
