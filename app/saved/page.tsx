"use client";
import { useState, useCallback } from "react";
import { NavBar } from "@/components/nav-bar";
import { LocationCard } from "@/components/location-card";
import { LocationRow } from "@/components/location-row";
import { useStarred } from "@/lib/use-starred";
import { useChecked } from "@/lib/use-checked";
import { locations, categoryConfig, type Location, type Category } from "@/data/locations";
import { SiteFooter } from "@/components/site-footer";

export default function SavedPage() {
  const { starred, toggle, isStarred, shareUrl, count, mounted } = useStarred();
  const { toggle: toggleCheck, isChecked } = useChecked();
  const [selected, setSelected] = useState<Location | null>(null);
  const [copied, setCopied] = useState(false);

  const savedLocations = locations.filter((l) => starred.has(l.id));

  const handleSelect = useCallback((loc: Location) => {
    setSelected((prev) => (prev?.id === loc.id ? null : loc));
  }, []);

  const handleShare = useCallback(() => {
    shareUrl();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  // Group by category
  const grouped = savedLocations.reduce<Record<string, Location[]>>((acc, loc) => {
    if (!acc[loc.cat]) acc[loc.cat] = [];
    acc[loc.cat].push(loc);
    return acc;
  }, {});
  const catOrder: Category[] = ["base", "culture", "food", "shopping"];

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--ro)]">
      <NavBar current="/saved" />
      <div className="max-w-[800px] mx-auto w-full flex flex-col flex-1">
      <div className="px-4 py-4 border-b border-[var(--keshizumi)] flex items-center justify-between">
        <div>
          <h1 className="font-mono text-sm text-[var(--shironeri)]">Saved</h1>
          <p className="font-mono text-[12px] text-[var(--sunezumi)] mt-0.5">
            {mounted ? count : 0} locations
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={handleShare}
            className="font-mono text-[12px] border border-[var(--keshizumi)] px-3 py-1.5 text-[var(--ginnezumi)] hover:text-[var(--shironeri)] hover:border-[var(--sunezumi)] transition-colors cursor-pointer"
          >
            {copied ? "copied ✓" : "share link"}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!mounted ? (
          <div className="flex items-center justify-center py-16">
            <span className="font-mono text-[12px] text-[var(--keshizumi)]">loading…</span>
          </div>
        ) : savedLocations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="font-mono text-[14px] text-[var(--sunezumi)]">No saved locations yet</p>
            <p className="font-mono text-[12px] text-[var(--keshizumi)] mt-2">
              Star locations from the map to save them here
            </p>
          </div>
        ) : (
          catOrder.map((cat) => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            const cfg = categoryConfig[cat];
            return (
              <div key={cat}>
                <div className="sticky top-0 z-10 bg-[var(--ro)] border-b border-[var(--keshizumi)]/50 px-4 py-1.5">
                  <span
                    className="font-mono text-[12px] uppercase tracking-wider"
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  <span className="font-mono text-[12px] text-[var(--keshizumi)] ml-2">
                    {items.length}
                  </span>
                </div>
                {items.map((loc) => (
                  <LocationRow
                    key={loc.id}
                    location={loc}
                    starred={isStarred(loc.id)}
                    onToggleStar={() => toggle(loc.id)}
                    checked={isChecked(loc.id)}
                    onToggleCheck={() => toggleCheck(loc.id)}
                    onSelect={() => handleSelect(loc)}
                    selected={selected?.id === loc.id}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>
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
