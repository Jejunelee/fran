const sample = "Agyfj";
const pangram = "The life you built";

function Box({
  label,
  treated,
  children,
}: {
  label: string;
  treated: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0 rounded-lg border border-[#5B0706]/15 bg-white p-5">
      <p className="font-josefin text-[11px] uppercase tracking-[0.16em] text-[#5B0706]/70 mb-4">
        {label}
      </p>
      <div
        className="bg-[#fdd1db]/25"
        style={{ outline: "1px dashed #c45c5c" }}
      >
        {children}
      </div>
      <p className="font-josefin text-[12px] leading-relaxed text-[#5B0706]/60 mt-3">
        {treated
          ? "font-script → overflow visible, line-height 0.5, text-box trim-both. Pink is the layout box; curves may paint outside it."
          : "Raw Parfumerie only (no font-script). Default metrics keep unused space above and below, so the pink box is taller."}
      </p>
    </div>
  );
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#F8F3EE] text-[#5B0706] px-5 py-10 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-josefin text-[11px] uppercase tracking-[0.2em] mb-2">
          /testpage
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-3">
          Parfumerie layout box
        </h1>
        <p className="font-josefin text-[15px] leading-relaxed max-w-2xl mb-10">
          Pink + dashed outline is the CSS layout box, not the ink. The change
          is that{" "}
          <span className="font-script text-[1.6em] leading-none">
            Parfumerie
          </span>{" "}
          no longer reserves extra space above and below its curves.
        </p>

        <section className="mb-12">
          <h2 className="font-josefin text-sm uppercase tracking-[0.14em] mb-4">
            1. Same glyphs, raw vs treated
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Box label="Before — font family only" treated={false}>
              <p
                className="text-[72px] sm:text-[96px] text-[#750000] m-0"
                style={{ fontFamily: "var(--font-parfumerie)" }}
              >
                {sample}
              </p>
            </Box>
            <Box label="After — .font-script" treated={true}>
              <p className="font-script text-[72px] sm:text-[96px] text-[#750000] m-0">
                {sample}
              </p>
            </Box>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-josefin text-sm uppercase tracking-[0.14em] mb-4">
            2. Mixed with serif (the actual problem)
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Box label="Before — script inflates the line" treated={false}>
              <p className="font-serif text-[42px] sm:text-[52px] leading-[0.85] text-[#750000] m-0">
                <span
                  className="inline-block text-[1.9em]"
                  style={{ fontFamily: "var(--font-parfumerie)" }}
                >
                  A
                </span>
                t some point
              </p>
            </Box>
            <Box label="After — script overlaps, line stays" treated={true}>
              <p className="font-serif text-[42px] sm:text-[52px] leading-[0.85] text-[#750000] m-0">
                <span className="font-script inline-block text-[1.9em]">A</span>
                t some point
              </p>
            </Box>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-josefin text-sm uppercase tracking-[0.14em] mb-4">
            3. Stacked lines — extra gap vs overlap
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Box label="Before — gap between lines" treated={false}>
              <div className="font-serif text-[36px] sm:text-[44px] leading-[0.85] text-[#750000]">
                <p className="m-0">
                  <span
                    className="inline-block text-[1.9em]"
                    style={{ fontFamily: "var(--font-parfumerie)" }}
                  >
                    y
                  </span>
                  ou built
                </p>
                <p className="m-0">{pangram}</p>
              </div>
            </Box>
            <Box label="After — curves sit into the next line" treated={true}>
              <div className="font-serif text-[36px] sm:text-[44px] leading-[0.85] text-[#750000]">
                <p className="m-0">
                  <span className="font-script inline-block text-[1.9em]">
                    y
                  </span>
                  ou built
                </p>
                <p className="m-0">{pangram}</p>
              </div>
            </Box>
          </div>
        </section>

        <p className="font-josefin text-[13px] text-[#5B0706]/50">
          Temporary page. Not linked from the site nav.
        </p>
      </div>
    </main>
  );
}
