import { createRequirementRepo, db} from "@ccpilot/persistence";
import {  type Requirement } from "@ccpilot/domain";
import { randomUUID} from "node:crypto"

const reqRepo = createRequirementRepo(db);
const requirement: Requirement = {
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
const userId = "lmLP8tbhSq9BTdRGdyslPYKx7m7mimeK";

const testGetAllRequirements = async () => {
    const requirements = await reqRepo.getAll(userId);
    
    console.log(requirements);
};


const testSaveReqUid = async () => {
const requirements = await reqRepo.save(requirement, userId);

console.log("____-SANDBOX-____", requirements);

}

await testSaveReqUid();
await testGetAllRequirements();
