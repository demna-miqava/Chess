import { Bolt, Plus, UserPlus } from "lucide-react";
import {
  useCreateGame,
  type SidebarSection,
} from "@/features/createGame/CreateGameContext";

const actionItems = [
  {
    title: "Start Game",
    description: "Jump into a blitz match",
    icon: Bolt,
  },
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
  const { setActiveSection } = useCreateGame();

  return (
    <>
      {actionItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.title}
            type="button"
            className={`flex w-full items-center justify-between rounded-xl border border-sidebar-border px-4 py-4 text-left transition hover:border-sidebar-ring/60 hover:bg-sidebar-accent/50 "bg-sidebar text-sidebar-foreground cursor-pointer`}
            onClick={() => {
              if (item.section) {
                setActiveSection(item.section as SidebarSection);
              }
            }}
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
