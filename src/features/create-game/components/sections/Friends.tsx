import { useCreateGame } from "@/features/create-game/CreateGameContext";

const friendsList = Array.from({ length: 10 }, (_, index) => ({
  name: `Friend ${index + 1}`,
  status: index % 2 === 0 ? "Online" : "Offline",
}));

export const Friends = () => {
  const { setActiveSection } = useCreateGame();
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Play with friends</h3>
          <p className="text-xs text-sidebar-foreground/70">
            Send a challenge to someone in your list.
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-2">
        {friendsList.map((friend) => (
          <button
            key={friend.name}
            onClick={() => setActiveSection("friend-invite-options")}
            type="button"
            className="cursor-pointer flex items-center justify-between rounded-xl border border-sidebar-border bg-sidebar px-4 py-3 text-left transition hover:border-sidebar-ring/60 hover:bg-sidebar-accent/40"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent/40 text-sm font-semibold">
                {friend.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="font-semibold">{friend.name}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  {friend.status}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-sidebar-foreground/70">
              Challenge
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
