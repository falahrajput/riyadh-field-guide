"use client";
import { cn } from "@/lib/utils";

interface PixelCheckProps {
  filled: boolean;
  onClick: () => void;
  size?: number;
  className?: string;
}

// Pixelated checkmark on a 14×12 grid, centered in 16×16 viewBox
const CHECK_PIXELS = [
  [13, 2], [14, 2],
  [12, 3], [13, 3],
  [11, 4], [12, 4],
  [10, 5], [11, 5],
  [9, 6], [10, 6],
  [2, 7], [3, 7], [8, 7], [9, 7],
  [3, 8], [4, 8], [7, 8], [8, 8],
  [4, 9], [5, 9], [6, 9], [7, 9],
  [5, 10], [6, 10],
];

export function PixelCheck({ filled, onClick, size = 14, className }: PixelCheckProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn("group shrink-0 cursor-pointer flex items-center justify-center w-7 h-7 hover:bg-white/[0.08] transition-colors", className)}
      aria-label={filled ? "Mark as not visited" : "Mark as visited"}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {CHECK_PIXELS.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            className={filled ? "" : "fill-[var(--keshizumi)] group-hover:fill-[var(--shironeri)] transition-colors"}
            fill={filled ? "var(--shironeri)" : undefined}
          />
        ))}
      </svg>
    </button>
  );
}
