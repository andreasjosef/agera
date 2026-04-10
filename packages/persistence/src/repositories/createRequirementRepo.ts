import type { IRequirementRepository, Requirement } from "@ccpilot/domain";
import { requirementsTable } from "../db/schema.ts";
import { type Db } from "../db/client.ts";

export const createRequirementRepo = (db: Db): IRequirementRepository => {
  return {
    save: async (req: Requirement) => {
      console.log("saving a new requirment");
      const [row] = await db
        .insert(requirementsTable)
        .values({
          title: req.title,
          due: req.due,
          type: req.type,
          source: req.source,
        })
        .returning();

      console.log("saving a new requirment:", row);

      return { ok: true, value: req };
    },
    getAll: async () => {
      console.log("getting all requirments");
      return { ok: true, value: [] };
    },
  };
};
