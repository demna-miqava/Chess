import { GameTable } from "@/features/game-table";
import PerformanceShowcase from "@/features/stats/components/performance/PerformanceShowcase";

export const OverviewSection = () => {
  return (
    <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <PerformanceShowcase />
        <GameTable variant="preview" actionHref="/profile/stats" />
      </div>
      {/* TODO: Add friends section  in the respective feature's folder*/}
      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-foreground bg-gray-400 p-4">
          <h3 className="text-sm font-semibold text-foreground">Friends</h3>
          <p className="mt-2 text-sm text-foreground">
            Plug in additional profile insights or a small summary card here.
          </p>
        </div>
      </aside>
    </section>
  );
};

export default OverviewSection;
