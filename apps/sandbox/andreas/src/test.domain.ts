import type { NewRequirement, NewStep } from "@ccpilot/domain";
import { createRequirementRepo, db } from "@ccpilot/persistence";

const user = "nu9LYzCEfrw43z0zO1rrq03FVPBfOui0";
const req = "c4e0f3c9-5528-4d28-9792-ffee7f1af060";

const testStep: NewStep = {
  stepKey: "setup-clone-repo",
  action: "Clone the starter repository and verify the app runs locally",
  outcomeDefinition:
    "The local environment is ready and the app is accessible at http://localhost:3000",
  curiosityTrigger:
    "What warning messages appear in the console when the app first loads?",
  theWin:
    "Establish a reproducible runtime baseline for all subsequent testing work",
  category: "admin",
  complexity: 1,
  estimatedMinutes: 10,
  dependencyOrder: 1,
  quickStartLinkHint: 'README.md – Check the "🚀 Kom igång" section',
};

const test: NewRequirement = {
  title: "Test Assignment",
  due: new Date().toString(),
  source: "canvas",
  steps: [],
  type: "assignment",
};

// console.log(RequirementSchema.safeParse(test).success);
// console.log(StepSchema.safeParse(testStep).success);

const reqRepo = createRequirementRepo(db);

// const result = await reqRepo.save(test, user);
//const saveResult = await reqRepo.updateStatus(req, "GENERATING");
//const stepResult = await reqRepo.updateSteps(req, [testStep], "COMPLETE");
const result = await reqRepo.findById(req);

console.log(result);
