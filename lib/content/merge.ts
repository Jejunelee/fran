import type { ContentValue } from "./types";

export function deepMerge<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base)) {
    return (Array.isArray(overlay) ? overlay : base) as T;
  }
  if (isPlainObject(base) && isPlainObject(overlay)) {
    const out: Record<string, unknown> = { ...(base as object) };
    for (const [key, value] of Object.entries(overlay)) {
      out[key] = key in (base as object)
        ? deepMerge((base as Record<string, unknown>)[key], value)
        : value;
    }
    return out as T;
  }
  return overlay as T;
}

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function setPath(obj: ContentValue, path: string, value: ContentValue): ContentValue {
  const keys = path.split(".");
  const [head, ...rest] = keys;

  if (Array.isArray(obj)) {
    const index = Number(head);
    if (!Number.isInteger(index) || index < 0) return obj;
    const copy = [...obj];
    if (rest.length === 0) {
      copy[index] = value;
    } else {
      copy[index] = setPath((copy[index] ?? {}) as ContentValue, rest.join("."), value);
    }
    return copy;
  }

  if (rest.length === 0) {
    if (isPlainObject(obj)) return { ...obj, [head]: value };
    return value;
  }

  const current = isPlainObject(obj)
    ? ((obj as Record<string, ContentValue>)[head] ?? {})
    : {};
  return {
    ...(isPlainObject(obj) ? obj : {}),
    [head]: setPath(current as ContentValue, rest.join("."), value),
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
