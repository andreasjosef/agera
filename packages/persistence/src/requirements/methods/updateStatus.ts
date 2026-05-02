import { type StepGenerationStatus, ok, type Result } from "@ccpilot/domain";
import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";

import { requirementsTable } from "../schema.ts";

export const updateStatus = async (
  id: string,
  status: StepGenerationStatus,
): Promise<Result<void>> => {
  await db
    .update(requirementsTable)
    .set({ status })
    .where(eq(requirementsTable.id, id));

  return ok(undefined);
};
