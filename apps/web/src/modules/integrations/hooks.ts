import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationMutations, integrationQueries } from "./api";
import { useEffect } from "react";
import { TokenProvider } from "@ccpilot/domain";

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

export const useSyncPolling = (
  provider: TokenProvider,
  integrationStatus?: string,
) => {
  const isEnabled =
    integrationStatus === "STABLE" || integrationStatus === "SYNCING";

  const { data: pollingData, refetch } = useQuery(
    integrationQueries.getSyncStatus(isEnabled, provider),
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pollingData) return;

    if (pollingData.status === "PROCESSING") {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    }

    if (pollingData.status === "COMPLETE") {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
      queryClient.invalidateQueries({ queryKey: ["integrations", "status"] });
    }
  }, [pollingData?.status, queryClient]);

  return { pollingData, refetch };
};
