import { db } from "../../db/client.ts";
import { userStatusTable } from "../schema.ts";
import { fail, ok, Result, UserStatus } from "@ccpilot/domain";

export const toggleTimerStatus = async (
  userId: string,
): Promise<Result<UserStatus>> => {
  try {
    // TODO: Implement actual toggling
    await db
      .insert(userStatusTable)
      .values({
        user_id: userId,
        timer_active: true,
      })
      .onConflictDoUpdate({
        target: [userStatusTable.user_id, userStatusTable.timer_active],
        set: { timer_active: true },
      });

    console.log("[STATUS REPO]: timer status toggled !");
    return ok({ timer_active: true });
  } catch (err) {
    console.error("[STATUS REPO] failed to toggle timer status ", err);
    return fail("Could not toggle timer status !");
  }
};
