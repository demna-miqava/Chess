import { TimeControlsSection } from "../TimeControlsSection";
import { Challenges } from "../Challenges";
import { DailyGameInfo } from "../DailyGameInfo";
import { Actions } from "../Actions";

export const New = () => {
  return (
    <>
      <section className="space-y-3 h-full">
        <TimeControlsSection />

        <Actions />
      </section>

      <section className="mt-auto space-y-3 pb-2">
        <Challenges />

        <DailyGameInfo />
      </section>
    </>
  );
};
