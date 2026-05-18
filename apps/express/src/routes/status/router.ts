import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware.ts";
import { appContext } from "../../middleware/context.ts";
import { validateReq } from "../../middleware/validate.ts";

import * as handlers from "./handlers/index.ts";
import { ToggleActiveStatusSchema } from "@ccpilot/domain";

const statusRouter = Router();

statusRouter.use(authenticateUser);
statusRouter.use(appContext);

statusRouter.get("/me", handlers.getIsActiveStatus);
statusRouter.get("/count", handlers.getActiveStatusCount);
statusRouter.post(
  "/toggle",
  validateReq(ToggleActiveStatusSchema),
  handlers.toggleActiveStatus,
);

export default statusRouter;
