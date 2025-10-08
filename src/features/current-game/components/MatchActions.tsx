import { Flag, HandshakeIcon, X } from "lucide-react";
import GameResultDialog from "./GameResultDialog";
import { useGameActions } from "../hooks/useGameActions";
import { ActionButton } from "./ActionButton";

const MatchActions = () => {
  const {
    openGameResultDialog,
    setOpenGameResultDialog,
    finish,
    onResign,
    onOfferDraw,
    onAbort,
    hasMoves,
  } = useGameActions();

  return (
    <>
      {!hasMoves ? (
        <ActionButton
          variant="abort"
          onClick={onAbort}
          icon={<X className="size-4" />}
          label="Abort Game"
        />
      ) : (
        <div className="flex gap-2">
          <ActionButton
            variant="resign"
            onClick={onResign}
            icon={<Flag className="size-4" />}
            label="Resign"
          />
          <ActionButton
            variant="draw"
            onClick={onOfferDraw}
            icon={<HandshakeIcon className="size-4" />}
            label="Offer Draw"
          />
        </div>
      )}

      <GameResultDialog
        open={openGameResultDialog}
        onOpenChange={setOpenGameResultDialog}
        title={finish?.title ?? "Game Over"}
        description={finish?.description}
        onRematch={() => {
          console.log("Rematch");
        }}
        onNewGame={() => {
          console.log("New Game");
        }}
      />
    </>
  );
};

export default MatchActions;
