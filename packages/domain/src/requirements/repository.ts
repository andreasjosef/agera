import { Result } from "@/shared/result.ts";
import { Requirement } from "./types.ts";

export interface IRequirementRepository {
  /**
   * Persists a new requirements or updates an existing one
   * **/
  save: (req: Requirement) => Promise<Result<Requirement>>;

  /**
   * Retrieves all the requirements from the persistence layer
   * */
  getAll: () => Promise<Result<Requirement[]>>;
}
