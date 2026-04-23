"use client";
import { getMapsUrl } from "@/lib/platform";

interface OpenInMapsProps {
  lat: number;
  lng: number;
  name: string;
}

export function OpenInMaps({ lat, lng, name }: OpenInMapsProps) {
  return (
    <a
      href={getMapsUrl(lat, lng, name)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 h-7 px-3 text-[14px] text-[var(--ginnezumi)] hover:text-[var(--shironeri)] hover:bg-white/[0.08] transition-colors"
      style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
    >
      Map
      <span className="text-[14px] leading-none">↗</span>
    </a>
  );
}
