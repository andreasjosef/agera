import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import {
  type NewStep,
  type StepGenerationStatus,
  fail,
  ok,
} from "@ccpilot/domain";
import { toDbStep } from "../mappers.ts";
import { stepsTable } from "../schema.ts";
import { requirementsTable } from "../schema.ts";

export const updateSteps = async (
  reqId: string,
  steps: NewStep[],
  status: StepGenerationStatus,
) => {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(stepsTable).where(eq(stepsTable.requirement_id, reqId));

      if (steps.length > 0) {
        const insertRows = steps.map((step) => toDbStep(step, reqId));
        await tx.insert(stepsTable).values(insertRows);
      }

      await tx
        .update(requirementsTable)
        .set({ status })
        .where(eq(requirementsTable.id, reqId));
    });

    return ok(undefined);
  } catch (error) {
    return fail("Update Step Transaction Failed!");
  }
};
