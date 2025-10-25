import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "../constants/board-config";
import type { MatchmakingMessage } from "../types/game.types";
import { useStartGame } from "./useStartGame";

interface UseMatchmakingProps {
  time: number;
  increment: number;
}

/**
 * Hook to manage matchmaking WebSocket connection
 * Handles finding opponents and navigating to game when match is found
 */
export const useMatchmaking = ({ time, increment }: UseMatchmakingProps) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const { startGame } = useStartGame();

  const wsUrl = useMemo(
    () =>
      shouldConnect
        ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/matchmaking?time=${time}&increment=${increment}`
        : null,
    [shouldConnect, time, increment]
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl, {
    share: true,
    shouldReconnect: () => false,
  });

  useEffect(() => {
    if (!lastMessage) return;

    const data: MatchmakingMessage = JSON.parse(lastMessage.data);

    if (data.type === "match_found") {
      startGame(data);
      // Disconnect from matchmaking WebSocket after match is found
      setShouldConnect(false);
    }
  }, [lastMessage, startGame, setShouldConnect]);

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
