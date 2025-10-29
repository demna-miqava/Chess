import { useUser } from "@/hooks/useUser";
import { Chessground } from "@lichess-org/chessground";
import type { Api } from "@lichess-org/chessground/api";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import type { Key } from "@lichess-org/chessground/types";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import {
  syncBoardState,
  calculateLegalMoves,
} from "@/features/game/utils/board-sync";
import { BOARD_CONFIG } from "@/features/game/constants/board-config";
import type { PlayerColor } from "@/features/game/types/game.types";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";

export const useBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const cgRef = useRef<Api | null>(null);
  const [turn, setTurn] = useState<"white" | "black" | undefined>();
  const { color } = useLocation().state || {
    color: "black" as PlayerColor,
    timeControl: "3",
  };
  const { id } = useUser();
  const { settings } = useSettings();

  const { sendMessage, lastMessage } = useGameWebSocket();
  const { playSoundForMove, playGenericSound } = useChessSound(
    settings?.soundsEnabled
  );

  useEffect(() => {
    if (!chessRef.current) return;

    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);

    if (!data) return;

    // Handle initial game state from server
    if ("data" in data && data.data?.fen) {
      if (data.data?.pgn) {
        chessRef.current.loadPgn(data.data?.pgn);
      }
      syncBoardState(chessRef, cgRef, color, setTurn);
    }

    // Handle opponent's move
    if (data.type === "move") {
      if (data.move) {
        const move = chessRef.current.move(data.move.lan);
        const isCheckmate = chessRef.current.isCheckmate();
        syncBoardState(chessRef, cgRef, color, setTurn);
        playSoundForMove(move, isCheckmate);
      }
    }
  }, [lastMessage, id, color, chessRef, cgRef, playSoundForMove]);

  useEffect(() => {
    if (!boardRef.current) return;
    const chess = chessRef.current;
    const playerColorCode = color === "white" ? "w" : "b";
    const isMyTurn = chess.turn() === playerColorCode;
    playGenericSound();
    cgRef.current = Chessground(boardRef.current, {
      fen: chess.fen(),
      orientation: color,
      coordinates: settings?.boardCoordinatesEnabled ?? true,
      premovable: { enabled: settings?.premovesEnabled },
      draggable: { enabled: BOARD_CONFIG.ENABLE_DRAGGABLE },
      turnColor: chess.turn() === "w" ? "white" : "black",
      highlight: {
        lastMove: settings?.moveHighlightEnabled ?? true,
        check: true,
      },
      movable: {
        showDests: settings?.showLegalMovesEnabled,
        color: color,
        free: false,
        dests: isMyTurn ? calculateLegalMoves(chess) : new Map(),
      },
      events: {
        move: (orig: Key, dest: Key) => {
          try {
            const move = chess.move({
              from: orig as string,
              to: dest as string,
            });
            const numberOfMoves = chess.moveNumber();
            const isCheckmate = chess.isCheckmate();
            const isStalemate = chess.isStalemate();

            syncBoardState(chessRef, cgRef, color, setTurn);
            playSoundForMove(move, isCheckmate);

            sendMessage(
              JSON.stringify({
                type: "move",
                move: move,
                fen: chess.fen(),
                pgn: chess.pgn(),
                moveNumber: numberOfMoves,
              })
            );

            // Check for game ending conditions
            if (isCheckmate) {
              sendMessage(
                JSON.stringify({
                  type: "checkmate",
                  winnerId: id,
                })
              );
            } else if (isStalemate) {
              sendMessage(
                JSON.stringify({
                  type: "stalemate",
                })
              );
            }
          } catch {
            // If move fails, reset board to correct position
            cgRef.current?.set({ fen: chess.fen() });
          }
        },
      },
    });
  }, [
    color,
    sendMessage,
    chessRef,
    cgRef,
    playSoundForMove,
    playGenericSound,
    id,
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
  };
};
