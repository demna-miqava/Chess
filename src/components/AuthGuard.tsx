import { Navigate, useLocation } from "react-router";
import Cookies from "js-cookie";

const publicRoutes = ["/", "/signin", "/signup", "/forgot-password"];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("token");
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // User is authenticated
  if (token) {
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
