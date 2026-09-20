const IMAGE_KEYS = new Set([
  "video",
  "image",
  "background",
  "artwork",
  "cat",
  "book",
  "photo",
  "frame",
  "icon",
  "accentImage",
]);

export type EditableField = {
  path: string;
  label: string;
  type: "text" | "textarea" | "color" | "image" | "video";
  group: string;
};

const KEY_LABELS: Record<string, string> = {
  headingColor: "Heading",
  bodyColor: "Body",
  scriptColor: "Script",
  accentColor: "Accent (pink buttons)",
  investmentBoxBg: "Investment box background",
  investmentBoxText: "Investment box text",
  ctaPrimary: "Primary button",
  ctaSecondary: "Secondary button",
  ctaPrimaryHref: "Primary button link",
  ctaSecondaryHref: "Secondary button link",
  desktopLines: "Desktop line breaks",
  comingHome: "Side label",
  artworkAlt: "Artwork description",
  imageAlt: "Image description",
  accentImage: "Accent image",
  background: "Background image",
  artwork: "Artwork",
  book: "Book image",
  photo: "Photo",
  cat: "Cat image",
  frame: "Frame image",
  icon: "Icon",
  image: "Image",
  headingMid: "Heading line 2",
  headingScript: "Script word",
};

const FRAME_LABELS: Record<string, string[]> = {
  "about.whereIAm.images": [
    "Top right frame",
    "Bottom left frame",
    "Top left frame",
    "Bottom right frame",
  ],
};

function labelFromKey(key: string) {
  if (KEY_LABELS[key]) return KEY_LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

function groupFromPath(path: string): string {
  const match = path.match(
    /\.(items|insights|paragraphs|steps|bullets|images)\.(\d+)/,
  );
  if (match) {
    const kind =
      match[1] === "bullets"
        ? "Bullet"
        : match[1] === "steps"
          ? "Step"
          : match[1] === "insights"
            ? "Insight"
            : match[1] === "paragraphs"
              ? "Paragraph"
              : match[1] === "images"
                ? "Frames"
                : "Item";
    return `${kind} ${Number(match[2]) + 1}`;
  }
  if (
    path.includes(".styles.") ||
    path.endsWith("Color") ||
    path.endsWith("BoxBg") ||
    path.endsWith("BoxText") ||
    path.endsWith("panelColor")
  ) {
    return "Colors";
  }
  return "This section";
}

export function collectFields(value: unknown, path = ""): EditableField[] {
  if (value === null || value === undefined) return [];

  if (typeof value === "string") {
    const parts = path.split(".");
    const last = parts.pop() ?? path;
    const parent = parts.at(-1) ?? "";
    const group = groupFromPath(path);
    const parentPath = parts.join(".");
    const frameLabels = FRAME_LABELS[parentPath];
    const label = frameLabels?.[Number(last)]
      ? frameLabels[Number(last)]
      : last.match(/^\d+$/)
        ? "Image"
        : labelFromKey(last);
    if (
      last.endsWith("Color") ||
      last === "investmentBoxBg" ||
      last === "investmentBoxText" ||
      last === "panelColor"
    ) {
      return [{ path, label, type: "color", group }];
    }
    if (last === "video" || /\.mp4(\?|$)/i.test(value)) {
      return [{ path, label: last === "video" ? "Video" : label, type: "video", group }];
    }
    const looksLikeImage =
      IMAGE_KEYS.has(last) ||
      parent === "images" ||
      /site-assets|supabase\.co\/storage/i.test(value) ||
      /\.(png|jpe?g|webp|gif|svg|heic|avif)(\?|$)/i.test(value);
    if (looksLikeImage) {
      return [{ path, label, type: "image", group }];
    }
    const type = value.length > 70 || value.includes("\n") ? "textarea" : "text";
    return [{ path, label, type, group }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectFields(item, `${path}.${index}`));
  }

  if (typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      return collectFields(child, nextPath);
    });
  }

  return [];
}

export function groupFields(fields: EditableField[]) {
  const texts: EditableField[] = [];
  const media: EditableField[] = [];
  const styles: EditableField[] = [];

  for (const field of fields) {
    if (field.type === "color" || field.path.includes(".styles.")) {
      styles.push(field);
    } else if (field.type === "image" || field.type === "video") {
      media.push(field);
    } else {
      texts.push(field);
    }
  }

  return { texts, media, styles };
}

export function clusterByGroup(fields: EditableField[]) {
  const map = new Map<string, EditableField[]>();
  for (const field of fields) {
    const list = map.get(field.group) ?? [];
    list.push(field);
    map.set(field.group, list);
  }
  return [...map.entries()];
}

const MEDIA_KEYS = [
  "background",
  "image",
  "photo",
  "artwork",
  "book",
  "video",
  "frame",
  "cat",
  "accentImage",
];
const TITLE_KEYS = [
  "heading",
  "line1",
  "line1a",
  "greeting",
  "headingLine1",
  "headingBefore1",
  "name",
];

export function sectionVisual(section: unknown): {
  media?: string;
  isVideo?: boolean;
  title?: string;
  headingColor?: string;
  accentColor?: string;
} {
  if (!section || typeof section !== "object") return {};
  const data = section as Record<string, unknown>;
  const styles = (data.styles ?? {}) as { headingColor?: string; accentColor?: string };
  let media: string | undefined;
  let isVideo = false;
  for (const key of MEDIA_KEYS) {
    const value = data[key];
    if (typeof value === "string" && value) {
      media = value;
      isVideo = key === "video" || value.endsWith(".mp4");
      break;
    }
  }
  let title: string | undefined;
  for (const key of TITLE_KEYS) {
    const value = data[key];
    if (typeof value === "string" && value) {
      title = value;
      break;
    }
  }
  return {
    media,
    isVideo,
    title,
    headingColor: styles.headingColor,
    accentColor: styles.accentColor,
  };
}
