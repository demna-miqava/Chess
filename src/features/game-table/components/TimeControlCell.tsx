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
    <div className="flex flex-col items-center gap-1 text-xs">
      <Icon />
      <span className="font-medium text-muted-foreground">{displayText}</span>
    </div>
  );
};
