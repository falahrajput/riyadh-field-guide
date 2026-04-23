"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "fieldguide-checked";

export function useChecked() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setChecked(new Set<string>(JSON.parse(stored)));
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isChecked = useCallback((id: string) => checked.has(id), [checked]);

  return { checked, toggle, isChecked };
}
