import { Flame, Trophy, User } from "lucide-react";
import { useGetComprehensiveStats } from "../../hooks/useGetComprehensiveStats";

const SummaryExtraInfo = () => {
  const { statsData } = useGetComprehensiveStats();
  const { averageRating, bestWin, winStreak } = statsData;

  return (
    <div className="flex flex-col gap-8 max-w-lg w-full">
      <div className="mx-auto">
        <Container
          title="Average Rating"
          Icon={<User className="size-12" />}
          content={averageRating.toLocaleString()}
        />
      </div>
      <div className="flex justify-center w-full gap-24">
        <Container
          title="Best Win"
          Icon={<Trophy className="size-12" />}
          content={bestWin.toLocaleString()}
        />
        <Container
          title="Best Win Streak"
          Icon={<Flame className="size-12" />}
          content={winStreak.toLocaleString()}
        />
      </div>
    </div>
  );
};

const Container = ({
  title,
  Icon,
  content,
}: {
  title: string;
  Icon: React.ReactNode;
  content: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      {Icon}
      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-foreground font-medium text-xl">{content}</p>
      </div>
    </div>
  );
};

export default SummaryExtraInfo;
