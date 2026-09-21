import { NextResponse } from "next/server";
import { GoogleSuggestProvider } from "@/lib/providers/suggestions";

const buckets = new Map<string, { count: number; reset: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || now > current.reset) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 20;
}

export async function GET(request: Request) {
  if (process.env.SUGGESTIONS_PROVIDER_ENABLED === "false") {
    return NextResponse.json({
      suggestions: [],
      status: "unavailable",
      source: "Disabled",
      error: "Suggestion provider is disabled.",
    });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json(
      { suggestions: [], status: "unavailable", source: "Google Suggest", error: "Rate limit reached. Try again shortly." },
      { status: 429 },
    );
  }
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  if (q.length < 2 || q.length > 120) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }
  const provider = new GoogleSuggestProvider();
  const result = await provider.getSuggestions(q);
  return NextResponse.json(result);
}
