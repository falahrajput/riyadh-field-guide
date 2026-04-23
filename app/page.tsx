"use client";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

export default function Home() {
  const { count, mounted } = useStarred();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0C0C0C]">
      {/* Video — fullscreen background */}
      <video
        src="/flag.mp4"
        poster="/flag-poster.png"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* vertical watermark */}
      <div
        className="fixed left-4 top-4 z-10 pointer-events-none hidden md:block"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
          fontSize: "56px",
          color: "var(--shironeri)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        日本のフィールドガイド
      </div>
      {/* vertical watermark — right */}
      <div
        className="fixed right-4 bottom-4 z-10 pointer-events-none hidden md:block"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
          fontSize: "56px",
          color: "var(--shironeri)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        東京2026年2月
      </div>

      {/* Spacer to push content down */}
      <div className="flex-1" />

      {/* Content — titles + buttons */}
      <div className="relative z-10 mb-[120px] px-4">
        <div className="text-center space-y-2">
          <h1 className="font-mono text-lg tracking-tight text-[var(--shironeri)]">
            日本のフィールドガイド
          </h1>
          <p className="text-sm tracking-tight text-white/80" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
            Japan Field Guide
          </p>
          <p className="font-mono text-[12px] text-[var(--sunezumi)] tracking-wider uppercase" style={{ paddingBottom: 40 }}>
            Tokyo · Feb 12–20, 2026
          </p>
        </div>

        {/* navigation */}
        <nav className="mt-6 flex flex-row gap-2 w-full md:w-auto md:gap-6 md:px-0 md:justify-center">
          <Link
            href="/map"
            className="flex-1 md:flex-none md:w-[136px] flex items-center justify-between border border-white/80 px-3 py-3 md:px-4 hover:border-white hover:bg-white/[0.05] transition-colors group"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Map
            </span>
            <span className="font-mono text-[12px] text-white/50">→</span>
          </Link>
          <Link
            href="/planning"
            className="flex-1 md:flex-none md:w-[136px] flex items-center justify-between border border-white/80 px-3 py-3 md:px-4 hover:border-white hover:bg-white/[0.05] transition-colors group"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Planning
            </span>
            <span className="font-mono text-[12px] text-white/50">→</span>
          </Link>
          <Link
            href="/saved"
            className="flex-1 md:flex-none md:w-[136px] flex items-center justify-between border border-white/80 px-3 py-3 md:px-4 hover:border-white hover:bg-white/[0.05] transition-colors group"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Saved
            </span>
            <span className="font-mono text-[12px] text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>
              {mounted ? count : 0} →
            </span>
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto px-4 py-4 text-center">
        <p className="font-mono text-[12px] text-[var(--keshizumi)]">
          Built by{" "}
          <a
            href="https://willl.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sunezumi)] no-underline hover:text-[var(--shironeri)] transition-colors"
          >
            Will Lenzen
          </a>
          {" "}&middot; {new Date().getFullYear()} &middot;{" "}
          <a
            href="https://github.com/willlenzen/japan-field-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--sunezumi)] no-underline hover:text-[var(--shironeri)] transition-colors"
          >
            <svg className="w-[12px] h-[12px] fill-current inline-block" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
            Clone
          </a>
        </p>
      </footer>
    </div>
  );
}
