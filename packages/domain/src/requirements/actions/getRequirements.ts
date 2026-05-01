import { type Result } from "../../shared/result.ts";
import { type IRequirementRepository } from "../repository.ts";
import { type Requirement } from "../definitions.ts";

/**
 * Retrieves the full collection of requirements for a specific user.
 */
export const getRequirements = async (
  repo: IRequirementRepository,
  userId: string,
): Promise<Result<Requirement[]>> => {
  return repo.getAll(userId);
};
