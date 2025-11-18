import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { FullScreenLoader } from "./FullScreenLoader";

const publicRoutes = ["/", "/signin", "/signup", "/forgot-password"];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const { id, isPending } = useUser();

  if (isPending) {
    return <FullScreenLoader />;
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
