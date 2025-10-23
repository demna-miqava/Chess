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
}: {
  startingTime: number; // in seconds
  increment?: number; // in seconds
  isActive: boolean;
}) => {
  // Convert seconds to milliseconds for internal use
  const startingTimeMs = startingTime * 1000;
  const incrementMs = increment ? increment * 1000 : 0;

  const [time, setTime] = useState(startingTimeMs);
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  const isLowTime = time <= LOW_TIME_PER_FORMAT[format];
  // TODO: Check requestAnimationFrame for better countdown experience
  // Update time when startingTime changes (external updates)
  useEffect(() => {
    setTime(startingTimeMs);
  }, [startingTimeMs]);

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
