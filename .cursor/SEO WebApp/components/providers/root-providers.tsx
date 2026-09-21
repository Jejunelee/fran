"use client";

import type { ReactNode } from "react";
import { AppProvider } from "@/components/providers/app-provider";

export function RootProviders({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
