import { Link } from "react-router";
import { useUser } from "@/hooks/useUser";
import { UserAvatar } from "@/components/UserAvatar";

export const UserInfo = () => {
  const { image, username } = useUser();

  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${username}`}>
        <UserAvatar src={image} username={username} />
      </Link>
      <span className="text-sm font-medium">{username}</span>
    </div>
  );
};
