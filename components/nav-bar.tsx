"use client";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

interface NavBarProps {
  current?: "/" | "/map" | "/planning" | "/saved";
}

export function NavBar({ current }: NavBarProps) {
  const { count, mounted } = useStarred();
  const geistPixel = { fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" };
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--keshizumi)] bg-[var(--ro)] px-4 py-3 font-mono text-[14px]">
      <Link href="/" className="block" aria-label="Home">
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="24" fill="#FCFAF2" />
          <circle cx="18" cy="12" r="7.2" fill="#CB1B45" />
        </svg>
      </Link>
      <div className="flex items-center gap-6 md:gap-10">
        <Link
          href="/map"
          className={`${current === "/map" ? "text-white" : "text-[var(--ginnezumi)]"} hover:text-white transition-colors`}
          style={geistPixel}
        >
          Map
        </Link>
        <Link
          href="/planning"
          className={`${current === "/planning" ? "text-white" : "text-[var(--ginnezumi)]"} hover:text-white transition-colors`}
          style={geistPixel}
        >
          Planning
        </Link>
        <Link
          href="/saved"
          className={`${current === "/saved" ? "text-white" : "text-[var(--ginnezumi)]"} hover:text-white transition-colors`}
          style={geistPixel}
        >
          Saved{mounted ? <span style={{ fontVariantNumeric: "tabular-nums" }}> ({count})</span> : ""}
        </Link>
        <a
          href="https://github.com/willlenzen/japan-field-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[var(--ginnezumi)] hover:text-white transition-colors"
          style={geistPixel}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Clone
        </a>
      </div>
    </nav>
  );
}
