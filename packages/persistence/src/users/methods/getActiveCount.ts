import { count, eq } from "drizzle-orm";
import { fail, ok } from "@ccpilot/domain";
import { db } from "../../db/client.ts";
import { userStatusTable } from "../schema.ts";

export const getActiveCount = async () => {
  try {
    const [row] = await db
      .select({ count: count() })
      .from(userStatusTable)
      .where(eq(userStatusTable.active, true));

    return ok(row);
  } catch (err) {
    console.error("[STATUS REPO] failed to get active timer count");
    return fail("Could not get active timer count !");
  }
};
