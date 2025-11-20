import { apiRequest } from ".";
import type { PaginatedGamesResponse, GetUserGamesParams, Game } from "@/types";
import { getUserGames as getUserGamesAPI } from "./user";

export const getUserGames = async ({
  userId,
  page = 1,
  limit = 10,
}: GetUserGamesParams): Promise<PaginatedGamesResponse> => {
  const query = `page=${page}&limit=${limit}`;
  return getUserGamesAPI(userId, query);
};

export const getGameById = async (gameId: string): Promise<Game> => {
  return apiRequest<Game>("get", `/games/${gameId}`);
};
