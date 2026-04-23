"use client";
import { useEffect, useRef, useState } from "react";
import { categoryConfig, type Location } from "@/data/locations";
import { PixelStar } from "./pixel-star";
import { OpenInMaps } from "./open-in-maps";

interface LocationCardProps {
  location: Location;
  starred: boolean;
  onToggleStar: () => void;
  onClose: () => void;
}

export function LocationCard({ location, starred, onToggleStar, onClose }: LocationCardProps) {
  const cat = categoryConfig[location.cat];
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* card */}
      <div
        ref={panelRef}
        className="pointer-events-auto absolute bottom-5 left-5 right-5 mx-auto max-w-[760px] border border-[var(--keshizumi)] bg-[var(--sumi)]"
        style={{
          boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 200ms ease-out, transform 200ms ease-out",
        }}
      >
        <div className="px-4 pt-5 pb-10 sm:pb-20">
          {/* header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-4 shrink-0" style={{ backgroundColor: cat.color }} />
                {location.icon && <span className="text-[16px]">{location.icon}</span>}
                <h3
                  className="text-[16px] font-medium text-[var(--shironeri)] truncate"
                  style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
                >
                  {location.name}
                </h3>
                {location.jp && (
                  <span className="text-[13px] text-[var(--sunezumi)] font-mono">{location.jp}</span>
                )}
              </div>
              <p className="text-[12px] text-[var(--sunezumi)] mt-0.5 ml-1.5">{location.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              <PixelStar filled={starred} onClick={onToggleStar} size={16} />
              <button
                onClick={dismiss}
                className="flex items-center justify-center w-7 h-7 text-[18px] text-[var(--sunezumi)] hover:text-[var(--shironeri)] hover:bg-white/[0.08] cursor-pointer transition-colors leading-none"
                style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
              >
                X
              </button>
            </div>
          </div>

          {/* body */}
          <p className="text-[14px] text-white leading-relaxed mb-3">{location.desc}</p>

          {/* meta */}
          {(location.budget || location.time || location.tip) && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-mono text-[var(--sunezumi)] mb-3" style={{ fontVariantNumeric: "tabular-nums" }}>
              {location.budget && <span>¥ {location.budget}</span>}
              {location.time && <span>⏱ {location.time}</span>}
              {location.tip && <span className="text-[var(--yamabuki)]">★ {location.tip}</span>}
            </div>
          )}

          {/* bottom row: badge + map link */}
          <div className="flex items-center justify-between">
            <div>
              {location.tag && (
                <span className="text-[11px] font-mono text-[var(--sunezumi)] border border-[var(--keshizumi)] px-1.5 py-0.5">
                  {location.tag === "neighborhood" ? "Neighborhood" : location.tag === "daytrip" ? "Day trip" : location.tag}
                </span>
              )}
            </div>
            <OpenInMaps lat={location.lat} lng={location.lng} name={location.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
