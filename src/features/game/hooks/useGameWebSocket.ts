import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "../constants/board-config";
import { useParams } from "react-router";
import { useUser } from "@/hooks/useUser";

/**
 * Hook to manage WebSocket connection for a live chess game
 */
export const useGameWebSocket = () => {
  const { gameId } = useParams();
  const { id } = useUser();

  const { lastMessage, sendMessage } = useWebSocket(
    gameId
      ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/game/${gameId}?userId=${id}`
      : null,
    { share: true }
  );

  return { sendMessage, lastMessage };
};
