import { Button } from "@/components/ui/button";

type Props = {
  onCancelRematchRequest: () => void;
};

const RematchRequested = ({ onCancelRematchRequest }: Props) => {
  return (
    <Button onClick={onCancelRematchRequest} className="w-full">
      Cancel
    </Button>
  );
};

export default RematchRequested;
