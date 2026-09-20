"use client";

import type { CSSProperties } from "react";
import Image, { type ImageProps } from "next/image";
import { isRemoteMedia, mediaUrl } from "./media";

type Props = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export function CmsImage({
  src,
  alt = "",
  className,
  fill,
  width,
  height,
  style,
  sizes,
  priority,
  quality,
}: Props) {
  const resolved = mediaUrl(typeof src === "string" ? src : "");
  if (!resolved) return null;

  if (isRemoteMedia(resolved)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={className}
        sizes={sizes}
        style={
          fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: (style?.objectFit as CSSProperties["objectFit"]) || "cover",
                ...style,
              }
            : style
        }
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      className={className}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={style}
      sizes={sizes}
      priority={priority}
      quality={quality}
    />
  );
}
