import { apiRequest } from ".";
import type { PaginatedFriendsResponse, Friend } from "@/types";

export type FriendRequest = {
  id: number;
  senderId: string;
  receiverId: string;
  senderUsername: string;
  receiverUsername: string;
  senderAvatarUrl: string;
  receiverAvatarUrl: string;
  createdAt: string;
};

export type PendingFriendRequestsResponse = {
  incoming: FriendRequest[];
  outgoing: FriendRequest[];
};

export const getFriendSuggestions = (
  query: string
): Promise<{ data: Friend[] }> => {
  return apiRequest("get", `/friends/suggestions?${query}`);
};

export type SendFriendRequestParams = {
  receiverId: string;
};

export const searchFriends = (
  query: string
): Promise<PaginatedFriendsResponse> => {
  return apiRequest("get", `/friends/search?${query}`);
};

export const sendFriendRequest = (
  data: SendFriendRequestParams
): Promise<void> => {
  return apiRequest("post", "/friend-requests", { data });
};

export const getPendingFriendRequests =
  (): Promise<PendingFriendRequestsResponse> => {
    return apiRequest("get", "/friend-requests/pending");
  };

export const removeFriend = (friendId: string): Promise<void> => {
  return apiRequest("delete", `/friends/${friendId}`);
};
