import { useQuery } from "@tanstack/react-query";
import { authQueries } from "./api";

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
