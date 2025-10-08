import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type GameResultDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onRematch?: () => void;
  onNewGame?: () => void;
};

const GameResultDialog = ({
  open,
  onOpenChange,
  title = "Game Over",
  description,
  onRematch,
  onNewGame,
}: GameResultDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[300px]"
        showCloseButton
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => {
              onRematch?.();
              onOpenChange(false);
            }}
            className="flex-1 cursor-pointer"
          >
            Rematch
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              onNewGame?.();
              onOpenChange(false);
            }}
            className="flex-1 cursor-pointer"
          >
            New Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameResultDialog;
