import { Router } from "express";
import {
  fail,
  ok,
  type RequirementContext,
  saveIntegrationAction,
  TokenPayloadSchema,
  syncCanvasReqsAction,
  type SyncStatusResponse,
} from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

import { validateReq } from "../middleware/validate.ts";
import {
  integrationsRepo,
  openrouterClient,
  reqRepo,
} from "../services/instances.ts";
import { createCanvasClient } from "@ccpilot/lms-canvas";

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

  // NOTE the current implementation is limited to creating a canvas client instances and
  // then performing a canvas sync. As we add more integratoins in the future the client and
  // and sync action should be handeld dynamically depending on the token provider.
  const requirementCtx: RequirementContext = {
    canvas: createCanvasClient(token),
    llm: openrouterClient,
    repo: reqRepo,
    userId: user,
  };

  syncCanvasReqsAction(requirementCtx).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${user}`, result.error);
  });

  res
    .status(202)
    .json(ok<SyncStatusResponse>({ status: "INITIALIZED", payload: [] }));
});

export default router;
