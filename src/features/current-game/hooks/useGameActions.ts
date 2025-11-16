import { useEffect, useState } from "react";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useUser } from "@/hooks/useUser";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { getGameEndMessage } from "../constants/gameEndMessages";

type FinishState = {
  title: string;
  description?: string;
  ratingChange?: number;
  newRating?: number;
  opponentRatingChange?: number;
  opponentNewRating?: number;
};

export const useGameActions = () => {
  const { sendMessage, lastMessage } = useGameWebSocket();
  const { chessRef } = useChessBoardContext();
  const { playGenericSound } = useChessSound();
  const { id: currentUserId } = useUser();

  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [finish, setFinish] = useState<FinishState | null>(null);

  const hasMoves = (chessRef.current?.history().length || 0) > 0;

  // Handle incoming server events
  useEffect(() => {
    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
    if (!data) return;

    if (data.type === "game_ended") {
      const { reason, winnerId } = data;

      const isWinner = winnerId === currentUserId;
      const message = getGameEndMessage(reason, isWinner);

      if (message) {
        setFinish(message);
        setOpenGameResultDialog(true);
        playGenericSound();
      }
    }
  }, [lastMessage, playGenericSound, currentUserId]);

  const onResign = () => {
    sendMessage(JSON.stringify({ type: "resign" }));
  };

  const onOfferDraw = () => {
    sendMessage(JSON.stringify({ type: "draw_offer" }));
  };

  const onAbort = () => {
    sendMessage(JSON.stringify({ type: "abort" }));
  };

  return {
    openGameResultDialog,
    setOpenGameResultDialog,
    finish,
    onResign,
    onOfferDraw,
    onAbort,
    hasMoves,
  };
};
