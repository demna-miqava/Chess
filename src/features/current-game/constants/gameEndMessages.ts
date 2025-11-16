interface GameEndMessage {
  title: string;
  description: string;
}

export const getGameEndMessage = (
  reason: string,
  isWinner: boolean
): GameEndMessage | null => {
  const messages: Record<string, GameEndMessage> = {
    resignation: {
      title: isWinner ? "You won by resignation!" : "You resigned",
      description: isWinner ? "Your opponent resigned." : "The game has ended.",
    },
    draw_agreement: {
      title: "Draw agreed",
      description: "The game ended in a draw.",
    },
    aborted: {
      title: "Game aborted!",
      description: "The game has been aborted.",
    },
    checkmate: {
      title: isWinner ? "You won by checkmate!" : "Checkmate",
      description: isWinner ? "Congratulations!" : "You lost the game.",
    },
    timeout: {
      title: isWinner ? "You won on time!" : "Time's up",
      description: isWinner
        ? "Your opponent ran out of time."
        : "You ran out of time.",
    },
  };

  return messages[reason] || null;
};
