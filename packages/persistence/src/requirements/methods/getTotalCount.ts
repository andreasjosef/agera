import { db } from "../../db/client.ts";
import { type TokenProvider, ok } from "@ccpilot/domain";
import { count, eq, and } from "drizzle-orm";
import { requirementsTable } from "../schema.ts";
import { integrationsTable } from "../../integrations/schema.ts";

export const getTotalCount = async (
  userId: string,
  provider: TokenProvider,
) => {
  const [result] = await db
    .select({
      value: count(),
    })
    .from(requirementsTable)
    .innerJoin(
      integrationsTable,
      eq(requirementsTable.integrationId, integrationsTable.id),
    )
    .where(
      and(
        eq(integrationsTable.user_id, userId),
        eq(integrationsTable.provider, provider),
      ),
    );

  return ok(result?.value ?? 0);
};
