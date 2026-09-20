export function mediaUrl(src?: string | null): string {
  if (!src) return "";
  const trimmed = src.trim();
  if (!trimmed) return "";
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export function isRemoteMedia(src?: string | null): boolean {
  return /^(https?:|data:|blob:)/i.test(src?.trim() ?? "");
}
