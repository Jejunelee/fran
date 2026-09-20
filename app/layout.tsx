import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalFooter } from "@/app/components/ConditionalFooter";
import { SiteContentProvider } from "@/lib/content/context";
import { getSiteContent } from "@/lib/content/get-site-content";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerif = localFont({
  src: [
    {
      path: "../fonts/NotoSerif/NotoSerifDisplay.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NotoSerif/NotoSerifDisplay-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-noto-serif",
});

const parfumerie = localFont({
  src: "../fonts/Parfumerie/ParfumerieScriptRegular.otf",
  variable: "--font-parfumerie",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Francesca Atendido",
  description:
    "Coaching for people ready to build a life that actually fits.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} ${notoSerif.variable} ${parfumerie.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-screen w-full min-w-0 flex flex-col">
        <SiteContentProvider value={content}>
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
          <ConditionalFooter />
        </SiteContentProvider>
      </body>
    </html>
  );
}