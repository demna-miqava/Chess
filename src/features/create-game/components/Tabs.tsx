import { CircleUserRound, Play, Plus } from "lucide-react";
import {
  useGameSetup,
  type GameSection,
} from "@/features/create-game/GameSetupContext";

const tabs = [
  { label: "New Game", icon: Plus, section: "new" as const },
  { label: "Games", icon: Play },
  { label: "Players", icon: CircleUserRound },
];

export const Tabs = () => {
  const { setActiveSection, activeSection } = useGameSetup();
  return (
    <nav className="grid grid-cols-3 gap-2" aria-label="Game setup navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.section ? tab.section === activeSection : false;
        const handleClick = tab.section
          ? () => setActiveSection(tab.section as GameSection)
          : undefined;

        return (
          <button
            key={tab.label}
            type="button"
            onClick={handleClick}
            disabled={!handleClick}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "bg-sidebar text-sidebar-foreground/70 border border-sidebar-border"
            } ${handleClick ? "cursor-pointer" : "cursor-default"}`}
            aria-label={`${tab.label} section`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
