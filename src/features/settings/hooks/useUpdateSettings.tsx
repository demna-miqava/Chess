import { QKEY_USER_SETTINGS } from "@/consts/queryKeys";
import { updateSettings, type Settings } from "@/services/settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<Settings>) => updateSettings(settings),
    onSuccess: (response) => {
      queryClient.setQueryData([QKEY_USER_SETTINGS], response);
      toast.success("Settings updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update settings");
    },
  });
};
