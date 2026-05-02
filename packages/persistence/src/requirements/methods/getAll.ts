import { db } from "../../db/client.ts";
import { ok } from "@ccpilot/domain";
import { toDomainRequirement, toDomainStep } from "../mappers.ts";

export const getAll = async (userId: string) => {
  const rows = await db.query.requirementsTable.findMany({
    where: (table, { and, eq }) => and(eq(table.user_id, userId)),
    with: { steps: true },
  });

  return ok(
    rows.map((row) => toDomainRequirement(row, row.steps.map(toDomainStep))),
  );
};
