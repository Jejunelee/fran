"use client";

import { usePathname } from "next/navigation";
import { Footer as SiteFooter } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <SiteFooter />;
}
