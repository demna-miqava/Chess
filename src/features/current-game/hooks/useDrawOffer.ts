import { useState, useEffect, useMemo } from "react";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type {
  GameWebSocketMessage,
  DrawResponseMessage,
} from "@/features/game/types/websocket-messages";
import { useUser } from "@/hooks/useUser";

export const useDrawOffer = (
  lastMessage: MessageEvent | null,
  gameEnded: boolean
) => {
  const { id } = useUser();
  const [hasDrawOffer, setHasDrawOffer] = useState(false);

  const data = useMemo(
    () => parseWebSocketMessage<GameWebSocketMessage>(lastMessage),
    [lastMessage]
  );

  useEffect(() => {
    if (!data) return;

    if (data.type === "draw_offer") {
      setHasDrawOffer(true);
    }

    if (data.type === "draw_response") {
      const drawResponse = data as DrawResponseMessage;
      if (drawResponse.userId === id) {
        setHasDrawOffer(false);
      }
    }

    if (data.type === "game_ended") {
      setHasDrawOffer(false);
    }
  }, [lastMessage, data, id]);

  const drawResponse =
    data?.type === "draw_response" ? (data as DrawResponseMessage) : null;

  const showOpponentDeclined =
    drawResponse && drawResponse.userId !== id && !drawResponse.accepted;

  const showDrawOffer = !gameEnded && hasDrawOffer;

  return {
    showDrawOffer,
    showOpponentDeclined,
    setHasDrawOffer,
  };
};
