import { User } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

interface PlayerAvatarProps {
  username: string;
  avatarUrl?: string | null;
  isOpponent?: boolean;
  size?: "sm" | "md";
}

export const PlayerAvatar = ({
  username,
  avatarUrl,
  isOpponent = false,
  size = "md",
}: PlayerAvatarProps) => {
  const sizeClass = size === "sm" ? "size-8" : "size-10";
  const iconSize = size === "sm" ? "size-4" : "size-6";

  return (
    <div
      className={`flex ${sizeClass} items-center justify-center overflow-hidden rounded-full ${
        isOpponent ? "bg-[#3d3d3d]" : ""
      }`}
    >
      {isOpponent && !avatarUrl ? (
        <User className={iconSize} />
      ) : (
        <UserAvatar src={avatarUrl} username={username} />
      )}
    </div>
  );
};
