import { toast } from "sonner";
import { useNotificationsWebSocket } from "./useNotificationsWebSocket";
import type {
  AcceptChallengeMessage,
  DeclineChallengeMessage,
  SendChallengeMessage,
} from "../types/websocket-messages";

export const useManageChallenge = () => {
  const { sendMessage, readyState } = useNotificationsWebSocket();

  const checkConnection = () => {
    if (readyState !== 1) {
      toast.error("Connection lost. Please try again.");
      return false;
    }
    return true;
  };

  const sendChallenge = (data: {
    challengedId: string;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
  }) => {
    if (!checkConnection()) return;

    const message: SendChallengeMessage = {
      type: "challenge_sent",
      data,
    };

    sendMessage(JSON.stringify(message));
    toast.success("Challenge sent!");
  };

  const handleAccept = (challengerId: string) => {
    if (!checkConnection()) return;

    toast.dismiss();

    const message: AcceptChallengeMessage = {
      type: "challenge_accepted",
      data: {
        challengerId,
      },
    };

    sendMessage(JSON.stringify(message));
  };

  const handleDecline = (challengerId: string) => {
    if (!checkConnection()) return;

    const message: DeclineChallengeMessage = {
      type: "challenge_declined",
      data: {
        challengerId,
      },
    };

    sendMessage(JSON.stringify(message));
    toast.dismiss();
  };

  return {
    sendChallenge,
    handleAccept,
    handleDecline,
  };
};
