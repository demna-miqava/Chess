import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "@/services/user";
import { useQueryParams } from "@/hooks/useQueryParams";
import { QKEY_USER_FRIENDS } from "@/constants/queryKeys";
import { useProfileUserId } from "@/hooks/useProfileUserId";

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
  const userId = useProfileUserId();
  const [urlPageStr, setUrlPageStr] = useQueryParams(
    "page",
    String(defaultPage)
  );
  const [searchParam] = useQueryParams("search", "");

  // Use local state or URL params based on useLocalState flag
  const [localPage, setLocalPage] = useState(defaultPage);
  const urlPage = parseInt(urlPageStr) || defaultPage;
  const page = useLocalState ? localPage : urlPage;

  // Use searchQuery prop if provided, otherwise read from URL params
  const search = searchQuery !== undefined ? searchQuery : searchParam;

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.append("q", search);
    params.append("page", String(page));
    params.append("limit", String(defaultLimit));
    return params.toString();
  };

  const query = useQuery({
    queryKey: [QKEY_USER_FRIENDS, userId, page, defaultLimit, search],
    queryFn: () => getUserFriends(userId || 0, buildQuery()),
    enabled: !!userId,
  });

  const totalPages = query.data?.pagination.totalPages ?? 1;

  const setPage = (newPage: number) => {
    if (useLocalState) {
      setLocalPage(newPage);
    } else {
      setUrlPageStr(String(newPage));
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
