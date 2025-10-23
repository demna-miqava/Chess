import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { Chessground } from "@lichess-org/chessground";
import { useEffect, useRef } from "react";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { UserAvatar } from "@/components/UserAvatar";

export const PlayBoard = () => {
  const { username, image } = useUser();
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

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: "Opponent",
        avatar: (
          <div className="flex size-8 items-center justify-center rounded-full">
            <User className="size-6 text-foreground" />
          </div>
        ),
      }}
      bottomPlayer={{
        name: username,
        rating: 3415,
        avatar: (
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
            <UserAvatar src={image} username={username} />
          </div>
        ),
      }}
      topPlayerClock={
        <span className="rounded-md px-2 py-1 text-md tracking-wider">
          3:00
        </span>
      }
      bottomPlayerClock={
        <span className="rounded-md px-2 py-1 text-md tracking-wider">
          3:00
        </span>
      }
    />
  );
};
