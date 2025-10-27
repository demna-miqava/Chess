import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchFriends } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { useQueryParams } from "@/hooks/useQueryParams";
import { QKEY_USER_FRIENDS } from "@/consts/queryKeys";

interface UseUserFriendsOptions {
  defaultPage?: number;
  defaultLimit?: number;
  searchQuery?: string;
  useLocalState?: boolean;
}

export const useUserFriends = ({
  defaultPage = 1,
  defaultLimit = 20,
  searchQuery,
  useLocalState = false,
}: UseUserFriendsOptions = {}) => {
  const { id: userId } = useUser();
  const { getNumberParam, getParam, setParam } = useQueryParams();

  // Use local state or URL params based on useLocalState flag
  const [localPage, setLocalPage] = useState(defaultPage);
  const urlPage = getNumberParam("page", defaultPage);
  const page = useLocalState ? localPage : urlPage;

  // Use searchQuery prop if provided, otherwise read from URL params
  const search =
    searchQuery !== undefined ? searchQuery : getParam("search") || "";

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.append("q", search);
    params.append("page", String(page));
    params.append("limit", String(defaultLimit));
    return params.toString();
  };

  const query = useQuery({
    queryKey: [QKEY_USER_FRIENDS, userId, page, defaultLimit, search],
    queryFn: () => searchFriends(buildQuery()),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const totalPages = query.data?.pagination.totalPages ?? 1;

  const setPage = (newPage: number) => {
    if (useLocalState) {
      setLocalPage(newPage);
    } else {
      setParam("page", newPage);
    }
  };

  return {
    friends: query.data?.data || [],
    pagination: query.data?.pagination,
    page,
    limit: defaultLimit,
    search,
    setPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    isLoading: query.isPending,
    isError: query.isError,
  };
};
