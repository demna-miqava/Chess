import { useState, useCallback } from "react";

export type TimeControlFormat = "bullet" | "blitz" | "rapid";

export interface TimeControl {
  format: TimeControlFormat;
  time: number;
  increment: number;
}

/**
 * Hook to manage time control selection
 * Combines format (bullet/blitz/rapid), time (in minutes), and increment (in seconds)
 */
export const useTimeControl = (
  initialFormat: TimeControlFormat = "blitz",
  initialTime = 180,
  initialIncrement = 0
) => {
  const [timeControl, setTimeControl] = useState<TimeControl>({
    format: initialFormat,
    time: initialTime,
    increment: initialIncrement,
  });

  const updateTimeControl = useCallback(
    (format: TimeControlFormat, time: number, increment: number = 0) => {
      setTimeControl({ format, time, increment });
    },
    []
  );

  return {
    timeControl,
    updateTimeControl,
    format: timeControl.format,
    time: timeControl.time,
    increment: timeControl.increment,
  };
};
