import { UserStatusSchema } from "@ccpilot/domain";
import { safePostItem, zodWrappedParser } from "@ccpilot/ts-fetch";

const BASE_URL = "http://localhost:4000/api";
const UserStatusResponseSchema = zodWrappedParser(UserStatusSchema);

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
