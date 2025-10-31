import type { PlayerColor } from "@/features/game/types/game.types";
import type { RatingChanges } from "@/features/game/types/websocket-messages";

type RatingInfo = {
  startingRating?: number;
  newRating?: number;
  ratingChange?: number;
};

export const calculatePlayerRating = (
  baseRating: number,
  playerColor: PlayerColor,
  ratingChanges: RatingChanges | null,
  showRatings: boolean,
  isPlayerWhite: boolean
): RatingInfo => {
  const startingRating = showRatings ? baseRating : undefined;

  if (!ratingChanges || !startingRating) {
    return {
      startingRating,
      newRating: startingRating,
      ratingChange: undefined,
    };
  }

  const useWhiteRatings = (playerColor === "white") === isPlayerWhite;

  return {
    startingRating,
    newRating: useWhiteRatings
      ? ratingChanges.whiteNewRating
      : ratingChanges.blackNewRating,
    ratingChange: useWhiteRatings
      ? ratingChanges.whiteRatingChange
      : ratingChanges.blackRatingChange,
  };
};
