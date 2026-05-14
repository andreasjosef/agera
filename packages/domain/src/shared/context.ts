import { type LLMClientInterface } from "../services/llm.ts";
import { type IIntegrationRepository } from "../integrations/definitions.ts";
import { type IRequirementRepository } from "../requirements/repository.ts";
import { type CanvasClientInterface } from "../services/canvas.ts";
import { type IUserStatusRepository } from "../users/definitions.ts";

export interface AppContext {
  userId: string;
  repos: {
    requirements: IRequirementRepository;
    integrations: IIntegrationRepository;
    status: IUserStatusRepository;
  };
  services: {
    llm: LLMClientInterface;
    canvas: CanvasClientInterface | null;
  };
}
