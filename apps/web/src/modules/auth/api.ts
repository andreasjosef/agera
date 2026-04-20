import { queryOptions } from "@tanstack/react-query";
import {
  safeFetchItem,
  safePostItem,
  zodWrappedParser,
} from "@ccpilot/ts-fetch";
import { SafeUserSchema } from "@ccpilot/domain";

const BASE_URL = "http://localhost:4000/api/auth";

const authUserParser = zodWrappedParser(SafeUserSchema);

export const authQueries = {
  session: () =>
    queryOptions({
      queryKey: ["auth", "session"],
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/get-session`,
          authUserParser,
        );

        if (!result.ok) {
          throw new Error(result.error);
        }

        return result.value;
      },
      staleTime: 1000 * 60 * 5,
    }),
};

export const authMutations = {
  signIn: (credentials: unknown) => {
    return safePostItem(
      `${BASE_URL}/sign-in/email`,
      credentials,
      authUserParser,
    );
  },
};
