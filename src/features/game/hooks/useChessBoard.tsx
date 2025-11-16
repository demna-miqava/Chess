import type { Api } from "@lichess-org/chessground/api";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import type { PlayerColor } from "../types/game.types";
import { Chessground } from "@lichess-org/chessground";
import { calculateLegalMoves } from "../utils/board-utils";
import { BOARD_CONFIG } from "../constants/board-config";
import { useSettings } from "@/features/settings/SettingsContext";
import { useChessSound } from "./useChessSound";

interface UseChessBoardOptions {
  color: PlayerColor;
}

export const useChessBoard = ({ color }: UseChessBoardOptions) => {
  const [turn, setTurn] = useState<PlayerColor | undefined>();
  const { settings } = useSettings();
  const { playGenericSound } = useChessSound(settings?.soundsEnabled);
  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const cgRef = useRef<Api | null>(null);

  // Initialize board once on mount
  useEffect(() => {
    if (!boardRef.current || cgRef.current) return;
    const chess = chessRef.current;
    const playerColorCode = color === "white" ? "w" : "b";
    const isMyTurn = chess.turn() === playerColorCode;

    cgRef.current = Chessground(boardRef.current, {
      fen: chess.fen(),
      orientation: color,
      coordinates: settings?.boardCoordinatesEnabled ?? true,
      premovable: { enabled: settings?.premovesEnabled },
      draggable: { enabled: BOARD_CONFIG.ENABLE_DRAGGABLE },
      turnColor: chess.turn() === "w" ? "white" : "black",
      highlight: {
        lastMove: settings?.moveHighlightEnabled ?? false,
        check: true,
      },
      movable: {
        showDests: settings?.showLegalMovesEnabled,
        color: color,
        free: false,
        dests: isMyTurn ? calculateLegalMoves(chess) : new Map(),
      },
    });

    const currentTurn = chess.turn();
    setTurn(currentTurn === "w" ? "white" : "black");

    playGenericSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update board configuration when settings change
  useEffect(() => {
    if (!cgRef.current) return;

    cgRef.current.set({
      coordinates: settings?.boardCoordinatesEnabled ?? true,
      premovable: { enabled: settings?.premovesEnabled },
      highlight: {
        lastMove: settings?.moveHighlightEnabled ?? false,
        check: true,
      },
      movable: {
        ...cgRef.current.state.movable,
        showDests: settings?.showLegalMovesEnabled,
      },
    });
  }, [
    settings?.boardCoordinatesEnabled,
    settings?.premovesEnabled,
    settings?.moveHighlightEnabled,
    settings?.showLegalMovesEnabled,
  ]);

  return {
    boardRef,
    chessRef,
    cgRef,
    turn,
    setTurn,
  };
};
