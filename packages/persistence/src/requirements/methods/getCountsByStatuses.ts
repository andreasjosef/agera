import { db } from "../../db/client.ts";
import {
  type TokenProvider,
  type StepGenerationStatus,
  ok,
  fail,
} from "@ccpilot/domain";
import { count, and, eq, inArray } from "drizzle-orm";

import { requirementsTable } from "../schema.ts";

export const getCountsByStatuses = async (
  userId: string,
  provider: TokenProvider,
  statuses: StepGenerationStatus[],
) => {
  if (statuses.length === 0) return fail("Need Statuses to filter by!");

  const rows = await db
    .select({
      status: requirementsTable.status,
      count: count(),
    })
    .from(requirementsTable)
    .where(
      and(
        eq(requirementsTable.user_id, userId),
        eq(requirementsTable.source, provider),
        inArray(requirementsTable.status, statuses),
      ),
    )
    .groupBy(requirementsTable.status);

  const statusMap = rows.reduce(
    (acc, row) => {
      const status = row.status as StepGenerationStatus;
      acc[status] = row.count;
      return acc;
    },
    {} as Record<StepGenerationStatus, number>,
  );

  console.log("[DB REQS] statusMap: ", statusMap);

  return ok(statusMap);
};
