"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "../actions";
import { PAGE_LABELS, PAGE_PREVIEWS, SECTION_LABELS, type PageKey } from "@/lib/content/types";

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[#F3EEE4] text-[#5a0a0a]">
      <header className="sticky top-0 z-30 border-b border-[#5B0706]/20 bg-[#5B0706] text-[#f7f3ee]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href={isLogin ? "/admin/login" : "/admin"}
            className="font-serif text-lg tracking-[-0.02em] sm:text-xl"
          >
            Francesca <span className="font-josefin text-[11px] uppercase tracking-[0.16em] opacity-70">Admin</span>
          </Link>
          {!isLogin && (
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden font-josefin text-[11px] uppercase tracking-[0.14em] text-[#f7f3ee]/75 sm:inline hover:text-white"
              >
                View site
              </a>
              <form action={signOutAdmin}>
                <button
                  type="submit"
                  className="font-josefin text-[11px] uppercase tracking-[0.14em] text-[#f7f3ee]/80 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {isLogin ? (
        <div className="mx-auto max-w-md px-5 py-16">{children}</div>
      ) : (
        <div className="mx-auto flex max-w-[1400px] gap-0 lg:gap-8">
          <AdminNav pathname={pathname ?? "/admin"} />
          <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:pr-8">{children}</div>
        </div>
      )}
    </div>
  );
}

function AdminNav({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-[53px] hidden h-[calc(100vh-53px)] w-64 shrink-0 overflow-y-auto border-r border-[#750000]/10 bg-[#F8F2E7] px-3 py-6 lg:block">
      <Link
        href="/admin"
        className={`mb-4 block rounded-md px-3 py-2 font-josefin text-sm ${
          pathname === "/admin"
            ? "bg-[#5B0706] text-[#f7f3ee]"
            : "text-[#5a0a0a]/80 hover:bg-white"
        }`}
      >
        All pages
      </Link>
      {(Object.keys(PAGE_LABELS) as PageKey[]).map((page) => (
        <div key={page} className="mb-5">
          <div className="flex items-center justify-between px-3 pb-1">
            <p className="font-josefin text-[10px] uppercase tracking-[0.16em] text-[#750000]/55">
              {PAGE_LABELS[page]}
            </p>
            <a
              href={PAGE_PREVIEWS[page]}
              target="_blank"
              rel="noreferrer"
              className="font-josefin text-[10px] uppercase tracking-[0.08em] text-[#750000]/40 hover:text-[#750000]"
            >
              Live
            </a>
          </div>
          <div className="flex flex-col">
            {Object.entries(SECTION_LABELS[page]).map(([section, label]) => {
              const href = `/admin/${page}/${section}`;
              const active = pathname === href;
              return (
                <Link
                  key={section}
                  href={href}
                  className={`rounded-md px-3 py-1.5 font-josefin text-[13px] leading-snug ${
                    active
                      ? "bg-white text-[#5B0706] shadow-sm"
                      : "text-[#5a0a0a]/75 hover:bg-white/70"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
