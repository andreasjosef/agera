import { createIntegrationsRepository, db } from "@ccpilot/persistence";

const testUser = "3BysVDl7pNzCo1hPmGvaagN3dHOYfcXy";
const testToken = "randomtokenkindaofthing";
const testUpdateToken = "yetanotherevenmorerandomtoken";

const integrationRepo = createIntegrationsRepository(db);

const saveTokenResult = await integrationRepo.save(
  testUser,
  testToken,
  "CANVAS",
);

const getCanvasTokenResult = await integrationRepo.getForProvider(
  testUser,
  "CANVAS",
);

const updateTokenResult = await integrationRepo.save(
  testUser,
  testUpdateToken,
  "CANVAS",
);

const getAllTokensResult = await integrationRepo.getAll(testUser);

console.log("[SANDBOX] integrationRepo.save ", saveTokenResult);
console.log("[SANDBOX] integrationRepo.getForProvider", getCanvasTokenResult);
console.log("[SANDBOX] integrationRepo.getAll", getAllTokensResult);
console.log("[SANDBOX] integrationRepo.save (update) ", updateTokenResult);

process.exit(0);
