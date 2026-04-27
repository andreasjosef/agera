import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationMutations, integrationQueries } from "./api";
import { useEffect } from "react";

export const useCanvasConnect = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: unknown) => integrationMutations.connectCanvas(data),
    onSuccess: () => {
      queryClient.setQueryData(["sync", "status"], undefined);

      queryClient.invalidateQueries({ queryKey: ["integrations", "status"] });
      queryClient.invalidateQueries({ queryKey: ["sync", "status"] });

      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });

  return {
    mutate,
    connecting: isPending,
    syncData: data,
  };
};

export const useSyncPolling = (integrationStatus?: string) => {
  const isEnabled = integrationStatus === "STABLE";

  const { data: pollingData, refetch } = useQuery(
    integrationQueries.getSyncStatus(isEnabled),
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pollingData) return;

    if (pollingData.status === "COMPLETE") {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
      queryClient.invalidateQueries({ queryKey: ["integrations", "status"] });
    }
  }, [pollingData?.status, queryClient]);

  return { pollingData, refetch };
};
