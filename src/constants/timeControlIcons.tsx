import { Bolt, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const TIME_CONTROL_ICONS = {
  bullet: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Bolt>) => (
    <Bolt className={cn("text-bullet", className)} {...props} />
  ),
  blitz: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Zap>) => (
    <Zap className={cn("text-blitz", className)} {...props} />
  ),
  rapid: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Clock>) => (
    <Clock className={cn("text-rapid", className)} {...props} />
  ),
};
