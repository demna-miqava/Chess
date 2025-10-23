import { Navigate, useLocation } from "react-router";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

const publicRoutes = ["/", "/signin", "/signup", "/forgot-password"];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const { id, isPending } = useUser();
  // TODO: change loader
  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-lime-500" />
      </div>
    );
  }
  // User is authenticated
  if (id) {
    // Redirect authenticated users away from public routes
    if (isPublicRoute) {
      return <Navigate to="/home" replace />;
    }
  } else {
    // User is not authenticated
    // Redirect unauthenticated users to signin
    if (!isPublicRoute) {
      return <Navigate to="/signin" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
