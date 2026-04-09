import { type Result } from "../shared/result.ts";
import type { Requirement } from "./types.ts";

import type { IRequirementRepository } from "./repository.ts";

export const getRequirements = async (
  repo: IRequirementRepository,
  // TODO: We probably need to pass in the userid here later
): Promise<Result<Requirement[]>> => {
  return repo.getAll();
};

export const saveRequirement = async (
  repo: IRequirementRepository,
  req: Requirement, // NOTE: This might not be a full requirement yet in reality ie just NewReq or so and we need to fill in the rest in here like id etc
): Promise<Result<Requirement>> => {
  // TODO: some validation will have to happen here like
  //  - does this already exist in the db

  return repo.save(req);
};
