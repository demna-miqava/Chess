import { useUser } from "@/hooks/useUser";
import InfoSection from "./InfoSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileHeader = () => {
  const { username, joinedAt, friendsCount, image } = useUser();
  return (
    <header className="w-full flex flex-wrap items-start gap-6 border p-4 rounded-lg">
      <Avatar className="size-40 sm:size-48">
        {image && <AvatarImage src={image} alt={username} />}
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <InfoSection
        username={username}
        joinedAt={joinedAt}
        friendsCount={friendsCount}
      />
    </header>
  );
};

export default ProfileHeader;
