import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useUser } from "@/hooks/useUser";

export const UserInfo = () => {
  const { fullName, image, userName } = useUser();
  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${userName}`}>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <span className="text-sm font-medium">{fullName}</span>
    </div>
  );
};
