import { Router } from "express";
import {
  fail,
  ok,
  saveIntegrationAction,
  TokenPayloadSchema,
} from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";
import { validateReq } from "../middleware/validate.ts";
import { integrationsRepo } from "../services/instances.ts";

const router = Router();
router.use(authenticateUser);

/**
 * POST: Save a new integration token to db
 */
router.post("/connect", validateReq(TokenPayloadSchema), async (req, res) => {
  const user = (req as RequestWithUser).userid;
  const { token, provider } = req.body;

  const result = await saveIntegrationAction(
    user,
    token,
    provider,
    integrationsRepo,
  );

  if (!result.ok) {
    res.status(500).json(fail(result.error));
  }

  // Then initiate sync here?
  // syncCanvasReqs() ?

  res.status(200).json(ok(undefined));
});

export default router;
