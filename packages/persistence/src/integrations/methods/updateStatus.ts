import {
  type TokenProvider,
  type Result,
  type IntegrationStatus,
  fail,
  ok,
} from "@ccpilot/domain";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { integrationsTable } from "../../db/schema.ts";

export const updateStatus = async (
  userId: string,
  provider: TokenProvider,
  status: IntegrationStatus,
  errorMessage?: string,
): Promise<Result<void>> => {
  try {
    const result = await db
      .update(integrationsTable)
      .set({
        status: status,
        error: errorMessage ?? null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(integrationsTable.user_id, userId),
          eq(integrationsTable.provider, provider),
        ),
      )
      .returning({ id: integrationsTable.id });

    if (result.length === 0) {
      return fail(`No ${provider} integration found for the user!`);
    }

    return ok(undefined);
  } catch (err) {
    console.error("[INTEGRATIONS REPO] status update failed: ", err);
    return fail(`Failed to update status for ${provider}!`);
  }
};
