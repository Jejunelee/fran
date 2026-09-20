"use client";

import React from "react";
import { cmsStyleVars, mediaUrl, useSection } from "@/lib/content/context";
import type { SectionStyles } from "@/lib/content/types";

export default function Quote() {
  const c = useSection<{
    styles: SectionStyles;
    image: string;
    imageAlt: string;
  }>("home", "quote");

  return (
    <div className="quote-container cms-section" style={cmsStyleVars(c.styles)}>
      <img src={mediaUrl(c.image)} alt={c.imageAlt} className="quote-image" />
    </div>
  );
}
