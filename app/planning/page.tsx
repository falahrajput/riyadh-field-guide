"use client";
import { NavBar } from "@/components/nav-bar";
import { useChecklist } from "@/lib/use-checklist";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";

interface CheckItem {
  id: string;
  label: string;
}

interface Section {
  title: string;
  items: CheckItem[];
}

const sections: Section[] = [
  {
    title: "Before You Go",
    items: [
      { id: "visa", label: "Confirm visa / entry requirements" },
      { id: "passport", label: "Passport valid 6+ months" },
      { id: "insurance", label: "Travel insurance booked" },
      { id: "yen", label: "Order yen or set up wise card" },
      { id: "esim", label: "Buy eSIM (Ubigi or Airalo)" },
      { id: "jrpass", label: "Decide on JR Pass vs IC card" },
      { id: "apps", label: "Download: Google Translate, Navitime, Suica" },
    ],
  },
  {
    title: "Packing",
    items: [
      { id: "adapter", label: "Type A/B plug adapter" },
      { id: "powerbank", label: "Power bank + cables" },
      { id: "umbrella", label: "Compact umbrella (Feb rain)" },
      { id: "layers", label: "Layers — Feb avg 4–10°C" },
      { id: "shoes", label: "Comfortable walking shoes" },
      { id: "bag", label: "Day bag with zip pockets" },
      { id: "mask", label: "Masks (still common indoors)" },
    ],
  },
  {
    title: "Transit",
    items: [
      { id: "suica", label: "Get Suica / Pasmo IC card" },
      { id: "nex", label: "Narita Express or Skyliner to city" },
      { id: "lasttrains", label: "Note last train times (~midnight)" },
      { id: "locker", label: "Learn coin locker system at stations" },
      { id: "yamanote", label: "Study JR Yamanote loop map" },
    ],
  },
  {
    title: "Money & Payments",
    items: [
      { id: "cash", label: "Carry ¥10,000–20,000 cash daily" },
      { id: "7atm", label: "7-Eleven ATMs accept foreign cards" },
      { id: "ic-pay", label: "IC card works at convenience stores" },
      { id: "tax-free", label: "Tax-free shopping > ¥5,000 at major stores" },
    ],
  },
  {
    title: "Etiquette",
    items: [
      { id: "quiet", label: "Quiet on trains — no phone calls" },
      { id: "shoes-off", label: "Shoes off at temples, some restaurants" },
      { id: "trash", label: "Carry trash — few public bins" },
      { id: "tipping", label: "No tipping anywhere" },
      { id: "chopsticks", label: "Never stick chopsticks upright in rice" },
      { id: "queue", label: "Queue neatly, stand left on escalators (Tokyo)" },
    ],
  },
  {
    title: "Food Tips",
    items: [
      { id: "conbini", label: "Convenience store food is genuinely good" },
      { id: "depachika", label: "Department store basements (depachika) for bento" },
      { id: "lunch-sets", label: "Lunch sets (ランチ) are best value" },
      { id: "tabelog", label: "Use Tabelog over Google for ratings" },
      { id: "ticket-machine", label: "Many ramen shops use ticket machines" },
      { id: "oshibori", label: "Hot towel (oshibori) is for hands only" },
    ],
  },
  {
    title: "Emergency",
    items: [
      { id: "police", label: "Police: 110 / Ambulance: 119" },
      { id: "embassy", label: "US Embassy: 03-3224-5000" },
      { id: "koban", label: "Koban (police boxes) everywhere — ask for help" },
      { id: "hospital", label: "Save nearest English-speaking hospital" },
    ],
  },
];

export default function PlanningPage() {
  const { toggle, isChecked } = useChecklist();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.title, true]))
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = sections.reduce(
    (sum, s) => sum + s.items.filter((i) => isChecked(i.id)).length,
    0
  );

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--ro)]">
      <NavBar current="/planning" />
      <div className="max-w-[800px] mx-auto w-full flex flex-col flex-1">
      <div className="px-4 py-4 border-b border-[var(--keshizumi)]">
        <h1 className="font-mono text-sm text-[var(--shironeri)]">Planning</h1>
        <p className="font-mono text-[12px] text-[var(--sunezumi)] mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>
          {checkedCount}/{totalItems} completed
        </p>
        <div className="mt-2 h-0.5 bg-[var(--keshizumi)]">
          <div
            className="h-full bg-[var(--kurenai)] transition-all duration-300"
            style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <Collapsible
            key={section.title}
            open={openSections[section.title]}
            onOpenChange={() => toggleSection(section.title)}
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 border-b border-[var(--keshizumi)]/50 hover:bg-[var(--sumi)]/40 transition-colors cursor-pointer">
              <span className="font-mono text-[14px] text-white">{section.title}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-[var(--keshizumi)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {section.items.filter((i) => isChecked(i.id)).length}/{section.items.length}
                </span>
                <span className="font-mono text-[12px] text-[var(--keshizumi)]">
                  {openSections[section.title] ? "−" : "+"}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-b border-[var(--keshizumi)]/50 py-2">
                {section.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--sumi)]/30 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={isChecked(item.id)}
                      onCheckedChange={() => toggle(item.id)}
                    />
                    <span
                      className={`font-mono text-[13px] transition-colors ${
                        isChecked(item.id)
                          ? "text-[var(--keshizumi)] line-through"
                          : "text-[var(--ginnezumi)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      </div>
      <SiteFooter />
    </div>
  );
}
