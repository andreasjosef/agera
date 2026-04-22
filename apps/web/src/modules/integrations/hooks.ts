import { useMutation, useQueryClient } from "@tanstack/react-query";
import { integrationMutations } from "./api";

export const useCanvasConnect = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: integrationMutations.connectCanvas,
    onSuccess: () => {
      queryClient.clear();
      // TODO: Do we need anything more here ?
    },
  });

  return {
    canvasConnect: mutate,
    canvasConnecting: isPending,
  };
};
