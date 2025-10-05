import { Bolt, Clock, Zap } from "lucide-react";
import { cn } from "./lib/utils";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);
export const TIME_CONTROL_ICONS = {
  bullet: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Bolt>) => (
    <Bolt className={cn("text-amber-300", className)} {...props} />
  ),
  blitz: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Zap>) => (
    <Zap className={cn("text-amber-400", className)} {...props} />
  ),
  rapid: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Clock>) => (
    <Clock className={cn("text-green-400", className)} {...props} />
  ),
};
