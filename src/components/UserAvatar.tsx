import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  username: string;
  className?: string;
  alt?: string;
}

export const UserAvatar = ({
  src,
  username,
  alt,
  className,
}: UserAvatarProps) => {
  const fallback = username.slice(0, 2).toUpperCase();

  return (
    <Avatar className={cn("size-12", className)}>
      <AvatarImage src={src || undefined} alt={alt || `${username}-avatar`} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
