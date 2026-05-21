import { fail, ok, type Result, type Step } from "@ccpilot/domain";
import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { stepsTable } from "../schema.ts";
import { toDomainStep } from "../mappers.ts";

export const findStepById = async (
  userId: string,
  stepId: string,
): Promise<Result<Step>> => {
  try {
    const result = await db.query.stepsTable.findFirst({
      where: eq(stepsTable.id, stepId),
      with: { requirement: true },
    });

    if (!result) return fail("Step not found!");
    if (!result.requirement || result.requirement.user_id !== userId)
      return fail("Step not found!");

    return ok(toDomainStep(result));
  } catch (error) {
    console.error("[PERSISTENCE] find step by id ", error);
    return fail("Unexpected error when loading step");
  }
};
