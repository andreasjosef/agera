import {
  IntegrationsConnectResponseSchema,
  SyncStatusResponse,
} from "@ccpilot/domain";
import { safePostItem, zodWrappedParser } from "@ccpilot/ts-fetch";
import { queryOptions } from "@tanstack/react-query";

// TODO: Use proxy instead
const BASE_URL = "http://localhost:4000/api";
const IntegrationsConnectResponseParser = zodWrappedParser(
  IntegrationsConnectResponseSchema,
);

// TODO: This should send a request to /integrations and parse integrations response
export const integrationMutations = {
  connectCanvas: (data: unknown) => {
    return safePostItem(
      `${BASE_URL}/integrations/connect`,
      data,
      IntegrationsConnectResponseParser,
    );
  },
};

export const syncQueries = {
  getStatus: (currentSyncStatus: string) => {
    return queryOptions({
      queryFn: async (): Promise<SyncStatusResponse> => {
        // Simulate polling (infinite)
        const result = new Promise<SyncStatusResponse>(async (resolve) => {
          console.log("syncQueries.getStatus: call");

          setTimeout(() => {
            resolve({ status: "PROCESSING", payload: [] });
          }, 500);
        });

        return result;
      },
      queryKey: ["sync", "status"],
      refetchInterval: ["INITIALIZED", "PROCESSING"].includes(currentSyncStatus)
        ? 1000
        : false,

      enabled: !!currentSyncStatus,
    });
  },
};
