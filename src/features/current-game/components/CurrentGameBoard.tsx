import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { useCurrentGame } from "../CurrentGameContext";
import { useLocation } from "react-router";
import Clock from "./Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { UserAvatar } from "@/components/UserAvatar";

const CurrentGameBoard = () => {
  const { username, image } = useUser();
  const { boardRef, turn } = useCurrentGame();
  const startingTime = 60000;
  const increment = 2000;
  const { opponentRating, opponentUsername, color } = useLocation().state || {
    opponentRating: 0,
    opponentUsername: "",
    color: "",
  };

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: opponentUsername,
        rating: opponentRating,
        avatar: (
          <div className="flex size-8 items-center justify-center rounded-full bg-[#3d3d3d]">
            <User className="size-4" />
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
        <Clock
          startingTime={startingTime}
          increment={increment}
          isActive={turn !== color}
        />
      }
      bottomPlayerClock={
        <Clock
          startingTime={startingTime}
          increment={increment}
          isActive={turn === color}
        />
      }
    />
  );
};

export default CurrentGameBoard;
