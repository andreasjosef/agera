import { type AppContext } from "../../shared/context.ts";
import { type Result } from "../../shared/result.ts";
import type { Requirement, NewRequirement } from "../definitions.ts";

export type SaveRequirementContext = Pick<AppContext, "userId"> & {
  repos: Pick<AppContext["repos"], "requirements">;
};

/**
 * Atomic primitive to persist a requirement to the database.
 */
export const saveRequirement = async (
  ctx: SaveRequirementContext,
  req: NewRequirement,
): Promise<Result<Requirement>> => {
  // TODO: some validation will have to happen here like
  //  - does this already exist in the db
  return ctx.repos.requirements.save(req, ctx.userId);
};
