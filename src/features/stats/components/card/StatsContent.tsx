import type { GameStats } from "./types";
import ViewFullStatsLink from "./ViewFullStatsLink";
import RatingDelta from "@/features/stats/components/RatingDelta";
import { StatRow } from "@/components/shared/StatRow";

interface StatsAccordionContentProps {
  gameStats: GameStats;
}

const StatsAccordionContent = ({ gameStats }: StatsAccordionContentProps) => {
  return (
    <div className="space-y-4">
      <StatRow
        label="Highest"
        value={
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-medium">
              {gameStats.highestRating}
            </span>
            <span className="text-muted-foreground text-sm">
              ({gameStats.highestDate})
            </span>
          </div>
        }
      />

      <StatRow label="Games" value={gameStats.games.toLocaleString()} />

      <StatRow
        label="W/D/L"
        value={
          <div className="flex items-center gap-1">
            <span className="text-green-500 font-medium">{gameStats.wins}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{gameStats.draws}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-destructive">{gameStats.losses}</span>
          </div>
        }
      />

      <StatRow
        label="Rating Change Last 30 Days"
        value={<RatingDelta delta={gameStats.delta} />}
      />

      <ViewFullStatsLink />
    </div>
  );
};

export default StatsAccordionContent;
