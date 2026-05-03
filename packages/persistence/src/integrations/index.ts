import { type IIntegrationRepository } from "@ccpilot/domain";

import { save } from "./methods/save.ts";
import { getForProvider } from "./methods/getForProvider.ts";
import { getAll } from "./methods/getAll.ts";
import { updateStatus } from "./methods/updateStatus.ts";

export const createIntegrationsRepository = (): IIntegrationRepository => {
  return {
    save,
    getForProvider,
    getAll,
    updateStatus,
  };
};
