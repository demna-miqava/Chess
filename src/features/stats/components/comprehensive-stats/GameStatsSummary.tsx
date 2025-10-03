import { Folder } from "lucide-react";
import { type ComprehensiveStatsData } from "../../hooks/useGetComprehensiveStats";
import WinRatePill from "./WinRatePill";
import SummaryExtraInfo from "./SummaryExtraInfo";

const GameStatsSummary = ({
  statsData,
}: {
  statsData: ComprehensiveStatsData;
}) => {
  const { totalGames, winData, drawData, lossData } = statsData;

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-3">
        <Folder className="size-12" />
        <div>
          <span className="text-lg font-medium text-white">Games</span>
          <div className="text-3xl font-bold text-white">
            {totalGames.toLocaleString()}
          </div>
        </div>
      </div>
      <WinRatePill won={winData} drawn={drawData} lost={lossData} />

      <SummaryExtraInfo />
    </div>
  );
};

export default GameStatsSummary;
