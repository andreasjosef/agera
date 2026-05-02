import { ok } from "@ccpilot/domain";
import { db } from "../../db/client.ts";
import { toDomainRequirement, toDomainStep } from "../mappers.ts";

export const getSyncIncomplete = async (userId: string) => {
  const rows = await db.query.requirementsTable.findMany({
    where: (table, { and, inArray, eq }) =>
      and(
        eq(table.user_id, userId),
        inArray(table.status, ["GENERATING", "RAW"]),
      ),
    with: {
      steps: true,
    },
  });

  return ok(
    rows.map((row) => toDomainRequirement(row, row.steps.map(toDomainStep))),
  );
};
