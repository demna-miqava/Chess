
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

const ViewFullStatsLink = () => {
  const { username } = useUser();
  return (
    <div className="text-right pt-4">
      <Link
        to={`/profile/${username}/stats`}
        className="text-foreground hover:text-muted-foreground text-sm cursor-pointer transition-colors"
      >
        View Full Stats
      </Link>
    </div>
  );
};

export default ViewFullStatsLink;
