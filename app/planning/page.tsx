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
      { id: "visa", label: "Apply for Saudi tourist visa (evisa.com.sa)" },
      { id: "passport", label: "Passport valid 6+ months" },
      { id: "insurance", label: "Travel insurance booked" },
      { id: "sar", label: "Get Saudi Riyals or set up Wise card" },
      { id: "esim", label: "Buy eSIM — stc or Airalo work well" },
      { id: "apps", label: "Download: Google Maps, Uber, Careem, Google Translate" },
      { id: "dress", label: "Review dress code — modest clothing for public spaces" },
    ],
  },
  {
    title: "Packing",
    items: [
      { id: "adapter", label: "Type G plug adapter (Saudi uses UK-style plugs)" },
      { id: "powerbank", label: "Power bank + cables" },
      { id: "sunscreen", label: "High-SPF sunscreen — intense sun year-round" },
      { id: "layers", label: "Light layers — hot days, cold AC indoors" },
      { id: "shoes", label: "Comfortable walking shoes (easy slip-on for mosques)" },
      { id: "modest", label: "Modest clothing — shoulders and knees covered in public" },
      { id: "water", label: "Reusable water bottle — stay hydrated" },
    ],
  },
  {
    title: "Getting Around",
    items: [
      { id: "uber", label: "Uber and Careem are the main ways to get around" },
      { id: "metro", label: "Riyadh Metro is clean, fast, and cheap — get the app" },
      { id: "driving", label: "International driving permit if renting a car" },
      { id: "maps", label: "Google Maps works well for navigation" },
      { id: "walking", label: "Most areas aren't walkable — plan rides in advance" },
    ],
  },
  {
    title: "Money & Payments",
    items: [
      { id: "cash", label: "Carry 200–500 SAR cash for souqs and smaller spots" },
      { id: "cards", label: "Visa/Mastercard widely accepted" },
      { id: "atm", label: "ATMs everywhere — AlRajhi and SAB accept foreign cards" },
      { id: "tipping", label: "Tipping not mandatory but appreciated (10–15%)" },
    ],
  },
  {
    title: "Culture & Etiquette",
    items: [
      { id: "greet", label: "Right hand for greetings and eating" },
      { id: "photo", label: "Ask before photographing people, especially women" },
      { id: "pub-affection", label: "Avoid public displays of affection" },
      { id: "ramadan", label: "During Ramadan: no eating/drinking in public daytime" },
      { id: "prayer", label: "Some shops close briefly during prayer times (5x daily)" },
      { id: "alcohol", label: "Alcohol is prohibited in Saudi Arabia" },
      { id: "mosques", label: "Remove shoes at mosques, dress modestly" },
    ],
  },
  {
    title: "Food Tips",
    items: [
      { id: "halal", label: "All food is halal — no pork anywhere" },
      { id: "kabsa", label: "Try kabsa (Saudi rice dish) — the national dish" },
      { id: "dates", label: "Dates and Arabic coffee offered everywhere — always accept" },
      { id: "shawarma", label: "Street shawarma is cheap and excellent" },
      { id: "timing", label: "Restaurants often stay open past midnight" },
      { id: "delivery", label: "HungerStation and Jahez for delivery" },
    ],
  },
  {
    title: "Emergency",
    items: [
      { id: "police", label: "Police: 999 / Ambulance: 911" },
      { id: "embassy", label: "Save your country's embassy number before arriving" },
      { id: "hospital", label: "King Faisal Specialist Hospital — English-speaking staff" },
      { id: "najm", label: "Najm app for road accidents" },
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
