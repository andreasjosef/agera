import {
  RequirementSchema,
  StepSchema,
  type IRequirementRepository,
  getRequirements,
  saveRequirement,
} from "@ccpilot/domain";

import {} from "@ccpilot/domain";

import type { Requirement, Step } from "@ccpilot/domain";

const testStep: Step = {
  id: "12345",
  title: "Step 1",
  outcome: "Hello world programme is written",
  complexity: 2,
};

const test: Requirement = {
  id: "1234",
  title: "Test Assignment",
  due: new Date().toString(),
  source: "canvas",
  steps: [testStep],
  type: "assignment",
};

console.log(RequirementSchema.safeParse(test).success);
console.log(StepSchema.safeParse(testStep).success);

const reqRepo: IRequirementRepository = {
  getAll: async () => {
    console.log("loading requirements...");

    return {
      ok: false,
      error: "Just testing a load",
    };
  },
  save: async (req) => {
    console.log("saving requirement: ", req);

    return {
      ok: false,
      error: "Just testing a save",
    };
  },
};

const resultAll = await getRequirements(reqRepo);
const resultSave = await saveRequirement(reqRepo, test);

console.log("getAll actions response: ", resultAll);
console.log("saveReq actions response: ", resultSave);
