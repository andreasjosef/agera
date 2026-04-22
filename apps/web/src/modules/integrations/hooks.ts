import { useMutation } from "@tanstack/react-query";
import { integrationMutations } from "./api";

export const useCanvasConnect = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: unknown) => integrationMutations.connectCanvas(data),
    onSuccess: () => {
      // TODO: Do we need to handle something here ?
    },
  });

  return {
    mutate,
    connecting: isPending,
    syncData: data,
  };
};
