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

export const MovesContainer = () => {
  const { lastMessage, sendMessage } = useGameWebSocket();
  const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
  const { id } = useUser();

  const drawResponse =
    data?.type === "draw_declined" ? (data as DrawResponseMessage) : null;

  // Show "opponent declined" only if the response came from opponent (userId !== my id)
  const showOpponentDeclined = drawResponse && drawResponse.userId !== id;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-background">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Moves</h2>
        <MovesList />
      </div>

      <div className="border-t border-border/60 space-y-4 px-4 mb-4">
        {data?.type === "draw_offer" && <DrawOffer sendMessage={sendMessage} />}
        {showOpponentDeclined && (
          <div className="w-full rounded-lg border border-gray-500/40 bg-gray-500/15 p-4 dark:border-gray-500/30 dark:bg-gray-500/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Opponent declined the draw
            </p>
          </div>
        )}
        <MoveControls />

        <MatchActions />
      </div>
    </div>
  );
};
