import {
  type IIntegrationRepository,
  type TokenProvider,
  type IntegrationToken,
} from "../definitions.ts";
import { type Result, ok, fail } from "../../shared/result.ts";

/**
 * Orchestrates loading a specific integration token.
 */
export const loadIntegrationTokenAction = async (
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<IntegrationToken>> => {
  const result = await repo.getForProvider(userid, provider);

  if (!result.ok) return fail(result.error);

  return ok({
    token: result.value.token,
    provider: result.value.provider,
  });
};
