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
      className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-ring hover:bg-accent transition-colors"
    >
      <StatCardItem gameType={gameType} rating={gameStats.rating} />
    </button>
  );
};

export default StatButton;
