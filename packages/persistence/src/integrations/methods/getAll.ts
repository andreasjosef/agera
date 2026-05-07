import { db } from "../../db/client.ts";
import { integrationsTable } from "../../db/schema.ts";
import {
  type IntegrationToken,
  type TokenProvider,
  fail,
  ok,
} from "@ccpilot/domain";
import { eq } from "drizzle-orm";
import { decryptToken } from "@ccpilot/crypto";

export const getAll = async (userId: string) => {
  try {
    const rows = await db
      .select()
      .from(integrationsTable)
      .where(eq(integrationsTable.user_id, userId));

    const tokenPayloads: IntegrationToken[] = rows.map((row) => ({
      token: decryptToken(row.encryptedToken),
      provider: row.provider as TokenProvider,
    }));

    return ok(tokenPayloads);
  } catch (err) {
    console.error("[INTEGRATIONS REPO] getAll failed: ", err);
    return fail(`Could not load integration tokens from DB!`);
  }
};
