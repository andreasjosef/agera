import { type Result } from "../../shared/result.ts";
import type { IUserStatusRepository, UserStatus } from "../definitions.ts";

export const toggleActive = async (
  repo: IUserStatusRepository,
  userId: string,
  isActive: boolean,
): Promise<Result<UserStatus>> => {
  return await repo.toggleActive(userId, isActive);
};
