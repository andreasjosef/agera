import { type Result } from "../shared/result.ts";
import type { Requirement, NewRequirement } from "./types.ts";

export interface IRequirementRepository {
  /**
   * Persists a new requirements or updates an existing one
   * **/
  save: (req: NewRequirement) => Promise<Result<Requirement>>;

  /**
   * Retrieves all the requirements from the persistence layer
   * */
  getAll: () => Promise<Result<Requirement[]>>;
}
