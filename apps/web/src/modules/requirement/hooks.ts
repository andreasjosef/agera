import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requirementMutations, requirementQueryOptions } from "./api";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import { SyncStatusSchema } from "@ccpilot/domain";

/**
 * Retrieves the singular, highest-priority next task currently calculated by the EF-Engine
 * **/
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

/**
 * Marks a specific step as complete and
 * invalidates the "Next Step" cache to immediately surface the next prioritized task
 * **/
export const useFinishStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...requirementMutations.finishStep(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
  });
};

/**
 * Triggers a fresh data pull from external providers (like Canvas)
 * and resets all related Integration and Requirement caches.
 * */
export const useInitiateSync = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log("initiateSync");

      const result = await safePostItem(
        "/api/requirements/sync",
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
