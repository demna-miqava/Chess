import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useUser } from "@/hooks/useUser";

export const UserInfo = () => {
  const { image, username } = useUser();

  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${username}`}>
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <span className="text-sm font-medium">{username}</span>
    </div>
  );
};
