import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";

type Stat = { percent: number; count: number };

type Props = {
  won: Stat;
  drawn: Stat;
  lost: Stat;
};

export default function WinRatePill({ won, drawn, lost }: Props) {
  const segments = useMemo(() => {
    const unfiltered = [
      {
        ...won,
        id: "won",
        label: "Won",
        color: "bg-win",
        text: "text-win",
      },
      {
        ...drawn,
        id: "drawn",
        label: "Drawn",
        color: "bg-draw",
        text: "text-draw",
      },
      {
        ...lost,
        id: "lost",
        label: "Lost",
        color: "bg-loss",
        text: "text-loss",
      },
    ];
    return unfiltered.filter((segment) => segment.percent > 0);
  }, [won, drawn, lost]);

  return (
    <TooltipProvider>
      <div className="w-full max-w-lg p-4">
        <div className="flex items-center w-full h-6 rounded-full">
          {segments.map((segment, index) => {
            const { id, percent, count, label, color, text } = segment;

            const justify = id === "lost" ? "justify-end" : "";

            const roundedClass =
              index === 0
                ? "rounded-l-full"
                : index === segments.length - 1
                ? "rounded-r-full"
                : "";

            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex flex-col gap-1`}
                    style={{ width: `${percent}%` }}
                  >
                    <span
                      className={`${text} text-sm flex items-center gap-1 ${justify}`}
                    >
                      {label}
                    </span>
                    <div className={`w-full h-6 ${color} ${roundedClass}`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {label}: {percent}% ({count.toLocaleString()})
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
