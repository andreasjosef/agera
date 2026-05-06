import { db } from "../../db/client.ts";
import { integrationsTable } from "../../db/schema.ts";
import { type TokenProvider, fail, ok } from "@ccpilot/domain";
import { encryptToken } from "@ccpilot/crypto";

export const save = async (
  userId: string,
  token: string,
  provider: TokenProvider,
) => {
  const encryptedToken = encryptToken(token);
  try {
    await db
      .insert(integrationsTable)
      .values({
        user_id: userId,
        provider: provider,
        encryptedToken: encryptedToken,
      })
      .onConflictDoUpdate({
        target: [integrationsTable.user_id, integrationsTable.provider],
        set: { encryptedToken: token },
      });
    return ok(undefined);
  } catch (err) {
    console.error("[INTEGRATIONS REPO] could not save token: ", err);
    return fail("Could not save token!");
  }
};
