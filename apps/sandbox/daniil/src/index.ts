import type { Requirement } from "@ccpilot/domain";

import { createRequirementRepo, db } from "@ccpilot/persistence";

import { randomUUID } from "crypto";

const reqRepo = createRequirementRepo(db);

console.log(randomUUID());

const requirment: Requirement = {
  id: randomUUID(),
  title: "Complete Canvas Module Assignment",
  due: "2026-04-15T23:59:59Z",
  type: "assignment",
  source: "canvas",
  steps: [
    {
      id: randomUUID(),
      stepKey: "step-001-1",
      title: "Review assignment guidelines",
      outcome: "Understand all requirements",
      complexity: 1,
    },
    {
      id: randomUUID(),
      stepKey: "step-001-2",
      title: "Implement solution",
      outcome: "Complete working code",
      complexity: 3,
    },
    {
      id: randomUUID(),
      stepKey: "step-001-3",
      title: "Submit assignment",
      outcome: "Verified submission",
      complexity: 1,
    },
  ],
};

reqRepo.save(requirment);
console.log(await reqRepo.getAll());
