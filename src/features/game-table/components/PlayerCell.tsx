interface PlayerCellProps {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
}

export const PlayerCell = ({ white, black }: PlayerCellProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-foreground">
        {white.username}{" "}
        <span className="text-xs text-muted-foreground">({white.rating})</span>
      </span>
      <span className="text-foreground">
        {black.username}{" "}
        <span className="text-xs text-muted-foreground">({black.rating})</span>
      </span>
    </div>
  );
};
