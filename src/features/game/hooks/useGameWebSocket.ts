import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "../constants/board-config";
import { useParams } from "react-router";

/**
 * Hook to manage WebSocket connection for a live chess game
 */
export const useGameWebSocket = () => {
  const { gameId } = useParams();

  const { lastMessage, sendMessage } = useWebSocket(
    gameId ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/game/${gameId}` : null,
    { share: true }
  );

  return { sendMessage, lastMessage };
};
