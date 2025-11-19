import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const GameNotFound = () => {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center p-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Game Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The game you're looking for doesn't exist or has been removed.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          to={ROUTES.HOME}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
