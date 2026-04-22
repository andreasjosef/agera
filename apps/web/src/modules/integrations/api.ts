import { SyncStatusSchema } from "@ccpilot/domain";
import { safePostItem, zodWrappedParser } from "@ccpilot/ts-fetch";

// TODO: Use proxy instead
const BASE_URL = "http://localhost:4000/api/requirements";

const SyncStatusParser = zodWrappedParser(SyncStatusSchema);

export const integrationMutations = {
  connectCanvas: (data: unknown) => {
    return safePostItem(`${BASE_URL}/sync`, data, SyncStatusParser);
  },
};
