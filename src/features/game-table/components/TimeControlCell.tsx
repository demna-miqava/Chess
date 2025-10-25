import { getTimeControlIcon } from "@/utils/timeControl";

interface TimeControlCellProps {
  type: string;
  time: number;
  increment: number | null;
}

export const TimeControlCell = ({
  type,
  time,
  increment,
}: TimeControlCellProps) => {
  const Icon = getTimeControlIcon(type);

  // Format time control display: "3 min" or "3|2"
  const displayText = increment
    ? `${time / 60}|${increment}`
    : `${time / 60} min`;

  return (
    <div className="flex flex-col items-center gap-1 text-xs text-white/70">
      <Icon />
      <span className="font-medium text-gray-400">{displayText}</span>
    </div>
  );
};
