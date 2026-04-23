"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "fieldguide-checklist";

export function useChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setChecked(JSON.parse(stored));
  }, []);
  const toggle = useCallback((item: string) => {
    setChecked((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);
  const isChecked = useCallback((item: string) => !!checked[item], [checked]);
  return { toggle, isChecked };
}
