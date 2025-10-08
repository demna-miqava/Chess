export type DrawOfferMessage = {
  type: "draw_offer";
};

export type DrawResponseMessage = {
  type: "draw_response";
  accepted: boolean;
};

export type GameEndedMessage = {
  type: "game_ended";
};

export type ResignMessage = {
  type: "resign";
  userId?: string;
};

export type AbortMessage = {
  type: "abort";
};

export type MoveMessage = {
  type: "move";
  move: {
    lan: string;
    san?: string;
    from: string;
    to: string;
  };
  userId?: string;
  fen?: string;
  pgn?: string;
};

export type InitialGameStateMessage = {
  type?: string;
  data?: {
    fen: string;
  };
  pgn?: string;
};

export type GameWebSocketMessage =
  | DrawOfferMessage
  | DrawResponseMessage
  | GameEndedMessage
  | ResignMessage
  | AbortMessage
  | MoveMessage
  | InitialGameStateMessage;
