import { type IUserStatusRepository } from "@ccpilot/domain";
import { getActiveCount } from "./methods/getActiveCount.ts";
import { getIsActive } from "./methods/getIsActive.ts";
import { toggleActive } from "./methods/toggleActive.ts";

export const createUserStatusRepository = (): IUserStatusRepository => {
  return {
    toggleActive,
    getIsActive,
    getActiveCount,
  };
};
