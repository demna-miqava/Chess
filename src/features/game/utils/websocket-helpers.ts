export const parseWebSocketMessage = <T>(
  message: MessageEvent | null
): T | null => {
  if (!message?.data) return null;
  try {
    return JSON.parse(message.data) as T;
  } catch {
    return null;
  }
};
