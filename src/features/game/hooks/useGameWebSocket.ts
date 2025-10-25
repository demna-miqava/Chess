import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "../constants/board-config";
import { useParams } from "react-router";

/**
 * Hook to manage WebSocket connection for a live chess game
 */
export const useGameWebSocket = () => {
  const { gameId } = useParams();

  const { lastMessage, sendMessage, getWebSocket } = useWebSocket(
    gameId ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/game/${gameId}` : null,
    { share: true }
  );

  const closeConnection = () => {
    const ws = getWebSocket();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };

  return { sendMessage, lastMessage, closeConnection };
};
