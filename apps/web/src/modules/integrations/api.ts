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
  getSyncStatus: (isEnabled: boolean, provider: TokenProvider) => {
    return queryOptions({
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/requirements/sync/${provider}`,
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

        console.log("[GET SYNC STATUS QUERY] status: ", status);

        if (status === "INITIALIZED" || status === "PROCESSING") {
          return 500;
        }

        return false;
      },
    });
  },
};
