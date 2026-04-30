import { Router } from "express";
import {
  fail,
  ok,
  type SyncStatusResponse,
  type TokenProvider,
  IntegrationTokenSchema,
  saveIntegrationAction,
  syncCanvasReqsAction,
  getIntegrationStatusAction,
  type AppContext,
} from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

import { validateReq } from "../middleware/validate.ts";
import { integrationsRepo } from "../services/instances.ts";
import { appContext, type ContextHandler } from "../middleware/context.ts";
import { createCanvasClient } from "@ccpilot/lms-canvas";

const router = Router();
router.use(authenticateUser);
router.use(appContext);

/**
 * GET: Retrieve the integration status of a given provider
 */
router.get("/:provider", async (req, res) => {
  const user = (req as unknown as RequestWithUser).userid;
  const provider = req.params.provider.toUpperCase() as TokenProvider;

  const result = await getIntegrationStatusAction(
    user,
    provider,
    integrationsRepo,
  );

  if (!result.ok) return res.status(500).json(fail("Integration API Error"));

  res.status(200).json(ok(result.value));
});

/**
 * POST: Save a new integration token to db. This triggers the sync
 * and will then utilize the llm client to generate the steps for
 * the requirements gathered.
 */
const connectCanvasHandler: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const { token, provider } = req.body;

  const result = await saveIntegrationAction(
    ctx.userId,
    token,
    provider,
    integrationsRepo,
  );

  if (!result.ok) {
    res.status(500).json(fail(result.error));
  }

  const updatedContext: AppContext = {
    ...ctx,
    services: {
      ...ctx.services,
      canvas: createCanvasClient(token),
    },
  };

  // NOTE the current implementation is limited to creating a canvas client instances and
  // then performing a canvas sync. As we add more integratoins in the future the client and
  // and sync action should be handeld dynamically depending on the token provider.
  syncCanvasReqsAction(updatedContext).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${ctx.userId}`, result.error);
  });

  res.status(202).json(
    ok<SyncStatusResponse>({
      status: "INITIALIZED",
      stats: { active: 0, total: 0 },
    }),
  );
};

router.post(
  "/connect",
  validateReq(IntegrationTokenSchema),
  connectCanvasHandler,
);

export default router;
