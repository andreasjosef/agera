import { type Result, ok } from "../../shared/result.ts";
import {
  type IIntegrationRepository,
  type TokenProvider,
  type IntegrationStatusResponse,
} from "../definitions.ts";

/**
 * Searches the integration table for a given provider and returns the status of that integration as
 * IntegrationStatusResponse
 */
export const getIntegrationStatusAction = async (
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<IntegrationStatusResponse>> => {
  const result = await repo.getForProvider(userid, provider);

  if (!result.ok) {
    return ok({ status: "NOT_FOUND" });
  }

  const integration = result.value;

  switch (integration.status) {
    case "CONNECT":
      return ok({
        status: "CONNECT",
      });
    case "SYNCING":
      return ok({
        status: "SYNCING",
        lastSync: ensureDate(integration.lastSync),
      });
    case "STABLE":
      return ok({
        status: "STABLE",
        lastSync: ensureDate(integration.lastSync) ?? new Date(),
      });
    case "ERROR":
      return ok({
        status: "ERROR",
        lastSync: ensureDate(integration.lastSync),
        error: integration.error ?? "An unknown integration error occurred!",
      });

    default:
      return ok({ status: "NOT_FOUND" });
  }
};

/**
 * A helper function that ensures that what leaves the Action is either a Date object or undefined
 * */
function ensureDate(d: Date | string | null | undefined): Date | undefined {
  if (!d) return undefined;

  const date = d instanceof Date ? d : new Date(d);

  return isNaN(date.getTime()) ? undefined : date;
}
