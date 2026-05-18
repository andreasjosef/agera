import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware.ts";
import { appContext } from "../../middleware/context.ts";

import * as handlers from "./handlers/index.ts";

const statusRouter = Router();

statusRouter.use(authenticateUser);
statusRouter.use(appContext);

statusRouter.get("/", handlers.getActiveStatus);
statusRouter.get("/count", handlers.getActiveCount);
statusRouter.post("/toggle", handlers.toggleActiveStatus);

export default statusRouter;
