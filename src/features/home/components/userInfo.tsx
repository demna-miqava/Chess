import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

export const UserInfo = () => {
  const user = {
    name: "Demna Mikava",
    email: "demna.mikava@gmail.com",
    image:
      "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
  };
  return (
    <div className="flex items-center gap-2">
      <Link to="/profile">
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
};
