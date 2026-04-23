"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/nav-bar";
import { CategoryFilters } from "@/components/category-filters";
import { LocationList } from "@/components/location-list";
import { LocationCard } from "@/components/location-card";
import { useStarred } from "@/lib/use-starred";
import { useChecked } from "@/lib/use-checked";
import type { Location, FilterType } from "@/data/locations";
import { SiteFooter } from "@/components/site-footer";

const MapContainer = dynamic(() => import("@/components/map-container"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[35vh] sm:h-[364px] border-b border-[var(--keshizumi)] bg-[var(--ro)] flex items-center justify-center">
      <span className="font-mono text-[12px] text-[var(--keshizumi)]">loading map…</span>
    </div>
  ),
});

export default function MapPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selected, setSelected] = useState<Location | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { toggle, isStarred } = useStarred();
  const { toggle: toggleCheck, isChecked } = useChecked();

  const handleSelect = useCallback((loc: Location) => {
    setSelected(loc);
  }, []);

  const handleDeselect = useCallback(() => {
    setSelected(null);
  }, []);

  const handleFilterChange = useCallback((f: FilterType) => {
    setFilter(f);
    setSelected(null);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--ro)]">
      <NavBar current="/map" />
      <MapContainer
        filter={filter}
        selectedId={selected?.id ?? null}
        hoveredId={hoveredId}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
      />
      <div className="max-w-[800px] mx-auto w-full flex flex-col flex-1" onClick={handleDeselect}>
        <CategoryFilters active={filter} onChange={handleFilterChange} />
        <LocationList
          filter={filter}
          selectedId={selected?.id ?? null}
          onHover={setHoveredId}
          onSelect={handleSelect}
          isStarred={isStarred}
          onToggleStar={toggle}
          isChecked={isChecked}
          onToggleCheck={toggleCheck}
        />
      </div>
      <SiteFooter />
      {selected && (
        <LocationCard
          location={selected}
          starred={isStarred(selected.id)}
          onToggleStar={() => toggle(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
