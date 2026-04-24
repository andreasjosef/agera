import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationMutations, syncQueries } from "./api";
import { useEffect, useState } from "react";

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
  const [currentSyncStatus, setCurrentSyncStatus] = useState("");
  const { data: pollingData, refetch } = useQuery(
    syncQueries.getStatus(currentSyncStatus),
  );

  useEffect(() => {
    console.log("useSyncPolling: polling data updated");
    if (pollingData) {
      setCurrentSyncStatus(pollingData.status);
    }
  }, [pollingData]);

  return { pollingData, refetch };
};
