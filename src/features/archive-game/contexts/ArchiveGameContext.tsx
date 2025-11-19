import { createContext, useContext, type ReactNode } from "react";
import { useArchiveGameLogic } from "../hooks/useArchiveGameLogic";

// Future: This will contain variations, analysis mode state, Stockfish lines, etc.
type ArchiveGameContextValue = ReturnType<typeof useArchiveGameLogic>;

const ArchiveGameContext = createContext<ArchiveGameContextValue | null>(null);

interface ArchiveGameProviderProps {
  children: ReactNode;
  pgn?: string;
}

export const ArchiveGameProvider = ({ children, pgn }: ArchiveGameProviderProps) => {
  const archiveGameLogic = useArchiveGameLogic({ pgn });

  return (
    <ArchiveGameContext.Provider value={archiveGameLogic}>
      {children}
    </ArchiveGameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArchiveGame = () => {
  const context = useContext(ArchiveGameContext);
  if (!context) {
    throw new Error("useArchiveGame must be used within ArchiveGameProvider");
  }
  return context;
};
