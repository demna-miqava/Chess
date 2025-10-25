import { useEffect, useState, useRef } from "react";
import type { TimeControlFormat } from "@/features/create-game/hooks/useTimeControl";

const LOW_TIME_PER_FORMAT: Record<TimeControlFormat, number> = {
  rapid: 60000,
  blitz: 20000,
  bullet: 10000,
};

const getTimeControlFormat = (timeInSeconds: number): TimeControlFormat => {
  if (timeInSeconds < 180) return "bullet"; // < 3 minutes
  if (timeInSeconds < 600) return "blitz"; // < 10 minutes
  return "rapid";
};

export const useClock = ({
  startingTime,
  increment,
  isActive,
  onTimeout,
  gameEnded = false,
}: {
  startingTime: number; // in seconds
  increment?: number; // in seconds
  isActive: boolean;
  onTimeout?: () => void;
  gameEnded?: boolean;
}) => {
  const startingTimeMs = startingTime * 1000;
  const incrementMs = increment ? increment * 1000 : 0;

  const [time, setTime] = useState(startingTimeMs);
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);
  const timeoutCalledRef = useRef(false);

  const format = getTimeControlFormat(startingTime);
  const isLowTime = time <= LOW_TIME_PER_FORMAT[format];
  // TODO: Check requestAnimationFrame for better countdown experience
  useEffect(() => {
    setTime(startingTimeMs);
    timeoutCalledRef.current = false; // Reset timeout flag when time changes
  }, [startingTimeMs]);

  useEffect(() => {
    if (time === 0 && !timeoutCalledRef.current && onTimeout) {
      timeoutCalledRef.current = true;
      onTimeout();
    }
  }, [time, onTimeout]);

  useEffect(() => {
    if (gameEnded) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (incrementMs > 0) {
          setTime((prev) => prev + incrementMs);
        }
      }
      return;
    }

    lastTickRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;

      setTime((prevTime) => Math.max(0, prevTime - elapsed));
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [incrementMs, isActive, gameEnded]);

  return { time, isLowTime };
};
