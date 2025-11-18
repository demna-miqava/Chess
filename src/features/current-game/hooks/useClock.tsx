import { useEffect, useState, useRef } from "react";
import type { TimeControlType } from "@/types";
import {
  LOW_TIME_THRESHOLDS,
  TIME_CONTROL_BOUNDARIES,
  CLOCK_TICK_INTERVAL_MS,
  ONE_SECOND_MS,
} from "@/constants/time";

const getTimeControlFormat = (timeInSeconds: number): TimeControlType => {
  if (timeInSeconds < TIME_CONTROL_BOUNDARIES.bulletMax) return "bullet";
  if (timeInSeconds < TIME_CONTROL_BOUNDARIES.blitzMax) return "blitz";
  return "rapid";
};

export const useClock = ({
  startingTime,
  isActive,
  onTimeout,
  gameEnded = false,
  serverTimeLeft,
}: {
  startingTime: number; // in seconds
  isActive: boolean;
  onTimeout?: () => void;
  gameEnded?: boolean;
  serverTimeLeft?: number; // Time from server in milliseconds
}) => {
  const [time, setTime] = useState(
    serverTimeLeft ?? startingTime * ONE_SECOND_MS
  );
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);
  const timeoutCalledRef = useRef(false);

  const format = getTimeControlFormat(startingTime);
  const isLowTime = time <= LOW_TIME_THRESHOLDS[format];

  // Sync with server time when received
  useEffect(() => {
    if (serverTimeLeft !== undefined && serverTimeLeft !== null) {
      setTime(serverTimeLeft);
      lastTickRef.current = Date.now();
    }
  }, [serverTimeLeft]);

  // Handle timeout
  useEffect(() => {
    if (time === 0 && !timeoutCalledRef.current && onTimeout) {
      timeoutCalledRef.current = true;
      onTimeout();
    }
  }, [time, onTimeout]);

  // Countdown timer - runs between server updates for smooth display
  useEffect(() => {
    if (gameEnded || !isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    lastTickRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;

      setTime((prevTime) => Math.max(0, prevTime - elapsed));
    }, CLOCK_TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, gameEnded]);

  return { time, isLowTime };
};
