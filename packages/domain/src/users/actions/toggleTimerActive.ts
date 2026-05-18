import { type Result } from "../../shared/result.ts";
import type { IUserStatusRepository, UserStatus } from "../definitions.ts";

export const toggleTimerActive = async (
  repo: IUserStatusRepository,
  userId: string,
  isActive: boolean,
): Promise<Result<UserStatus>> => {
  return await repo.toggleTimerActive(userId, isActive);
};
