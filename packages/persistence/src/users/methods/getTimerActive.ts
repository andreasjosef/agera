import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { userStatusTable } from "../schema.ts";
import { fail, ok } from "@ccpilot/domain";

export const getTimerActive = async (userId: string) => {
  try {
    const [row] = await db
      .select({ timer_active: userStatusTable.timer_active })
      .from(userStatusTable)
      .where(eq(userStatusTable.user_id, userId));

    return ok(row);
  } catch (err) {
    console.error("[STATUS REPO] failed to get timer status");
    return fail("Could not get timer status !");
  }
};
