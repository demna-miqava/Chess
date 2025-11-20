import CurrentGameBoard from "@/features/current-game/components/CurrentGameBoard";
import { MovesContainer } from "@/features/current-game/components/MovesContainer";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { GameNavigationProvider } from "@/features/game/contexts/GameNavigationContext";
import { LiveGameProvider } from "@/features/current-game/contexts/LiveGameContext";
import { useParams, useLocation } from "react-router-dom";
import { GameLayout } from "@/features/game/components/GameLayout";

const CurrentGame = () => {
  const { gameId } = useParams();
  const { color } = useLocation().state;

  return (
    <ChessBoardProvider color={color} key={gameId}>
      <GameNavigationProvider>
        <LiveGameProvider>
          <GameLayout
            board={<CurrentGameBoard />}
            sidebar={<MovesContainer />}
          />
        </LiveGameProvider>
      </GameNavigationProvider>
    </ChessBoardProvider>
  );
};

export default CurrentGame;
