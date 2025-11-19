import { apiRequest } from ".";
import type { PaginatedGamesResponse, GetUserGamesParams, Game } from "@/types";

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

export const getGameById = async (gameId: string): Promise<Game> => {
  return apiRequest<Game>("get", `/games/${gameId}`);
};
