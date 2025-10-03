import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import RatingDelta from "../RatingDelta";

export type PerformanceCardProps = {
  icon: ReactNode;
  label: string;
  rating: number;
  delta?: number;
  className?: string;
};

// TODO: Refactor
export const PerformanceCard = ({
  icon,
  label,
  rating,
  delta,
  className,
}: PerformanceCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-border bg-card p-3",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <div className="text-md">{icon}</div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <p className="text-md font-bold text-foreground">{rating}</p>
          </div>
        </div>
        {!!delta && <RatingDelta delta={delta} />}
      </div>

      <div className="mt-2 h-14 rounded-lg border border-border bg-muted p-1">
        <p className="text-[10px] text-muted-foreground">chart here</p>
      </div>
    </div>
  );
};

export default PerformanceCard;
