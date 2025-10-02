import { Bolt, Clock, Puzzle, Zap } from "lucide-react";

import { PerformanceCard } from "./PerformanceCard";

const performanceStats = [
  {
    icon: <Bolt className="size-8 text-yellow-400" />,
    label: "Bullet",
    rating: 1251,
    delta: 83,
    trend: "up" as const,
  },
  {
    icon: <Zap className="size-8 text-lime-400" />,
    label: "Blitz",
    rating: 1415,
    delta: 292,
    trend: "up" as const,
  },
  {
    icon: <Clock className="size-8 text-emerald-400" />,
    label: "Rapid",
    rating: 1574,
    delta: -9,
    trend: "down" as const,
  },
  {
    icon: <Puzzle className="size-8 text-orange-400" />,
    label: "Puzzles",
    rating: 2365,
    delta: 21,
    trend: "up" as const,
  },
];

export const PerformanceShowcase = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
      {performanceStats.map((stat) => (
        <PerformanceCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default PerformanceShowcase;
