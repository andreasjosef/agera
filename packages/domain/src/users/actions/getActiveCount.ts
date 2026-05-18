import { type Result } from "../../shared/result.ts";
import type { ActiveUserCount, IUserStatusRepository } from "../definitions.ts";

export const getActiveCount = async (
  repo: IUserStatusRepository,
): Promise<Result<ActiveUserCount>> => {
  return await repo.getActiveCount();
};
