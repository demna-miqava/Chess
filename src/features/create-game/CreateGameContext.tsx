import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  useTimeControl,
  type TimeControlFormat,
  type TimeControl,
} from "./hooks/useTimeControl";

export type GameSection =
  | "new"
  | "bots"
  | "friends"
  | "friend-invite-options"
  | "custom";

interface CreateGameContextValue {
  // Navigation
  activeSection: GameSection;
  setActiveSection: (section: GameSection) => void;
  canGoBack: boolean;
  goBack: () => void;

  // Time Control
  timeControl: TimeControl;
  updateTimeControl: (format: TimeControlFormat, value: string) => void;
}

const CreateGameContext = createContext<CreateGameContextValue | null>(null);

export const CreateGameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const state = location.state;
  const initialSection = (state?.section as GameSection) ?? "new";
  const [activeSection, setActiveSection] =
    useState<GameSection>(initialSection);

  const { timeControl, updateTimeControl } = useTimeControl();

  const canGoBack = activeSection !== "new";
  const goBack = () => {
    if (activeSection === "friend-invite-options") {
      setActiveSection("friends");
    } else {
      setActiveSection("new");
    }
  };

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  return (
    <CreateGameContext.Provider
      value={{
        activeSection,
        setActiveSection,
        canGoBack,
        goBack,
        timeControl,
        updateTimeControl,
      }}
    >
      {children}
    </CreateGameContext.Provider>
  );
};
/* eslint-disable-next-line */
export const useCreateGame = () => {
  const context = useContext(CreateGameContext);
  if (!context) {
    throw new Error("useCreateGame must be used within CreateGameProvider");
  }
  return context;
};
