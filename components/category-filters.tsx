"use client";
import { useState } from "react";
import { categoryConfig, type Category, type FilterType } from "@/data/locations";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

const jpPrefix: Record<Category, string> = {
  base: "\u57fa",
  culture: "\u6587",
  food: "\u98df",
  shopping: "\u8cb7",
};

const filters: { key: FilterType; label: string; color?: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(categoryConfig).map(([key, val]) => ({
    key: key as Category,
    label: `${jpPrefix[key as Category]} ${val.label}`,
  })),
  { key: "daytrip", label: "\u65e5\u5e30\u308a", color: categoryConfig.culture.color },
  { key: "neighborhood", label: "\u8fd1\u6240", color: categoryConfig.shopping.color },
];

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  const [hovered, setHovered] = useState<FilterType | null>(null);

  return (
    <div className="sticky top-[calc(48px+35vh)] sm:top-[calc(48px+364px)] z-30 bg-[var(--ro)] flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-2 border-b border-[var(--keshizumi)]/50">
      {filters.map(({ key, label, color }) => {
        const isActive = active === key;
        const isSpecial = key === "daytrip" || key === "neighborhood";
        const catColor =
          key === "all"
            ? "var(--shironeri)"
            : isSpecial
              ? color!
              : categoryConfig[key].color;
        const isHovered = hovered === key && !isActive;
        const hoverBorder =
          key !== "all" && isHovered
            ? isSpecial
              ? color!
              : categoryConfig[key].color
            : undefined;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "shrink-0 text-[14px] px-2.5 py-1 border transition-colors cursor-pointer",
              isActive
                ? "border-current text-[var(--shironeri)]"
                : "border-[var(--keshizumi)] text-[var(--sunezumi)] hover:text-white"
            )}
            style={{
              fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
              ...(isActive
                ? { color: catColor, borderColor: catColor }
                : hoverBorder
                  ? { borderColor: hoverBorder }
                  : {}),
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
