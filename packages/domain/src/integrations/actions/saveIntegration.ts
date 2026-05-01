import { type Result } from "../../shared/result.ts";
import {
  type TokenProvider,
  type IIntegrationRepository,
} from "../definitions.ts";

/**
 * Persists a 3rd-party provider token for a specific user to the integration repository.
 * If a token for the given provider and user already exists it will be updated instead.
 */
export const saveIntegrationAction = async (
  userId: string,
  token: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<void>> => {
  return await repo.save(userId, token, provider);
};
