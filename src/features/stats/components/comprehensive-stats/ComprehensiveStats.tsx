import RatingChart from "./RatingChart";
import StatsHeader from "./StatsHeader";
import GameFilters from "./GameFilters";
import { useGetComprehensiveStats } from "../../hooks/useGetComprehensiveStats";
import CollapsibleStats from "../collapsible/CollapsibleStats";

const ComprehensiveStats = () => {
  const { statsData } = useGetComprehensiveStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <div className="space-y-6">
        <StatsHeader
          globalRank={statsData.globalRank}
          friendsRank={statsData.friendsRank}
          percentile={statsData.percentile}
          friendsCount={statsData.friendsCount}
          currentRating={statsData.currentRating}
          ratingGain={statsData.ratingGain}
        />
        <RatingChart statsData={statsData} />
        <GameFilters statsData={statsData} />
      </div>

      <div className="space-y-6">
        <CollapsibleStats />
      </div>
    </div>
  );
};

export default ComprehensiveStats;
