import { Users, Trophy, BarChart3 } from "lucide-react";
import RatingDelta from "../RatingDelta";

const formatRank = (rank: number) => `#${rank.toLocaleString()}`;

const StatsHeader = ({
  globalRank,
  friendsRank,
  percentile,
  friendsCount,
  currentRating,
  ratingGain,
}: {
  globalRank: number;
  friendsRank: number;
  percentile: number;
  friendsCount: number;
  currentRating: number;
  ratingGain: number;
}) => {
  const rankData = [
    {
      icon: Users,
      label: `Friends (${friendsCount})`,
      value: formatRank(friendsRank),
      key: "friends",
    },
    {
      icon: Trophy,
      label: "Global",
      value: formatRank(globalRank),
      key: "global",
    },
    {
      icon: BarChart3,
      label: "Percentile",
      value: `${percentile}%`,
      key: "percentile",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between rounded-2xl border border-border bg-card p-6">
      {/* Current Rating & Gain */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-muted-foreground">Rating</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold text-foreground">
            {currentRating.toLocaleString()}
          </span>
          <RatingDelta delta={ratingGain} className="text-lg" />
        </div>
      </div>

      {/* Social & Global Ranks - Loop over rank data */}
      <div className="flex items-center gap-8">
        {rankData.map((rank) => {
          const IconComponent = rank.icon;
          return (
            <div key={rank.key} className="flex flex-col items-start">
              <span className="text-sm text-muted-foreground">{rank.label}</span>
              <div className="flex items-center gap-2">
                <IconComponent className="size-4 text-muted-foreground" />
                <span className="text-xl font-semibold text-foreground">
                  {rank.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsHeader;
