import { createContext, useContext, type ReactNode } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useGetStats } from "../../hooks/useGetStats";
import StatsHeader from "./StatsHeader";
import GeneralStats from "./GeneralStats";
import StatsCardAccordionContent from "./StatsCardAccordionContent";
import type { GameStats } from "./types";
import StatButton from "./StatButton";

interface StatsListContentValue {
  numberOfGames: number;
  stats: Record<string, GameStats>;
  onGameTypeClick?: (gameType: string) => void;
}

const StatsListContent = createContext<StatsListContentValue | undefined>(
  undefined
);

const useStatsListContent = () => {
  const context = useContext(StatsListContent);
  if (!context) {
    throw new Error(
      "StatsCard compound components must be used within StatsCard"
    );
  }
  return context;
};

interface StatsProps {
  children: ReactNode;
  onGameTypeClick?: (gameType: string) => void;
}

const StatsCardList = ({ children, onGameTypeClick }: StatsProps) => {
  const { numberOfGames, stats } = useGetStats();

  return (
    <StatsListContent.Provider
      value={{ numberOfGames, stats, onGameTypeClick }}
    >
      <div className="space-y-4">{children}</div>
    </StatsListContent.Provider>
  );
};

const Header = ({ showLink = true }: { showLink?: boolean }) => {
  return <StatsHeader showLink={showLink} />;
};

const General = () => {
  const { numberOfGames } = useStatsListContent();
  return <GeneralStats numberOfGames={numberOfGames} />;
};

const AccordionList = () => {
  const { stats } = useStatsListContent();
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(stats).map(([gameType, gameStats]) => (
        <StatsCardAccordionContent
          key={gameType}
          gameType={gameType}
          gameStats={gameStats}
        />
      ))}
    </Accordion>
  );
};

const ButtonsList = () => {
  const { stats, onGameTypeClick } = useStatsListContent();

  if (!onGameTypeClick) {
    throw new Error(
      "onGameTypeClick must be provided when using GameTypesButtons"
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(stats).map(([gameType, gameStats]) => (
        <StatButton
          key={gameType}
          gameType={gameType}
          gameStats={gameStats}
          onClick={onGameTypeClick}
        />
      ))}
    </div>
  );
};

StatsCardList.Header = Header;
StatsCardList.General = General;
StatsCardList.AccordionList = AccordionList;
StatsCardList.ButtonsList = ButtonsList;

export default StatsCardList;
