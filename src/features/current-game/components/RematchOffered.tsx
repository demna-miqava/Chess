import { Button } from "@/components/ui/button";

type Props = {
  onAcceptRematch: () => void;
  onDeclineRematch: () => void;
};

const RematchOffered = ({ onAcceptRematch, onDeclineRematch }: Props) => {
  return (
    <>
      <Button onClick={onAcceptRematch} className="flex-1 cursor-pointer">
        Accept
      </Button>
      <Button
        onClick={onDeclineRematch}
        variant="secondary"
        className="flex-1 cursor-pointer"
      >
        Decline
      </Button>
    </>
  );
};

export default RematchOffered;
