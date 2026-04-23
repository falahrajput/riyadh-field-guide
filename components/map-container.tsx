"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, categoryConfig, type Location, type Category, type FilterType } from "@/data/locations";

interface MapContainerProps {
  filter: FilterType;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (loc: Location) => void;
  onDeselect: () => void;
}

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
const CENTER: L.LatLngExpression = [35.6762, 139.6503];

function markerIcon(cat: Category, selected: boolean, pulse: boolean): L.DivIcon {
  const size = selected ? 12 : 8;
  const css = categoryConfig[cat].css;
  const pulseHtml = pulse
    ? `<div class="radar-pulse" style="--pulse-color:${css}"></div><div class="radar-pulse" style="--pulse-color:${css};animation-delay:1s"></div>`
    : "";
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="width:${size}px;height:${size}px;background:${css};border:1px solid ${css};position:relative;z-index:2;${selected ? `box-shadow:0 0 6px ${css}` : ""}"></div>
      ${pulseHtml}
    </div>`,
  });
}

export default function MapContainer({ filter, selectedId, hoveredId, onSelect, onDeselect }: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const boundariesRef = useRef<Map<string, L.Polygon>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const prevHoveredRef = useRef<string | null>(null);
  const prevFilterRef = useRef<FilterType | null>(null);
  const onDeselectRef = useRef(onDeselect);
  onDeselectRef.current = onDeselect;

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom: 12,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 18 }).addTo(map);
    mapRef.current = map;

    // Click on map background deselects
    map.on("click", () => {
      onDeselectRef.current();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Manage markers and boundaries
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const filtered =
      filter === "all"
        ? locations
        : filter === "daytrip"
          ? locations.filter((l) => l.tag === "daytrip")
          : filter === "neighborhood"
            ? locations.filter((l) => l.tag === "neighborhood")
            : locations.filter((l) => l.cat === filter);

    const filteredIds = new Set(filtered.map((l) => l.id));

    // Remove markers not in current filter
    markersRef.current.forEach((marker, id) => {
      if (!filteredIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Remove boundaries not in current filter
    boundariesRef.current.forEach((poly, id) => {
      if (!filteredIds.has(id)) {
        poly.remove();
        boundariesRef.current.delete(id);
      }
    });

    // Add or update markers / boundaries
    filtered.forEach((loc) => {
      const isSelected = loc.id === selectedId;

      // Neighborhood locations use boundaries, not pins
      if (loc.boundary) {
        const existingMarker = markersRef.current.get(loc.id);
        if (existingMarker) {
          existingMarker.remove();
          markersRef.current.delete(loc.id);
        }

        const existingBoundary = boundariesRef.current.get(loc.id);
        const css = categoryConfig[loc.cat].css;

        if (existingBoundary) {
          existingBoundary.setStyle({
            color: css,
            weight: isSelected ? 3 : 2,
            opacity: isSelected ? 0.9 : 0.6,
            fillOpacity: isSelected ? 0.12 : 0.06,
          });
        } else {
          const latlngs = loc.boundary.map(([lat, lng]) => [lat, lng] as L.LatLngTuple);
          const poly = L.polygon(latlngs, {
            color: css,
            weight: 2,
            opacity: 0.6,
            fillColor: css,
            fillOpacity: 0.06,
            dashArray: "6 4",
          }).addTo(map);
          poly.bindTooltip(loc.name, {
            className: "pixel-tooltip",
            direction: "center",
          });
          poly.on("click", () => onSelect(loc));
          boundariesRef.current.set(loc.id, poly);
        }

        // Zoom to fit selected boundary
        if (isSelected) {
          const latlngs = loc.boundary.map(([lat, lng]) => [lat, lng] as L.LatLngTuple);
          map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40], animate: true, duration: 0.3 });
        }
        return;
      }

      // Regular pin locations
      const existing = markersRef.current.get(loc.id);
      const icon = markerIcon(loc.cat, isSelected, isSelected);

      if (existing) {
        existing.setIcon(icon);
        existing.setZIndexOffset(isSelected ? 1000 : 0);
      } else {
        const marker = L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindTooltip(loc.name, {
            className: "pixel-tooltip",
            direction: "top",
            offset: [0, -6],
          });
        marker.on("click", () => onSelect(loc));
        if (isSelected) marker.setZIndexOffset(1000);
        markersRef.current.set(loc.id, marker);
      }
    });

    // Fit bounds on initial load and when filter changes (not when selecting a location)
    const filterChanged = prevFilterRef.current !== filter;
    prevFilterRef.current = filter;

    if (filterChanged && !selectedId && filtered.length > 0) {
      const points: L.LatLngTuple[] = [];
      filtered.forEach((loc) => {
        if (loc.boundary) {
          loc.boundary.forEach(([lat, lng]) => points.push([lat, lng]));
        } else {
          points.push([loc.lat, loc.lng]);
        }
      });
      if (points.length > 0) {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40], animate: true, duration: 0.3 });
      }
    }
  }, [filter, selectedId, onSelect]);

  // Hover pulse — targeted O(1) update
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const prevId = prevHoveredRef.current;
    const currId = hoveredId;
    prevHoveredRef.current = currId;

    // Clean up previous hover
    if (prevId && prevId !== currId) {
      // Check if it's a boundary location
      const prevBoundary = boundariesRef.current.get(prevId);
      if (prevBoundary) {
        const prevLoc = locations.find((l) => l.id === prevId);
        if (prevLoc) {
          const css = categoryConfig[prevLoc.cat].css;
          const isSelected = prevId === selectedId;
          prevBoundary.setStyle({
            weight: isSelected ? 3 : 2,
            opacity: isSelected ? 0.9 : 0.6,
            fillOpacity: isSelected ? 0.12 : 0.06,
          });
        }
      }
      // Check if it's a marker location
      const prevMarker = markersRef.current.get(prevId);
      if (prevMarker) {
        const prevLoc = locations.find((l) => l.id === prevId);
        if (prevLoc) {
          const isSelected = prevId === selectedId;
          prevMarker.setIcon(markerIcon(prevLoc.cat, isSelected, isSelected));
          if (!isSelected) prevMarker.setZIndexOffset(0);
        }
      }
    }

    // Apply hover to current
    if (currId) {
      const currBoundary = boundariesRef.current.get(currId);
      if (currBoundary) {
        currBoundary.setStyle({
          weight: 3,
          opacity: 0.9,
          fillOpacity: 0.15,
        });
      }
      const currMarker = markersRef.current.get(currId);
      if (currMarker) {
        const currLoc = locations.find((l) => l.id === currId);
        if (currLoc) {
          currMarker.setIcon(markerIcon(currLoc.cat, currId === selectedId, true));
          currMarker.setZIndexOffset(1000);
        }
      }
    }
  }, [hoveredId, selectedId]);

  // Zoom to selected location, or fit all when deselected
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedId) {
      const loc = locations.find((l) => l.id === selectedId);
      if (loc && !loc.boundary) {
        map.setView([loc.lat, loc.lng], 16, { animate: true, duration: 0.3 });
      }
    } else {
      // Deselected — fit bounds to all visible locations
      const filtered =
        filter === "all"
          ? locations
          : filter === "daytrip"
            ? locations.filter((l) => l.tag === "daytrip")
            : filter === "neighborhood"
              ? locations.filter((l) => l.tag === "neighborhood")
              : locations.filter((l) => l.cat === filter);
      const points: L.LatLngTuple[] = [];
      filtered.forEach((loc) => {
        if (loc.boundary) {
          loc.boundary.forEach(([lat, lng]) => points.push([lat, lng]));
        } else {
          points.push([loc.lat, loc.lng]);
        }
      });
      if (points.length > 0) {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40], animate: true, duration: 0.3 });
      }
    }
  }, [selectedId, filter]);

  return (
    <div
      ref={containerRef}
      className="sticky top-[48px] z-40 w-full h-[35vh] sm:h-[364px] border-b border-[var(--keshizumi)]"
    />
  );
}
