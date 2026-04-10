import type { Requirement } from "@ccpilot/domain";
import { createRequirementRepo, db } from "@ccpilot/persistence";

const reqRepo = createRequirementRepo(db);

const requirment: Requirement = {
  id: "req-001",
  title: "Complete Canvas Module Assignment",
  due: "2026-04-15T23:59:59Z",
  type: "assignment",
  source: "canvas",
  steps: [
    {
      id: "step-001-1",
      title: "Review assignment guidelines",
      outcome: "Understand all requirements",
      complexity: 1,
    },
    {
      id: "step-001-2",
      title: "Implement solution",
      outcome: "Complete working code",
      complexity: 3,
    },
    {
      id: "step-001-3",
      title: "Submit assignment",
      outcome: "Verified submission",
      complexity: 1,
    },
  ],
};

reqRepo.save(requirment);
reqRepo.getAll();
