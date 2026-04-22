import { safePostItem, zodWrappedParser } from "@ccpilot/ts-fetch";

// TODO: Use proxy instead
const BASE_URL = "http://localhost:4000/api/requirements";

// TODO: Create zod parser for sync response

export const integrationMutations = {
  connectCanvas: (data: unknown) => {
    console.log("data", data);
    return safePostItem(`${BASE_URL}/sync`, data);
  },
};
