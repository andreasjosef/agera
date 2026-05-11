import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware.ts";
import { appContext } from "../../middleware/context.ts";
import { validateReq } from "../../middleware/validate.ts";

import * as handlers from "./handlers/index.ts";
import { NewRequirementSchema } from "@ccpilot/domain";

const requirementRouter = Router();

requirementRouter.use(authenticateUser);
requirementRouter.use(appContext);

requirementRouter.get("/", handlers.getRequirements);
requirementRouter.get("/next", handlers.getNextStep);
requirementRouter.get("/sync/:provider", handlers.getSyncStatus);
requirementRouter.post("/sync", handlers.initiateSync);
requirementRouter.post(
  "/create",
  validateReq(NewRequirementSchema),
  handlers.createRequirement,
);
requirementRouter.get("/:requirementId", handlers.getRequirement);

export default requirementRouter;
