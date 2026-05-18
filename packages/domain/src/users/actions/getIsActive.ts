import { type Result } from "../../shared/result.ts";
import type { IUserStatusRepository, UserStatus } from "../definitions.ts";

export const getIsActive = async (
  repo: IUserStatusRepository,
  userId: string,
): Promise<Result<UserStatus>> => {
  return await repo.getIsActive(userId);
};
