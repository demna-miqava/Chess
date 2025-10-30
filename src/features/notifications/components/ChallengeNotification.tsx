import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { Check, X } from "lucide-react";
import { useManageChallenge } from "../hooks/useManageChallenge";
import { toast } from "sonner";
import { formatTimeControl } from "@/utils/timeControl";

type NotificationItem = {
  challengerId: string;
  username: string;
  avatar: string | null;
  time: number;
  increment: number;
};

const ChallengeNotification = ({
  challengerId,
  username,
  avatar,
  time,
  increment,
}: NotificationItem) => {
  const { handleAccept, handleDecline } = useManageChallenge();

  const onAccept = () => {
    handleAccept(challengerId);
  };

  const onDecline = () => {
    handleDecline(challengerId);
  };

  const onClose = () => {
    toast.dismiss();
  };

  return (
    <div className="flex gap-2 relative">
      <button
        onClick={onClose}
        className="absolute -top-1 -right-1 p-1 rounded-full hover:bg-muted transition-colors"
        aria-label="Close notification"
      >
        <X className="h-3 w-3" />
      </button>
      <UserAvatar src={avatar} username={username} />
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          <span className="font-semibold">{username}</span> challenged you to a{" "}
          {formatTimeControl(time, increment)} match!
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="default"
            onClick={onAccept}
            className="h-7 text-xs"
          >
            <Check className="h-3 w-3 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDecline}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeNotification;
