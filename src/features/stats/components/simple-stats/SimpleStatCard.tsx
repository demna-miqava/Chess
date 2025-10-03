import { type ReactNode } from "react";
import RatingDelta from "../RatingDelta";

export type SimpleStatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
};

export const SimpleStatCard = ({
  icon,
  label,
  value,
  delta,
}: SimpleStatCardProps) => {
  return (
    <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
      {icon}
      <div className="space-y-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <RatingDelta delta={delta} />
    </div>
  );
};

export default SimpleStatCard;
