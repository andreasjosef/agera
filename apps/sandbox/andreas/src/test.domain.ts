import { RequirementSchema, StepSchema } from "@ccpilot/domain";

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
  due: new Date(),
  source: "canvas",
  steps: [testStep],
  type: "assignment",
};

console.log(RequirementSchema.safeParse(test).success);
console.log(StepSchema.safeParse(testStep).success);
