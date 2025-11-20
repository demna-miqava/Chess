export interface Friend {
  id: number;
  username: string;
  avatarUrl: string;
  friendsSince: string;
  blitzRating: number;
  bulletRating: number;
  rapidRating: number;
}

export type PaginatedFriendsResponse = {
  data: Friend[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/**
 * Base friend action handlers shared across all friend interactions
 */
interface BaseFriendActionHandlers {
  onChallenge?: (friend: Friend) => void;
  onMessage?: (friendId: number) => void;
}

export interface FriendActionHandlers extends BaseFriendActionHandlers {
  onRemove?: (friendId: number) => void;
}

export interface FriendSuggestionActionHandlers
  extends BaseFriendActionHandlers {
  onAddFriend?: (friendId: number) => void;
}

export interface FriendsData {
  friends: Friend[];
  suggestions: Friend[];
}
