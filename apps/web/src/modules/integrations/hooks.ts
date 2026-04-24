import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationMutations, syncQueries } from "./api";
import { useEffect } from "react";

export const useCanvasConnect = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: unknown) => integrationMutations.connectCanvas(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });

  return {
    mutate,
    connecting: isPending,
    syncData: data,
  };
};

export const useSyncPolling = () => {
  // TODO: Should this be a store ?
  const { data: pollingData, refetch } = useQuery(syncQueries.getStatus());
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pollingData) return;

    if (pollingData.status === "COMPLETE") {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    }
  }, [pollingData?.status, queryClient]);

  return { pollingData, refetch };
};
