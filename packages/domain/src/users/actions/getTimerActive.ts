import { type Result } from "../../shared/result.ts";
import type { IUserStatusRepository, UserStatus } from "../definitions.ts";

export const getTimerActive = async (
  repo: IUserStatusRepository,
  userId: string,
): Promise<Result<UserStatus>> => {
  return await repo.getTimerActive(userId);
};
