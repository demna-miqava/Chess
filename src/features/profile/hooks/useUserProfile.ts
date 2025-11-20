import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";
import { QKEY_USER_PROFILE } from "@/constants/queryKeys";
import { useProfileUserId } from "@/hooks/useProfileUserId";

export const useUserProfile = () => {
  const userId = useProfileUserId();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: [QKEY_USER_PROFILE, userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  return {
    userId: userId,
    profile: data?.user,
    isPending,
    error,
    refetch,
  };
};
