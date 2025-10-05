import { formatDate } from "@/lib/utils";

const InfoSection = ({
  userName,
  joinedAt,
  friendsCount,
}: {
  userName: string;
  joinedAt: string;
  friendsCount: number;
}) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">@{userName}</h1>
      </div>
      <div className="mt-auto flex items-center gap-2 text-sm text-foreground/70">
        <span>Joined {formatDate(joinedAt)}</span>
        <span>•</span>
        <span>{friendsCount} friends</span>
      </div>
    </div>
  );
};

export default InfoSection;
