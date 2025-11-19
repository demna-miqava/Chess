import { useQuery } from "@tanstack/react-query";
import { getGameById } from "@/services/game";
import { QKEY_GAME_BY_ID } from "@/constants/queryKeys";

export const useGameData = (gameId: string | undefined) => {
  return useQuery({
    queryKey: [QKEY_GAME_BY_ID, gameId],
    queryFn: () => getGameById(gameId!),
    enabled: !!gameId,
    retry: false,
  });
};
