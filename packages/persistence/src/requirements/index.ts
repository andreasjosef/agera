import { type IRequirementRepository } from "@ccpilot/domain";

import { save } from "./methods/save.ts";
import { findById } from "./methods/findById.ts";
import { findStepById } from "./methods/findStepById.ts";
import { updateStatus } from "./methods/updateStatus.ts";
import { updateSteps } from "./methods/updateSteps.ts";
import { getSyncIncomplete } from "./methods/getSyncIncomplete.ts";
import { getRecent } from "./methods/getRecent.ts";
import { getAll } from "./methods/getAll.ts";
import { getCountsByStatuses } from "./methods/getCountsByStatuses.ts";
import { getTotalCount } from "./methods/getTotalCount.ts";
import { completeStep } from "./methods/completeStep.ts";

export const createRequirementRepo = (): IRequirementRepository => {
  return {
    save,
    findById,
    findStepById,
    updateStatus,
    updateSteps,
    completeStep,
    getSyncIncomplete,
    getRecent,
    getAll,
    getCountsByStatuses,
    getTotalCount,
  };
};
