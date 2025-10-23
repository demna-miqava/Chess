interface PlayerCellProps {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
}

export const PlayerCell = ({ white, black }: PlayerCellProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-accent-foreground">
        {white.username}{" "}
        <span className="text-xs text-gray-400">({white.rating})</span>
      </span>
      <span className="text-accent-foreground">
        {black.username}{" "}
        <span className="text-xs text-gray-400">({black.rating})</span>
      </span>
    </div>
  );
};
