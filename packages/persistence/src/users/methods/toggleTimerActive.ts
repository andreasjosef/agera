import { sql } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { userStatusTable } from "../schema.ts";
import { fail, ok } from "@ccpilot/domain";

export const toggleTimerActive = async (userId: string) => {
  try {
    // TODO: Implement actual toggling
    const [row] = await db
      .insert(userStatusTable)
      .values({
        user_id: userId,
        timer_active: true,
      })
      .onConflictDoUpdate({
        target: userStatusTable.user_id,
        set: { timer_active: sql`NOT ${userStatusTable.timer_active}` },
      })
      .returning();

    console.log("[STATUS REPO]: timer status toggled !");
    return ok({ timer_active: row.timer_active });
  } catch (err) {
    console.error("[STATUS REPO] failed to toggle timer status ");
    return fail("Could not toggle timer status !");
  }
};
