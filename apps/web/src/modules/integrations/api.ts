import {
  IntegrationStatusResponseSchema,
  SyncStatusResponseSchema,
  type TokenProvider,
} from "@ccpilot/domain";
import {
  safeFetchItem,
  safePostItem,
  zodWrappedParser,
} from "@ccpilot/ts-fetch";
import { queryOptions } from "@tanstack/react-query";

// TODO: Use proxy instead
const BASE_URL = "http://localhost:4000/api";
const SyncStatusResponseParser = zodWrappedParser(SyncStatusResponseSchema);

// TODO: This should send a request to /integrations and parse integrations response
export const integrationMutations = {
  connectCanvas: (data: unknown) => {
    return safePostItem(
      `${BASE_URL}/integrations/connect`,
      data,
      SyncStatusResponseParser,
    );
  },
};

export const integrationQueries = {
  getConnection: (provider: TokenProvider) => {
    return queryOptions({
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/integrations/${provider}`,
          zodWrappedParser(IntegrationStatusResponseSchema),
        );

        if (!result.ok) {
          throw new Error(result.error);
        }

        return result.value;
      },
      queryKey: ["integrations", "status"],
    });
  },
  getSyncStatus: (isEnabled: boolean) => {
    return queryOptions({
      queryFn: async () => {
        console.log("sync polling in progress");
        const result = await safeFetchItem(
          `${BASE_URL}/requirements/sync`,
          SyncStatusResponseParser,
        );

        if (!result.ok) {
          throw new Error(result.error);
        }

        return result.value;
      },
      queryKey: ["sync", "status"],
      enabled: isEnabled,
      refetchInterval: (query) => {
        const status = query.state.data?.status;

        if (status === "COMPLETE" || status === "ERROR") {
          return false;
        }

        return 500;
      },
    });
  },
};
