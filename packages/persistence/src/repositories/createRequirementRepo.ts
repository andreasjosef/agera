import { IRequirementRepository, Requirement, ok } from "@ccpilot/domain";
import { type Db } from "../db/client.ts";
import { requirementsTable } from "../db/schema.ts";

export const createRequirementRepo = (db: Db): IRequirementRepository => {
  return {
    save: async (req: Requirement) => {
      const [rows] = await db
        .insert(requirementsTable)
        .values({
          id: String(new Date()),
          title: req.title,
          due: req.due,
          type: req.type,
          source: req.source,
        })
        .returning();

      // NOTE: return hardcoded steps for now. We will probably need to make a join between tables to get actual steps
      return ok({ ...rows, steps: [] });
    },
    getAll: async () => {
      const rows = await db.select().from(requirementsTable);

      // TODO: Get steps via join
      const requirements: Requirement[] = rows.map((req) => ({
        ...req,
        steps: [],
      }));

      return ok(requirements);
    },
  };
};
