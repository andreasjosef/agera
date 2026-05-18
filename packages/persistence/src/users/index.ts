import { type IUserStatusRepository } from "@ccpilot/domain";
import { toggleTimerActive } from "./methods/toggleTimerActive.ts";
import { getTimerActive } from "./methods/getTimerActive.ts";
import { getActiveTimerCount } from "./methods/getActiveTimerCount.ts";

export const createUserStatusRepository = (): IUserStatusRepository => {
  return {
    toggleTimerActive,
    getTimerActive,
    getActiveTimerCount,
  };
};
