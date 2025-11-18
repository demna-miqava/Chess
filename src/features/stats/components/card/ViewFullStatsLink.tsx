import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";

const ViewFullStatsLink = () => {
  const { username } = useUser();
  const navigate = useNavigate();
  return (
    <div className="text-right pt-4">
      <button
        className="text-foreground hover:text-muted-foreground text-sm cursor-pointer transition-colors"
        onClick={() => navigate(`/profile/${username}/stats`)}
      >
        View Full Stats
      </button>
    </div>
  );
};

export default ViewFullStatsLink;
