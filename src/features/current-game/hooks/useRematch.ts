import { useState, useEffect, useCallback } from "react";
import type {
  RematchRequestMessage,
  RematchResponseMessage,
  CancelRematchMessage,
} from "@/features/game/types/websocket-messages";
import type { MatchmakingMessage } from "@/features/game/types/game.types";
import { useStartGame } from "@/features/game/hooks/useStartGame";
import { messageDispatcher } from "@/features/game/services/WebSocketMessageDispatcher";
import { useLiveGame } from "../contexts/LiveGameContext";

export const useRematch = ({
  setOpenGameResultDialog,
}: {
  setOpenGameResultDialog: (open: boolean) => void;
}) => {
  const { sendMessage } = useLiveGame();
  const { startGame } = useStartGame();

  const [rematchRequested, setRematchRequested] = useState(false);
  const [rematchOffered, setRematchOffered] = useState(false);
  const [rematchDeclined, setRematchDeclined] = useState(false);

  useEffect(() => {
    const unsubCanceled = messageDispatcher.subscribe<CancelRematchMessage>(
      "rematch_canceled",
      () => {
        setRematchOffered(false);
      }
    );

    const unsubRequest = messageDispatcher.subscribe<RematchRequestMessage>(
      "rematch_request",
      () => {
        setRematchOffered(true);
      }
    );

    const unsubResponse = messageDispatcher.subscribe<RematchResponseMessage>(
      "rematch_response",
      (data) => {
        if (!data.accepted) {
          setRematchDeclined(true);
          setRematchRequested(false);
        }
      }
    );

    const unsubMatchFound = messageDispatcher.subscribe(
      "match_found",
      (data) => {
        startGame(data as unknown as MatchmakingMessage);
        setOpenGameResultDialog(false);
      }
    );

    return () => {
      unsubCanceled();
      unsubRequest();
      unsubResponse();
      unsubMatchFound();
    };
  }, [startGame, setOpenGameResultDialog]);

  const requestRematch = useCallback(() => {
    sendMessage(JSON.stringify({ type: "rematch_request" }));
    setRematchRequested(true);
  }, [sendMessage]);

  const acceptRematch = useCallback(() => {
    sendMessage(
      JSON.stringify({ type: "rematch_response", data: { accepted: true } })
    );
  }, [sendMessage]);

  const declineRematch = useCallback(() => {
    sendMessage(
      JSON.stringify({ type: "rematch_response", data: { accepted: false } })
    );
    setRematchOffered(false);
  }, [sendMessage]);

  const cancelRematch = useCallback(() => {
    sendMessage(JSON.stringify({ type: "cancel_rematch" }));
    setRematchRequested(false);
  }, [sendMessage]);

  return {
    rematchRequested,
    rematchOffered,
    rematchDeclined,
    requestRematch,
    acceptRematch,
    declineRematch,
    cancelRematch,
  };
};
