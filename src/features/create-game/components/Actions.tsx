import { Plus, UserPlus } from "lucide-react";
import {
  useGameSetup,
  type GameSection,
} from "@/features/create-game/GameSetupContext";
import { Button } from "@/components/ui/button";
import { useMatchmaking } from "@/features/matchmaking/hooks/useMatchmaking";

const actionItems = [
  {
    title: "Custom Challenge",
    description: "Choose time controls",
    icon: Plus,
    section: "custom",
  },
  {
    title: "Play a Friend",
    description: "Invite someone you know",
    icon: UserPlus,
    section: "friends",
  },
];

export const Actions = () => {
  const { setActiveSection, timeControl } = useGameSetup();

  const { setShouldConnect, isSearching } = useMatchmaking({
    time: timeControl.time,
    increment: timeControl.increment,
  });

  if (isSearching) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-4 animate-pulse">
        <p>Searching for a game...</p>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setShouldConnect(false);
          }}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        disabled={isSearching || !timeControl.format}
        onClick={() => {
          setShouldConnect(true);
        }}
        className="w-full py-6"
        aria-label="Start a new game"
      >
        Start Game
      </Button>
      {actionItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.title}
            type="button"
            className={`flex w-full items-center justify-between rounded-xl border border-sidebar-border px-4 py-4 text-left transition hover:border-sidebar-ring/60 hover:bg-sidebar-accent/50 "bg-sidebar text-sidebar-foreground cursor-pointer`}
            onClick={() => {
              if (item.section) {
                setActiveSection(item.section as GameSection);
              }
            }}
            aria-label={`${item.title}: ${item.description}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-9 items-center justify-center rounded-lg bg-sidebar-accent/60 text-sidebar-accent-foreground`}
              >
                <Icon className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};
