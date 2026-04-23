"use client";
import { cn } from "@/lib/utils";

interface PixelStarProps {
  filled: boolean;
  onClick: () => void;
  size?: number;
  className?: string;
}

// 5-pointed pixelated star on a 16×16 grid
const STAR_PIXELS = [
  // top point
  [7, 0], [8, 0],
  [7, 1], [8, 1],
  [7, 2], [8, 2],
  // upper arms spread
  [6, 3], [7, 3], [8, 3], [9, 3],
  [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
  // left arm + center + right arm
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
  // narrowing center
  [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
  [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
  // lower V spread
  [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
  [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
  // bottom legs
  [2, 11], [3, 11], [4, 11], [5, 11], [10, 11], [11, 11], [12, 11], [13, 11],
  [1, 12], [2, 12], [3, 12], [4, 12], [11, 12], [12, 12], [13, 12], [14, 12],
  [1, 13], [2, 13], [3, 13], [12, 13], [13, 13], [14, 13],
  [0, 14], [1, 14], [2, 14], [13, 14], [14, 14], [15, 14],
  [0, 15], [1, 15], [14, 15], [15, 15],
];

export function PixelStar({ filled, onClick, size = 16, className }: PixelStarProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn("group shrink-0 cursor-pointer flex items-center justify-center w-7 h-7 hover:bg-white/[0.08] transition-colors", className)}
      aria-label={filled ? "Remove from saved" : "Add to saved"}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STAR_PIXELS.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            className={filled ? "" : "fill-[var(--keshizumi)] group-hover:fill-[var(--yamabuki)] transition-colors"}
            fill={filled ? "var(--yamabuki)" : undefined}
          />
        ))}
      </svg>
    </button>
  );
}
