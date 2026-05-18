import { db } from "../../db/client.ts";
import { userStatusTable } from "../schema.ts";
import { fail, ok } from "@ccpilot/domain";

export const toggleActive = async (userId: string, isActive: boolean) => {
  try {
    const [row] = await db
      .insert(userStatusTable)
      .values({
        user_id: userId,
        active: isActive,
      })
      .onConflictDoUpdate({
        target: userStatusTable.user_id,
        set: { active: isActive },
      })
      .returning();

    console.log("[STATUS REPO]: timer status toggled !", row.active);
    return ok({ active: row.active });
  } catch (err) {
    console.error("[STATUS REPO] failed to toggle timer status ");
    return fail("Could not toggle timer status !");
  }
};
