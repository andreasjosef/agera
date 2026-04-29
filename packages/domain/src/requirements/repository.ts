import { type TokenProvider } from "../integrations/types.ts";
import { type Result } from "../shared/result.ts";
import type {
  Requirement,
  NewRequirement,
  StepGenerationStatus,
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
   * Gets the total count of requirements for a given provider
   * */
  getTotalCount: (
    userId: string,
    provider: TokenProvider,
  ) => Promise<Result<number>>;

  /**
   * Retrieves the count of requirements
   * for the given step generation statuses and provider
   * */
  getCountsByStatuses: (
    userId: string,
    provider: TokenProvider,
    statuses: StepGenerationStatus[],
  ) => Promise<Result<Record<StepGenerationStatus, number>>>;

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
