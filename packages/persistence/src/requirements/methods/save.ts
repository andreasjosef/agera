import { db } from "../../db/client.ts";
import { type NewRequirement, ok } from "@ccpilot/domain";
import { requirementsTable } from "../schema.ts";
import { toDomainRequirement } from "../mappers.ts";

export const save = async (req: NewRequirement, userId: string) => {
  const [row] = await db
    .insert(requirementsTable)
    .values({
      title: req.title,
      url: req.url,
      due: req.due,
      type: req.type,
      source: req.source,
      user_id: userId,
      integrationId: req.integrationId,
      externalId: req.externalId,
    })
    .onConflictDoUpdate({
      target: [requirementsTable.integrationId, requirementsTable.externalId],
      set: { title: req.title, due: req.due },
    })
    .returning();

  return ok(toDomainRequirement(row));
};
