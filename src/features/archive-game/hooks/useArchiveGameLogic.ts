import { useCallback, useEffect } from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import type { Key } from "@lichess-org/chessground/types";
import type { Square } from "chess.js";
import { calculateLegalMoves } from "@/features/game/utils/board-utils";

interface UseArchiveGameLogicOptions {
  pgn?: string;
}

export const useArchiveGameLogic = ({ pgn }: UseArchiveGameLogicOptions = {}) => {
  const { chessRef, cgRef, setTurn } = useChessBoardContext();
  const { settings } = useSettings();
  const { playSoundForMove } = useChessSound(settings?.soundsEnabled);

  // Load PGN for archive game
  useEffect(() => {
    if (pgn && chessRef.current) {
      chessRef.current.loadPgn(pgn);
    }
  }, [pgn, chessRef]);

  // TODO: Add state for variations
  // TODO: Add state for Stockfish analysis

  // Handle move execution in archive mode
  const handleArchiveMove = useCallback(
    (orig: Key, dest: Key) => {
      const chess = chessRef.current;
      const cg = cgRef.current;
      if (!chess || !cg) return;

      const fromSquare = orig as Square;
      const toSquare = dest as Square;

      try {
        const move = chess.move({
          from: fromSquare,
          to: toSquare,
          promotion: "q",
        });

        if (move) {
          // TODO: Check if move diverges from original game
          // If it does, create a new variation and enter analysis mode
          const newTurn = chess.turn();
          setTurn(newTurn === "w" ? "white" : "black");

          cg.set({
            fen: chess.fen(),
            turnColor: newTurn === "w" ? "white" : "black",
            movable: {
              color: "both",
              dests: calculateLegalMoves(chess),
            },
            check: chess.inCheck(),
          });

          playSoundForMove(move, chess.isCheckmate());
        }
      } catch {
        cg.set({ fen: chess.fen() });
      }
    },
    [chessRef, cgRef, setTurn, playSoundForMove]
  );

  // Register move handler with Chessground
  useEffect(() => {
    if (!cgRef.current) return;

    cgRef.current.set({
      events: {
        move: handleArchiveMove,
      },
    });
  }, [cgRef, handleArchiveMove]);

  return {
    // Will expose state and methods here when we add variations/analysis
    // For now, the hook just sets up the move handler
    // Future: variations, currentVariationId, stockfishLines, isAnalysisMode,
    //         createVariation, switchVariation, deleteVariation, analyzePosition
  };
};
