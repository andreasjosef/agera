import { db } from "../../db/client.ts";
import { type NewRequirement, ok } from "@ccpilot/domain";
import { requirementsTable } from "../schema.ts";
import { toDomainRequirement } from "../mappers.ts";

export const save = async (req: NewRequirement, userId: string) => {
  const [row] = await db
    .insert(requirementsTable)
    .values({
      title: req.title,
      due: req.due,
      type: req.type,
      source: req.source,
      user_id: userId,
      integrationId: req.integrationId,
    })
    .returning();

  return ok(toDomainRequirement(row));
};
