import { type IUserStatusRepository } from "@ccpilot/domain";
import { toggleTimerActive } from "./methods/toggleTimerActive.ts";

export const createUserStatusRepository = (): IUserStatusRepository => {
  return {
    toggleTimerActive,
  };
};
