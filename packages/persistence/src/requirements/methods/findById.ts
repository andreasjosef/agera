import { fail, ok, type Requirement, type Result } from "@ccpilot/domain";
import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { requirementsTable } from "../schema.ts";
import { toDomainRequirement, toDomainStep } from "../mappers.ts";

export const findById = async (reqId: string): Promise<Result<Requirement>> => {
  const result = await db.query.requirementsTable.findFirst({
    where: eq(requirementsTable.id, reqId),
    with: {
      steps: true,
    },
  });

  if (!result) return fail("Requirement not found!");

  return ok(toDomainRequirement(result, result.steps.map(toDomainStep)));
};
