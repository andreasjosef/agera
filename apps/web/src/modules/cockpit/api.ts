import { ActiveTimerCountSchema, UserStatusSchema } from "@ccpilot/domain";
import {
  safePostItem,
  safeFetchItem,
  zodWrappedParser,
} from "@ccpilot/ts-fetch";
import { queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4000/api";
const UserStatusResponseSchema = zodWrappedParser(UserStatusSchema);

export const statusQueries = {
  getIsActiveStatus: () =>
    queryOptions({
      queryKey: ["status", "active"],
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/status/me`,
          UserStatusResponseSchema,
        );

        if (!result.ok) {
          throw new Error(result.error);
        }

        return result.value;
      },
    }),

  getActiveStatusCount: () =>
    queryOptions({
      queryKey: ["status", "count"],
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/status/count`,
          zodWrappedParser(ActiveTimerCountSchema),
        );

        if (!result.ok) {
          throw new Error(result.error);
        }

        return result.value;
      },
    }),
};

export const statusMutations = {
  toggleStatusActive: (isActive: boolean) => {
    console.log("[COCKPIT API] status toggle", isActive);
    return safePostItem(
      `${BASE_URL}/status/toggle`,
      { isActive },
      UserStatusResponseSchema,
    );
  },
};
