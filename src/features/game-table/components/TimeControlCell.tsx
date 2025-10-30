import { getTimeControlIcon, formatTimeControl } from "@/utils/timeControl";

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

  const displayText = formatTimeControl(time, increment ?? undefined, "|");

  return (
    <div className="flex flex-col items-center gap-1 text-xs text-white/70">
      <Icon />
      <span className="font-medium text-gray-400">{displayText}</span>
    </div>
  );
};
