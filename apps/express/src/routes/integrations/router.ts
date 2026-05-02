import { Router } from "express";
import { IntegrationTokenSchema } from "@ccpilot/domain";
import { appContext } from "../../middleware/context.ts";
import { validateReq } from "../../middleware/validate.ts";
import { authenticateUser } from "../../middleware/auth.middleware.ts";

import * as handlers from "./handlers/index.ts";

const integrationsRouter = Router();

integrationsRouter.use(authenticateUser);
integrationsRouter.use(appContext);

integrationsRouter.get("/:provider", handlers.getIntegration);
integrationsRouter.post(
  "/connect/canvas",
  validateReq(IntegrationTokenSchema),
  handlers.connectCanvas,
);

export default integrationsRouter;
