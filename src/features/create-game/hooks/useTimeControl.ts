import { useState, useCallback } from "react";

export type TimeControlFormat = "bullet" | "blitz" | "rapid";

export interface TimeControl {
  format: TimeControlFormat;
  value: string;
}

/**
 * Hook to manage time control selection
 * Combines format (bullet/blitz/rapid) and value (3 min, 5 min, etc.) in a single state
 */
export const useTimeControl = (
  initialFormat: TimeControlFormat = "blitz",
  initialValue = "3"
) => {
  const [timeControl, setTimeControl] = useState<TimeControl>({
    format: initialFormat,
    value: initialValue,
  });

  const updateTimeControl = useCallback(
    (format: TimeControlFormat, value: string) => {
      setTimeControl({ format, value });
    },
    []
  );

  return {
    timeControl,
    updateTimeControl,
    format: timeControl.format,
    value: timeControl.value,
  };
};
