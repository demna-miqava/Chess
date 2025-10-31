import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import type { ReactNode } from "react";

interface PlayerDisplayProps {
  name: string;
  startingRating?: number;
  newRating?: number;
  ratingChange?: number;
  avatar?: ReactNode;
  clock?: ReactNode;
}

export const PlayerDisplay = ({
  name,
  startingRating,
  newRating,
  ratingChange,
  avatar,
  clock,
}: PlayerDisplayProps) => {
  return (
    <div className="flex items-center justify-between bg-card px-4 py-2 text-sm text-foreground">
      <div className="flex items-center gap-2">
        {avatar}
        <div className="leading-tight text-foreground">
          <p className="font-semibold">{name}</p>
          {newRating && newRating !== startingRating ? (
            <div className="flex items-center gap-1 text-xs">
              <CountingNumber
                inView
                className="text-xs"
                fromNumber={startingRating}
                number={newRating}
                transition={{ stiffness: 120, damping: 35 }}
              />
              {ratingChange !== undefined && (
                <span
                  className={
                    ratingChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {ratingChange >= 0 ? "+" : ""}
                  {ratingChange}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs">{startingRating}</span>
          )}
        </div>
      </div>
      {clock}
    </div>
  );
};
