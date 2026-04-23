"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "fieldguide-starred";
const SYNC_EVENT = "fieldguide-starred-sync";

function readInitial(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(KEY);
  const ids = stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("s");
  if (fromUrl) fromUrl.split(",").filter(Boolean).forEach((id) => ids.add(id));
  return ids;
}

export function useStarred() {
  const [starred, setStarred] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = readInitial();
    setStarred(init);
    setMounted(true);
    if (init.size > 0) localStorage.setItem(KEY, JSON.stringify([...init]));

    const onSync = () => {
      const stored = localStorage.getItem(KEY);
      if (stored) setStarred(new Set<string>(JSON.parse(stored)));
    };
    window.addEventListener(SYNC_EVENT, onSync);
    return () => window.removeEventListener(SYNC_EVENT, onSync);
  }, []);

  const toggle = useCallback((id: string) => {
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      window.dispatchEvent(new Event(SYNC_EVENT));
      return next;
    });
  }, []);

  const isStarred = useCallback((id: string) => starred.has(id), [starred]);

  const shareUrl = useCallback(() => {
    const ids = [...starred].join(",");
    const url = new URL(window.location.origin + "/saved");
    url.searchParams.set("s", ids);
    navigator.clipboard.writeText(url.toString());
  }, [starred]);

  return { starred, toggle, isStarred, shareUrl, count: starred.size, mounted };
}
