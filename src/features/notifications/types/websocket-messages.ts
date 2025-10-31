export type SendChallengeMessage = {
  type: "challenge_sent";
  data: {
    challengedId: string;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
  };
};

export type AcceptChallengeMessage = {
  type: "challenge_accepted";
  data: {
    challengerId: string;
  };
};

export type DeclineChallengeMessage = {
  type: "challenge_declined";
  data: {
    challengerId: string;
  };
};

export type ChallengeReceivedNotification = {
  type: "challenge_received";
  data: {
    challengerId: string;
    username: string;
    avatarUrl: string | null;
    challengerRating: number;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
    createdAt: string;
  };
};

export type OpponentUnavailableNotification = {
  type: "opponent_unavailable";
};

export type ChallengeDeclinedNotification = {
  type: "challenge_declined";
};

export type MatchCreatedNotification = {
  type: "match_created";
  data: {
    gameId: string;
    opponentId: string;
    opponentUsername: string;
    opponentRating: number;
    color: "white" | "black";
    time: number;
    increment: number;
  };
};

export type ChallengeErrorNotification = {
  type: "error";
  data: {
    message: string;
  };
};

export type Challenge = {
  id: number;
  challengerId: string;
  username: string;
  avatarUrl: string | null;
  color: "white" | "black" | "random";
  time: number;
  increment: number;
  createdAt: string;
};

export type NotificationWebSocketMessage =
  | ChallengeReceivedNotification
  | OpponentUnavailableNotification
  | ChallengeDeclinedNotification
  | MatchCreatedNotification
  | ChallengeErrorNotification;
