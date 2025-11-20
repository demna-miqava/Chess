import { useUserFriends } from "../hooks/useUserFriends";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/UserAvatar";
import { Link } from "react-router-dom";
import FriendPopover from "../../components/Popover";
import { useProfileUserId } from "@/hooks/useProfileUserId";
import { getProfileFriendsRoute } from "@/constants/routes";

const FriendsGrid = () => {
  const { friends, pagination } = useUserFriends({ defaultLimit: 20 });
  const userId = useProfileUserId();

  return (
    <aside className="rounded-2xl border p-4 flex flex-col gap-4">
      <Link to={getProfileFriendsRoute(userId || 0)}>
        <h3 className="text-sm font-semibold">
          Friends ({pagination?.total ?? 0})
        </h3>
      </Link>
      <div className="grid grid-cols-5 gap-2">
        {friends.map((friend) => (
          <div key={friend.username} className="flex justify-center">
            <Tooltip>
              <FriendPopover data={friend}>
                <TooltipTrigger>
                  <UserAvatar
                    src={friend.avatarUrl}
                    username={friend.username}
                    className="cursor-pointer"
                  />
                </TooltipTrigger>
              </FriendPopover>
              <TooltipContent>
                <p>{friend.username}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FriendsGrid;
