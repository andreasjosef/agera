import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusMutations } from "./api";

export const useToggleAcitve = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleStatusActive } = useMutation({
    mutationFn: statusMutations.toggleStatusActive,
    mutationKey: ["status", "toggle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  return { toggleStatusActive };
};
