"use client";
import { locations, categoryConfig, type Location, type Category, type FilterType } from "@/data/locations";
import { LocationRow } from "./location-row";

interface LocationListProps {
  filter: FilterType;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (loc: Location) => void;
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
  isChecked: (id: string) => boolean;
  onToggleCheck: (id: string) => void;
}

export function LocationList({ filter, selectedId, onHover, onSelect, isStarred, onToggleStar, isChecked, onToggleCheck }: LocationListProps) {
  const filtered =
    filter === "all"
      ? locations
      : filter === "daytrip"
        ? locations.filter((l) => l.tag === "daytrip")
        : filter === "neighborhood"
          ? locations.filter((l) => l.tag === "neighborhood")
          : locations.filter((l) => l.cat === filter);

  // group by category
  const grouped = filtered.reduce<Record<string, Location[]>>((acc, loc) => {
    const key = loc.cat;
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  const catOrder: Category[] = ["base", "culture", "food", "shopping"];

  // Custom section titles for special filters
  const filterTitle: Record<string, { label: string; color: string }> = {
    daytrip: { label: "\u65e5\u5e30\u308a Day Trip", color: categoryConfig.culture.color },
    neighborhood: { label: "\u8fd1\u6240 Neighborhoods", color: categoryConfig.shopping.color },
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {catOrder.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        const cfg = categoryConfig[cat];
        const override = filterTitle[filter];
        const sectionLabel = override ? override.label : cfg.label;
        const sectionColor = override ? override.color : cfg.color;
        // Sort: unchecked first, checked last (preserve original order within each group)
        const sorted = [...items].sort((a, b) => {
          const ac = isChecked(a.id) ? 1 : 0;
          const bc = isChecked(b.id) ? 1 : 0;
          return ac - bc;
        });
        return (
          <div key={cat}>
            <div className="bg-[var(--ro)] border-b border-[var(--keshizumi)]/50 px-4" style={{ paddingTop: 20, paddingBottom: 12 }}>
              <span className="font-mono text-[12px] uppercase tracking-wider" style={{ color: sectionColor }}>
                {sectionLabel}
              </span>
              <span className="font-mono text-[12px] text-[var(--keshizumi)] ml-2" style={{ fontVariantNumeric: "tabular-nums" }}>{items.length}</span>
            </div>
            {sorted.map((loc) => (
              <LocationRow
                key={loc.id}
                location={loc}
                starred={isStarred(loc.id)}
                onToggleStar={() => onToggleStar(loc.id)}
                checked={isChecked(loc.id)}
                onToggleCheck={() => onToggleCheck(loc.id)}
                onSelect={() => onSelect(loc)}
                selected={selectedId === loc.id}
                onMouseEnter={() => onHover(loc.id)}
                onMouseLeave={() => onHover(null)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
