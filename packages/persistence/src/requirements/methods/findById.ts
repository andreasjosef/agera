import { fail, ok, type Requirement, type Result } from "@ccpilot/domain";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { requirementsTable } from "../schema.ts";
import { toDomainRequirement, toDomainStep } from "../mappers.ts";

export const findById = async (
  userId: string,
  reqId: string,
): Promise<Result<Requirement>> => {
  try {
    const result = await db.query.requirementsTable.findFirst({
      where: and(
        eq(requirementsTable.id, reqId),
        eq(requirementsTable.user_id, userId),
      ),
      with: {
        steps: true,
      },
    });

    if (!result) return fail("Requirement not found!");

    return ok(toDomainRequirement(result, result.steps.map(toDomainStep)));
  } catch (error) {
    console.error("[PERSISTENCE] find req by id ", error);
    return fail("Unexpected error when loading requirement");
  }
};
