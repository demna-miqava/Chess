import { useEffect } from "react";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type {
  GameWebSocketMessage,
  RatingChanges,
} from "@/features/game/types/websocket-messages";
import { syncBoardState } from "@/features/game/utils/board-utils";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useGameNavigation } from "@/features/game/contexts/GameNavigationContext";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";

interface UseLiveGameMessagesOptions {
  setGameEnded: (ended: boolean) => void;
  setRatingChanges: (changes: RatingChanges | null) => void;
}

export const useLiveGameMessages = ({
  setGameEnded,
  setRatingChanges,
}: UseLiveGameMessagesOptions) => {
  const { chessRef, cgRef, color, setTurn } = useChessBoardContext();
  const { goToLastMove } = useGameNavigation();
  const { lastMessage } = useGameWebSocket();
  const { settings } = useSettings();
  const { playSoundForMove } = useChessSound(settings?.soundsEnabled);

  useEffect(() => {
    if (!lastMessage) return;
    if (!chessRef.current || !cgRef.current) return;

    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
    if (!data) return;

    // Handle games that ended during play
    if (data.type === "game_ended") {
      setGameEnded(true);
      if (data.ratingChanges) {
        setRatingChanges(data.ratingChanges);
      }
    }

    // Handle initial game state from server
    if ("data" in data && data.data?.fen) {
      if (data.data?.pgn) {
        chessRef.current.loadPgn(data.data?.pgn);
      }

      syncBoardState(chessRef, cgRef, color, setTurn);

      if (data.data?.isFinished) {
        setGameEnded(true);
      }
    }

    if (data.type === "move" && data.move) {
      const chess = chessRef.current;
      try {
        const move = chess.move(data.move.lan);
        const isCheckmate = chess.isCheckmate();

        syncBoardState(chessRef, cgRef, color, setTurn);

        playSoundForMove(move, isCheckmate);

        // Auto-jump to latest move when opponent moves
        goToLastMove();
      } catch (error) {
        console.error("Failed to apply move:", error);
      }
    }
  }, [
    lastMessage,
    chessRef,
    cgRef,
    setTurn,
    color,
    playSoundForMove,
    goToLastMove,
    setGameEnded,
    setRatingChanges,
  ]);
};
