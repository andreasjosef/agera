import { useMutation, useQueryClient } from "@tanstack/react-query";
import { integrationMutations } from "./api";
import { useNavigate } from "@tanstack/react-router";

export const useCanvasConnect = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: unknown) => integrationMutations.connectCanvas(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      navigate({ to: "/app/dashboard" });
    },
  });

  return {
    mutate,
    connecting: isPending,
    syncData: data,
  };
};
