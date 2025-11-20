import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import { TrendingUp, TrendingDown } from "lucide-react";
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
    <div className="flex items-center justify-between bg-card px-4 text-sm text-foreground">
      <div className="flex items-center gap-2 py-4">
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
                    ratingChange >= 0
                      ? "flex items-center gap-0.5 text-rating-up"
                      : "flex items-center gap-0.5 text-rating-down"
                  }
                >
                  {ratingChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-3 w-3" aria-hidden="true" />
                  )}
                  <span>
                    {ratingChange >= 0 ? "+" : ""}
                    {ratingChange}
                  </span>
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
