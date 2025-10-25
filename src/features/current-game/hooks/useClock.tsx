import { useEffect, useState, useRef } from "react";

const LOW_TIME_PER_FORMAT = {
  rapid: 60000,
  blitz: 20000,
  bullet: 10000,
};

const format = "bullet";
export const useClock = ({
  startingTime,
  increment,
  isActive,
  onTimeout,
}: {
  startingTime: number; // in seconds
  increment?: number; // in seconds
  isActive: boolean;
  onTimeout?: () => void;
}) => {
  const startingTimeMs = startingTime * 1000;
  const incrementMs = increment ? increment * 1000 : 0;

  const [time, setTime] = useState(startingTimeMs);
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);
  const timeoutCalledRef = useRef(false);

  const isLowTime = time <= LOW_TIME_PER_FORMAT[format];
  // TODO: Check requestAnimationFrame for better countdown experience
  useEffect(() => {
    setTime(startingTimeMs);
    timeoutCalledRef.current = false; // Reset timeout flag when time changes
  }, [startingTimeMs]);

  // Check for timeout
  useEffect(() => {
    if (time === 0 && !timeoutCalledRef.current && onTimeout) {
      timeoutCalledRef.current = true;
      onTimeout();
    }
  }, [time, onTimeout]);

  // Countdown logic when clock is active
  useEffect(() => {
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
  }, [incrementMs, isActive]);

  return { time, isLowTime };
};
