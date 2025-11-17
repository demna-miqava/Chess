import { Mail, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserInfo } from "./UserInfo";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <UserInfo />

      <nav className="flex items-center gap-4" aria-label="Quick actions">
        <Button
          variant="ghost"
          size="icon"
          aria-label="View friends list"
        >
          <Users className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="View messages"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
};
