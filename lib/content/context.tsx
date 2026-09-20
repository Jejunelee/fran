"use client";

import React, { createContext, useContext } from "react";
import { defaultSiteContent } from "./defaults";
import { getPath } from "./merge";
import type { PageKey, SiteContent } from "./types";

export { cmsBg, cmsStyleVars } from "./style";
export { mediaUrl } from "./media";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function useSection<T = Record<string, unknown>>(page: PageKey, section: string): T {
  const site = useSiteContent();
  return (getPath(site, `${page}.${section}`) ?? {}) as T;
}
