import {
  type Requirement,
  generateSteps,
  RequirementSchema,
} from "@ccpilot/domain";
import { zodRawParser, fetchList } from "@ccpilot/ts-fetch";
import { createLLMClient } from "@ccpilot/llm-client";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import { randomUUID, sign } from "node:crypto";
import { createJwtClient } from "@ccpilot/auth-jwt";

const llmClient = createLLMClient();
const reqRepo = createRequirementRepo(db);
const jwtClient = createJwtClient();

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
      category: "",
      complexity: 1,
      estimatedMinutes: 1,
      dependencyOrder: 1,
      quickStartLinkHint: "",
    },
  ],
};

const testGenerateSteps = async () => {
  console.log("[SANDBOX]: test generate steps");
  const result = await generateSteps(
    llmClient,
    "write hello world application",
  );

  if (!result.ok) {
    console.log(result.error);
  }
  console.log(result);
};

const testSavingRequirment = () => {
  reqRepo.save(requirment);
};

const testJwtClient = () => {
  const userId = "67";

  const signedResult = jwtClient.sign(userId);

  if (!signedResult.ok) {
    return console.log("sign error");
  }
  console.log("[SANDBOX] sign result:", signedResult);

  const verifiedResult = jwtClient.verify(signedResult.value);

  if (!verifiedResult.ok) {
    return console.log("verify error");
  }

  console.log("[SANDBOX] verify result:", verifiedResult);
};

testJwtClient();
