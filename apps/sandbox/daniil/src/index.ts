import {
  type Requirement,
  generateSteps,
  RequirementSchema,
} from "@ccpilot/domain";
import { zodRawParser, fetchList } from "@ccpilot/ts-fetch";
import { createLLMClient } from "@ccpilot/llm-client";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import { randomUUID } from "node:crypto";

const llmClient = createLLMClient();
const reqRepo = createRequirementRepo(db);
const requirment: Requirement = {
  id: randomUUID(),
  title: "Complete Canvas Module Assignment",
  due: "2026-04-15T23:59:59Z",
  type: "assignment",
  source: "canvas",
  steps: [
    {
      id: randomUUID(),
      action: "",
      outcomeDefinition: "",
      curiosityTrigger: "",
      theWin: "",
      category: 1,
      complexity: 1,
      estimatedMinutes: 1,
      dependencyOrder: 1,
      quickStartLinkHint: "",
    },
  ],
};

const testGenerateSteps = async () => {
  console.log("[SANDBOX]: test generate steps");
  await generateSteps(llmClient, "write hello world application");
};

const testSavingRequirment = () => {
  reqRepo.save(requirment);
};

testGenerateSteps();
