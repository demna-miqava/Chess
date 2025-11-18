import { TimeControlsSection } from "../TimeControlsSection";
import { Challenges } from "../Challenges";
import { DailyGameInfo } from "../DailyGameInfo";
import { Actions } from "../Actions";
import { useGameSetup } from "@/features/create-game/GameSetupContext";

export const New = () => {
  const { isSearching } = useGameSetup();

  return (
    <>
      <section className="space-y-3 h-full">
        {!isSearching && <TimeControlsSection />}

        <Actions />
      </section>

      <section className="mt-auto space-y-3 pb-2">
        <Challenges />

        <DailyGameInfo />
      </section>
    </>
  );
};
