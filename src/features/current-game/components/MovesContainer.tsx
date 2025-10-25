import { MovesList } from "./MovesList";
import MoveControls from "./MoveControls";
import MatchActions from "./MatchActions";
import DrawOffer from "./DrawOffer";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type {
  GameWebSocketMessage,
  DrawResponseMessage,
} from "@/features/game/types/websocket-messages";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";

export const MovesContainer = () => {
  const { lastMessage, sendMessage } = useGameWebSocket();
  const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
  const { id } = useUser();

  const [userDeclinedDraw, setUserDeclinedDraw] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (!data) return;

    // Track when game ends
    if (data.type === "game_ended") {
      setGameEnded(true);
    }

    // Track draw responses - if current user declined, hide the draw offer
    if (data.type === "draw_response") {
      const drawResponse = data as DrawResponseMessage;
      console.log(drawResponse);
      if (drawResponse.userId === id && !drawResponse.accepted) {
        setUserDeclinedDraw(true);
      }
    }
  }, [data, id]);

  const drawResponse =
    data?.type === "draw_response" ? (data as DrawResponseMessage) : null;

  const showOpponentDeclined =
    drawResponse && drawResponse.userId !== id && !drawResponse.accepted;

  const showDrawOffer =
    !gameEnded && data?.type === "draw_offer" && !userDeclinedDraw;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-background">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Moves</h2>
        <MovesList />
      </div>

      <div className="border-t border-border/60 space-y-4 px-4 mb-4">
        {showDrawOffer && (
          <DrawOffer
            sendMessage={sendMessage}
            setUserDeclinedDraw={setUserDeclinedDraw}
          />
        )}
        {showOpponentDeclined && (
          <div className="w-full rounded-lg border border-gray-500/40 bg-gray-500/15 p-4 dark:border-gray-500/30 dark:bg-gray-500/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Opponent declined the draw
            </p>
          </div>
        )}
        <MoveControls />

        <MatchActions gameEnded={gameEnded} />
      </div>
    </div>
  );
};
