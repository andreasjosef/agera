import { type Result, fail, ok } from "@ccpilot/domain";
import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { stepsTable } from "../schema.ts";

export const completeStep = async (stepId: string): Promise<Result<void>> => {
  try {
    await db
      .update(stepsTable)
      .set({ completed: true })
      .where(eq(stepsTable.id, stepId));
    return ok(undefined);
  } catch (error) {
    return fail("Could not update status for the step!");
  }
};
