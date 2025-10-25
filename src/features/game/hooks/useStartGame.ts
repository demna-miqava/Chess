import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { MatchmakingMessage } from "../types/game.types";

/**
 * Hook to handle starting a game when match_found message is received
 * Used by both matchmaking and rematch flows
 */
export const useStartGame = () => {
  const navigate = useNavigate();

  const startGame = useCallback(
    (data: MatchmakingMessage) => {
      if (data.type !== "match_found") return;

      const {
        gameId,
        color,
        opponentRating,
        opponentUsername,
        time,
        increment,
      } = data.data;

      if (gameId) {
        navigate(`/game/${gameId}`, {
          replace: true,
          state: {
            color: color,
            opponentRating: opponentRating,
            opponentUsername: opponentUsername,
            time,
            increment: increment ?? 0,
          },
        });
      }
    },
    [navigate]
  );

  return { startGame };
};
