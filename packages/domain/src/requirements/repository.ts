import { type Result } from "../shared/result.ts";
import type {
  Requirement,
  NewRequirement,
  StepGenerationStatus,
  Step,
  NewStep,
} from "./types.ts";

export interface IRequirementRepository {
  /**
   * Persists a new requirements or updates an existing one
   * **/
  save: (req: NewRequirement, userId: string) => Promise<Result<Requirement>>;

  /**
   * Retrieves all the requirements from the persistence layer
   * */
  getAll: (userId: string) => Promise<Result<Requirement[]>>;

  /**
   * Retrieves all the requirements where the sync status is "GENERATING" or "RAW"
   * */
  getSyncIncomplete: (userId: string) => Promise<Result<Requirement[]>>;

  /**
   * Retrieves all the requirements updated within the given minutes defaults to 10
   * */
  getRecent: (
    userId: string,
    timeWindowMinutes: number,
  ) => Promise<Result<Requirement[]>>;

  /**
   * Retrieves a single requirement from the persistence layer by its ID
   * */
  findById: (reqId: string) => Promise<Result<Requirement>>;

  /**
   * Atomically updates the generation status of a requirement
   * */
  updateStatus: (
    reqId: string,
    status: StepGenerationStatus,
  ) => Promise<Result<void>>;

  /**
   * Persists the generated steps and transitions the requirement status
   * */
  updateSteps: (
    reqId: string,
    steps: NewStep[],
    status: StepGenerationStatus,
  ) => Promise<Result<void>>;
}
