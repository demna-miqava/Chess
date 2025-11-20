import ArchiveGameBoard from "@/features/archive-game/components/ArchiveGameBoard";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { GameNavigationProvider } from "@/features/game/contexts/GameNavigationContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { GameNotFound } from "@/features/archive-game/components/GameNotFound";
import { useParams } from "react-router-dom";
import { useGameData } from "@/features/archive-game/hooks/useGameData";
import { MovesList } from "@/features/game/components/MovesList";
import MoveControls from "@/features/game/components/MoveControls";
import { useUser } from "@/hooks/useUser";
import type { PlayerColor } from "@/features/game/types/game.types";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { GameLayout } from "@/features/game/components/GameLayout";

const ArchiveGame = () => {
  const { gameId } = useParams();
  const { data: gameData, isPending, error } = useGameData(gameId);
  const { id: currentUserId } = useUser();

  if (isPending) {
    return <FullScreenLoader />;
  }

  if (error || !gameData) {
    return <GameNotFound />;
  }

  // Determine the board orientation based on current user
  const playerColor: PlayerColor =
    gameData.whitePlayer.id === Number(currentUserId) ? "white" : "black";

  return (
    <ChessBoardProvider color={playerColor} isArchiveMode={true} key={gameId}>
      <ArchiveGameProvider pgn={gameData.pgn || ""}>
        <GameNavigationProvider>
          <GameLayout
            board={
              <ArchiveGameBoard
                whitePlayer={gameData.whitePlayer}
                blackPlayer={gameData.blackPlayer}
                timeControl={gameData.time}
              />
            }
            sidebar={
              <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4">
                <h2 className="text-lg font-semibold text-foreground">Moves</h2>
                <div className="flex-1 overflow-auto">
                  <MovesList />
                </div>
                <div className="mt-4">
                  <MoveControls />
                </div>
              </div>
            }
          />
        </GameNavigationProvider>
      </ArchiveGameProvider>
    </ChessBoardProvider>
  );
};

export default ArchiveGame;
