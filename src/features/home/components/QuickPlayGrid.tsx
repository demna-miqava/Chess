import { Bot, Handshake, Plus, Zap } from "lucide-react";

const quickPlayOptions = [
  { title: "Play 3 Min", description: "Fast-paced blitz match", icon: Zap },
  { title: "New Game", description: "Start a fresh challenge", icon: Plus },
  { title: "Play Bots", description: "Practice against the engine", icon: Bot },
  {
    title: "Play a Friend",
    description: "Invite someone to play",
    icon: Handshake,
  },
];

export const QuickPlayGrid = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {quickPlayOptions.map((option) => (
        <>
          <div
            key={option.title}
            className="border-border/60 bg-card text-card-foreground hover:border-sidebar-ring/80 hover:shadow-lg transition-colors rounded-xl border p-6 flex items-center gap-4"
          >
            <option.icon size={30} />
            <div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {option.description}
              </p>
            </div>
          </div>
        </>
      ))}
    </section>
  );
};
