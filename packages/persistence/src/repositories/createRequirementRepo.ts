import { IRequirementRepository, Requirement } from "@ccpilot/domain";
import { requirementsTable } from "../db/schema";
import { Db } from "../db/client";

export const createRequirementRepo = (db: Db) => {
  return {
    save: (req: Requirement) => {
      const requirements = db
        .insert(requirementsTable)
        .values({
          title: req.title,
          due: req.due,
          type: req.type,
          source: req.source,
        })
        .returning();

      console.log(requirements);
    },
    // getAll: () => {},
  };
};
