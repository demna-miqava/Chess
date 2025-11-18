import { useClock } from "../hooks/useClock";
import { formatTime } from "@/features/game/utils/time-formatter";

const Clock = ({
  startingTime,
  isActive,
  onTimeout,
  gameEnded = false,
  serverTimeLeft,
}: {
  startingTime: number;
  isActive: boolean;
  onTimeout?: () => void;
  gameEnded?: boolean;
  serverTimeLeft?: number; // Time from server in milliseconds
}) => {
  const { time, isLowTime } = useClock({
    startingTime,
    isActive,
    onTimeout,
    gameEnded,
    serverTimeLeft,
  });
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
