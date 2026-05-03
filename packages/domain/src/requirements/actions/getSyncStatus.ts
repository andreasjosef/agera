import { type Result, fail, ok } from "../../shared/result.ts";
import {
  type IIntegrationRepository,
  type TokenProvider,
} from "../../integrations/index.ts";
import { type IRequirementRepository } from "../repository.ts";
import { type SyncStatusResponse } from "../definitions.ts";

/**
 * Fetch the user's requirements that are not yet in a terminal state
 * and derive aggregate sync status
 * */
export const getSyncStatusAction = async (
  reqRepo: IRequirementRepository,
  intRepo: IIntegrationRepository,
  userId: string,
  provider: TokenProvider,
): Promise<Result<SyncStatusResponse>> => {
  const integrationResult = await intRepo.getForProvider(userId, provider);
  if (integrationResult.ok && integrationResult.value.status === "SYNCING") {
    return ok({ status: "PROCESSING", stats: { active: 0, total: 0 } });
  }

  const activeStatsResult = await reqRepo.getCountsByStatuses(
    userId,
    provider,
    ["RAW", "GENERATING"],
  );

  if (!activeStatsResult.ok) {
    console.log("No active stats!");
    return fail("No Requirements found for this user!");
  }
  const activeStats = activeStatsResult.value;

  const totalCountResult = await reqRepo.getTotalCount(userId, provider);
  if (!totalCountResult.ok) return fail(`Failed to load count for ${provider}`);

  const totalCount = totalCountResult.value;

  const raw = activeStats.RAW ?? 0;
  const generating = activeStats.GENERATING ?? 0;

  console.log("[REQ DB COUNTS] raw", raw);
  console.log("[REQ DB COUNTS] generating", generating);

  if (generating > 0)
    return ok({
      status: "PROCESSING",
      stats: { active: generating + raw, total: totalCount },
    });

  if (raw > 0)
    return ok({
      status: "INITIALIZED",
      stats: { active: raw, total: totalCount },
    });

  if (totalCount > 0)
    return ok({
      status: "COMPLETE",
      stats: { active: 0, total: totalCount },
    });

  // TODO: This should be IDLE but then I need to update the Integration Status before that to syncing or so
  return ok({ status: "IDLE", stats: { active: 0, total: 0 } });
};
