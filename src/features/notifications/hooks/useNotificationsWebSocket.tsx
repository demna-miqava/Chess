import useWebSocket from "react-use-websocket";
import { WS_BASE_URL } from "@/consts/apiConfig";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import { useEffect } from "react";
import type { NotificationWebSocketMessage } from "../types/websocket-messages";
import { toast } from "sonner";
import ChallengeNotification from "../components/ChallengeNotification";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";

export const useNotificationsWebSocket = () => {
  const { id, isAuthenticated } = useUser();
  const { lastMessage, sendMessage, readyState } = useWebSocket(
    isAuthenticated && id ? `${WS_BASE_URL}/notifications` : null,
    {
      share: true,
    }
  );

  const navigate = useNavigate();
  useEffect(() => {
    const message =
      parseWebSocketMessage<NotificationWebSocketMessage>(lastMessage);

    if (!message) return;

    switch (message.type) {
      case "challenge_received":
        toast(
          <ChallengeNotification
            challengerId={message.data.challengerId}
            username={message.data.username}
            avatar={message.data.avatarUrl}
            time={message.data.time}
            increment={message.data.increment}
          />
        );
        break;

      case "opponent_unavailable":
        toast.dismiss();
        toast.error("Player is currently unavailable", {
          id: "currently_unavailable",
        });
        break;

      case "challenge_declined":
        toast.dismiss();
        toast.info("Challenge was declined", { id: "challenge_declined" });
        break;

      case "error":
        toast.dismiss();
        toast.error(message.data.message, { id: "error" });
        break;

      case "match_created":
        toast.dismiss();
        navigate(`/game/${message.data.gameId}`, {
          replace: true,
          state: {
            color: message.data.color,
            opponentRating: message.data.opponentRating,
            opponentUsername: message.data.opponentUsername,
            time: message.data.time,
            increment: message.data.increment,
          },
        });
        break;

      default:
        console.warn("Unknown notification type:", message);
    }
  }, [lastMessage]);

  return { lastMessage, sendMessage, readyState };
};
