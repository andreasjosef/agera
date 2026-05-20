import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware.ts";
import { appContext } from "../../middleware/context.ts";

import * as handlers from "./handlers/index.ts";

const stepsRouter = Router();

stepsRouter.use(authenticateUser);
stepsRouter.use(appContext);

stepsRouter.get("/:id", handlers.getStepById);
stepsRouter.post("/finish/:id", handlers.finishStep);

export default stepsRouter;
