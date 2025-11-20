
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import { getProfileStatsRoute } from "@/constants/routes";

const ViewFullStatsLink = () => {
  const { id } = useUser();
  return (
    <div className="text-right pt-4">
      <Link
        to={getProfileStatsRoute(id || 0)}
        className="text-foreground hover:text-muted-foreground text-sm cursor-pointer transition-colors"
      >
        View Full Stats
      </Link>
    </div>
  );
};

export default ViewFullStatsLink;
