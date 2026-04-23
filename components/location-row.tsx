"use client";
import { categoryConfig, type Location } from "@/data/locations";
import { PixelCheck } from "./pixel-check";
import { PixelStar } from "./pixel-star";

interface LocationRowProps {
  location: Location;
  starred: boolean;
  onToggleStar: () => void;
  checked: boolean;
  onToggleCheck: () => void;
  onSelect: () => void;
  selected?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function LocationRow({ location, starred, onToggleStar, checked, onToggleCheck, onSelect, selected, onMouseEnter, onMouseLeave }: LocationRowProps) {
  const cat = categoryConfig[location.cat];
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-full text-left flex items-center gap-3 px-4 border-b border-[var(--keshizumi)]/50 transition-all duration-300 ease-in-out cursor-pointer ${
        selected ? "bg-[var(--sumi)]" : "hover:bg-[var(--sumi)]/60"
      }`}
      style={{ opacity: checked ? 0.2 : 1, paddingTop: 16, paddingBottom: 16 }}
    >
      <div
        className="w-0.5 shrink-0 self-stretch"
        style={{ backgroundColor: cat.color }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4">
          {location.icon && <span className="text-[14px]">{location.icon}</span>}
          <span
            className="text-[14px] font-medium text-[var(--shironeri)] truncate"
            style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
          >
            {location.name}
          </span>
          {location.jp && (
            <span className="text-[12px] text-[var(--sunezumi)] font-mono">{location.jp}</span>
          )}
          {location.tag && (
            <span className="text-[11px] font-mono text-[var(--sunezumi)] border border-[var(--keshizumi)] px-1">
              {location.tag}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[var(--sunezumi)] mt-0.5 truncate">{location.sub}</p>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <PixelStar
          filled={starred}
          onClick={onToggleStar}
          size={14}
        />
        <PixelCheck
          filled={checked}
          onClick={onToggleCheck}
          size={14}
        />
      </div>
    </button>
  );
}
