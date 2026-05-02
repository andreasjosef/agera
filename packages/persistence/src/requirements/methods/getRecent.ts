import { db } from "../../db/client.ts";
import { ok } from "@ccpilot/domain";
import { toDomainRequirement, toDomainStep } from "../mappers.ts";

export const getRecent = async (
  userId: string,
  timeWinodwMinutes: number = 10,
) => {
  const threshold = new Date(Date.now() - timeWinodwMinutes * 60000);

  const rows = await db.query.requirementsTable.findMany({
    where: (table, { and, eq, gte }) =>
      and(eq(table.user_id, userId), gte(table.updatedAt, threshold)),
    with: { steps: true },
  });

  return ok(
    rows.map((row) => toDomainRequirement(row, row.steps.map(toDomainStep))),
  );
};
