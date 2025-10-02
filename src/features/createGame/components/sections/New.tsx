import { TimeControlsSection } from "../TimeControlsSection";
import { Challenges } from "../Challenges";
import { DailyGameInfo } from "../DailyGameInfo";
import { Actions } from "../Actions";

export const New = () => {
  return (
    <>
      <section className="space-y-3">
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
