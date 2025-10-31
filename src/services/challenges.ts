import { apiRequest } from ".";
import type { Challenge } from "@/features/notifications/types/websocket-messages";

export const getChallenges = async (): Promise<Challenge[]> => {
  const response = await apiRequest<{ challenges: Challenge[] }>(
    "get",
    "/challenges"
  );
  return response.challenges;
};
