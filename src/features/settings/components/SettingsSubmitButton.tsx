import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SettingsSubmitButtonProps = {
  isLoading: boolean;
};

export const SettingsSubmitButton = ({
  isLoading,
}: SettingsSubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
      Save Changes
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};
