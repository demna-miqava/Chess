import RatingChart from "./RatingChart";
import StatsHeader from "./StatsHeader";
import GameFilters from "./GameFilters";
import { useGetComprehensiveStats } from "../../hooks/useGetComprehensiveStats";

const ComprehensiveStats = () => {
  const { statsData } = useGetComprehensiveStats();

  return (
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
  );
};

export default ComprehensiveStats;
