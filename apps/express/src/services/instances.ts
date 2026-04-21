import { createCanvasClient } from "@ccpilot/lms-canvas";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import { createLLMClient } from "@ccpilot/llm-client";

export const canvasClient = createCanvasClient(process.env.CANVAS_TOKEN!);
export const reqRepo = createRequirementRepo(db);
export const openrouterClient = createLLMClient();
