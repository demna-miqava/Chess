import { GameTable } from "@/features/game-table";

const GamesSection = () => {
  return (
    <div className="space-y-8">
      <GameTable variant="full" title="All Games" />
    </div>
  );
};

export default GamesSection;
