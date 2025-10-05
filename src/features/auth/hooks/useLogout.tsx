import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const logout = () => {
    clearUser();
    navigate("/signin");
  };

  return { logout };
};
