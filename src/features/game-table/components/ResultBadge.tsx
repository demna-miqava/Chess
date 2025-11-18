interface ResultBadgeProps {
  result: string;
}

export const ResultBadge = ({ result }: ResultBadgeProps) => {
  const isWin = result === "win";
  const isDraw = result === "draw";

  const badgeLabel = isDraw ? "=" : isWin ? "+" : "-";
  const badgeColor = isDraw
    ? "bg-draw-bg text-draw"
    : isWin
      ? "bg-win-bg text-win"
      : "bg-loss-bg text-loss";

  const topScore = isDraw ? "½" : isWin ? "1" : "0";
  const bottomScore = isDraw ? "½" : isWin ? "0" : "1";

  return (
    <div className="flex items-center gap-2 text-sm text-white/80">
      <div className="flex flex-col text-center leading-tight text-foreground">
        <span>{topScore}</span>
        <span>{bottomScore}</span>
      </div>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold uppercase ${badgeColor}`}
      >
        {badgeLabel}
      </span>
    </div>
  );
};
