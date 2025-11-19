import type { Move } from "chess.js";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useMemo } from "react";
import { useSettings } from "@/features/settings/SettingsContext";
import { renderMoveNotation } from "@/features/game/utils/notationUtils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MovesList = () => {
  const { chessRef } = useChessBoardContext();
  const { settings } = useSettings();

  const movePairs = useMemo(() => {
    const moves = chessRef.current?.history({ verbose: true }) || [];

    const movePairs: Array<{ white: Move; black?: Move }> = [];

    for (let i = 0; i < moves.length; i += 2) {
      movePairs.push({
        white: moves[i],
        black: moves[i + 1],
      });
    }

    return movePairs;
  }, [chessRef.current.history().length]);

  const showIcons = settings?.pieceIconNotationEnabled ?? false;

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="flex flex-col gap-2 rounded-lg p-3">
        {movePairs.map((pair, index) => (
          <div key={index} className="flex text-sm justify-start">
            <span className="w-6 text-foreground">{index + 1}.</span>
            <div className="flex gap-4">
              <span className="w-16 text-foreground">
                {renderMoveNotation(pair.white, showIcons)}
              </span>

              {pair.black && (
                <span className="text-md w-16 text-foreground">
                  {renderMoveNotation(pair.black, showIcons)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
