import { useUser } from "@/hooks/useUser";
import { Chessground } from "@lichess-org/chessground";
import { useEffect, useMemo, useRef } from "react";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { useGameSetup } from "../GameSetupContext";

export const PlayBoard = () => {
  const { username, image, blitzRating, bulletRating, rapidRating } = useUser();
  const { timeControl } = useGameSetup();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      Chessground(boardRef.current, {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        viewOnly: true,
        coordinates: true,
      });
    }
  }, []);

  const rating = useMemo(() => {
    switch (timeControl.format) {
      case "bullet":
        return bulletRating;
      case "blitz":
        return blitzRating;
      case "rapid":
        return rapidRating;
      default:
        return undefined;
    }
  }, [bulletRating, blitzRating, rapidRating, timeControl]);

  const startingTime = `${timeControl.time / 60}:00`;

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: "Opponent",
        avatar: <PlayerAvatar username="Opponent" isOpponent size="sm" />,
      }}
      bottomPlayer={{
        name: username,
        startingRating: rating,
        avatar: <PlayerAvatar username={username} avatarUrl={image} size="sm" />,
      }}
      topPlayerClock={
        <span className="rounded-md px-2 py-1 text-md tracking-wider">
          {startingTime}
        </span>
      }
      bottomPlayerClock={
        <span className="rounded-md px-2 py-1 text-md tracking-wider">
          {startingTime}
        </span>
      }
    />
  );
};
