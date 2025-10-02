import { Bot } from "lucide-react";

const challenges = [
  {
    name: "aarav365",
    rating: 910,
    status: "3 days",
  },
];

export const Challenges = () => {
  return (
    <>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-sidebar-foreground/70">
        Challenges
      </h3>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.name}
            className="flex items-center justify-between rounded-xl border border-sidebar-border bg-sidebar px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent/40">
                <Bot className="size-4" />
              </div>
              <div className="leading-tight">
                <p className="font-semibold">{challenge.name}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  {challenge.rating} • {challenge.status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-destructive px-3 py-1 text-xs text-white">
                Decline
              </button>
              <button className="rounded-lg bg-lime-500 px-3 py-1 text-xs font-semibold text-lime-950">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
