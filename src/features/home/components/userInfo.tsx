import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useUser } from "@/hooks/useUser";

export const UserInfo = () => {
  const { image, userName } = useUser();

  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${userName}`}>
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <span className="text-sm font-medium">{userName}</span>
    </div>
  );
};
