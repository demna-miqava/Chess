import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GameStats } from "./types";
import GameStatsContent from "./StatsContent";
import StatCardItem from "./StatCardItem";

interface StatsCardAccordionContentProps {
  gameType: string;
  gameStats: GameStats;
}

const StatsCardAccordionContent = ({
  gameType,
  gameStats,
}: StatsCardAccordionContentProps) => {
  return (
    <AccordionItem value={gameType} className="border-gray-700">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center justify-between w-full mr-4">
          <StatCardItem gameType={gameType} rating={gameStats.rating} />
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        <GameStatsContent gameStats={gameStats} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default StatsCardAccordionContent;
