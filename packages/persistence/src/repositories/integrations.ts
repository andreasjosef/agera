import {
  fail,
  ok,
  type Integration,
  type IntegrationToken,
  type IIntegrationRepository,
  type TokenProvider,
} from "@ccpilot/domain";

import { type Db } from "../db/client.ts";
import { integrationsTable } from "../db/schema.ts";

import { and, eq } from "drizzle-orm";

export const createIntegrationsRepository = (
  db: Db,
): IIntegrationRepository => {
  return {
    save: async (userId: string, token: string, provider: TokenProvider) => {
      try {
        await db
          .insert(integrationsTable)
          .values({
            user_id: userId,
            provider: provider,
            encryptedToken: token,
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
    },

    getForProvider: async (userId: string, provider: TokenProvider) => {
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

        return ok(row);
      } catch (err) {
        console.error("[INTEGRATIONS REPO] getForProvider failed: ", err);
        return fail(`Could not load ${provider} token!`);
      }
    },

    getAll: async (userId: string) => {
      try {
        const rows = await db
          .select()
          .from(integrationsTable)
          .where(eq(integrationsTable.user_id, userId));

        const tokenPayloads: IntegrationToken[] = rows.map((row) => ({
          token: row.encryptedToken,
          provider: row.provider as TokenProvider,
        }));

        return ok(tokenPayloads);
      } catch (err) {
        console.error("[INTEGRATIONS REPO] getAll failed: ", err);
        return fail(`Could not load integration tokens from DB!`);
      }
    },
  };
};
