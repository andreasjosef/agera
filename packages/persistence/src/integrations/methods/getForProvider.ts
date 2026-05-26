import {
  type TokenProvider,
  type Integration,
  type Result,
  fail,
  ok,
} from "@ccpilot/domain";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { integrationsTable } from "../../db/schema.ts";
import { decryptToken } from "@ccpilot/crypto";

export const getForProvider = async (
  userId: string,
  provider: TokenProvider,
): Promise<Result<Integration>> => {
  try {
    const [row] = await db
      .select()
      .from(integrationsTable)
      .where(
        and(
          eq(integrationsTable.user_id, userId),
          eq(integrationsTable.provider, provider),
        ),
      )
      .limit(1);

    if (!row) return fail(`No ${provider} token found for this user!`);

    const decryptedToken = decryptToken(row.encryptedToken);

    // TODO: this should be moved a toDomainIntegration mapper
    return ok({
      token: decryptedToken,
      id: row.id,
      provider: row.provider,
      status: row.status,
      error: row.error ?? undefined,
      lastSync: row.updatedAt,
    });
  } catch (err) {
    console.error("[INTEGRATIONS REPO] getForProvider failed: ", err);
    return fail(`Could not load ${provider} token!`);
  }
};
