import { useQuery, useQueryClient } from "@tanstack/react-query";
import { requirementQueryOptions } from "./api";

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
