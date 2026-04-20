import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authMutations, authQueries } from "./api";
import { useNavigate } from "@tanstack/react-router";

export const useSession = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(authQueries.session());

  if (!user) return null;

  return {
    user: user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    error,
    status: isLoading ? "loading" : user ? "authenticated" : "unauthenticated",
  };
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authMutations.signOut,
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });

  return {
    logout: mutate,
    isLoggingOut: isPending,
  };
};
