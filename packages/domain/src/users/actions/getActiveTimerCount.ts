import { type Result } from "../../shared/result.ts";
import type {
  ActiveTimerCount,
  IUserStatusRepository,
} from "../definitions.ts";

export const getActiveTimerCount = async (
  repo: IUserStatusRepository,
): Promise<Result<ActiveTimerCount>> => {
  return await repo.getActiveTimerCount();
};
