import { Button } from "@/components/ui/button";
import { GAME_BUTTON_STYLES } from "../constants/button-styles";

type ActionButtonVariant = keyof typeof GAME_BUTTON_STYLES;

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant: ActionButtonVariant;
  className?: string;
};

export const ActionButton = ({
  onClick,
  icon,
  label,
  variant,
  className,
}: ActionButtonProps) => {
  return (
    <Button onClick={onClick} className={className || GAME_BUTTON_STYLES[variant]}>
      {icon}
      {label}
    </Button>
  );
};
