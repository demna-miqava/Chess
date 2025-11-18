import { Flag, HandshakeIcon, X } from "lucide-react";
import GameResultDialog from "./GameResultDialog";
import { useGameActions } from "../hooks/useGameActions";
import { useRematch } from "../hooks/useRematch";
import { ActionButton } from "./ActionButton";
import RematchOffered from "./RematchOffered";
import RematchRequested from "./RematchRequested";
import PostGameActions from "./PostGameActions";
import { useSettings } from "@/features/settings/SettingsContext";
interface MatchActionsProps {
  gameEnded: boolean;
}

const MatchActions = ({ gameEnded }: MatchActionsProps) => {
  const { settings } = useSettings();
  const {
    openGameResultDialog,
    setOpenGameResultDialog,
    finish,
    onResign,
    onOfferDraw,
    onAbort,
    hasMoves,
  } = useGameActions();

  const {
    rematchRequested,
    rematchOffered,
    requestRematch,
    acceptRematch,
    declineRematch,
    cancelRematch,
  } = useRematch({
    setOpenGameResultDialog,
  });

  const confirmDrawResignationEnabled = settings?.confirmDrawResignationEnabled;

  return (
    <>
      {!gameEnded && (
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
                confirmTitle={
                  confirmDrawResignationEnabled
                    ? "Are you sure you want to resign?"
                    : undefined
                }
              />
              <ActionButton
                variant="draw"
                onClick={onOfferDraw}
                icon={<HandshakeIcon className="size-4" />}
                label="Offer Draw"
                confirmTitle={
                  confirmDrawResignationEnabled
                    ? "Are you sure you want to offer draw?"
                    : undefined
                }
              />
            </div>
          )}
        </>
      )}

      <GameResultDialog
        open={openGameResultDialog}
        onOpenChange={setOpenGameResultDialog}
        title={finish?.title ?? "Game Over"}
        description={finish?.description}
      >
        {rematchOffered && (
          <RematchOffered
            onAcceptRematch={acceptRematch}
            onDeclineRematch={declineRematch}
          />
        )}

        {rematchRequested && (
          <RematchRequested onCancelRematchRequest={cancelRematch} />
        )}
        {!rematchOffered && !rematchRequested && (
          <PostGameActions onRematch={requestRematch} />
        )}
      </GameResultDialog>
    </>
  );
};

export default MatchActions;
