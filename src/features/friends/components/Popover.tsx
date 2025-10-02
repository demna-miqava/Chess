import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Friend } from "@/types";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sword } from "lucide-react";
import { useNavigate } from "react-router";

const FriendPopover = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Friend;
}) => {
  const { username, friendFor, image } = data;
  // recieve id to fetch friend
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex-col gap-4">
          <div
            className="flex gap-6 cursor-pointer"
            onClick={() => {
              navigate(`/profile/${username}`);
            }}
          >
            <img src={image} alt={username} className="size-12 rounded-full" />
            <div>
              <h3>{username}</h3>
              <p>{friendFor}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <Button size="sm">
              <Sword />
              Challenge
            </Button>
            <Button size="sm">
              <MessageSquare />
              Message
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FriendPopover;
