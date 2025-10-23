import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";

const ViewFullStatsLink = () => {
  const { username } = useUser();
  const navigate = useNavigate();
  return (
    <div className="text-right pt-4">
      <button
        className="text-foreground hover:text-gray-300 text-sm cursor-pointer"
        onClick={() => navigate(`/profile/${username}/stats`)}
      >
        View Full Stats
      </button>
    </div>
  );
};

export default ViewFullStatsLink;
