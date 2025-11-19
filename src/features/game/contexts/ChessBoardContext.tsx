import { createContext, useContext, type ReactNode, useMemo } from "react";
import type { PlayerColor } from "../types/game.types";
import { useChessBoard } from "../hooks/useChessBoard";
import type { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";

interface ChessBoardContextValue {
  boardRef: React.RefObject<HTMLDivElement | null>;
  chessRef: React.RefObject<Chess>;
  cgRef: React.RefObject<Api | null>;
  turn: PlayerColor | undefined;
  setTurn: (turn: PlayerColor) => void;
  color: PlayerColor;
  isArchiveMode: boolean;
}

const ChessBoardContext = createContext<ChessBoardContextValue | null>(null);

interface ChessBoardProviderProps {
  children: ReactNode;
  color: PlayerColor;
  isArchiveMode?: boolean;
}

export const ChessBoardProvider = ({
  children,
  color,
  isArchiveMode = false,
}: ChessBoardProviderProps) => {
  const chessBoard = useChessBoard({ color });

  const value = useMemo<ChessBoardContextValue>(() => ({
    boardRef: chessBoard.boardRef,
    chessRef: chessBoard.chessRef,
    cgRef: chessBoard.cgRef,
    turn: chessBoard.turn,
    setTurn: chessBoard.setTurn,
    color,
    isArchiveMode,
  }), [
    chessBoard.boardRef,
    chessBoard.chessRef,
    chessBoard.cgRef,
    chessBoard.turn,
    chessBoard.setTurn,
    color,
    isArchiveMode,
  ]);

  return (
    <ChessBoardContext.Provider value={value}>
      {children}
    </ChessBoardContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useChessBoardContext = () => {
  const context = useContext(ChessBoardContext);
  if (!context) {
    throw new Error(
      "useChessBoardContext must be used within ChessBoardProvider"
    );
  }
  return context;
};
