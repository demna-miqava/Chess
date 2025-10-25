import { useClock } from "../hooks/useClock";
import { formatTime } from "@/features/game/utils/time-formatter";

const Clock = ({
  startingTime,
  increment,
  isActive,
  onTimeout,
  gameEnded = false,
}: {
  startingTime: number;
  increment?: number;
  isActive: boolean;
  onTimeout?: () => void;
  gameEnded?: boolean;
}) => {
  const { time, isLowTime } = useClock({ startingTime, increment, isActive, onTimeout, gameEnded });
  const formattedTime = formatTime(time, isLowTime);

  return (
    <span
      className={`rounded-md w-16 text-md text-center px-2 py-1 text-xs tracking-wider transition-colors ${
        isActive
          ? isLowTime
            ? "bg-destructive text-destructive-foreground"
            : "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {formattedTime}
    </span>
  );
};

export default Clock;
