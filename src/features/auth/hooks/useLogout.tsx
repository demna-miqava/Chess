import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/user";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearUser();
      navigate("/signin");
    },
    onError: () => {
      // Even if the API call fails, clear local state and redirect
      clearUser();
      navigate("/signin");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return { logout, isLoading: logoutMutation.isPending };
};
