import { UserStatusSchema } from "@ccpilot/domain";
import { safePostItem, zodWrappedParser } from "@ccpilot/ts-fetch";

const BASE_URL = "http://localhost:4000/api";
const UserStatusResponseSchema = zodWrappedParser(UserStatusSchema);

export const cockpitMutations = {
  liftoff: () => {
    console.log("[COCKPIT API] liftoff");
    return safePostItem(
      `${BASE_URL}/status/timer/toggle`,
      null,
      UserStatusResponseSchema,
    );
  },
};
