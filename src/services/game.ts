import { apiRequest } from ".";

export type Game = {
  // id: string;
  // result: string;
  // timeControl: string;
  // type: string;
  // createdAt: string;
  // pgn?: string;
  // moves?: string;
  // players: {
  //   white: {
  //     username: string;
  //     rating: number;
  //     image: string | null;
  //   };
  //   black: {
  //     username: string;
  //     rating: number;
  //     image: string | null;
  //   };
  // };
  id: number;
  createdAt: Date;
  pgn: string | null;
  fen: string | null;
  winnerId: number | null;
  numMoves: number | null;
  time: number;
  increment: number | null;
  type: "bullet" | "blitz" | "rapid";
  status: "in_progress" | "finished";
  whitePlayer: {
    id: number | null;
    username: string;
    rating: number;
    avatarUrl: string;
  };
  blackPlayer: {
    id: number | null;
    username: string;
    rating: number;
    avatarUrl: string;
  };
};

export type PaginatedGamesResponse = {
  data: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type GetUserGamesParams = {
  username: string;
  page?: number;
  limit?: number;
};

export const getUserGames = async ({
  username,
  page = 1,
  limit = 10,
}: GetUserGamesParams): Promise<PaginatedGamesResponse> => {
  return apiRequest<PaginatedGamesResponse>(
    "get",
    `/games/archive/${username}?page=${page}&limit=${limit}`
  );
};
