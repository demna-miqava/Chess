import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router";
import { BOARD_CONFIG } from "../constants/board-config";
import type { MatchmakingMessage } from "../types/game.types";

interface UseMatchmakingProps {
  userId: string;
  timeFormat: string;
  timeControl: string;
  rating?: number;
}

/**
 * Hook to manage matchmaking WebSocket connection
 * Handles finding opponents and navigating to game when match is found
 */
export const useMatchmaking = ({
  userId,
  timeFormat,
  timeControl,
  rating = 1000,
}: UseMatchmakingProps) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const navigate = useNavigate();

  const wsUrl = useMemo(
    () =>
      shouldConnect
        ? `${
            BOARD_CONFIG.WEBSOCKET_BASE_URL
          }/matchmaking?userId=${userId}&timeControl=${encodeURIComponent(
            timeControl
          )}&timeFormat=${timeFormat}&rating=${rating}`
        : null,
    [shouldConnect, userId, timeControl, timeFormat, rating]
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl, {
    share: true,
  });

  useEffect(() => {
    if (!lastMessage) return;

    const data: MatchmakingMessage = JSON.parse(lastMessage.data);

    if (data.type === "match_found" && data.gameId) {
      navigate(`/game/${data.gameId}`, {
        state: {
          color: data.color,
          opponentRating: data.opponentRating,
          opponentUsername: data.opponentUsername,
        },
      });
    }
  }, [lastMessage, navigate]);

  return {
    sendMessage,
    lastMessage,
    readyState,
    setShouldConnect,
    isSearching: lastMessage
      ? (JSON.parse(lastMessage.data) as MatchmakingMessage).type ===
        "searching"
      : false,
  };
};
