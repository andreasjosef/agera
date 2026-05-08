import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requirementQueryOptions } from "./api";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import { SyncStatusSchema } from "@ccpilot/domain";

export const useNextStep = () => {
  const queryClient = useQueryClient();
  const {
    data: nextStep,
    isLoading,
    error,
  } = useQuery(requirementQueryOptions.next);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["requirements", "next"] });
  };

  return { nextStep, isLoading, error, refresh };
};

export const useInitiateSync = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log("initiateSync");

      const result = await safePostItem(
        "http://localhost:4000/api/requirements/sync",
        {},
        zodRawParser(SyncStatusSchema),
      );

      if (!result.ok) throw new Error(result.error);
      return result.value;
    },
    onSuccess: () => {
      // TODO: Does not trigger useSyncPolling !
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
  });
};
