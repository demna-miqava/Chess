import { Button } from "@/components/ui/button";
import { GAME_BUTTON_STYLES } from "../constants/button-styles";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ActionButtonVariant = keyof typeof GAME_BUTTON_STYLES;

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant: ActionButtonVariant;
  className?: string;
  /**
   * Title for the confirmation popover.
   * If provided, onClick will require confirmation.
   */
  confirmTitle?: string;
  confirmText?: string;
};

export const ActionButton = ({
  onClick,
  icon,
  label,
  variant,
  className,
  confirmTitle,
  confirmText = "Confirm",
}: ActionButtonProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const needsConfirmation = !!confirmTitle;

  const handleConfirm = () => {
    onClick();
    setPopoverOpen(false);
  };

  const handleCancel = () => {
    setPopoverOpen(false);
  };

  const button = (
    <Button
      onClick={needsConfirmation ? undefined : onClick}
      className={className || GAME_BUTTON_STYLES[variant]}
      aria-label={label}
    >
      {icon}
      {label}
    </Button>
  );

  if (!needsConfirmation) {
    return button;
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>{button}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">{confirmTitle}</h4>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>{confirmText}</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
