import { useParams } from "react-router-dom";
import { useUser } from "./useUser";

/**
 * Lightweight hook to get the userId for the current profile page.
 * Extracts from URL params if viewing another user's profile,
 * or falls back to the current user's ID.
 *
 * This hook doesn't make any API calls - use useUserProfile if you need profile data.
 */
export const useProfileUserId = () => {
  const { id: currentUserId } = useUser();
  const { id: urlId } = useParams<{ id: string }>();

  return urlId ? parseInt(urlId) : currentUserId || 0;
};
