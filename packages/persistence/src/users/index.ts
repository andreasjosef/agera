import { type IUserStatusRepository } from "@ccpilot/domain";
import { toggleTimerStatus } from "./methods/toggleTimerStatus.ts";

export const createUserStatusRepository = (): IUserStatusRepository => {
  return {
    toggleTimerStatus,
  };
};
