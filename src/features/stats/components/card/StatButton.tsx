import StatCardItem from "./StatCardItem";
import type { GameStats } from "./types";

interface StatButtonProps {
  gameType: string;
  gameStats: GameStats;
  onClick: (gameType: string) => void;
}

const StatButton = ({ gameType, gameStats, onClick }: StatButtonProps) => {
  return (
    <button
      onClick={() => onClick(gameType)}
      className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-colors"
    >
      <StatCardItem gameType={gameType} rating={gameStats.rating} />
    </button>
  );
};

export default StatButton;
