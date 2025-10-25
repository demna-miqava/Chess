import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { useCurrentGame } from "../CurrentGameContext";
import { useLocation } from "react-router";
import Clock from "./Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { UserAvatar } from "@/components/UserAvatar";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { useRef } from "react";

const CurrentGameBoard = () => {
  const { username, image } = useUser();
  const { boardRef, turn } = useCurrentGame();
  const { sendMessage } = useGameWebSocket();
  const timeoutSentRef = useRef(false);

  const { opponentRating, opponentUsername, color, time, increment } =
    useLocation().state || {
      opponentRating: 0,
      opponentUsername: "",
      color: "",
      time: 180,
      increment: 0,
    };

  const handleTimeout = () => {
    if (!timeoutSentRef.current) {
      timeoutSentRef.current = true;
      sendMessage(JSON.stringify({ type: "timeout" }));
    }
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
          startingTime={time}
          increment={increment}
          isActive={turn !== color}
          onTimeout={turn !== color ? handleTimeout : undefined}
        />
      }
      bottomPlayerClock={
        <Clock
          startingTime={time}
          increment={increment}
          isActive={turn === color}
          onTimeout={turn === color ? handleTimeout : undefined}
        />
      }
    />
  );
};

export default CurrentGameBoard;
