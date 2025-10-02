import { Bot } from "lucide-react";

const bots = [
  { name: "Beginner Bot", difficulty: "800", color: "bg-emerald-500" },
  { name: "Tactician", difficulty: "1100", color: "bg-blue-500" },
  { name: "Strategist", difficulty: "1350", color: "bg-purple-500" },
  { name: "Mastermind", difficulty: "1600", color: "bg-amber-500" },
  { name: "Grandmaster AI", difficulty: "2000", color: "bg-rose-500" },
];

export const Bots = () => {
  return (
    <div className="space-y-3">
      {bots.map((bot) => (
        <div
          key={bot.name}
          className="flex items-center justify-between rounded-xl border border-sidebar-border bg-sidebar px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-full text-white ${bot.color}`}
            >
              <Bot className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="font-semibold">{bot.name}</p>
              <p className="text-xs text-sidebar-foreground/70">
                Difficulty {bot.difficulty}
              </p>
            </div>
          </div>
          <button className="rounded-lg border border-sidebar-border px-3 py-1 text-xs font-medium">
            Challenge
          </button>
        </div>
      ))}
    </div>
  );
};
